import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

export default function Wishlist() {
  const navigate = useNavigate();
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const items = products.filter(p => wishlist.includes(p.id));

  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">No items in wishlist ❤️</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-lg"
          >
            <img src={p.image} className="h-32 w-full object-contain mb-2" />
            <p className="text-sm font-semibold line-clamp-2">{p.name}</p>
            <p className="text-green-600 font-bold">₹ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
