import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, open, setOpen } = useCart();

  // 👇 IMPORTANT: don't render if closed
  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white text-black shadow-xl z-50 p-4">
      <button
        className="text-xl mb-3"
        onClick={() => setOpen(false)}
      >
        ✖
      </button>

      <h2 className="text-lg font-bold mb-3">Your Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, i) => (
        <div key={i} className="border-b py-2">
          <p className="font-medium">{item.title}</p>
          <p>₹ {item.price}</p>
        </div>
      ))}

      <button className="w-full mt-4 bg-yellow-400 py-2 rounded">
        Go to Cart
      </button>

      <button className="w-full mt-2 bg-orange-500 py-2 rounded text-white">
        Buy Now
      </button>
    </div>
  );
}
