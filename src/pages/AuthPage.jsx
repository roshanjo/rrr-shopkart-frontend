import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import logo from "/logo.png";

export default function AuthPage() {

  const [mode, setMode] = useState("welcome");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">

      {/* ================= FIXED LOGO HEADER ================= */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">
            AI-KART
          </span>
        </div>
      </div>


      {/* ================= MAIN CONTENT (CENTERED) ================= */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="mt-24">

          {/* -------- Welcome Screen -------- */}
          {mode === "welcome" && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-premium w-80 text-center space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Welcome to <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Ai-Kart</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Your premium shopping destination
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setMode("login")}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl font-semibold shadow-md shadow-violet-500/10 transition-all"
                >
                  Sign In
                </button>

                <button
                  onClick={() => setMode("signup")}
                  className="w-full border border-slate-200 dark:border-slate-700 hover:border-violet-600 dark:hover:border-violet-500 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}


          {/* -------- Login Screen -------- */}
          {mode === "login" && (
            <>
              <Login />
              <p className="text-sm mt-4 text-slate-500 dark:text-slate-400 text-center">
                No account?{" "}
                <span
                  onClick={() => setMode("signup")}
                  className="font-semibold cursor-pointer text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
                >
                  Sign up
                </span>
              </p>
            </>
          )}

          {/* -------- Signup Screen -------- */}
          {mode === "signup" && (
            <>
              <Signup onSuccess={() => setMode("login")} />
              <p className="text-sm mt-4 text-slate-500 dark:text-slate-400 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="font-semibold cursor-pointer text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
                >
                  Sign in
                </span>
              </p>
            </>
          )}


        </div>
      </div>


      {/* ================= FOOTER ================= */}
      <p className="fixed bottom-4 w-full text-center text-sm text-gray-400">
        Designed by Roshan © 2026
      </p>

    </div>
  );
}