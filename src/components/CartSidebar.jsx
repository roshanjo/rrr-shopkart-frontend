// ==================================================
// IMPORTS
// ==================================================

import { useNavigate } from "react-router-dom";


// ==================================================
// CART SIDEBAR COMPONENT
// ==================================================

export default function CartSidebar({ cart }) {

  // ----------------------------------------------
  // React Router navigation
  // ----------------------------------------------

  const navigate = useNavigate();


  // ----------------------------------------------
  // Calculate total price
  // ----------------------------------------------

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );


  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow sticky top-24">

      {/* ------------------------------------------ */}
      {/* Title */}
      {/* ------------------------------------------ */}

      <h2 className="font-bold text-lg mb-4">
        Your Cart
      </h2>


      {/* ------------------------------------------ */}
      {/* If Cart is Empty */}
      {/* ------------------------------------------ */}

      {cart.length === 0 ? (

        <p className="text-sm text-gray-500">
          No items added
        </p>

      ) : (

        <>
          {/* -------------------------------------- */}
          {/* Cart Items List */}
          {/* -------------------------------------- */}

          <ul className="space-y-2 mb-4">

            {cart.map((item, i) => (

              <li
                key={i}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name}
                </span>

                <span>
                  ₹{item.price}
                </span>
              </li>

            ))}

          </ul>


          {/* -------------------------------------- */}
          {/* Total Price */}
          {/* -------------------------------------- */}

          <div className="font-bold mb-4">
            Total: ₹{total}
          </div>


          {/* -------------------------------------- */}
          {/* Proceed Button */}
          {/* -------------------------------------- */}

          <button
            onClick={() => navigate("/cart")}
            className="
              w-full
              bg-green-600 text-white
              py-2 rounded
              hover:bg-green-700
            "
          >
            Proceed to Cart
          </button>

        </>
      )}

    </div>
  );
}