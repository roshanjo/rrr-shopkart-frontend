import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [form, setForm] = useState({ name: "", price: "" });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/api/products/`, form);
    alert("Product added");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form onSubmit={submit}>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Product name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Price"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
