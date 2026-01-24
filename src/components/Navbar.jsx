import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const avatars = [
  "/avatars/a1.png",
  "/avatars/a2.png",
  "/avatars/a3.png",
  "/avatars/a4.png",
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [username, setUsername] = useState("User");
  const [avatar, setAvatar] = useState(avatars[0]);
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  const showSearch = location.pathname === "/products";

  /* ===============================
     SYNC USER
     =============================== */
  useEffect(() => {
    if (!token) return;

    fetch("https://rrr-shopkart-backend.onrender.com/api/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok && res.json())
      .then((data) => {
        if (!data) return;
        setUsername(data.username || "User");
        setAvatar(data.avatar || avatars[0]);
      })
      .catch(() => {});
  }, [token]);

  /* ===============================
     CLOSE DROPDOWN
     =============================== */
  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSettingsOpen(false);
        setEditProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    localStorage.setItem("search", search);
    navigate("/products");
  };

  if (!token) return null;

  return (
    <>
      {successMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded z-[9999] text-sm">
          {successMsg}
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white">
        <div className="flex items-center gap-3 p-4 max-w-7xl mx-auto">

          {/* LOGO */}
          <Link to="/products" className="shrink-0">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>

          {/* MOBILE SEARCH (INSIDE NAVBAR) */}
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className="flex-1 sm:hidden"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full px-4 py-2 rounded-full
                           bg-white text-black
                           placeholder-gray-400 text-sm"
              />
            </form>
          )}

          {/* DESKTOP SEARCH */}
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex flex-1 mx-6"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full px-6 py-2 rounded-full
                           bg-white text-black
                           placeholder-gray-400"
              />
            </form>
          )}

          {/* PROFILE */}
          <div ref={dropdownRef} className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2"
            >
              <img src={avatar} className="h-8 w-8 rounded-full" />
              <span className="hidden sm:inline text-sm">
                Hi, {username}
              </span>
            </button>

            {/* DROPDOWN */}
            <div
              className={`absolute right-0 top-12 w-screen sm:w-64
              bg-white dark:bg-gray-800 text-black dark:text-white
              shadow-lg p-4 transition
              ${
                menuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <Link to="/my-orders" className="block py-2 text-center sm:text-left">
                My Orders
              </Link>
              <Link to="/wishlist" className="block py-2 text-center sm:text-left">
                My Wishlist
              </Link>
              <button onClick={toggleTheme} className="w-full py-2">
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* SPACER */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
