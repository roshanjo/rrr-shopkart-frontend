// ==================================================
// IMPORTS
// ==================================================

import { useEffect, useState } from "react";
import toast from "react-hot-toast";


// ==================================================
// WISHLIST BUTTON COMPONENT
// ==================================================

export default function WishlistButton({ product }) {

  // ------------------------------------------------
  // Unique Wishlist ID for Product
  // ------------------------------------------------

  const wishlistId = `dj-${product.id}`;

  // ------------------------------------------------
  // State
  // ------------------------------------------------

  const [liked, setLiked] = useState(false);


  // ==================================================
  // CHECK IF PRODUCT IS IN WISHLIST (ON LOAD)
  // ==================================================

  useEffect(() => {

    const list =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setLiked(list.includes(wishlistId));

  }, [wishlistId]);


  // ==================================================
  // TOGGLE WISHLIST
  // ==================================================

  const toggleWishlist = (e) => {

    // Prevent parent click (like product card navigation)
    e.stopPropagation();

    let list =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    if (list.includes(wishlistId)) {

      // Remove from wishlist
      list = list.filter((id) => id !== wishlistId);
      toast("Removed from wishlist");

    } else {

      // Add to wishlist
      list.push(wishlistId);
      toast("Added to wishlist ❤️");
    }

    localStorage.setItem("wishlist", JSON.stringify(list));

    setLiked(!liked);
  };


  // ==================================================
  // UI
  // ==================================================

  return (
    <button
      onClick={toggleWishlist}
      className={`
        text-lg transition
        ${
          liked
            ? "text-pink-500"
            : "text-gray-400 hover:text-gray-200"
        }
      `}
    >
      ♥
    </button>
  );
}