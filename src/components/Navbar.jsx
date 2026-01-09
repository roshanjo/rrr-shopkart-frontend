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

  /* Hide cart button on these pages */
  const hideCart =
    location.pathname === "/products" ||
    location.pathname === "/cart" ||
    location.pathname === "/success";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSaveSettings = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: username })
    );

    if (password) {
      localStorage.setItem("password", password);
    }

    alert("Settings saved successfully");
    setSettingsOpen(false);
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white relative">
      {/* LEFT: LOGO */}
      <Link to="/products">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">
        {!hideCart && (
          <Link
            to="/cart"
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
          >
            Cart
          </Link>
        )}

        {/* PROFILE BUTTON */}
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
          <span>{username}</span>
        </button>

        {/* DROPDOWN */}
        {menuOpen && (
          <div className="absolute right-0 top-12 w-64 bg-white text-black rounded shadow-lg p-3 z-50">
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
                <p className="font-bold mb-2">Settings</p>

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
                  className="w-full p-2 border rounded mb-2"
                  value={username}
                  placeholder="Change username"
                  onChange={(e) => setUsername(e.target.value)}
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="New password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* THEME */}
                <button
                  onClick={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                  className="w-full bg-gray-200 py-1 rounded mb-2"
                >
                  Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </button>

                {/* SAVE */}
                <button
                  onClick={handleSaveSettings}
                  className="w-full bg-green-600 text-white py-1 rounded mb-2"
                >
                  Save
                </button>

                {/* BACK */}
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="w-full text-left px-3 py-1 hover:bg-gray-100"
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
