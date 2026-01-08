import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-gray-900 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Payment Cancelled ❌
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Your payment was not completed. You can try again.
      </p>

      <Link
        to="/cart"
        className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Back to Cart
      </Link>
    </div>
  );
}
