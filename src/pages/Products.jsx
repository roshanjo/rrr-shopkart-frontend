import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/products/`).then(res => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(p => (
        <div key={p.id} className="border rounded p-4 shadow">
          <h2 className="font-bold text-xl">{p.name}</h2>
          <p className="text-gray-600">₹{p.price}</p>
          <button
            onClick={() => addToCart(p)}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
