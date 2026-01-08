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
    <nav className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md transition-all duration-300">
      {/* Logo only */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Shopify"
          className="h-8 w-auto hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4 text-sm sm:text-base">
        {isLoggedIn() ? (
          <>
            <Link to="/products" className="hover:text-green-400 transition">
              Products
            </Link>
            <Link to="/cart" className="hover:text-green-400 transition">
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
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
