import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [username, setUsername] = useState(storedUser.username || "User");
  const [password, setPassword] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || avatars[0]
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  /* APPLY THEME */
  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSaveSettings = () => {
    localStorage.setItem("user", JSON.stringify({ ...storedUser, username }));
    if (password) localStorage.setItem("password", password);

    alert("Profile updated successfully");
    setSettingsOpen(false);
    setMenuOpen(false);
  };

  /* SEARCH */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    localStorage.setItem("search", search);
    navigate("/products");
  };

  if (!isLoggedIn) return null;

  const showSearch = location.pathname === "/products";

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white relative">
      {/* LOGO */}
      <Link to="/products" className="shrink-0">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
      </Link>

      {/* SEARCH */}
      <div className="flex-1 mx-6">
        {showSearch && (
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products, brands and more…"
              className="w-full px-6 py-2 rounded-full
                         bg-white text-black
                         dark:bg-gray-800 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </form>
        )}
      </div>

      {/* PROFILE */}
      <div
        className="flex items-center gap-4 relative shrink-0"
        ref={dropdownRef}
      >
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setSettingsOpen(false);
          }}
          className="flex items-center gap-2"
        >
          <img src={avatar} alt="Profile" className="h-8 w-8 rounded-full" />
          <span className="font-medium">Hi, {username}</span>
        </button>

        {/* DROPDOWN */}
        <div
          className={`absolute right-0 top-12 w-64 rounded shadow-lg p-3 z-50
          bg-white text-black
          dark:bg-gray-800 dark:text-white
          transition-all duration-200 ${
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
                className="block w-full text-left px-3 py-2
                           hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Orders
              </Link>

              <button
                onClick={() => setSettingsOpen(true)}
                className="w-full text-left px-3 py-2
                           hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2
                           hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="font-bold mb-2">Edit Profile</p>

              {/* AVATAR */}
              <div className="mb-3">
                <p className="text-sm mb-1">Profile Picture</p>
                <div className="flex gap-2">
                  {avatars.map((a) => (
                    <img
                      key={a}
                      src={a}
                      alt="avatar"
                      className={`h-8 w-8 rounded-full cursor-pointer ${
                        avatar === a ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => {
                        setAvatar(a);
                        localStorage.setItem("avatar", a);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* USERNAME */}
              <input
                className="w-full p-2 border rounded mb-2
                           bg-white text-black
                           dark:bg-gray-700 dark:text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Change username"
              />

              {/* PASSWORD */}
              <input
                type="password"
                className="w-full p-2 border rounded mb-2
                           bg-white text-black
                           dark:bg-gray-700 dark:text-white"
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* THEME */}
              <button
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
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
                className="w-full text-left px-3 py-1
                           hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
