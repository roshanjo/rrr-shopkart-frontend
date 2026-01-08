import { Link, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";
import { toggleTheme } from "../utils/theme";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 dark:bg-black text-white px-6 py-4 flex justify-between items-center transition-colors">
      {/* Logo only */}
      <Link to="/products" className="flex items-center">
        <img
          src="/ai-kart-logo.png"
          alt="Ai-Kart Logo"
          className="h-9 w-auto"
        />
      </Link>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="border px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          🌙 / ☀️
        </button>

        {isLoggedIn() ? (
          <>
            <Link to="/cart">Cart</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
