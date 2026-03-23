import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, ArrowLeft, Package, CreditCard } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const token = localStorage.getItem("token");

  // ================= Fetch Order Details =================
  useEffect(() => {
    fetch(`${API}/api/orders/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => console.error(err));
  }, [id, token]);

  // ================= Handle Invoice Download =================
  const handleDownloadInvoice = async () => {
    try {
      const res = await fetch(`${API}/api/orders/${id}/invoice/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${id}.pdf`;
      document.body.appendChild(a); // Recommended for firefox
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download invoice");
    }
  };

  // ================= Loading State =================
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-xl mx-auto space-y-6">

        {/* ================= Back Button ================= */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* ================= Heading ================= */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Package className="w-6 h-6 text-violet-600" /> Order Details
        </h1>

        {/* ================= Order Info ================= */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-soft space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-sm text-slate-400">Order ID</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">#{order.id}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-sm text-slate-400">Total Amount</span>
            <span className="font-bold text-lg text-slate-900 dark:text-slate-100">₹{order.total}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 flex items-center gap-1"><CreditCard className="w-4 h-4" /> Payment Status</span>
            <span className="text-emerald-500 font-medium">Paid</span>
          </div>
        </div>

        {/* ================= Invoice Download ================= */}
        <button
          onClick={handleDownloadInvoice}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 shadow-md shadow-violet-500/10 transition-all text-sm"
        >
          <FileText className="w-4 h-4" /> Download Invoice (PDF)
        </button>

      </div>
    </div>
  );
}