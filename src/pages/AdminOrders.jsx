import { useEffect, useState } from "react";
import { requireAuth } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

export default function AdminOrders() {
  requireAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/admin-orders/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-3 rounded mb-3"
        >
          <p><b>User:</b> {order.user}</p>
          <p><b>Total:</b> ₹{order.total}</p>
        </div>
      ))}
    </div>
  );
}
