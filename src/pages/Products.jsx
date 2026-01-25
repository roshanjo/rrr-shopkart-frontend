import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductSkeleton from "../components/ProductSkeleton";
import Seo from "../components/Seo";

// Constants
const CACHE_KEY = "products_cache_v3";
const PAGE_KEY = "products_page_v3";
const SCROLL_KEY = "products_scroll_y_v3";
const ITEM_HEIGHT = 360; // height of each product card
const VISIBLE_COUNT = 12; // number of items to render per page

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  /* ===============================
     URL CATEGORY (SOURCE OF TRUTH)
  ================================ */
  const urlCategory = params.get("cat") || "all";
  const [category, setCategory] = useState(urlCategory);

  /* ===============================
     STATE
  ================================ */
  const [products, setProducts] = useState(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });

  const [page, setPage] = useState(Number(sessionStorage.getItem(PAGE_KEY)) || 1);
  const [loading, setLoading] = useState(products.length === 0);
  const [hasMore, setHasMore] = useState(true);

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [search, setSearch] = useState("");

  /* ===============================
     FETCH PRODUCTS (CACHE SAFE)
  ================================ */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let newProducts = [];

        if (page === 1) {
          // Fetching from FakeStore for the first page
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          newProducts = data.map(p => ({
            id: `fs-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.image,
            category: p.category,
          }));
          setHasMore(true);
        } else {
          const limit = 12;
          const skip = (page - 2) * limit;
          // Fetching from DummyJSON for page 2 and beyond
          const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
          const data = await res.json();
          newProducts = data.products.map(p => ({
            id: `dj-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail,
            category: p.category,
          }));
          setHasMore(data.products.length === limit);
        }

        setProducts(prev => {
          const merged = page === 1 ? newProducts : [...prev, ...newProducts];
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(merged));
          sessionStorage.setItem(PAGE_KEY, page);
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
     SCROLL RESTORE (BACK)
  ================================ */
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      requestAnimationFrame(() => {
        window.scrollTo(0, Number(saved));
      });
    }
  }, []);

  useEffect(() => {
    const save = () => sessionStorage.setItem(SCROLL_KEY, window.scrollY);
    window.addEventListener("scroll", save);
    return () => window.removeEventListener("scroll", save);
  }, []);

  /* ===============================
     URL ↔ STATE SYNC
  ================================ */
  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setParams(category === "all" ? {} : { cat: category }, { replace: true });
  }, [category, setParams]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    setSearch(localStorage.getItem("search") || "");
  }, [location.key]);

  /* ===============================
     FILTERS + COUNTS
  ================================ */
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

  const categoryCounts = useMemo(() => {
    return products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const visibleCategories = allCategories.filter(c => c === "all" || categoryCounts[c]);

  let filtered = category === "all" ? products : products.filter(p => p.category === category);

  if (search) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

  /* ===============================
     ✅ STABLE VIRTUALIZATION
  ================================ */
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const offsetTop = containerRef.current.offsetTop;
      const relativeScroll = Math.max(0, window.scrollY - offsetTop);
      setStartIndex(Math.floor(relativeScroll / ITEM_HEIGHT));
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleItems = filtered.slice(startIndex, startIndex + VISIBLE_COUNT);

  /* ===============================
     CART / WISHLIST
  ================================ */
  const addToCart = p => {
    const updated = [...cart, { ...p, qty: 1 }];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Added to cart");
  };

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
  ================================ */
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

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-6 pb-32 flex gap-6">
        {/* FILTER (LEFT SIDE) */}
        <div className="lg:w-1/4 sm:w-full mb-6 sm:mb-0 sm:flex sm:flex-col sm:gap-4 sticky top-0">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-4">Filter by Category</h3>
            <div className="space-y-2">
              {visibleCategories.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold w-full text-left 
                    ${category === c ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-800"}`}
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
        </div>

        {/* PRODUCTS (VIRTUALIZED) */}
        <div
          ref={containerRef}
          style={{
            height: filtered.length * ITEM_HEIGHT,
            position: "relative",
          }}
        >
          <div
            style={{
              transform: `translateY(${startIndex * ITEM_HEIGHT}px)`,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading && products.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : visibleItems.map(p => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
                  >
                    <div className="flex justify-between">
                      <span className="text-xs bg-blue-100 px-2 py-1 rounded">
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
        </div>

        {hasMore && <div ref={observerRef} className="h-12 mt-10" />}
      </div>

      {/* MOBILE CART */}
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/cart")}
          className="lg:hidden fixed bottom-20 right-4 z-50 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        >
          🛒
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}

      {/* DESKTOP CART BUTTON */}
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/cart")}
          className="hidden lg:flex fixed bottom-10 right-10 z-50 bg-green-600 text-white w-16 h-16 rounded-full items-center justify-center shadow-xl"
        >
          🛒
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
    </>
  );
}
