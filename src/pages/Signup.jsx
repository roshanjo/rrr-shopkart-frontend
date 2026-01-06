import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/api/signup/`, form);
    alert("Signup successful");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

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

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
