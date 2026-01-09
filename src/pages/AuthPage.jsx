import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [mode, setMode] = useState("welcome");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      
      {/* LOGO */}
      <img src="/logo.png" alt="Logo" className="h-16 mb-6" />

      {mode === "welcome" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to RRR Shopkart
          </h1>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setMode("login")}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Sign In
            </button>

            <button
              onClick={() => setMode("signup")}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {mode === "login" && (
        <>
          <Login />
          <p className="mt-3 text-sm">
            No account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-green-600 underline"
            >
              Create one
            </button>
          </p>
        </>
      )}

      {mode === "signup" && (
        <>
          <Signup />
          <p className="mt-3 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-green-600 underline"
            >
              Sign In
            </button>
          </p>
        </>
      )}
    </div>
  );
}
