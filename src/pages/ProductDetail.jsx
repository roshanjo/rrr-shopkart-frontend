import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(r => r.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <div className="text-white p-10">Loading…</div>;

  const price = Math.round(product.price * 80);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">

      {/* LEFT IMAGE */}
      <div className="lg:col-span-2 flex gap-6">
        <img
          src={product.thumbnail}
          className="w-96 object-contain"
        />

        <div className="text-white space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-yellow-400">⭐ {product.rating} / 5</p>
          <p className="text-green-400 text-2xl font-bold">₹ {price}</p>
          <p className="text-gray-300">{product.description}</p>
        </div>
      </div>

      {/* RIGHT BUY BOX (DESKTOP) */}
      <aside className="hidden lg:block sticky top-24 bg-gray-900 p-6 rounded text-white h-fit">
        <p className="text-2xl font-bold mb-4">₹ {price}</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-yellow-400 text-black py-3 rounded mb-3"
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            addToCart(product);
            navigate("/address");
          }}
          className="w-full bg-orange-500 py-3 rounded"
        >
          Buy Now
        </button>
      </aside>

      {/* MOBILE STICKY BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex gap-3 z-50">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-yellow-400 text-black py-3 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addToCart(product);
            navigate("/address");
          }}
          className="flex-1 bg-orange-500 py-3 rounded text-white"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
