import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FloatingCartButton() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2"
    >
      🛒 <span className="font-semibold">{totalItems}</span>
    </button>
  );
}
