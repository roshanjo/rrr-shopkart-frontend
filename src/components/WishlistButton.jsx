import { useState, useEffect } from "react";

export default function WishlistButton({ product }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(list.some(p => p.id === product.id));
  }, [product]);

  const toggleWishlist = () => {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (liked) {
      list = list.filter(p => p.id !== product.id);
    } else {
      list.push(product);
    }
    localStorage.setItem("wishlist", JSON.stringify(list));
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`text-xl ${liked ? "text-red-500" : "text-gray-400"}`}
    >
      ♥
    </button>
  );
}
