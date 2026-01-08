import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-500">
          Welcome to Shopify
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your one-stop shop for everything
        </p>
        <Link
          to="/login"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded text-lg hover:bg-green-700"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
