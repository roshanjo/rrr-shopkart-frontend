import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      setAuth(data.token);
      navigate("/products");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border p-2 w-full" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2 w-full">Login</button>
    </form>
  );
}
