import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default function Products() {
  const navigate = useNavigate();
  const [products] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 25000 },
    { id: 3, name: "Headphones", price: 3000 },
  ]);

  useEffect(() => {
    const token = getToken();

    // 🔐 PROTECT PAGE
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold">RRR ShopKart</h1>
        <button
          onClick={handleLogout}
          className="text-red-600 font-medium"
        >
          Logout
        </button>
      </div>

      {/* Products */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow"
          >
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600">₹ {product.price}</p>

            <button
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={() => alert("Cart coming soon 🛒")}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
