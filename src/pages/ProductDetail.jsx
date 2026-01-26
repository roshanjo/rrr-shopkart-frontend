import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* DESKTOP BUY BOX */}
      <div className="hidden lg:block sticky top-24 bg-gray-900 p-6 rounded space-y-4">
        <p className="text-2xl font-bold text-green-400">
          ₹ {Math.round(product.price * 83)}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            addToCart(product);
            navigate("/checkout");
          }}
          className="w-full bg-orange-500 text-white py-3 rounded font-semibold"
        >
          Buy Now
        </button>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-40">
        <div className="flex gap-2 p-3">
          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-400 text-black py-3 rounded w-full"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              addToCart(product);
              navigate("/checkout");
            }}
            className="bg-orange-500 text-white py-3 rounded w-full"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
