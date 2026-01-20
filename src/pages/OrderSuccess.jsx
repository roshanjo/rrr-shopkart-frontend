import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/orders/${params.get("session_id")}`)
      .then(res => setOrder(res.data));
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Placed Successfully 🎉</h2>
      <h3>Delivery Address</h3>
      <p>{order.address.fullName}</p>
      <p>{order.address.street}</p>

      <h3>Products</h3>
      {order.products.map(p => (
        <p key={p.id}>{p.name}</p>
      ))}

      <button onClick={() => window.location.href = "/"}>
        Back to Products
      </button>
    </div>
  );
}
