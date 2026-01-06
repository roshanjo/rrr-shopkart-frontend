export default function Cart({ cart }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, i) => (
        <div key={i} className="border-b py-2">
          {item.name} — ₹{item.price}
        </div>
      ))}

      <h2 className="mt-4 font-bold">Total: ₹{total}</h2>
    </div>
  );
}
