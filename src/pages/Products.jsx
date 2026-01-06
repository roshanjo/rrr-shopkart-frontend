import { getAuth } from "../utils/auth";
import { Navigate } from "react-router-dom";

export default function Products() {
  if (!getAuth()) return <Navigate to="/login" />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-4">Welcome 🎉 You are logged in.</p>
    </div>
  );
}
