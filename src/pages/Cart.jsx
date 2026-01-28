import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    setCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
      setCart(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const emptyCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Math.round(item.price * 80) * (item.qty || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Cart ({cart.length} item{cart.length !== 1 && "s"})
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-6">Your cart is empty</p>
              <button
                onClick={() => navigate("/products")}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                ← Back to Products
              </button>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-4
                             flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-24 w-24 object-contain rounded bg-white"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-500">
                      ₹ {Math.round(item.price * 80)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(index)}
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                      >
                        −
                      </button>

                      <span>{item.qty || 1}</span>

                      <button
                        onClick={() => increaseQty(index)}
                        className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between gap-3 min-w-[120px]">
                    <p className="font-semibold">
                      ₹ {Math.round(item.price * 80) * (item.qty || 1)}
                    </p>

                    <button
                      onClick={() => removeItem(index)}
                      className="border border-red-500 text-red-500
                                 px-4 py-1 rounded text-sm
                                 hover:bg-red-500 hover:text-white transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {cart.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={emptyCart}
                className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
              >
                Empty Cart
              </button>

              <button
                onClick={() => navigate("/products")}
                className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
              >
                ← Back
              </button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        {cart.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total (INR)</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/address")}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700
                         text-white py-2 rounded-lg"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
