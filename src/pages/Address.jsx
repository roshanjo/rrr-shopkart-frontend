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

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (
      !address.fullName.trim() ||
      !address.phone.trim() ||
      !address.street.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.pincode.trim()
    ) {
      alert("Please fill all address fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        full_name: address.fullName,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      };

      await axios.post(`${API}/api/address/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("address_data", JSON.stringify(address));

      const total = Number(localStorage.getItem("cart_total")) || 1;

      const stripeRes = await axios.post(
        `${API}/api/create-checkout-session/`,
        { total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (stripeRes.data?.url) {
        window.location.href = stripeRes.data.url;
      } else {
        throw new Error("Stripe URL not received");
      }
    } catch (err) {
      console.error("Stripe / Address error:", err.response?.data || err.message);
      alert(
        err.response?.data?.error ||
        "Failed to continue. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
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
              className="w-full rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700"
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button onClick={() => navigate("/cart")}>← Back</button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Redirecting..." : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
