import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id"); // ✅ ADD THIS

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const proceedToCheckout = async () => {
    if (!userId) {
      alert("Please login again");
      return;
    }

    try {
      const res = await fetch(`${API}/api/create-checkout-session/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total,
          user_id: userId, // ✅ THIS FIXES EVERYTHING
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Stripe checkout failed");
      }
    } catch {
      alert("Payment error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6 w-full">
        {cart.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty</p>
            <button onClick={() => navigate("/products")}>
              Back to products
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Total: ₹{total}</h2>

            <button
              onClick={proceedToCheckout}
              className="bg-purple-600 text-white px-6 py-2 rounded"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
