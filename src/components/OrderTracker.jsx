export default function OrderTracker({ status }) {
  const steps = ["Placed", "Packed", "Shipped", "Delivered"];
  const current = steps.indexOf(status);

  return (
    <div className="flex gap-4 mt-4">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`px-3 py-1 rounded-full text-sm ${
            i <= current ? "bg-green-600 text-white" : "bg-gray-300"
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
