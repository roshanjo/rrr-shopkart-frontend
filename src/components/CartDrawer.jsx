// ==================================================
// IMPORTS
// ==================================================

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


// ==================================================
// CART DRAWER COMPONENT
// ==================================================

export default function CartDrawer() {

  // ----------------------------------------------
  // Get cart data and drawer state from context
  // ----------------------------------------------

  const { cart, open, setOpen } = useCart();

  // ----------------------------------------------
  // React Router navigation
  // ----------------------------------------------

  const navigate = useNavigate();


  // ----------------------------------------------
  // If drawer is closed → render nothing
  // ----------------------------------------------

  if (!open) return null;


  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* ========================================== */}
      {/* OVERLAY (click to close) */}
      {/* ========================================== */}

      <div
        className="flex-1 bg-black/40"
        onClick={() => setOpen(false)}
      />


      {/* ========================================== */}
      {/* DRAWER PANEL */}
      {/* ========================================== */}

      <div
        className="
          w-96 p-4
          bg-white text-black
          dark:bg-[#111827] dark:text-gray-200
          border-l border-gray-200 dark:border-[#1f2937]
        "
      >
        {/* Title */}
        <h3 className="font-bold text-lg mb-4">
          Shopping Cart
        </h3>


        {/* ========================================== */}
        {/* EMPTY CART */}
        {/* ========================================== */}

        {cart.length === 0 ? (

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your cart is empty
          </p>

        ) : (

          <>
            {/* ====================================== */}
            {/* CART ITEMS */}
            {/* ====================================== */}

            {cart.map((item, i) => (

              <div
                key={i}
                className="
                  flex gap-3 mb-4 p-2 rounded
                  hover:bg-gray-100 dark:hover:bg-[#1e293b]
                "
              >
                {/* Product Image */}
                <img
                  src={item.thumbnail}
                  className="
                    w-16 h-16 object-contain rounded
                    bg-white dark:bg-[#0b1220]
                  "
                />

                {/* Product Details */}
                <div className="flex-1">

                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="font-bold text-yellow-500">
                    ₹ {Math.round(item.price * 80)}
                  </p>

                </div>

              </div>
            ))}


            {/* ====================================== */}
            {/* GO TO CART BUTTON */}
            {/* ====================================== */}

            <button
              onClick={() => {
                setOpen(false);
                localStorage.removeItem("buy_now");
                navigate("/cart");
              }}
              className="
                w-full mt-4 py-3 rounded font-bold
                bg-yellow-400 text-black
                hover:bg-yellow-500
              "
            >
              Go to Cart
            </button>

          </>
        )}

      </div>
    </div>
  );
}