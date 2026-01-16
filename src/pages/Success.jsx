import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("cart");

    const timer = setTimeout(() => {
      navigate("/products");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 z-[9999]
                 bg-green-50 dark:bg-gray-900
                 flex items-center justify-center
                 px-4 text-center"
    >
      <div>
        {/* SUCCESS ICON */}
        <div className="mb-6 animate-scale">
          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto">
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

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto">
          Thank you for shopping with <strong>Ai-Kart</strong>!  
          <br />
          Redirecting you to products…
        </p>
      </div>

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
