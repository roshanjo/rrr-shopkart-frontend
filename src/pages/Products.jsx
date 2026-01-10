import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const search = query.get("q") || "";

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(
    localStorage.getItem("category") || "all"
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

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

  useEffect(() => {
    if (search && products.length && filtered.length === 0) {
      setTimeout(() => {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          search + " product"
        )}`;
      }, 1000);
    }
  }, [search, filtered, products]);

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

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="p-6 space-y-6">

      {search && (
        <p className="text-sm text-gray-600">
          Showing results for <b>"{search}"</b>
        </p>
      )}

      <div className="flex gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded shadow">
              <img src={p.image} className="h-44 mx-auto mb-4" />
              <h3 className="text-sm font-semibold">{p.title}</h3>
              <p className="font-bold">₹ {Math.round(p.price * 80)}</p>
              <button
                onClick={() => addToCart(p)}
                className="mt-2 w-full bg-green-600 text-white py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="w-72 bg-gray-100 p-4 rounded h-fit">
            <p>🛒 Items: <b>{totalItems}</b></p>
            <button
              onClick={() => navigate("/cart")}
              className="mt-3 w-full bg-purple-600 text-white py-2 rounded"
            >
              Go to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
