import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WishlistButton from "../components/WishlistButton";
import ProductSkeleton from "../components/ProductSkeleton";
import { getProducts } from "../services/api";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { ShoppingBag, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { motion } from "framer-motion";


const PAGE_SIZE = 12;

export default function Products() {

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { addToCart } = useCart();

  const page = Number(params.get("page") || 1);
  const category = params.get("cat") || "all";
  const search = (params.get("search") || "").trim().toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);


  /* =====================================================
     FETCH PRODUCTS (PAGINATED SERVER-SIDE)
  ===================================================== */
  useEffect(() => {

    async function load() {
      setLoading(true);
      try {
        const data = await getProducts({
          search,
          category,
          limit: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE
        });

        setProducts(data.products || []);
        setTotalPages(Math.max(1, Math.ceil((data.total || 0) / PAGE_SIZE)));
      } catch (error) {
        console.error("Load products error:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();

  }, [search, category, page]);


  /* =====================================================
     PARAM HELPERS
  ===================================================== */
  const updateParams = (next) => {
    const obj = Object.fromEntries(params.entries());
    setParams({ ...obj, ...next });
  };

  const changeCategory = (c) => {
    updateParams({ cat: c, page: 1 });
  };

  const changePage = (p) => {
    updateParams({ page: p });
  };


  /* =====================================================
     CATEGORY LIST
  ===================================================== */
  const categories = [
    "all",
    "beauty",
    "fragrances",
    "skin-care",
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
    "groceries",
    "home-decoration",
    "furniture",
    "kitchen-accessories",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "tops",
    "sunglasses",
    "sports-accessories",
    "vehicle",
    "motorcycle",
  ];


  /* =====================================================
     UI
  ===================================================== */
  return (
    <div className="min-h-screen bg-transparent">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= MOBILE CATEGORY ================= */}
        <div className="lg:hidden sticky top-16 z-30 bg-white dark:bg-slate-950 py-4 -mx-4 px-4 border-b border-slate-100 dark:border-slate-800/50 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => changeCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  category === c
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-500/20"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">

          {/* ================= DESKTOP CATEGORY ================= */}
          <aside className="hidden lg:block w-30 shrink-0">
            <div className="sticky top-24 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-soft">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 px-2">
                <Grid className="w-4 h-4 text-violet-600" /> Categories
              </h3>
              <div className="space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-2 custom-scrollbar">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => changeCategory(c)}
                    className={`block w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                      category === c
                        ? "bg-violet-600 text-white font-medium shadow-sm shadow-violet-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </aside>


          {/* ================= PRODUCTS GRID ================= */}
          <main className="flex-1">

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft">
                <p className="text-slate-400">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}?source=dummy`)}
                    whileHover={{ y: -4 }}
                    className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 cursor-pointer shadow-soft hover:shadow-premium group flex flex-col justify-between h-full transition-all duration-300"
                  >
                    {/* Wishlist Button */}
                    <div
                      className="absolute top-3 right-3 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <WishlistButton product={product} />
                    </div>

                    {/* Image Container */}
                    <div className="aspect-square bg-slate-50 dark:bg-slate-800/30 rounded-xl flex items-center justify-center p-3 mb-4 group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50 transition-colors">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply dark:mix-blend-normal"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 capitalize">{product.category}</p>
                      </div>

                      <div>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          ₹ {Math.round(product.price * 80)}
                        </p>

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                            toast.success("Added to cart!");
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-4 w-full border border-slate-200 dark:border-slate-800 hover:border-violet-600 dark:hover:border-violet-500 bg-transparent hover:bg-violet-50 dark:hover:bg-violet-900/10 text-slate-800 dark:text-slate-200 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
                        >
                          <ShoppingBag className="w-4 h-4" /> Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}


              </div>
            )}


            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                 ).map((p) => (
                  <button
                    key={p}
                    onClick={() => changePage(p)}
                    className={`h-10 w-10 rounded-xl border text-sm font-medium flex items-center justify-center transition-all ${
                      page === p 
                        ? "bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-500/20" 
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {p}
                  </button>
                 ))}

              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}