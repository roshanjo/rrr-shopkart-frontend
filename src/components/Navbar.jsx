import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("token");

  // ❌ Pages where Cart button should be hidden
  const hideCart =
    location.pathname === "/cart" ||
    location.pathname === "/success";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      {/* LOGO / HOME */}
      <Link to="/products" className="text-xl font-bold">
        RRR Shopkart
      </Link>

      <div className="flex items-center gap-4">
        {/* USER NAME */}
        {user && <span>Hello, {user.name}</span>}

        {/* CART BUTTON (CONDITIONALLY HIDDEN) */}
        {!hideCart && (
          <Link
            to="/cart"
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
          >
            Cart
          </Link>
        )}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
