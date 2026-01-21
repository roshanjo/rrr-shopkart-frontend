import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Address() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ✅ Load saved address (safe)
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await axios.get(
          `${API}/api/address/${user._id || user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data) {
          setAddress(res.data);
        }
      } catch (err) {
        console.log("No saved address found");
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${API}/api/address`,
        {
          ...address,
          userId: user._id || user.id, // ✅ FIXED HERE
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("address_id", res.data._id);

      navigate("/checkout", { state: { addressId: res.data._id } });
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Step 1: Delivery Address
        </h2>

        <div className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={address.phone}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="street"
            placeholder="Street / House No"
            value={address.street}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => navigate("/cart")}
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700
              text-white font-semibold px-6 py-2 rounded-lg"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
