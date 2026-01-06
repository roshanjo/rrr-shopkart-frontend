import { Link, useNavigate } from "react-router-dom";
import { logout, isLoggedIn } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <Link to="/products" className="text-xl font-bold">
        RRR ShopKart
      </Link>

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
