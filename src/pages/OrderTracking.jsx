export default function OrderTracking() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <p><b>Order ID:</b> {o.id}</p>
              <p><b>Status:</b> {o.status || "Processing"}</p>
              <p><b>Total:</b> ₹ {o.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
