import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import ProductSkeleton from "../components/ProductSkeleton";
import Seo from "../components/Seo";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [category, setCategory] = useState(
    localStorage.getItem("category") || "all"
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [search, setSearch] = useState("");

  /* ===============================
     FETCH PRODUCTS (FS + DUMMYJSON)
     =============================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        if (page === 1) {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();

          const normalized = data.map(p => ({
            id: `fs-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.image,
            category: p.category,
            rating: p.rating,
          }));

          setProducts(normalized);
          setHasMore(true);
        } else {
          const limit = 12;
          const skip = (page - 2) * limit;

          const res = await fetch(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
          );
          const data = await res.json();

          const normalized = data.products.map(p => ({
            id: `dj-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail,
            category: p.category,
            rating: { rate: p.rating },
          }));

          setProducts(prev => [...prev, ...normalized]);
          setHasMore(data.products.length === limit);
        }
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  /* ✅ KEEP CART IN SYNC (FIX) */
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [location.key]);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    setSearch(localStorage.getItem("search") || "");
  }, [location.key]);

  const categories = [
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

  let filtered =
    category === "all"
      ? products
      : products.filter(p =>
          p.category.toLowerCase().includes(category)
        );

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
    let updated;

    if (wishlist.includes(pid)) {
      updated = wishlist.filter(i => i !== pid);
      toast("Removed from wishlist");
    } else {
      updated = [...wishlist, pid];
      toast.success("Added to wishlist ❤️");
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const totalItems = cart.reduce((s, i) => s + (i.qty || 1), 0);

  return (
    <>
      <Seo title="Products | AIKart" description="Buy best products online" />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-6 pb-32">
        {/* CATEGORY */}
        <div className="mb-6 border-b pb-4">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  localStorage.removeItem("search");
                  setSearch("");
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  category === c
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS + DESKTOP CART */}
        <div className="flex gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {loading && page === 1
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
                      alt={p.title}
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="h-44 w-full object-contain my-4 cursor-pointer"
                    />

                    <h3 className="font-semibold text-sm line-clamp-2">
                      {p.title}
                    </h3>

                    <p className="text-yellow-500 text-sm">
                      ⭐ {p.rating?.rate || 4} / 5
                    </p>

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

          {/* ✅ DESKTOP CART SIDEBAR (RESTORED) */}
          {cart.length > 0 && (
            <div className="hidden lg:block w-72 sticky top-24
                            bg-gray-100 dark:bg-gray-800
                            p-4 rounded-xl h-fit">
              <h3 className="font-bold mb-3">🛒 Cart</h3>
              <p className="text-sm mb-3">
                Items: <b>{totalItems}</b>
              </p>
              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-purple-600 text-white py-2 rounded"
              >
                Go to Cart
              </button>
            </div>
          )}
        </div>

        {/* LOAD MORE */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-3 bg-black dark:bg-white
                         text-white dark:text-black rounded-full"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* MOBILE CART */}
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/cart")}
          className="lg:hidden fixed bottom-20 right-4 z-50
                     bg-green-600 text-white w-14 h-14 rounded-full
                     flex items-center justify-center shadow-xl"
        >
          🛒
          <span className="absolute -top-1 -right-1 bg-red-600 text-white
                           text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
    </>
  );
}
