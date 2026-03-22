import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";


export default function Wishlist() {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  /* =====================================================
     FETCH WISHLIST PRODUCTS
     (FakeStore + DummyJSON)
  ===================================================== */
  useEffect(() => {

    const loadWishlist = async () => {

      if (wishlist.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const results = [];

      for (const wid of wishlist) {

        try {

          /* -------------------------------
             FakeStore Products
          -------------------------------- */
          if (wid.startsWith("fs-")) {

            const id = wid.replace("fs-", "");

            const res = await fetch(
              `https://fakestoreapi.com/products/${id}`
            );

            const p = await res.json();

            results.push({
              id: wid,
              title: p.title,
              price: p.price,
              image: p.image,
              category: p.category,
            });
          }

          /* -------------------------------
             DummyJSON Products
          -------------------------------- */
          if (wid.startsWith("dj-")) {

            const id = wid.replace("dj-", "");

            const res = await fetch(
              `https://dummyjson.com/products/${id}`
            );

            const p = await res.json();

            results.push({
              id: wid,
              title: p.title,
              price: p.price,
              image: p.thumbnail,
              category: p.category,
            });
          }

        } catch {
          console.error("Wishlist item failed:", wid);
        }
      }

      setItems(results);
      setLoading(false);
    };

    loadWishlist();

  }, [wishlist]);


  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */
  const removeFromWishlist = (id) => {

    const updated = wishlist.filter((i) => i !== id);

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    toast("Removed from wishlist");
  };


  /* =====================================================
     EMPTY STATE
  ===================================================== */
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-transparent px-4">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-2">
          <Heart className="w-8 h-8 text-slate-300 dark:text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your wishlist is empty</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center max-w-xs leading-relaxed">
          Save items that you love to your wishlist to review or buy them later.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md shadow-violet-500/10 transition-all flex items-center gap-2 text-sm"
        >
          <ShoppingBag className="w-4 h-4" /> Start Shopping
        </button>
      </div>
    );
  }


  /* =====================================================
     MAIN UI
  ===================================================== */
  return (
    <div className="min-h-screen bg-transparent px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> My Wishlist
          </h1>

          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </button>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col shadow-soft hover:shadow-premium transition-all duration-300 group"
              >
                {/* Image Container */}

                <div className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-800/30 flex items-center justify-center p-4 border border-slate-100 dark:border-slate-800/50 mb-4 cursor-pointer relative"
                     onClick={() => navigate(`/product/${p.id}`)}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(p.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-sm hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mb-1 group-hover:text-violet-600 transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-400 capitalize mb-2">{p.category}</p>
                  </div>

                  <div className="mt-4">
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      ₹ {Math.round(p.price * 80)}
                    </p>

                    <motion.button
                      onClick={() => navigate(`/product/${p.id}`)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-3 border border-slate-200 dark:border-slate-800 hover:border-violet-600 dark:hover:border-violet-500 bg-transparent hover:bg-violet-50 dark:hover:bg-violet-900/10 text-slate-800 dark:text-slate-200 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      View Product
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}