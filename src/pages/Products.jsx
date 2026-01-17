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
      .then(setProducts)
      .catch(() => alert("Failed to load products"));
  }, []);

  // 🔹 Persist category
  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  // 🔹 Sync search
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

  // 🔹 Filtering
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
    if (search && products.length && filtered.length === 0) {
      const t = setTimeout(() => {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          search + " product"
        )}`;
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [search, filtered, products]);

  // 🔹 Cart
  const addToCart = (p) => {
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
  };

  const totalItems = cart.reduce((s, i) => s + (i.qty || 1), 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900
                    pt-[72px] pb-[64px]">
      {/* 🔒 CATEGORY BAR (fixed BELOW global navbar) */}
      <div className="fixed top-[72px] left-0 right-0 z-40
                      bg-gray-100 dark:bg-gray-900
                      px-6 py-4 border-b">
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
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Showing results for <b>"{search}"</b>
          </p>
        )}
      </div>

      {/* 🔽 PAGE CONTENT */}
      <div className="px-6 pt-[120px]">
        <div className="flex gap-6">
          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition"
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

          {/* CART */}
          {cart.length > 0 && (
            <div className="w-72 sticky top-[200px] h-fit
                            bg-gray-100 dark:bg-gray-800
                            p-4 rounded-xl">
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
    </div>
  );
}
