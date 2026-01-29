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
    setCart(cart.filter((_, i) => i !== index));
  };

  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem("cart_total");
    localStorage.removeItem("cart");
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Math.round(item.price * 80) * (item.qty || 1),
    0
  );

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cart_total", total || 1);
    navigate("/address");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">
            Your Cart ({cart.length})
          </h1>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded">
                <h3>{item.title}</h3>
                <p>₹ {Math.round(item.price * 80)}</p>
                <button onClick={() => decreaseQty(index)}>-</button>
                <span>{item.qty || 1}</span>
                <button onClick={() => increaseQty(index)}>+</button>
                <button onClick={() => removeItem(index)}>Remove</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white p-5 rounded">
            <p>Total: ₹{total}</p>
            <button
              onClick={handleCheckout}
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
