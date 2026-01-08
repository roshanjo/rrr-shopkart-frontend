import { Link, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";
import logo from "../assets/ai-kart-logo.png"; // your LOGO_2 renamed

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-lg transition-all">
      {/* Logo only */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Ai-Kart Logo"
          className="h-9 w-auto hover:scale-105 transition-transform"
        />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4 text-sm">
        {isLoggedIn() ? (
          <>
            <span className="hidden sm:block text-gray-300">
              Hi, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400">
              Login
            </Link>
            <Link to="/signup" className="hover:text-green-400">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
