import { useState } from "react";
import { products } from "../data/products";

export default function Products() {
  const [category, setCategory] = useState("All");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const filtered =
    category === "All"
      ? products
      : products.filter(p => p.category === category);

  const addToCart = (p) => {
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    alert("Added to cart");
  };

  return (
    <div className="flex">
      {/* FILTER */}
      <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800">
        <h3 className="font-bold mb-2">Categories</h3>
        {["All", "Electronics", "Fashion", "Food"].map(c => (
          <button key={c}
            className="block mb-2"
            onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}

        <p className="mt-4 text-sm">
          🛒 Items in Cart: <b>{cart.length}</b>
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {filtered.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <img src={p.image} className="h-40 w-full object-cover rounded" />
            <h3 className="font-bold mt-2">{p.name}</h3>
            <p>₹ {p.price}</p>
            <button onClick={() => addToCart(p)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
