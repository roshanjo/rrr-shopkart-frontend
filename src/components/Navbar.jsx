import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";
import { toggleTheme } from "../utils/theme";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Pages where navbar must be hidden
  const hiddenRoutes = ["/", "/login", "/signup"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 dark:bg-black text-white px-6 py-4 flex justify-between items-center transition-colors">
      {/* Logo only */}
      <Link to="/products">
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

        {/* User name */}
        {user?.name && (
          <span className="hidden sm:block text-sm font-medium">
            Hi, {user.name}
          </span>
        )}

        {/* Cart link ONLY outside Products page */}
        {location.pathname !== "/products" && isLoggedIn() && (
          <Link to="/cart">Cart</Link>
        )}

        {/* Logout */}
        {isLoggedIn() && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
