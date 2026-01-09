import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./AuthPage.css";

const AuthPage = () => {
  const [mode, setMode] = useState("welcome"); // welcome | login | signup

  return (
    <div className="auth-container">
      {/* LOGO */}
      <img src="/logo.png" alt="Logo" className="auth-logo" />

      {mode === "welcome" && (
        <div className="welcome-box">
          <h1>Welcome to RRR Shopkart</h1>

          <button onClick={() => setMode("login")} className="auth-btn">
            Sign In
          </button>

          <p>
            No account?{" "}
            <span onClick={() => setMode("signup")} className="auth-link">
              Create one
            </span>
          </p>
        </div>
      )}

      {mode === "login" && (
        <>
          <Login />
          <p className="switch-text">
            No account?{" "}
            <span onClick={() => setMode("signup")}>Sign up</span>
          </p>
        </>
      )}

      {mode === "signup" && (
        <>
          <Signup />
          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => setMode("login")}>Sign in</span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
