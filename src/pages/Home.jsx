import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
        Welcome to <span className="text-green-500">Ai-Kart</span> 🛒
      </h1>

      <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-md">
        Smart shopping made simple. Experience a modern, AI-powered
        e-commerce platform.
      </p>

      <Link
        to="/login"
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
      >
        Sign In
      </Link>
    </div>
  );
}
