import { requireAuth } from "../utils/auth";

export default function Cart() {
  requireAuth();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="border p-2 rounded">
                {item.name} — ₹{item.price}
              </li>
            ))}
          </ul>

          <h2 className="mt-4 font-bold">Total: ₹{total}</h2>
        </>
      )}
    </div>
  );
}
