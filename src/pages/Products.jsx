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

  /* FETCH PRODUCTS */
  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load products");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    setSearch(localStorage.getItem("search") || "");
  }, [location.key]);

  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

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

  /* CART */
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

  /* ✅ WISHLIST (FIXED) */
  const toggleWishlist = (id) => {
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

          {search && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Showing results for <b>"{search}"</b>
            </p>
          )}
        </div>

        {/* PRODUCTS */}
        <div className="flex gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : filtered.map(p => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {p.category}
                      </span>

                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-xl"
                      >
                        {wishlist.includes(String(p.id)) ? "❤️" : "🤍"}
                      </button>
                    </div>

                    <img
                      src={p.image}
                      alt={p.title}
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="h-44 w-full object-contain my-4 cursor-pointer hover:scale-105 transition"
                    />

                    <h3 className="font-semibold text-sm line-clamp-2">
                      {p.title}
                    </h3>

                    <p className="text-yellow-500 text-sm">
                      ⭐ {p.rating?.rate} / 5
                    </p>

                    <p className="text-lg font-bold mb-3">
                      ₹ {Math.round(p.price * 80)}
                    </p>

                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
          </div>

          {/* DESKTOP CART SIDEBAR */}
          {cart.length > 0 && (
            <div className="hidden lg:block w-72 sticky top-24 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
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
      </div>

      {/* MOBILE FLOATING CART ICON */}
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/cart")}
          className="lg:hidden fixed bottom-20 right-4 z-50
                     bg-green-600 text-white w-14 h-14 rounded-full
                     flex items-center justify-center shadow-xl"
        >
          🛒
          <span
            className="absolute -top-1 -right-1 bg-red-600 text-white
                       text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {totalItems}
          </span>
        </button>
      )}
    </>
  );
}
