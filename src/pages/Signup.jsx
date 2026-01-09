import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Signup({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API}/api/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <input
        placeholder="Username"
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="w-full bg-green-600 text-white py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
