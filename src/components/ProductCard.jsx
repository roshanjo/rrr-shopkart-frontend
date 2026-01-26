import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, onAdd, onOpen }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const liked = wishlist.some(p => p.id === product.id);

  return (
    <div className="bg-slate-900 rounded-lg p-3 flex flex-col relative">
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2"
      >
        <Heart
          className={liked ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>

      <img
        src={product.image}
        className="h-40 object-contain cursor-pointer"
        onClick={onOpen}
      />

      <h3 className="mt-2 text-sm font-semibold text-white line-clamp-2">
        {product.title}
      </h3>

      <p className="text-yellow-400 font-bold mt-1">
        ₹{Math.round(product.price)}
      </p>

      <button
        onClick={onAdd}
        className="mt-auto bg-yellow-400 text-black py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
