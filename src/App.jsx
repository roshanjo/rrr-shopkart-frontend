import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AuthPage from "./pages/AuthPage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/AdminOrders";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ProductDetail from "./pages/ProductDetail"; // ✅ FIXED IMPORT

/* Layout controls navbar visibility */
function Layout({ children }) {
  const location = useLocation();

  // Hide navbar only on auth page
  const hideNavbar = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}

      {/* Main content */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* AUTH PAGE */}
          <Route path="/" element={<AuthPage />} />

          {/* PRODUCT PAGES */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/page2" element={<Products />} />

          {/* OTHER PAGES */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
