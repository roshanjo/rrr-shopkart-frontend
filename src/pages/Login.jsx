import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/api/login/`, form);
    localStorage.setItem("token", res.data.access);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={e => setForm({...form, username: e.target.value})}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
