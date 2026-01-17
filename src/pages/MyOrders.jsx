import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* ✅ BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 rounded
                     bg-gray-700 text-white
                     hover:bg-gray-600
                     dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <p>
                  <b>Order ID:</b> {order.id}
                </p>
                <p>
                  <b>Total:</b> ₹{order.total}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
