import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import logo from "/logo.png"; // logo from public folder

export default function AuthPage() {
  const [mode, setMode] = useState("welcome");
  // modes: welcome | login | signup

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      {/* LOGO (slightly closer to center) */}
      <img
        src={logo}
        alt="Ai-Kart Logo"
        className="w-48 md:w-56 mb-4"
      />

      {/* WELCOME SECTION */}
      {mode === "welcome" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Welcome to <span className="text-green-600">Ai-Kart</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-5">
            Your one-stop shopping destination
          </p>

          <button
            onClick={() => setMode("login")}
            className="w-full bg-green-600 text-white py-2 rounded mb-3 hover:bg-green-700"
          >
            Sign In
          </button>

          <button
            onClick={() => setMode("signup")}
            className="w-full border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 dark:hover:bg-gray-700"
          >
            Create Account
          </button>
        </div>
      )}

      {/* LOGIN SECTION */}
      {mode === "login" && (
        <div>
          <Login />
          <p className="text-sm text-center mt-3 text-gray-700 dark:text-gray-300">
            No account?{" "}
            <span
              onClick={() => setMode("signup")}
              className="text-green-600 cursor-pointer font-semibold"
            >
              Sign up
            </span>
          </p>
        </div>
      )}

      {/* SIGNUP SECTION */}
      {mode === "signup" && (
        <div>
          <Signup onSuccess={() => setMode("login")} />
          <p className="text-sm text-center mt-3 text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => setMode("login")}
              className="text-green-600 cursor-pointer font-semibold"
            >
              Sign in
            </span>
          </p>
        </div>
      )}

      {/* FOOTER TEXT (only for home page visual flow) */}
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Designed by Roshan © 2026
      </p>
    </div>
  );
}
