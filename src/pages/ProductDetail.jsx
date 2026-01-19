import { useParams, useNavigate, useLocation } from "react-router-dom";
import { products } from "../data/products";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIRST: try FakeStore product
  const product =
    location.state ||
    products.find(p => String(p.id) === String(id));

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const name = product.title || product.name;
  const price = product.price > 100 ? product.price : product.price * 80;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      name,
      price: Math.round(price),
      image: product.image,
      qty: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  const toggleWishlist = () => {
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter(i => i !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 grid md:grid-cols-2 gap-8">
        <img src={product.image} className="h-72 object-contain mx-auto" />

        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-xl text-green-600 font-bold mt-2">
            ₹ {Math.round(price)}
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {product.description ||
              "High quality product with best price."}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={addToCart}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className="border px-6 py-2 rounded"
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
