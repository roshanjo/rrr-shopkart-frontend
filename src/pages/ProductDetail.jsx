import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  const source = new URLSearchParams(location.search).get("source");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const url =
          source === "fake"
            ? `https://fakestoreapi.com/products/${id}`
            : `https://dummyjson.com/products/${id}`;

        const res = await fetch(url);
        const data = await res.json();

        // DummyJSON error protection
        if (data?.message) {
          setError("Product not found");
          return;
        }

        setProduct({ ...data, source });
      } catch {
        setError("Failed to load product");
      }
    }

    load();
  }, [id, source]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const image = product.image || product.thumbnail;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-8">
      <img src={image} className="w-full object-contain" />

      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-white">
          {product.title || product.name}
        </h1>

        <p className="text-yellow-400 text-xl">
          ₹{Math.round(product.price * 80)}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-yellow-400 text-black px-6 py-3 rounded w-full"
        >
          Add to Cart
        </button>

        <button className="bg-orange-500 text-white px-6 py-3 rounded w-full">
          Buy Now
        </button>
      </div>
    </div>
  );
}
