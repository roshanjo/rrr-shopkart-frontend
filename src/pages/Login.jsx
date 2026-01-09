import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name }));

      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900">
      <form className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Sign In
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          className="w-full p-2 mb-3 border rounded text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 border rounded text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
