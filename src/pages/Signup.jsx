import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Sign Up
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input className="w-full p-2 mt-3 border rounded text-black"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input className="w-full p-2 mt-3 border rounded text-black"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input type="password" className="w-full p-2 mt-3 border rounded text-black"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="w-full mt-4 bg-green-600 text-white py-2 rounded">
        Create Account
      </button>
    </form>
  );
}
