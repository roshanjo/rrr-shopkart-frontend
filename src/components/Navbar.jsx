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
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo + Brand */}
      <Link to="/products" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Shopify Logo"
          className="h-8 w-auto"
        />
        <span className="text-xl font-bold">Shopify</span>
      </Link>

      {/* Right side */}
      <div className="space-x-4">
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
