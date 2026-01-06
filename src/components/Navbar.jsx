import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="text-xl font-bold text-indigo-600">ShopKart</h1>

      <div className="space-x-4">
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Signup</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="text-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
