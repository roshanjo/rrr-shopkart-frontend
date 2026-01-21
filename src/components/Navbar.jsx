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

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [username, setUsername] = useState(
    storedUser.username || "User"
  );
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState(
    storedUser.avatar || avatars[0]
  );

  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  const isLoggedIn = !!localStorage.getItem("token");

  /* CLOSE DROPDOWN ON OUTSIDE CLICK */
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSaveSettings = () => {
    const updatedUser = {
      ...storedUser,
      username,
      avatar,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    if (password) {
      localStorage.setItem("password", password);
    }

    setSuccessMsg("Settings updated successfully");
    setTimeout(() => setSuccessMsg(""), 2000);

    setEditProfileOpen(false);
    setSettingsOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    localStorage.setItem("search", search);
    navigate("/products");
  };

  if (!isLoggedIn) return null;

  const showSearch = location.pathname === "/products";

  return (
    <>
      {successMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded z-[10000] text-sm">
          {successMsg}
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">

          <Link to="/products">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </Link>

          <div className="flex-1 mx-6">
            {showSearch && (
              <form onSubmit={handleSearch}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full px-6 py-2 rounded-full bg-white text-black"
                />
              </form>
            )}
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setSettingsOpen(false);
                setEditProfileOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <img src={avatar} className="h-8 w-8 rounded-full" />
              <span>Hi, {username}</span>
            </button>

            <div
              className={`absolute right-0 top-12 w-64 rounded shadow-lg p-3
                bg-white text-black dark:bg-gray-800 dark:text-white
                transition-all ${
                  menuOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              {!settingsOpen ? (
                <>
                  <Link
                    to="/my-orders"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Wishlist
                  </Link>

                  <button
                    onClick={() => setSettingsOpen(true)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : !editProfileOpen ? (
                <>
                  <p className="font-semibold mb-2">Settings</p>

                  <button
                    onClick={() => setEditProfileOpen(true)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="w-full bg-gray-200 dark:bg-gray-700 py-1 rounded mb-2"
                  >
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                  </button>

                  <button
                    onClick={handleSaveSettings}
                    className="w-full bg-green-600 text-white py-1 rounded mb-2"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="w-full text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    ← Back
                  </button>
                </>
              ) : (
                <>
                  <p className="font-semibold mb-2">Edit Profile</p>

                  <div className="flex gap-2 mb-3">
                    {avatars.map((a) => (
                      <img
                        key={a}
                        src={a}
                        className={`h-8 w-8 rounded-full cursor-pointer ${
                          avatar === a ? "ring-2 ring-green-500" : ""
                        }`}
                        onClick={() => setAvatar(a)}
                      />
                    ))}
                  </div>

                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-2 dark:bg-gray-700"
                    placeholder="Change name"
                  />

                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-2 dark:bg-gray-700"
                    placeholder="Change password"
                  />

                  <button
                    onClick={() => setEditProfileOpen(false)}
                    className="w-full text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    ← Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="h-20" />
    </>
  );
}
