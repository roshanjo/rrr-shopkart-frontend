import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./AuthPage.css";

const AuthPage = () => {
  const [mode, setMode] = useState("welcome"); // welcome | login | signup

  return (
    <div className="auth-container">
      {/* LOGO FROM PUBLIC FOLDER */}
      <img src="/logo.png" alt="RRR Shopkart Logo" className="auth-logo" />

      {mode === "welcome" && (
        <div className="auth-box">
          <h1>Welcome to RRR Shopkart 🛒</h1>
          <p>Your one-stop online shopping destination</p>

          <button onClick={() => setMode("login")} className="auth-btn">
            Sign In
          </button>

          <p className="switch-text">
            No account?
            <span onClick={() => setMode("signup")}> Create one</span>
          </p>
        </div>
      )}

      {mode === "login" && (
        <div className="auth-box">
          <Login />
          <p className="switch-text">
            No account?
            <span onClick={() => setMode("signup")}> Sign up</span>
          </p>
        </div>
      )}

      {mode === "signup" && (
        <div className="auth-box">
          <Signup />
          <p className="switch-text">
            Already have an account?
            <span onClick={() => setMode("login")}> Sign in</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
