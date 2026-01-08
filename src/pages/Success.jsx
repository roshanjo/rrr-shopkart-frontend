import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Success() {
  // Clear cart once payment is successful
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 text-center px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Thank you for shopping with <strong>Ai-Kart</strong>!
      </p>

      <Link
        to="/products"
        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
