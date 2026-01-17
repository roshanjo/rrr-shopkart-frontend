import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(
    localStorage.getItem("category") || "all"
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [search, setSearch] = useState("");

  // 🔹 Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => alert("Failed to load products"));
  }, []);

  // 🔹 Persist category
  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  // 🔹 Sync search on navigation
  useEffect(() => {
    const storedSearch = localStorage.getItem("search") || "";
    setSearch(storedSearch);
  }, [location.key]);

  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  // 🔹 Apply filters
  let filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🔹 AI fallback
  useEffect(() => {
    if (search && products.length > 0 && filtered.length === 0) {
      const timer = setTimeout(() => {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          search + " product"
        )}`;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [search, filtered, products]);

  // 🔹 Add to cart
  const addToCart = (p) => {
    const updatedCart = [
      ...cart,
      {
        name: p.title,
        price: Math.round(p.price * 80),
        image: p.image,
        qty: 1,
      },
    ];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* 🔒 FIXED / STICKY TOP */}
      <div className="sticky top-0 z-40 bg-gray-100 dark:bg-gray-900 p-6 space-y-4">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((c) => (
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
            </button>
          ))}
        </div>

        {search && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing results for <b>"{search}"</b>
          </p>
        )}
      </div>

      {/* 🔽 ONLY THIS AREA SCROLLS */}
      <div className="flex-1 overflow-y-auto p-6 pb-16">
        <div className="flex gap-6">
          {/* 🔹 PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow
                           hover:shadow-xl hover:-translate-y-1 transition"
              >
                <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">
                  {p.category}
                </span>

                <img
                  src={p.image}
                  alt={p.title}
                  className="h-44 w-full object-contain my-4"
                />

                <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                  {p.title}
                </h3>

                <p className="text-yellow-500 text-sm mb-1">
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

          {/* 🔹 STICKY CART */}
          {cart.length > 0 && (
            <div className="w-72 sticky top-32 h-fit bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-bold mb-3">🛒 Cart</h3>

              <p className="text-sm mb-3">
                Items: <b>{totalItems}</b>
              </p>

              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Go to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔒 FIXED FOOTER */}
      <div className="fixed bottom-0 w-full text-center text-sm text-gray-400 bg-gray-100 dark:bg-gray-900 py-2">
        Designed by Roshan © 2026
      </div>
    </div>
  );
}
