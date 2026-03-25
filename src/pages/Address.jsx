import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, CreditCard, Ship, MapPin, Check } from "lucide-react";
import { motion } from "framer-motion";



// ==================================================
// API BASE URL
// ==================================================

const API = import.meta.env.VITE_API_URL;


// ==================================================
// ADDRESS PAGE
// ==================================================

export default function Address() {

  // ------------------------------------------------
  // Hooks
  // ------------------------------------------------

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  // ------------------------------------------------
  // State
  // ------------------------------------------------

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);


  // ==================================================
  // FETCH SAVED ADDRESS (IF EXISTS)
  // ==================================================

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAddress = async () => {

      try {

        const res = await axios.get(
          `${API}/api/address/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data && res.data.street) {

          setAddress({
            fullName: res.data.full_name || "",
            phone: res.data.phone || "",
            street: res.data.street || "",
            city: res.data.city || "",
            state: res.data.state || "",
            pincode: res.data.pincode || "",
          });
        }

      } catch {

        console.log("No saved address found");

      }
    };

    fetchAddress();

  }, [token, navigate]);


  // ==================================================
  // HANDLE INPUT CHANGE
  // ==================================================

  const handleChange = (e) => {

    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };


  // ==================================================
  // HANDLE SUBMIT
  // ==================================================

  const handleSubmit = async () => {

    if (loading) return;

    // Basic Validation
    if (
      !address.fullName.trim() ||
      !address.phone.trim() ||
      !address.street.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.pincode.trim()
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    try {

      setLoading(true);

      // Prepare Payload for Backend
      const payload = {
        full_name: address.fullName,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      };

      // Save Address
      await axios.post(
        `${API}/api/address/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Save locally for later use
      localStorage.setItem(
        "address_data",
        JSON.stringify(address)
      );

      // 1. Check for Buy Now item
      const buyNowItem = JSON.parse(localStorage.getItem("buy_now"));
      
      // 2. Get Cart from LocalStorage
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      
      // 3. Ensure ONE source of truth
      let rawItems = [];
      if (buyNowItem) {
          rawItems = [buyNowItem];
      } else {
          rawItems = cart;
      }
      
      const items = rawItems.map(item => ({ id: item.id, qty: item.qty || 1 }));

      if (items.length === 0) {
          toast.error("Cart is empty");
          setLoading(false);
          return;
      }

      // Create Stripe Checkout Session
      const stripeRes = await axios.post(
        `${API}/api/create-checkout-session/`,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      // Redirect to Stripe
      if (stripeRes.data?.url) {
        window.location.href = stripeRes.data.url;
      } else {
        throw new Error("Stripe URL not received");
      }

    } catch (err) {

      console.error(
        "Stripe / Address error:",
        err.response?.data || err.message
      );

      toast.error(
        err.response?.data?.error ||
        "Failed to continue. Please try again."
      );

      setLoading(false);
    }
  };


  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-4 py-12 space-y-6">

      {/* ================= STEP PROGRESS ================= */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-semibold shadow-sm shadow-emerald-500/20"><Check className="w-3.5 h-3.5" /></span>
            <span>Cart</span>
          </div>
          <div className="h-px w-12 bg-emerald-500" />
          <div className="flex items-center gap-2 text-violet-600">
            <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm shadow-violet-500/20">2</span>
            <span>Delivery</span>
          </div>
          <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">3</span>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-premium p-8">


        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-violet-50 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Delivery Address
          </h2>
          <p className="text-sm text-slate-400 mt-1">Where should we deliver your order?</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {[
            ["fullName", "Full Name", "text"],
            ["phone", "Phone Number", "tel"],
            ["street", "Street / House No", "text"],
            ["city", "City", "text"],
            ["state", "State", "text"],
            ["pincode", "Pincode", "text"],
          ].map(([name, placeholder, type]) => (
            <div key={name} className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">{placeholder}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={address[name]}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <button 
            onClick={() => {
              localStorage.removeItem("buy_now");
              navigate("/cart");
            }}
            className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>

          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-md shadow-violet-500/10 transition-all disabled:opacity-70"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : <CreditCard className="w-4 h-4" />}
            {loading ? "Processing..." : "Continue"}
          </motion.button>

        </div>

      </div>
    </div>
  );
}