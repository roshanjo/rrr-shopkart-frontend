import { useState } from "react";
import { requireAuth } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

export default function Cart() {
  requireAuth();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const token = localStorage.getItem("token");

  // Group items by id and add quantity
  const groupedCart = cart.reduce((acc, item) => {
    const found = acc.find((p) => p.id === item.id);
    if (found) {
      found.qty += 1;
    } else {
      acc.push({ ...item, qty: 1 });
    }
    return acc;
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (item) => {
    updateCart([...cart, item]);
  };

  const decreaseQty = (item) => {
    const index = cart.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      const updated = [...cart];
      updated.splice(index, 1);
      updateCart(updated);
    }
  };

  const removeItem = (item) => {
    const updated = cart.filter((i) => i.id !== item.id);
    updateCart(updated);
  };

  const total = groupedCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const pay = async () => {
    const res = await fetch(`${API}/api/create-checkout-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ total }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Stripe error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {groupedCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {groupedCart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item)}
                    className="ml-3 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-bold">
            Total: ₹{total}
          </div>

          <button
            onClick={pay}
            className="mt-6 w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
          >
            Pay with Stripe
          </button>
        </>
      )}
    </div>
  );
}
