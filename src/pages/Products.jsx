import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductSkeleton from "../components/ProductSkeleton";
import Seo from "../components/Seo";

const CACHE_KEY = "products_cache_v1";
const SCROLL_KEY = "products_scroll_y";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const observerRef = useRef(null);

  /* ===============================
     URL CATEGORY SYNC (SOURCE OF TRUTH)
     =============================== */
  const urlCategory = searchParams.get("category");

  const [category, setCategory] = useState(
    urlCategory ||
      localStorage.getItem("category") ||
      "all"
  );

  const [products, setProducts] = useState(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });

  const [page, setPage] = useState(
    Number(sessionStorage.getItem("products_page")) || 1
  );

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(products.length === 0);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [search, setSearch] = useState("");

  /* ===============================
     FETCH PRODUCTS (WITH CACHE)
     =============================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let newProducts = [];

        if (page === 1) {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();

          newProducts = data.map(p => ({
            id: `fs-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.image,
            category: p.category,
            rating: p.rating,
          }));
        } else {
          const limit = 12;
          const skip = (page - 2) * limit;

          const res = await fetch(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
          );
          const data = await res.json();

          newProducts = data.products.map(p => ({
            id: `dj-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail,
            category: p.category,
            rating: { rate: p.rating },
          }));

          setHasMore(data.products.length === limit);
        }

        setProducts(prev => {
          const merged = page === 1 ? newProducts : [...prev, ...newProducts];
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(merged));
          sessionStorage.setItem("products_page", page);
          return merged;
        });
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  /* ===============================
     RESTORE SCROLL POSITION
     =============================== */
  useEffect(() => {
    const savedY = sessionStorage.getItem(SCROLL_KEY);
    if (savedY) {
      setTimeout(() => {
        window.scrollTo(0, Number(savedY));
      }, 100);
    }
  }, []);

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, window.scrollY);
    };
    window.addEventListener("scroll", saveScroll);
    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  /* ===============================
     STATE SYNC
     =============================== */
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    setSearch(localStorage.getItem("search") || "");
  }, [location.key]);

  /* ===============================
     CATEGORY → URL + LOCAL STORAGE
     =============================== */
  useEffect(() => {
    localStorage.setItem("category", category);
    setSearchParams(
      category === "all" ? {} : { category },
      { replace: true }
    );
  }, [category, setSearchParams]);

  /* ===============================
     FILTERS + COUNTS
     =============================== */
  const allCategories = [
    "all",
    "electronics",
    "men's clothing",
    "women's clothing",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const visibleCategories = allCategories.filter(
    c => c === "all" || categoryCounts[c]
  );

  let filtered =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  if (search) {
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  /* ===============================
     CART
     =============================== */
  const addToCart = p => {
    const updated = [
      ...cart,
      {
        name: p.title,
        price: Math.round(p.price * 80),
        image: p.image,
        qty: 1,
      },
    ];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Added to cart");
  };

  /* ===============================
     WISHLIST
     =============================== */
  const toggleWishlist = id => {
    const pid = String(id);
    const updated = wishlist.includes(pid)
      ? wishlist.filter(i => i !== pid)
      : [...wishlist, pid];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const totalItems = cart.reduce((s, i) => s + (i.qty || 1), 0);

  /* ===============================
     INFINITE SCROLL
     =============================== */
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <>
      <Seo title="Products | AIKart" />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-6 pb-32">
        {/* CATEGORY */}
        <div className="mb-6 border-b pb-4">
          <div className="flex gap-3 overflow-x-auto">
            {visibleCategories.map(c => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  localStorage.removeItem("search");
                  setSearch("");
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                  category === c
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              >
                {c.toUpperCase()}
                {c !== "all" && (
                  <span className="ml-1 opacity-70">
                    ({categoryCounts[c]})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS + CART */}
        <div className="flex gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {loading && products.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : filtered.map(p => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
                  >
                    <div className="flex justify-between">
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {p.category}
                      </span>
                      <button onClick={() => toggleWishlist(p.id)}>
                        {wishlist.includes(String(p.id)) ? "❤️" : "🤍"}
                      </button>
                    </div>

                    <img
                      src={p.image}
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="h-44 w-full object-contain my-4 cursor-pointer"
                    />

                    <h3 className="font-semibold text-sm line-clamp-2">
                      {p.title}
                    </h3>

                    <p className="text-lg font-bold mb-3">
                      ₹ {Math.round(p.price * 80)}
                    </p>

                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-green-600 text-white py-2 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
          </div>

          {cart.length > 0 && (
            <div className="hidden lg:block w-72 sticky top-24 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl h-fit">
              <h3 className="font-bold mb-3">🛒 Cart</h3>
              <p className="text-sm mb-3">Items: {totalItems}</p>
              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-purple-600 text-white py-2 rounded"
              >
                Go to Cart
              </button>
            </div>
          )}
        </div>

        {hasMore && <div ref={observerRef} className="h-10 mt-10" />}
      </div>
    </>
  );
}
