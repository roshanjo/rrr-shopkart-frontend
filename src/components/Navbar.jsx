// ==================================================
// IMPORTS
// ==================================================

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Settings, 
  User, 
  Heart, 
  Sun, 
  Moon 
} from "lucide-react";


// ==================================================
// STATIC AVATARS
// ==================================================

const avatars = [
  "/avatars/a1.png",
  "/avatars/a2.png",
  "/avatars/a3.png",
  "/avatars/a4.png",
];


// ==================================================
// NAVBAR COMPONENT
// ==================================================

export default function Navbar() {

  // ------------------------------------------------
  // Hooks
  // ------------------------------------------------

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { cart, setOpen } = useCart();

  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [username, setUsername] = useState("User");
  const [avatar, setAvatar] = useState(avatars[0]);
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState(
    localStorage.getItem("search") || ""
  );

  const isLoggedIn = !!token;
  const showSearch = location.pathname !== "/";


  // ==================================================
  // 🔁 SYNC USER DATA
  // ==================================================

  useEffect(() => {

    if (!token) return;

    fetch("https://rrr-shopkart-backend.onrender.com/api/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.ok && res.json())
      .then((data) => {

        if (!data) return;

        setUsername(data.username || "User");
        setAvatar(data.avatar || avatars[0]);
      })
      .catch(() => {});

  }, [token]);


  // ==================================================
  // CLOSE DROPDOWN ON OUTSIDE CLICK
  // ==================================================

  useEffect(() => {

    const close = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        setSettingsOpen(false);
        setEditProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);

  }, []);


  // ==================================================
  // LOGOUT
  // ==================================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };


  // ==================================================
  // SAVE PROFILE SETTINGS
  // ==================================================

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


  // ==================================================
  // 🔍 INSTANT SEARCH (AMAZON STYLE)
  // ==================================================

  const handleSearchChange = (e) => {

    const value = e.target.value;

    setSearch(value);
    localStorage.setItem("search", value);

    navigate(
      value.trim()
        ? `/products?search=${encodeURIComponent(value)}`
        : "/products",
      { replace: true }
    );
  };


  // ==================================================
  // IF NOT LOGGED IN → HIDE NAVBAR
  // ==================================================

  if (!isLoggedIn) return null;


  // ==================================================
  // UI
  // ==================================================

  return (
    <>
      {/* SUCCESS MESSAGE */}
      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl shadow-premium z-[9999] text-sm font-medium animate-bounce-short flex items-center gap-2">
          {successMsg}
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 shadow-soft transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* LOGO */}
            <Link to="/products" className="flex items-center gap-2 shrink-0 group">
              <img src="/logo.png" alt="Logo" className="h-9 w-auto group-hover:scale-105 transition-transform" />
              <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">Ai-Kart</span>
            </Link>

            {/* SEARCH */}
            <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
              {showSearch && (
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search premium products..."
                    className="w-full pl-11 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-violet-500/10 dark:focus:ring-violet-500/10 transition-all shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* THEME TOGGLE */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors hidden sm:flex"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* CART */}
              <button 
                onClick={() => setOpen(true)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 bg-violet-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                    {cart.reduce((total, item) => total + (item.qty || 1), 0)}
                  </span>
                )}
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

              {/* PROFILE */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    setSettingsOpen(false);
                    setEditProfileOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img src={avatar} className="h-7 w-7 rounded-full shadow-sm" alt="Avatar" />
                  <span className="text-sm font-medium hidden sm:block">{username}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* DROPDOWN */}
                <div className={`absolute right-0 top-12 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-premium p-2 mt-2 transition-all origin-top-right ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                  
                  {!settingsOpen ? (
                    <div className="space-y-1">
                      <Link to="/my-orders" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <ShoppingBag className="w-4 h-4" /> My Orders
                      </Link>
                      <Link to="/wishlist" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Heart className="w-4 h-4" /> Wishlist
                      </Link>
                      <button onClick={() => setSettingsOpen(true)} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                      </button>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  ) : !editProfileOpen ? (
                    <div className="space-y-3 p-2">
                       <p className="font-semibold text-slate-800 dark:text-slate-100 px-1">Settings</p>
                       <button onClick={() => setEditProfileOpen(true)} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Edit Profile</button>
                       <button onClick={toggleTheme} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                         {theme === "light" ? "Dark Mode" : "Light Mode"}
                       </button>
                       <button onClick={handleSaveSettings} className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-xl text-sm font-medium transition-colors">Save</button>
                       <button onClick={() => setSettingsOpen(false)} className="w-full text-center text-sm text-slate-500 hover:text-slate-700">← Back</button>
                    </div>
                  ) : (
                    <div className="space-y-3 p-2">
                       <p className="font-semibold text-slate-800 dark:text-slate-100 px-1">Edit Profile</p>
                       <div className="flex justify-center gap-3 py-2">
                         {avatars.map((a) => (
                           <img key={a} src={a} onClick={() => setAvatar(a)} className={`h-10 w-10 rounded-full cursor-pointer transition-all ${avatar === a ? "ring-2 ring-violet-600 ring-offset-2 scale-110" : "opacity-75 hover:opacity-100"}`} />
                         ))}
                       </div>
                       <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:border-violet-500" placeholder="Username" />
                       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:border-violet-500" placeholder="New password" />
                       <button onClick={() => setEditProfileOpen(false)} className="w-full text-center text-sm text-slate-500 hover:text-slate-700">← Back</button>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>

          {/* MOBILE SEARCH */}
          {showSearch && (
            <div className="sm:hidden pb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full pl-11 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* SPACER */}
      <div className={`h-16 ${showSearch ? 'h-28 sm:h-16' : 'h-16'}`} />
    </>
  );

}