import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();

  const handlePayment = async () => {
    const res = await axios.post("/api/stripe/checkout", {
      userId: JSON.parse(localStorage.getItem("user"))._id,
      addressId: location.state.addressId,
      products: JSON.parse(localStorage.getItem("cart"))
    });
    window.location.href = res.data.url;
  };

  return (
    <div>
      <h2>Step 2: Payment</h2>
      <button onClick={handlePayment}>Pay with Stripe</button>
    </div>
  );
}
