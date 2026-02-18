// ==================================================
// IMPORTS
// ==================================================

import { useEffect, useState } from "react";


// ==================================================
// CUSTOM HOOK: useCartCount
// ==================================================

export default function useCartCount() {

  // ------------------------------------------------
  // State
  // ------------------------------------------------

  const [count, setCount] = useState(0);


  // ==================================================
  // SYNC CART COUNT WITH LOCALSTORAGE
  // ==================================================

  useEffect(() => {

    const update = () => {

      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const total = cart.reduce(
        (sum, item) => sum + (item.qty || 1),
        0
      );

      setCount(total);
    };

    // Initial calculation
    update();

    // Listen for changes
    window.addEventListener("storage", update);
    window.addEventListener("cart:update", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cart:update", update);
    };

  }, []);


  // ==================================================
  // RETURN TOTAL COUNT
  // ==================================================

  return count;
}