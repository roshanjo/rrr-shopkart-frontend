import { requireAuth } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

export default function Cart() {
  requireAuth();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const token = localStorage.getItem("token");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const payWithStripe = async () => {
    const res = await fetch(`${API}/api/create-checkout-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cart,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // ✅ Stripe redirect (SAFE)
    } else {
      alert("Stripe session failed");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((item, i) => (
              <li
                key={i}
                className="border p-3 rounded flex justify-between"
              >
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-4 font-bold text-lg">
            Total: ₹{total}
          </h2>

          <button
            onClick={payWithStripe}
            className="mt-6 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Pay with Stripe
          </button>
        </>
      )}
    </div>
  );
}
