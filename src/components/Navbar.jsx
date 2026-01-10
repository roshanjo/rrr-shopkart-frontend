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
  const [search, setSearch] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user")) || { name: "User" };
  const [username, setUsername] = useState(storedUser.name);
  const [password, setPassword] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || avatars[0]
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  /* Apply dark/light theme */
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSaveSettings = () => {
    localStorage.setItem("user", JSON.stringify({ name: username }));
    if (password) localStorage.setItem("password", password);
    alert("Settings saved");
    setSettingsOpen(false);
    setMenuOpen(false);
  };

  /* ✅ REAL SEARCH (NO REFRESH NEEDED) */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/products?q=${encodeURIComponent(search)}`);
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="flex items-center p-4 bg-gray-900 text-white">

      {/* LOGO */}
      <Link to="/products" className="shrink-0">
        <img src="/logo.png" alt="Logo" className="h-12" />
      </Link>

      {/* SEARCH BAR (PRODUCTS ONLY) */}
      {location.pathname === "/products" && (
        <form onSubmit={handleSearch} className="flex-1 mx-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full px-5 py-2 rounded-full text-black focus:outline-none"
          />
        </form>
      )}

      {/* PROFILE */}
      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setSettingsOpen(false);
          }}
          className="flex items-center gap-2"
        >
          <img src={avatar} className="h-8 w-8 rounded-full" />
          <span>{username}</span>
        </button>

        <div
          className={`absolute right-0 top-12 w-64 bg-white text-black rounded shadow p-3 transition ${
            menuOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {!settingsOpen ? (
            <>
              <button
                onClick={() => setSettingsOpen(true)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="font-bold mb-2">Settings</p>

              <div className="flex gap-2 mb-3">
                {avatars.map((a) => (
                  <img
                    key={a}
                    src={a}
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

              <input
                className="w-full p-2 border rounded mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                className="w-full p-2 border rounded mb-2"
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
                className="w-full bg-gray-200 py-1 rounded mb-2"
              >
                Switch Theme
              </button>

              <button
                onClick={handleSaveSettings}
                className="w-full bg-green-600 text-white py-1 rounded"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
