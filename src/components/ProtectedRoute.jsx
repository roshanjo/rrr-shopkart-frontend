// ==================================================
// IMPORTS
// ==================================================

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


// ==================================================
// PROTECTED ROUTE COMPONENT
// ==================================================

export default function ProtectedRoute({ children }) {

  // ------------------------------------------------
  // Get Authentication Token from Context
  // ------------------------------------------------

  const { token } = useContext(AuthContext);


  // ==================================================
  // CHECK AUTHENTICATION
  // ==================================================

  if (!token) {
    return <Navigate to="/login" />;
  }


  // ==================================================
  // RENDER PROTECTED CONTENT
  // ==================================================

  return children;
}