import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { cart, open, setOpen } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/40"
        onClick={() => setOpen(false)}
      />

      <div className="w-96 bg-white p-4">
        <h3 className="font-bold text-lg mb-4">Shopping Cart</h3>

        {cart.map((item, i) => (
          <div key={i} className="flex gap-3 mb-3">
            <img src={item.thumbnail} className="w-16 h-16 object-contain" />
            <div>
              <p className="text-sm">{item.title}</p>
              <p className="font-bold">
                ₹ {Math.round(item.price * 80)}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            setOpen(false);
            navigate("/cart");
          }}
          className="w-full bg-yellow-400 py-3 rounded mt-4 font-bold"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
}
