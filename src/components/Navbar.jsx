import { Link, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/shopify-logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between shadow-md transition-colors">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Shopify" className="h-8" />
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="px-2 py-1 rounded border text-sm"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {isLoggedIn() ? (
          <>
            <span className="text-sm font-medium">
              Hi, {user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Sign out
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
