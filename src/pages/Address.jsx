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

  // ✅ Load saved address if exists (does NOT break old code)
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${API}/api/address/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setAddress(res.data);
        }
      } catch (err) {
        console.log("No saved address found");
      }
    };

    if (user) fetchAddress();
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
          userId: user.id, // 🔒 keep same user logic
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // save addressId for checkout
      localStorage.setItem("address_id", res.data._id);

      // go to stripe payment page
      navigate("/checkout", { state: { addressId: res.data._id } });
    } catch (err) {
      alert("Failed to save address");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Step 1: Delivery Address</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        value={address.fullName}
        onChange={handleChange}
      />
      <br />

      <input
        name="phone"
        placeholder="Phone"
        value={address.phone}
        onChange={handleChange}
      />
      <br />

      <input
        name="street"
        placeholder="Street"
        value={address.street}
        onChange={handleChange}
      />
      <br />

      <input
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
      />
      <br />

      <input
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
      />
      <br />

      <input
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleChange}
      />
      <br />

      <button onClick={handleSubmit}>
        Continue to Payment
      </button>
    </div>
  );
}
