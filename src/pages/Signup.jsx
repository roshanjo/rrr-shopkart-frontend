import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Signup({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${API}/api/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // ✅ SHOW SUCCESS CLEARLY
      setSuccess(true);

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80"
    >
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Sign Up
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-2">
          {error}
        </p>
      )}

      {success && (
        <div className="text-green-600 text-sm text-center mb-3">
          Account created successfully 🎉  
          <br />
          <button
            type="button"
            onClick={onSuccess}
            className="underline font-semibold mt-1"
          >
            Click here to Sign In
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-3 border rounded text-black"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Create Account
      </button>
    </form>
  );
}
