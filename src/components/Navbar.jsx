import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-green-400">
        RRR ShopKart
      </Link>

      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-green-400">Home</Link>

        {!isLoggedIn() ? (
          <>
            <Link to="/login" className="hover:text-green-400">Login</Link>
            <Link to="/signup" className="hover:text-green-400">Signup</Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
