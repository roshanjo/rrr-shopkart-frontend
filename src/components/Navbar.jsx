import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">RRR ShopKart</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-green-400">Home</Link>

        {!isLoggedIn() ? (
          <>
            <Link to="/login" className="hover:text-green-400">Login</Link>
            <Link to="/signup" className="hover:text-green-400">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
