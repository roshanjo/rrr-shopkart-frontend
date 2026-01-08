import { useNavigate } from "react-router-dom";

export default function CartSidebar({ cart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow sticky top-24">
      <h2 className="font-bold text-lg mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">No items added</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {cart.map((item, i) => (
              <li
                key={i}
                className="flex justify-between text-sm"
              >
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="font-bold mb-4">
            Total: ₹{total}
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Proceed to Cart
          </button>
        </>
      )}
    </div>
  );
}
