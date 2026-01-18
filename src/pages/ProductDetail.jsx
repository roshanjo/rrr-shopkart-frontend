import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => String(p.id) === String(id));

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg font-semibold mb-4">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ================= CART ================= */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  /* ================= WISHLIST ================= */
  const toggleWishlist = () => {
    let updated;
    if (wishlist.includes(product.id)) {
      updated = wishlist.filter(i => i !== product.id);
      toast("Removed from wishlist");
    } else {
      updated = [...wishlist, product.id];
      toast.success("Added to wishlist ❤️");
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isWishlisted = wishlist.includes(product.id);

  /* ================= RELATED ================= */
  const related = products.filter(
    p => p.id !== product.id && p.category === product.category
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 pb-28">
      {/* ================= BREADCRUMB ================= */}
      <div className="max-w-5xl mx-auto mb-4 text-sm text-gray-500">
        <span
          onClick={() => navigate("/products")}
          className="cursor-pointer hover:underline"
        >
          Products
        </span>{" "}
        / <span className="text-gray-800 dark:text-gray-200">{product.name}</span>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

          <p className="text-xl font-semibold text-green-600 mb-3">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            High quality product with best price. Carefully selected for the
            best shopping experience.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={addToCart}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Go to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className={`px-6 py-2 rounded border ${
                isWishlisted
                  ? "bg-pink-600 text-white"
                  : "border-gray-400"
              }`}
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <h2 className="text-lg font-bold mb-4">Related Products</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {related.slice(0, 3).map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-lg"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-32 w-full object-contain mb-2"
                />
                <p className="text-sm font-semibold line-clamp-2">
                  {p.name}
                </p>
                <p className="text-green-600 font-bold">
                  ₹ {p.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MOBILE STICKY BAR ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 flex justify-between items-center z-50">
        <p className="font-bold text-lg">₹ {product.price}</p>
        <button
          onClick={addToCart}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
