import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setOpen(true);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}
