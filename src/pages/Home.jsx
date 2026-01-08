import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome to Shopify 🛍️
        </h1>

        <p className="mb-8 text-gray-600 dark:text-gray-300">
          Simple. Secure. Smart shopping.
        </p>

        {isLoggedIn() ? (
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
          >
            Go to Products
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
