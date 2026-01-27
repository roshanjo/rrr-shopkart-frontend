import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    load();
  }, [id]);

  if (!product) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-10 text-white">
      <div>
        <img
          src={product.thumbnail}
          className="w-full max-h-[400px] object-contain bg-white rounded"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-yellow-400 text-lg">⭐ {product.rating}</p>
        <p className="text-green-400 text-2xl font-bold">
          ₹ {Math.round(product.price * 83)}
        </p>
        <p className="text-gray-300">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            addToCart(product);
            window.location.href = "/checkout";
          }}
          className="w-full bg-orange-500 py-3 rounded font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
