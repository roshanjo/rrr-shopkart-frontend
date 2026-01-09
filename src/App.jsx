import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AuthPage from "./pages/AuthPage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/AdminOrders";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

/* Layout controls Navbar only */
function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar only on home/auth page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* HOME / AUTH */}
          <Route path="/" element={<AuthPage />} />

          {/* MAIN PAGES */}
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
