import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const token = localStorage.getItem("token");

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
      updateCart(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // ✅ REAL STRIPE CHECKOUT
  const proceedToCheckout = async () => {
    try {
      const res = await fetch(
        `${API}/api/create-checkout-session/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cart }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe checkout failed");
      }
    } catch (err) {
      alert("Payment error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => decreaseQty(index)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                  >
                    −
                  </button>

                  <span>{item.qty || 1}</span>

                  <button
                    onClick={() => increaseQty(index)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ₹{total}</h2>

            <button
              onClick={proceedToCheckout}
              className="mt-4 sm:mt-0 bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
