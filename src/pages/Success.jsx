import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load order data
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setAddress(JSON.parse(localStorage.getItem("address_data")));
    setTotal(localStorage.getItem("cart_total"));

    // Clear cart after success
    localStorage.removeItem("cart");
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999]
                 bg-green-50 dark:bg-gray-900
                 overflow-y-auto
                 px-4 py-10 text-center"
    >
      <div className="max-w-3xl mx-auto space-y-6">

        {/* SUCCESS ICON */}
        <div className="mb-4 animate-scale">
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

        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        {/* ORDER SUMMARY */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 text-left">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <p><strong>Status:</strong> Paid</p>
          <p><strong>Total:</strong> ₹{total}</p>
          <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
        </div>

        {/* ADDRESS */}
        {address && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 text-left">
            <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
            <p>{address.fullName}</p>
            <p>{address.phone}</p>
            <p>
              {address.street}, {address.city}, {address.state} -{" "}
              {address.pincode}
            </p>
          </div>
        )}

        {/* ITEMS */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 text-left">
          <h2 className="text-xl font-semibold mb-3">Items Purchased</h2>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2 last:border-b-0"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.qty || 1}
                </p>
              </div>
              <p>₹{item.price * (item.qty || 1)}</p>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS (NEW, SAFE) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/products")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        Designed by Roshan © 2026
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
