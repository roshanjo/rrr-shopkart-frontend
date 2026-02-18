import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Signup({ onSuccess }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  /* =====================================================
     HANDLE SUBMIT
  ===================================================== */
  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API}/api/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      onSuccess();

    } catch (err) {
      setError(err.message);
    }
  };


  /* =====================================================
     UI
  ===================================================== */
  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-gray-800
        p-6
        rounded
        shadow
        w-80
      "
    >
      <h2 className="
        text-2xl
        font-bold
        mb-4
        text-center
        text-gray-900
        dark:text-white
      ">
        Create Account
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      {/* ================= USERNAME ================= */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="
          w-full
          mb-3
          p-2
          rounded
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          border border-gray-300 dark:border-gray-600
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
      />

      {/* ================= EMAIL ================= */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="
          w-full
          mb-3
          p-2
          rounded
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          border border-gray-300 dark:border-gray-600
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
      />

      {/* ================= PASSWORD ================= */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="
          w-full
          mb-4
          p-2
          rounded
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          border border-gray-300 dark:border-gray-600
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
      />

      {/* ================= SUBMIT BUTTON ================= */}
      <button
        type="submit"
        className="
          w-full
          bg-green-600
          text-white
          py-2
          rounded
          hover:bg-green-700
          transition
        "
      >
        Sign Up
      </button>

    </form>
  );
}