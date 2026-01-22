import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const avatars = ["/avatars/a1.png", "/avatars/a2.png", "/avatars/a3.png", "/avatars/a4.png"];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const token = localStorage.getItem("token");
  if (!token) return null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const showSearch = location.pathname === "/products";

  /* FETCH USER */
  useEffect(() => {
    fetch("https://rrr-shopkart-backend.onrender.com/api/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUsername(data.username);
        setAvatar(data.avatar);
      });
  }, [token]);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSettingsOpen(false);
        setEditOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const saveProfile = async () => {
    const body = { username, avatar };
    if (password.trim()) body.password = password;

    const res = await fetch(
      "https://rrr-shopkart-backend.onrender.com/api/profile/",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) return;

    setSuccess("Profile updated");
    setPassword("");
    setTimeout(() => setSuccess(""), 2000);
    setEditOpen(false);
    setSettingsOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {success && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded z-50">
          {success}
        </div>
      )}

      <nav className="fixed top-0 w-full bg-gray-900 text-white z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

          <Link to="/products">
            <img src="/logo.png" className="h-12" />
          </Link>

          {showSearch && (
            <input
              placeholder="Search products..."
              className="hidden sm:block w-1/2 px-5 py-2 rounded-full text-black"
            />
          )}

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setSettingsOpen(false);
                setEditOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <img src={avatar} className="h-8 w-8 rounded-full" />
              <span className="hidden sm:inline">Hi, {username}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg p-3">

                {!settingsOpen && (
                  <>
                    <Link to="/my-orders" className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      My Orders
                    </Link>

                    <Link to="/wishlist" className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      My Wishlist
                    </Link>

                    <button
                      onClick={() => setSettingsOpen(true)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Settings
                    </button>

                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Logout
                    </button>
                  </>
                )}

                {settingsOpen && !editOpen && (
                  <>
                    <p className="text-center font-semibold mb-2">Settings</p>

                    <button
                      onClick={() => setEditOpen(true)}
                      className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={toggleTheme}
                      className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      Switch to {theme === "light" ? "Dark" : "Light"} Mode
                    </button>

                    <button
                      onClick={() => setSettingsOpen(false)}
                      className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      ← Back
                    </button>
                  </>
                )}

                {editOpen && (
                  <>
                    <p className="text-center font-semibold mb-3">Edit Profile</p>

                    <div className="flex justify-center gap-2 mb-3">
                      {avatars.map(a => (
                        <img
                          key={a}
                          src={a}
                          onClick={() => setAvatar(a)}
                          className={`h-9 w-9 rounded-full cursor-pointer ${
                            avatar === a ? "ring-2 ring-green-500" : ""
                          }`}
                        />
                      ))}
                    </div>

                    <input
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
                      placeholder="Username"
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-700"
                      placeholder="New password"
                    />

                    <button
                      onClick={saveProfile}
                      className="w-full bg-green-600 text-white py-2 rounded mb-2"
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={() => setEditOpen(false)}
                      className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      ← Back
                    </button>
                  </>
                )}

              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="h-20" />
    </>
  );
}
