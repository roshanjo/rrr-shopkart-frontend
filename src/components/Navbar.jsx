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
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [username, setUsername] = useState("User");
  const [avatar, setAvatar] = useState(avatars[0]);
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  const showSearch = location.pathname === "/products";

  useEffect(() => {
    if (!token) return;

    fetch("https://rrr-shopkart-backend.onrender.com/api/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        setUsername(d.username || "User");
        setAvatar(d.avatar || avatars[0]);
        localStorage.setItem("user", JSON.stringify(d));
      });
  }, [token]);

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

  const handleSave = async () => {
    const body = { username, avatar };
    if (password) body.password = password;

    await fetch("https://rrr-shopkart-backend.onrender.com/api/profile/", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setSuccessMsg("Profile updated");
    setPassword("");
    setTimeout(() => setSuccessMsg(""), 2000);
    setMenuOpen(false);
    setSettingsOpen(false);
    setEditProfileOpen(false);
  };

  if (!token) return null;

  return (
    <>
      {successMsg && <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded">{successMsg}</div>}

      <nav className="fixed top-0 w-full bg-gray-900 text-white z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <Link to="/products"><img src="/logo.png" className="h-12" /></Link>

          {showSearch && (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate("/products")}
              className="hidden sm:block px-6 py-2 rounded-full bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          )}

          <div ref={dropdownRef} className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2">
              <img src={avatar} className="h-8 w-8 rounded-full" />
              <span className="hidden sm:inline">Hi, {username}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow p-4">
                {!settingsOpen ? (
                  <>
                    <Link to="/my-orders" className="block py-2">My Orders</Link>
                    <button onClick={() => setSettingsOpen(true)} className="block w-full py-2">Settings</button>
                  </>
                ) : !editProfileOpen ? (
                  <>
                    <button onClick={() => setEditProfileOpen(true)} className="block w-full py-2">Edit Profile</button>
                    <button onClick={toggleTheme} className="block w-full py-2">Switch Theme</button>
                    <button onClick={handleSave} className="bg-green-600 text-white w-full py-2 mt-2 rounded">Save</button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center gap-2 mb-3">
                      {avatars.map((a) => (
                        <img key={a} src={a} onClick={() => setAvatar(a)} className={`h-10 w-10 rounded-full cursor-pointer ${avatar === a ? "ring-2 ring-green-500" : ""}`} />
                      ))}
                    </div>

                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 rounded mb-2 bg-white dark:bg-gray-700" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded mb-2 bg-white dark:bg-gray-700" placeholder="New password" />
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
