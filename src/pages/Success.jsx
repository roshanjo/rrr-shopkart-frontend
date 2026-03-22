import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Calendar, ShoppingBag, ArrowRight, MapPin, Package } from "lucide-react";

export default function Success() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [total, setTotal] = useState(0);


  /* =====================================================
     LOAD ORDER DATA (RUNS ONCE)
  ===================================================== */
  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) ||
      JSON.parse(localStorage.getItem("cart_items")) ||
      [];

    setCart(storedCart);
    setAddress(JSON.parse(localStorage.getItem("address_data")));
    setTotal(localStorage.getItem("cart_total") || 0);

  }, []);


  /* =====================================================
     CENTRALIZED SAFE CLEANUP
  ===================================================== */
  const clearOrderData = () => {

    localStorage.removeItem("cart");
    localStorage.removeItem("cart_items");
    localStorage.removeItem("cart_total");
    localStorage.removeItem("address_data");

  };


  /* =====================================================
     UI
  ===================================================== */
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-50 dark:bg-slate-950 overflow-y-auto px-4 py-12 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full space-y-6">

        {/* ================= SUCCESS ICON ================= */}
        <div className="mb-2 animate-scale flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-emerald-100 dark:border-emerald-800">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Payment Successful
          </h1>
          <p className="text-sm text-slate-500 mt-1">Thank you for shopping with us!</p>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 text-left shadow-soft">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Order Details
          </h2>
          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="font-medium text-emerald-500">Paid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Amount</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date</span>
              <span>{new Date().toLocaleDateString(undefined, { dateStyle: "medium" })}</span>
            </div>
          </div>
        </div>

        {/* ================= DELIVERY ADDRESS ================= */}
        {address && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 text-left shadow-soft">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Delivery Address
            </h2>
            <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-semibold text-slate-900 dark:text-slate-100">{address.fullName}</p>
              <p className="text-slate-400">{address.phone}</p>
              <p className="leading-relaxed">
                {address.street}, {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
          </div>
        )}

        {/* ================= ITEMS PURCHASED ================= */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 text-left shadow-soft">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1">
            <Package className="w-4 h-4" /> Items Purchased
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto custom-scrollbar">
            {cart.length === 0 ? (
              <p className="text-slate-400 text-sm py-2">No items found</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2.5 gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 line-clamp-1">
                      {item.title || item.name}
                    </p>
                    <p className="text-xs text-slate-400">Qty: {item.qty || 1}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    ₹{Math.round(item.price * 80) * (item.qty || 1)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <button
            onClick={() => {
              clearOrderData();
              navigate("/my-orders");
            }}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-violet-500/10 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Package className="w-4 h-4" /> View My Orders
          </button>

          <button
            onClick={() => {
              clearOrderData();
              navigate("/products");
            }}
            className="border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-semibold transition-all hover:bg-slate-100 dark:hover:bg-slate-800/50 flex items-center justify-center gap-2 text-sm"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>


      {/* ================= FOOTER ================= */}
      <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        Designed by Roshan © 2026
      </div>


      {/* ================= ANIMATION ================= */}
      <style>{`
        .animate-scale {
          animation: scaleIn 0.6s ease-out forwards;
        }

        @keyframes scaleIn {
          0%   { transform: scale(0);   opacity: 0; }
          80%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>

    </div>
  );
}