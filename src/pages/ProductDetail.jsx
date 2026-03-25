import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import WishlistButton from "../components/WishlistButton";
import { ArrowLeft, ShoppingBag, CreditCard, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";


export default function ProductDetail() {

  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const source = params.get("source");
  const [product, setProduct] = useState(null);


  // ================= Fetch Product =================
  useEffect(() => {

    if (source !== "dummy") {
      navigate("/products");
      return;
    }

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });

  }, [id, source, navigate]);


  // ================= Back Button Logic =================
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/products");
    }
  };


  // ================= Buy Now =================
  const handleBuyNow = () => {
    localStorage.setItem("buy_now", JSON.stringify(product));
    navigate("/address"); // Continue checkout
  };


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading product details...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= Back Button ================= */}
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* ================= IMAGE + DETAILS ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main Image Container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 flex items-center justify-center shadow-soft aspect-[4/3] relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {product.images.map((img) => (
                <div 
                  key={img} 
                  className="w-24 h-24 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 flex items-center justify-center shrink-0 cursor-pointer hover:border-violet-600 transition-all shadow-sm"
                >
                  <img
                    src={img}
                    alt=""
                    className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              ))}
            </div>

            {/* Product Meta Section */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {product.title}
                  </h1>
                  <p className="text-sm text-slate-500 capitalize">{product.category}</p>
                </div>
                <div className="shrink-0 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <WishlistButton product={product} />
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  About this item
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

          </div>

          {/* ================= BUY BOX ================= */}
          <div className="sticky top-24 space-y-4">
            <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-premium">
              <div className="mb-6">
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  ₹ {Math.round(product.price * 80)}
                </p>
                <p className="text-xs mt-1 text-slate-400">Inclusive of all taxes</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={() => addToCart(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-slate-200 dark:border-slate-800 hover:border-violet-600 dark:hover:border-violet-500 bg-transparent hover:bg-violet-50 dark:hover:bg-violet-900/10 text-slate-800 dark:text-slate-200 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm group"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:animate-bounce-short" /> Add to Cart
                </motion.button>

                <motion.button
                  onClick={handleBuyNow}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10"
                >
                  <CreditCard className="w-5 h-5" /> Buy Now
                </motion.button>
              </div>


              <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

              {/* Offers / Perks */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Trust & Safety</h4>
                <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Authentic Product
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> 7-Day Return Policy
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-violet-600" /> Free Shipping Available
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

}