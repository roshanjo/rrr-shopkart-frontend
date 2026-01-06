import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { requireAuth } from "../utils/auth";

const PRODUCTS = [
  { id: 1, name: "iPhone 15", price: 79999 },
  { id: 2, name: "MacBook Air", price: 119999 },
  { id: 3, name: "AirPods Pro", price: 24999 },
];

export default function Products() {
  requireAuth();

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
