import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Payment Cancelled ❌
      </h1>

      <p className="mb-6">Your payment was cancelled. No money was charged.</p>

      <Link
        to="/cart"
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Back to Cart
      </Link>
    </div>
  );
}
