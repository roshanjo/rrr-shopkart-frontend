import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../utils/products";

export default function Products() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const grouped = products.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* PRODUCTS SECTION */}
      <div className="flex-1">
        {Object.keys(grouped).map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {grouped[category].map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded"
                  />

                  <h3 className="mt-3 font-semibold">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-auto bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CART PREVIEW */}
      <div className="w-full lg:w-80 bg-gray-100 dark:bg-gray-900 rounded-xl p-4 h-fit sticky top-24">
        <h3 className="text-xl font-bold mb-3">Your Cart</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500">No items added</p>
        ) : (
          <>
            <ul className="space-y-2 max-h-64 overflow-auto">
              {cart.map((item, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/cart")}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Proceed to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
