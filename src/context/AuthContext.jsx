// ==================================================
// IMPORTS
// ==================================================

import { createContext, useState } from "react";


// ==================================================
// CREATE AUTH CONTEXT
// ==================================================

export const AuthContext = createContext();


// ==================================================
// AUTH PROVIDER COMPONENT
// ==================================================

export function AuthProvider({ children }) {

  // ------------------------------------------------
  // State (Persist Token from LocalStorage)
  // ------------------------------------------------

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );


  // ==================================================
  // LOGIN FUNCTION
  // ==================================================

  const login = (newToken) => {

    localStorage.setItem("token", newToken);
    setToken(newToken);
  };


  // ==================================================
  // LOGOUT FUNCTION
  // ==================================================

  const logout = () => {

    localStorage.removeItem("token");
    setToken(null);
  };


  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}