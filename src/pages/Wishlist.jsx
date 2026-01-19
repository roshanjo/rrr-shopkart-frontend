import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH FAKESTORE PRODUCTS */
  useEffect(() => {
    if (wishlist.length === 0) {
      setLoading(false);
      return;
    }

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p =>
          wishlist.includes(p.id) || wishlist.includes(String(p.id))
        );
        setItems(filtered);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load wishlist");
        setLoading(false);
      });
  }, [wishlist]);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(i => String(i) !== String(id));
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast("Removed from wishlist");
  };

  /* EMPTY STATE */
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">No items in wishlist ❤️</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">❤️ My Wishlist</h1>
          <button
            onClick={() => navigate("/products")}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            ← Back to Products
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading wishlist...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map(p => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg"
              >
                <img
                  src={p.image}
                  className="h-32 w-full object-contain mb-2"
                  alt={p.title}
                />

                <p className="text-sm font-semibold line-clamp-2 mb-1">
                  {p.title}
                </p>

                <p className="text-green-600 font-bold mb-3">
                  ₹ {Math.round(p.price * 80)}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/product/${p.id}`, { state: p })
                    }
                    className="flex-1 bg-green-600 text-white py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
