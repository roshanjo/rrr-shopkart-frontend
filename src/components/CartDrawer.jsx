import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { cartItems, isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 z-40"
      />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-gray-900 text-white z-50 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between">
          <h2 className="font-bold text-lg">Added to Cart</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.source}-${item.id}`}
              className="flex gap-4 border-b border-gray-700 pb-4"
            >
              <img
                src={item.image}
                className="w-20 h-20 object-contain bg-white rounded"
              />

              <div className="flex-1">
                <p className="text-sm font-semibold line-clamp-2">
                  {item.title}
                </p>
                <p className="text-green-400 font-bold">
                  ₹ {Math.round(item.price * 83)}
                </p>
                <p className="text-xs text-gray-400">
                  Qty: {item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/cart");
            }}
            className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
          >
            Go to Cart
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/checkout");
            }}
            className="w-full bg-orange-500 text-white py-3 rounded font-semibold"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
