import { Link, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";
import logo from "../assets/shopify-logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 sm:px-6 py-4 flex justify-between items-center shadow-md animate-slideDown">
      {/* Logo only */}
      <Link
        to="/products"
        className="flex items-center hover:opacity-90 transition"
      >
        <img
          src={logo}
          alt="Shopify Logo"
          className="h-9 w-auto"
        />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4 text-sm sm:text-base">
        {isLoggedIn() ? (
          <>
            <Link
              to="/cart"
              className="hover:text-green-400 transition"
            >
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400 transition">
              Login
            </Link>
            <Link to="/signup" className="hover:text-green-400 transition">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
