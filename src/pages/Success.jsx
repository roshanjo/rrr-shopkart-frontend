import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Success() {
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="mb-6">Thank you for shopping with Shopify.</p>

      <Link
        to="/products"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
