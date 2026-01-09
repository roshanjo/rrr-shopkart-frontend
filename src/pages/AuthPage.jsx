import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import logo from "/logo.png";

export default function AuthPage() {
  const [mode, setMode] = useState("welcome");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <img src={logo} alt="Ai-Kart Logo" className="w-52 mb-6" />

      {mode === "welcome" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80 text-center">
          <h1 className="text-2xl font-bold mb-3">
            Welcome to <span className="text-green-600">Ai-Kart</span>
          </h1>

          <p className="mb-5 text-gray-600 dark:text-gray-300">
            Your one-stop shopping destination
          </p>

          <button
            onClick={() => setMode("login")}
            className="w-full bg-green-600 text-white py-2 rounded mb-3"
          >
            Sign In
          </button>

          <button
            onClick={() => setMode("signup")}
            className="w-full border border-green-600 text-green-600 py-2 rounded"
          >
            Create Account
          </button>
        </div>
      )}

      {mode === "login" && (
        <>
          <Login />
          <p className="text-sm mt-3">
            No account?{" "}
            <span onClick={() => setMode("signup")} className="text-green-600 cursor-pointer">
              Sign up
            </span>
          </p>
        </>
      )}

      {mode === "signup" && (
        <>
          <Signup onSuccess={() => setMode("login")} />
          <p className="text-sm mt-3">
            Already have an account?{" "}
            <span onClick={() => setMode("login")} className="text-green-600 cursor-pointer">
              Sign in
            </span>
          </p>
        </>
      )}
    </div>
  );
}
