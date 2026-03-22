import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/api";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";
import { Package, Calendar, ArrowLeft, ChevronRight } from "lucide-react";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // ================= Fetch Orders =================
  useEffect(() => {

    setLoading(true);

    getOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error("Load orders error:", err);
        setOrders([]);
        toast.error("Failed to load orders");
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);


  return (
    <div className="min-h-screen bg-transparent px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">

        {/* ================= Back Button ================= */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* ================= Heading ================= */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-2">
          <Package className="w-6 h-6 text-violet-600" /> My Orders
        </h1>

        {/* ================= Orders List ================= */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <EmptyState 
            title="No orders yet" 
            actionText="Browse Products" 
            onAction={() => navigate("/products")} 
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer group"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="space-y-1.5 flex-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span className="text-sm text-slate-400 font-normal">Order ID:</span> #{order.id}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {new Date(order.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })} at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end">
                  <div>
                    <p className="text-xs text-slate-400">Total Amount</p>
                    <p className="font-bold text-lg text-slate-900 dark:text-slate-100">
                      ₹{order.total}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/10 group-hover:text-violet-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}