import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Shopify 🛍️
      </h1>

      {!isLoggedIn() && (
        <Link
          to="/login"
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
