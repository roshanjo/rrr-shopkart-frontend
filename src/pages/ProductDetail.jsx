import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const source = params.get("source"); // fake | dummy
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        let data;

        if (source === "fake") {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          data = await res.json();

          setProduct({
            id,
            title: data.title,
            price: Math.round(data.price * 80),
            description: data.description,
            image: data.image,
            rating: data.rating?.rate || 4,
          });
        }

        if (source === "dummy") {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          data = await res.json();

          setProduct({
            id,
            title: data.title,
            price: Math.round(data.price * 80),
            description: data.description,
            image: data.thumbnail,
            rating: data.rating || 4,
          });
        }
      } catch {
        navigate("/products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, source, navigate]);

  if (loading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-white">Product not found</div>;
  }

  /* ================= CART ================= */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-yellow-400"
      >
        ← Back
      </button>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-h-[420px] object-contain bg-black rounded"
        />

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-yellow-400">⭐ {product.rating} / 5</p>

          <p className="text-3xl font-bold text-green-400">
            ₹ {product.price}
          </p>

          <p className="text-gray-300">{product.description}</p>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex gap-4 mt-6">
            <button
              onClick={addToCart}
              className="bg-yellow-400 text-black px-6 py-3 rounded w-full"
            >
              Add to Cart
            </button>

            <button
              onClick={() => alert("Buy Now")}
              className="bg-orange-500 text-white px-6 py-3 rounded w-full"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR (ONLY MOBILE) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center gap-3 p-4">
          <span className="text-lg font-bold text-green-400">
            ₹ {product.price}
          </span>

          <button
            onClick={addToCart}
            className="flex-1 bg-yellow-400 text-black py-3 rounded"
          >
            Add to Cart
          </button>

          <button
            onClick={() => alert("Buy Now")}
            className="flex-1 bg-orange-500 text-white py-3 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
