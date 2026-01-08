import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";
import { toggleTheme } from "../utils/theme";
import logo from "../assets/shopify-logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = isLoggedIn();

  const hideAuthLinks =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 dark:bg-black text-white px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Shopify" className="h-8" />
      </Link>

      <div className="flex items-center gap-4">
        {/* Theme toggle always visible */}
        <button
          onClick={toggleTheme}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          🌓
        </button>

        {/* LOGGED OUT */}
        {!loggedIn && !hideAuthLinks && (
          <Link
            to="/login"
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
          >
            Sign In
          </Link>
        )}

        {/* LOGGED IN */}
        {loggedIn && (
          <>
            <span className="hidden sm:inline text-sm text-gray-300">
              Hi, {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
