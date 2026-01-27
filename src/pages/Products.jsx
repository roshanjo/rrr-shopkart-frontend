import { products } from "../data/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [category, setCategory] = useState("ALL");
  const navigate = useNavigate();

  const filtered =
    category === "ALL"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="flex min-h-screen">
      {/* FILTER */}
      <aside className="w-60 p-4">
        {["ALL", "SKINCARE"].map((c) => (
          <button
            key={c}
            className="block mb-2"
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </aside>

      {/* PRODUCTS */}
      <main className="grid grid-cols-4 gap-4 p-4 flex-1">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="border p-3 cursor-pointer"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.images[0]} />
            <h3>{p.title}</h3>
            <p>₹ {p.price}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
