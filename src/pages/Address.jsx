import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const [address, setAddress] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await axios.post("/api/address", {
      ...address,
      userId: JSON.parse(localStorage.getItem("user"))._id
    });
    navigate("/checkout", { state: { addressId: res.data._id } });
  };

  return (
    <div>
      <h2>Step 1: Delivery Address</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="street" placeholder="Street" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="state" placeholder="State" onChange={handleChange} />
      <input name="pincode" placeholder="Pincode" onChange={handleChange} />
      <button onClick={handleSubmit}>Continue to Payment</button>
    </div>
  );
}
