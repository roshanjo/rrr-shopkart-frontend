import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  // ✅ Use environment variable
  const API = import.meta.env.VITE_API_URL;
  console.log(API);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  // ================= Handle Login =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);

      /* ✅ PRESERVE EXISTING USER DATA (AVATAR) */
      const existingUser =
        JSON.parse(localStorage.getItem("user")) || {};

      const updatedUser = {
        ...existingUser, // keeps avatar
        id: data.id,
        username: data.username,
        email: data.email,
        is_admin: data.is_admin, // Added is_admin
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Signed in successfully!");
      
      if (data.is_admin) {
        navigate("/admin-panel");
      } else {
        navigate("/products");
      }

    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleLogin}
      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-premium w-80 space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">
        Sign In
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md shadow-violet-500/10 transition-all disabled:opacity-70 mt-2"
      >
        {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}