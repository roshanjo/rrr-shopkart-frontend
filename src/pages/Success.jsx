import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Success() {
  // Clear cart once payment is successful
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 text-center px-4">
      
      {/* SUCCESS ICON */}
      <div className="mb-6 animate-scale">
        <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-md">
        Thank you for shopping with <strong>Ai-Kart</strong>!
      </p>

      <Link
        to="/products"
        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
      >
        Continue Shopping
      </Link>

      {/* Animation */}
      <style>{`
        .animate-scale {
          animation: scaleIn 0.6s ease-out forwards;
        }
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
