import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  const [params] = useSearchParams();
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

  const showSearch = location.pathname === "/products";

  // 🔑 SOURCE OF TRUTH = URL
  const searchFromUrl = params.get("search") || "";
  const [search, setSearch] = useState(searchFromUrl);

  /* ===============================
     KEEP SEARCH IN SYNC WITH URL
     =============================== */
  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  /* ===============================
     🔁 SYNC USER
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch(
        "https://rrr-shopkart-backend.onrender.com/api/profile/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            avatar,
            password: password || undefined,
          }),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();
      setUsername(data.username);
      setAvatar(data.avatar);
      setPassword("");

      setSuccessMsg("Profile updated successfully");
      setTimeout(() => setSuccessMsg(""), 2000);

      setEditProfileOpen(false);
      setSettingsOpen(false);
      setMenuOpen(false);
    } catch (err) {
      console.error("Profile save error", err);
    }
  };

  /* ===============================
     🔍 FIXED SEARCH HANDLER
     =============================== */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  if (!token) return null;

  return (
    <>
      {successMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded z-[9999] text-sm">
          {successMsg}
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto p-4">

          <div className="flex items-center justify-between gap-3">
            <Link to="/products" className="shrink-0">
              <img src="/logo.png" alt="Logo" className="h-12" />
            </Link>

            {/* DESKTOP SEARCH */}
            <div className="flex-1 mx-6 hidden sm:block">
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

            {/* PROFILE */}
            <div ref={dropdownRef} className="relative shrink-0">
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setSettingsOpen(false);
                  setEditProfileOpen(false);
                }}
                className="flex items-center gap-2"
              >
                <img src={avatar} className="h-8 w-8 rounded-full" />
                <span className="text-xs sm:text-sm">Hi, {username}</span>
              </button>

              {/* DROPDOWN (unchanged) */}
              {/* ... your dropdown code stays exactly the same ... */}
            </div>
          </div>

          {/* MOBILE SEARCH */}
          {showSearch && (
            <div className="sm:hidden mt-3">
              <form onSubmit={handleSearch}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full px-4 py-2 rounded-full bg-white text-black"
                />
              </form>
            </div>
          )}
        </div>
      </nav>

      <div className="h-28 sm:h-20" />
    </>
  );
}
