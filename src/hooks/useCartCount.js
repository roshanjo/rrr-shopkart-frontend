import { useEffect, useState } from "react";

export default function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
      setCount(total);
    };

    update();
    window.addEventListener("storage", update);
    window.addEventListener("cart:update", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cart:update", update);
    };
  }, []);

  return count;
}
