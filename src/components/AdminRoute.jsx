import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (user.email !== "admin@aikart.com" || user.is_admin !== true) {
    return <Navigate to="/products" replace />;
  }

  return children;
}
