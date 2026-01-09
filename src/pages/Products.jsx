import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // 🔹 Fetch LIVE products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => alert("Failed to load products"));
  }, []);

  // 🔹 Categories from API
  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  // 🔹 Add to cart (compatible with Cart.jsx)
  const addToCart = (p) => {
    const updatedCart = [
      ...cart,
      {
        name: p.title,
        price: Math.round(p.price * 80), // convert USD → INR approx
        image: p.image,
        qty: 1,
      },
    ];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  return (
    <div className="p-6">

      {/* 🔹 CATEGORIES TOP */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full border ${
              category === c
                ? "bg-green-600 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex gap-6">

        {/* 🔹 PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-40 w-full object-contain mb-3"
              />

              <h3 className="font-semibold text-sm mb-1">
                {p.title}
              </h3>

              <p className="font-bold mb-2">
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

        {/* 🔹 RIGHT SIDE CART PREVIEW */}
        {cart.length > 0 && (
          <div className="w-72 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl h-fit">
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
  );
}
