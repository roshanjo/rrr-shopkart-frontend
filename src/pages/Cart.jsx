import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setAddress(JSON.parse(localStorage.getItem("address_data")));
  }, []);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
      updateCart(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // ✅ CHECKOUT FLOW (UNCHANGED)
  const proceedToCheckout = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    localStorage.setItem("cart_total", total);
    navigate("/address");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT — YOUR CART */}
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
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price}</p>

                    <div className="flex items-center gap-3 mt-2">
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

                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 font-semibold mt-2"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="font-semibold self-start sm:self-center">
                    ₹{item.price * (item.qty || 1)}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ADDRESS (OPTIONAL) */}
          {address && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <h2 className="font-semibold mb-2">Delivery Address</h2>
              <p>{address.fullName}</p>
              <p>{address.phone}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {address.street}, {address.city}, {address.state} -{" "}
                {address.pincode}
              </p>
            </div>
          )}

          {/* ACTION BUTTONS */}
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

        {/* RIGHT — ORDER SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total (INR)</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={proceedToCheckout}
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
