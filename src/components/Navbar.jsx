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
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [username, setUsername] = useState(storedUser.username || "User");
  const [avatar, setAvatar] = useState(storedUser.avatar || avatars[0]);
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  const isLoggedIn = !!token;
  const showSearch = location.pathname === "/products";

  /* 🔁 SYNC USER FROM BACKEND */
  useEffect(() => {
    if (!token) return;

    fetch("https://rrr-shopkart-backend.onrender.com/api/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok && res.json())
      .then((data) => {
        if (!data) return;
        setUsername(data.username);
        setAvatar(data.avatar);
        localStorage.setItem(
          "user",
          JSON.stringify({ username: data.username, avatar: data.avatar })
        );
      })
      .catch(() => {});
  }, [token]);

  /* CLOSE DROPDOWN */
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

  /* 💾 SAVE PROFILE */
  const handleSaveSettings = async () => {
    try {
      const body = { username, avatar };
      if (password.trim()) body.password = password;

      const res = await fetch(
        "https://rrr-shopkart-backend.onrender.com/api/profile/",
        {
          method: "PATCH", // ✅ backend-compatible
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error();

      localStorage.setItem(
        "user",
        JSON.stringify({ username, avatar })
      );

      setSuccessMsg("Profile updated successfully");
      setPassword("");

      setTimeout(() => setSuccessMsg(""), 2000);
      setEditProfileOpen(false);
      setSettingsOpen(false);
      setMenuOpen(false);
    } catch {
      console.error("Profile update failed");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    localStorage.setItem("search", search);
    navigate("/products");
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {successMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded z-[9999] text-sm">
          {successMsg}
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-[9998] bg-gray-900 text-white">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <Link to="/products">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </Link>

          <div className="flex-1 mx-6 hidden sm:block">
            {showSearch && (
              <form onSubmit={handleSearch}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full px-6 py-2 rounded-full
                             bg-white text-black
                             dark:bg-gray-800 dark:text-white"
                />
              </form>
            )}
          </div>

          {/* PROFILE */}
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
              <span className="hidden sm:inline">Hi, {username}</span>
            </button>

            <div
              className={`absolute right-0 top-12 w-screen sm:w-64
                bg-white dark:bg-gray-800
                text-black dark:text-white
                shadow-lg p-4 transition
                ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              {!settingsOpen ? (
                <>
                  <Link to="/my-orders" className="block py-2">My Orders</Link>
                  <Link to="/wishlist" className="block py-2">My Wishlist</Link>
                  <button onClick={() => setSettingsOpen(true)} className="block w-full py-2 text-left">
                    Settings
                  </button>
                  <button onClick={handleLogout} className="block w-full py-2 text-left text-red-600">
                    Logout
                  </button>
                </>
              ) : !editProfileOpen ? (
                <>
                  <p className="font-semibold mb-2">Settings</p>
                  <button onClick={() => setEditProfileOpen(true)} className="block w-full py-2 text-left">
                    Edit Profile
                  </button>
                  <button onClick={toggleTheme} className="block w-full py-2 text-left">
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                  </button>
                  <button onClick={handleSaveSettings} className="w-full bg-green-600 text-white py-2 rounded mt-2">
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <p className="font-semibold mb-2">Edit Profile</p>

                  <div className="flex gap-3 mb-3">
                    {avatars.map((a) => (
                      <img
                        key={a}
                        src={a}
                        className={`h-10 w-10 rounded-full cursor-pointer ${
                          avatar === a ? "ring-2 ring-green-500" : ""
                        }`}
                        onClick={() => setAvatar(a)}
                      />
                    ))}
                  </div>

                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 rounded mb-2 bg-white dark:bg-gray-700"
                    placeholder="Change username"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded bg-white dark:bg-gray-700"
                    placeholder="New password (optional)"
                  />
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
