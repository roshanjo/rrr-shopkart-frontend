// ==================================================
// IMPORTS
// ==================================================

import { createContext, useContext, useState } from "react";


// ==================================================
// CREATE CART CONTEXT
// ==================================================

const CartContext = createContext();


// ==================================================
// CART PROVIDER COMPONENT
// ==================================================

export function CartProvider({ children }) {

  // ------------------------------------------------
  // State
  // ------------------------------------------------

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);


  // ==================================================
  // ADD TO CART FUNCTION
  // ==================================================

  const addToCart = (product) => {

    setCart((prevCart) => {

      const index = prevCart.findIndex(
        (item) => item.id === product.id
      );

      // If product already exists → increase quantity
      if (index !== -1) {

        const updatedCart = [...prevCart];

        updatedCart[index].qty =
          (updatedCart[index].qty || 1) + 1;

        return updatedCart;
      }

      // If product does not exist → add new item
      return [
        ...prevCart,
        { ...product, qty: 1 },
      ];
    });

    // Open cart drawer/modal automatically
    setOpen(true);
  };


  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,   // 🔥 Exposed for manual updates
        addToCart,
        open,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


// ==================================================
// CUSTOM HOOK
// ==================================================

export function useCart() {
  return useContext(CartContext);
}