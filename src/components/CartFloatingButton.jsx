import { useNavigate } from "react-router-dom";
import useCartCount from "../hooks/useCartCount";

export default function CartFloatingButton() {
  const navigate = useNavigate();
  const totalItems = useCartCount();

  if (!totalItems) return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="lg:hidden fixed bottom-6 right-6 z-50
                 bg-purple-600 text-white
                 px-5 py-3 rounded-full shadow-lg
                 flex items-center gap-2 active:scale-95"
    >
      🛒 <span className="font-semibold">{totalItems}</span>
    </button>
  );
}
