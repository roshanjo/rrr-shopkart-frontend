import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  if (!isLoggedIn()) return <Navigate to="/login" />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600">
        Welcome to Shopify 🎉
      </h1>
    </div>
  );
}
