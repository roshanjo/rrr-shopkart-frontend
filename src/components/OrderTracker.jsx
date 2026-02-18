// ==================================================
// ORDER TRACKER COMPONENT
// ==================================================

export default function OrderTracker({ status }) {

  // ------------------------------------------------
  // Order Steps
  // ------------------------------------------------

  const steps = [
    "Placed",
    "Packed",
    "Shipped",
    "Delivered",
  ];

  // Find current step index
  const current = steps.indexOf(status);


  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="flex gap-4 mt-4">

      {steps.map((step, index) => (

        <div
          key={step}
          className={`
            px-3 py-1 rounded-full text-sm
            ${
              index <= current
                ? "bg-green-600 text-white"
                : "bg-gray-300"
            }
          `}
        >
          {step}
        </div>

      ))}

    </div>
  );
}