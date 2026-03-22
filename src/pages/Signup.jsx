import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

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
      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-premium w-80 space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">
        Create Account
      </h2>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* ================= USERNAME ================= */}
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
          />
        </div>

        {/* ================= EMAIL ================= */}
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
          />
        </div>

        {/* ================= PASSWORD ================= */}
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
          />
        </div>
      </div>

      {/* ================= SUBMIT BUTTON ================= */}
      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md shadow-violet-500/10 transition-all mt-2"
      >
        Sign Up
      </button>

    </form>
  );
}