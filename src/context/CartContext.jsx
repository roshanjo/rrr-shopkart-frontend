import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find(
        (p) => p.id === product.id && p.source === product.source
      );

      if (found) {
        return prev.map((p) =>
          p.id === product.id && p.source === product.source
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setIsOpen(true); // 🔥 AMAZON BEHAVIOR
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
