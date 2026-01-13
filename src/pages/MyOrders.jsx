import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/api/my-orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <p><b>Order ID:</b> {order.id}</p>
                <p><b>Total:</b> ₹{order.total}</p>
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
