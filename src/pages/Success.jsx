import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Success() {
  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for shopping with Shopify.
          Your order has been placed successfully.
        </p>

        <Link
          to="/products"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
