import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";


export default function Cart() {

  const navigate = useNavigate();
  const { cart, setCart } = useCart();


  // ================= Increase Quantity =================
  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    setCart(updated);
  };


  // ================= Decrease Quantity =================
  const decreaseQty = (index) => {
    const updated = [...cart];

    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
      setCart(updated);
    }
  };


  // ================= Remove Single Item =================
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };


  // ================= Empty Cart =================
  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem("cart_total");
    localStorage.removeItem("cart");
  };


  // ================= Calculate Total =================
  const total = cart.reduce(
    (sum, item) =>
      sum + Math.round(item.price * 80) * (item.qty || 1),
    0
  );


  // ================= Checkout =================
  const handleCheckout = () => {

    // ❌ Minimum ₹50 restriction removed

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cart_total", total || 1);

    navigate("/address");
  };


  return (
    <div className="min-h-screen bg-transparent px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= STEP PROGRESS ================= */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 text-violet-600">
              <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm shadow-violet-500/20">1</span>
              <span>Review Cart</span>
            </div>
            <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">2</span>
              <span>Delivery</span>
            </div>
            <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">3</span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* ================= LEFT SECTION ================= */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Shopping Cart <span className="text-sm font-normal text-slate-400">({cart.length} item{cart.length !== 1 && "s"})</span>
          </h1>

          {/* -------- If Cart is Empty -------- */}
          {cart.length === 0 ? (
            <EmptyState 
              title="Your cart feels lonely" 
              actionText="← Back to Shop" 
              onAction={() => navigate("/products")} 
            />
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-soft hover:shadow-premium transition-all duration-300 items-center"
                >

                  {/* Image Container */}
                  <div className="w-24 h-24 rounded-xl bg-slate-50 dark:bg-slate-800/30 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800/50 shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 dark:text-slate-500 capitalize">{item.category}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                        <button
                          onClick={() => decreaseQty(index)}
                          className="px-3 py-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-400 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                          {item.qty || 1}
                        </span>
                        <button
                          onClick={() => increaseQty(index)}
                          className="px-3 py-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-400 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex sm:flex-col items-end justify-between gap-2 min-w-[120px] self-stretch">
                    <p className="font-bold text-lg text-slate-800 dark:text-slate-100">
                      ₹ {Math.round(item.price * 80) * (item.qty || 1)}
                    </p>

                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}


              {/* Bottom Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </button>
                <button
                  onClick={emptyCart}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT SECTION (ORDER SUMMARY) ================= */}
        {cart.length > 0 && (
          <div className="sticky top-24 h-fit">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-premium">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="text-emerald-500 font-medium">Free</span>
                </div>
                
                <div className="h-px bg-slate-100 dark:bg-slate-800/80 my-2" />
                
                <div className="flex justify-between items-center font-bold text-lg">
                  <span className="text-slate-800 dark:text-slate-100">Total</span>
                  <span className="text-violet-600 dark:text-violet-400">₹{total}</span>
                </div>
              </div>

              <motion.button
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 shadow-md shadow-violet-500/10 transition-all font-medium"
              >
                Checkout <ShoppingBag className="w-4 h-4" />
              </motion.button>

            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}