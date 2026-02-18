import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function OrderDetails() {

  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const token = localStorage.getItem("token");


  // ================= Fetch Order Details =================
  useEffect(() => {

    fetch(`${API}/api/orders/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });

  }, [id]);


  // ================= Loading State =================
  if (!order) {
    return <p>Loading...</p>;
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">

      {/* ================= Heading ================= */}
      <h1 className="text-3xl font-bold mb-4">
        Order #{order.id}
      </h1>


      {/* ================= Order Info ================= */}
      <p>
        Total: ₹{order.total}
      </p>

      <p>
        Stripe Session: {order.stripe_session_id}
      </p>


      {/* ================= Invoice Download ================= */}
      <a
        href={`${API}/api/orders/${order.id}/invoice/`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded"
      >
        Download Invoice (PDF)
      </a>

    </div>
  );
}