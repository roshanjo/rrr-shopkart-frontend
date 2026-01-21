import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Address() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ✅ LOAD SAVED ADDRESS (DJANGO WAY)
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${API}/api/address/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setAddress(res.data);
        }
      } catch (err) {
        console.log("No saved address");
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
        `${API}/api/address/`,
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("address_id", res.data.id);
      navigate("/checkout");
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
          {[
            ["fullName", "Full Name"],
            ["phone", "Phone"],
            ["street", "Street / House No"],
            ["city", "City"],
            ["state", "State"],
            ["pincode", "Pincode"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              placeholder={placeholder}
              value={address[name]}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2
                bg-gray-100 dark:bg-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                border border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
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
