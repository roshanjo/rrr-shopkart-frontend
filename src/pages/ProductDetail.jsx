import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        isNaN(id)
          ? `https://fakestoreapi.com/products/${id}`
          : `https://dummyjson.com/products/${id}`
      );
      const data = await res.json();
      setProduct(data);
    }
    load();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-8">
      <img
        src={product.image || product.thumbnail}
        className="w-full object-contain"
      />

      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-white">{product.title}</h1>
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
