import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const index = prev.findIndex(p => p.id === product.id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index].qty = (updated[index].qty || 1) + 1;
        return updated;
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,     // 🔥 THIS WAS MISSING
        addToCart,
        open,
        setOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
