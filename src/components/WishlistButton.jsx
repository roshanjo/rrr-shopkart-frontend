import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WishlistButton({ product }) {
  const wishlistId = `dj-${product.id}`;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(list.includes(wishlistId));
  }, [wishlistId]);

  const toggleWishlist = e => {
    e.stopPropagation();

    let list = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (list.includes(wishlistId)) {
      list = list.filter(id => id !== wishlistId);
      toast("Removed from wishlist");
    } else {
      list.push(wishlistId);
      toast("Added to wishlist ❤️");
    }

    localStorage.setItem("wishlist", JSON.stringify(list));
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`text-lg transition
        ${
          liked
            ? "text-pink-500"
            : "text-gray-400 hover:text-gray-200"
        }`}
    >
      ♥
    </button>
  );
}
