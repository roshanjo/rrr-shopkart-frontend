import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const avatars = [
  "/avatars/a1.png",
  "/avatars/a2.png",
  "/avatars/a3.png",
  "/avatars/a4.png",
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("token");

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || avatars[0]
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const hideCart =
    location.pathname === "/cart" ||
    location.pathname === "/success" ||
    location.pathname === "/products";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white relative">
      {/* LEFT LOGO */}
      <Link to="/products">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">
        {!hideCart && (
          <Link
            to="/cart"
            className="bg-green-600 px-3 py-1 rounded"
          >
            Cart
          </Link>
        )}

        {/* PROFILE */}
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setSettingsOpen(false);
          }}
          className="flex items-center gap-2"
        >
          <img
            src={avatar}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          <span>{user?.name}</span>
        </button>

        {/* DROPDOWN */}
        {menuOpen && (
          <div className="absolute right-0 top-12 w-56 bg-white text-black rounded shadow-lg p-2 z-50">
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
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* SETTINGS PANEL */}

                <p className="font-bold px-3 mb-2">Settings</p>

                {/* PROFILE PICTURE */}
                <div className="px-3 mb-3">
                  <p className="text-sm mb-1">Profile Picture</p>
                  <div className="flex gap-2">
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
                </div>

                {/* USERNAME / PASSWORD */}
                <div className="px-3 mb-3 text-sm text-gray-600">
                  Username / password change coming soon
                </div>

                {/* THEME TOGGLE */}
                <div className="px-3 mb-3">
                  <button
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    className="w-full bg-gray-200 py-1 rounded"
                  >
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                  </button>
                </div>

                {/* BACK */}
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  ← Back
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
