import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const source = searchParams.get("source"); // fs | dj
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        let data;

        // ✅ FakeStore
        if (source === "fs") {
          const res = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          data = await res.json();

          setProduct({
            id,
            title: data.title,
            price: data.price,
            description: data.description,
            image: data.image,
            rating: data.rating?.rate || 4,
            category: data.category
          });
        }

        // ✅ DummyJSON
        else if (source === "dj") {
          const res = await fetch(
            `https://dummyjson.com/products/${id}`
          );
          data = await res.json();

          setProduct({
            id,
            title: data.title,
            price: data.price,
            description: data.description,
            image: data.thumbnail,
            rating: data.rating || 4,
            category: data.category
          });
        }

        // ❌ INVALID SOURCE
        else {
          throw new Error("Invalid source");
        }
      } catch (err) {
        toast.error("Product not found");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, source, navigate]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  const priceINR = Math.round(product.price * 80);

  /* ================= CART ================= */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  /* ================= UI ================= */
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-10 text-white">
        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-yellow-400">⭐ {product.rating} / 5</p>

          <p className="text-3xl font-bold text-green-400">
            ₹ {priceINR}
          </p>

          <p className="text-gray-300">{product.description}</p>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex gap-4 mt-6">
            <button
              onClick={addToCart}
              className="bg-yellow-400 text-black px-6 py-3 rounded w-full"
            >
              Add to Cart
            </button>

            <button
              className="bg-orange-500 text-white px-6 py-3 rounded w-full"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE STICKY BAR (SINGLE — NO DUPLICATES) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700">
        <div className="flex gap-2 p-4">
          <button
            onClick={addToCart}
            className="bg-yellow-400 text-black py-3 rounded w-full"
          >
            Add to Cart
          </button>
          <button
            className="bg-orange-500 text-white py-3 rounded w-full"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
