import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AuthPage from "./pages/AuthPage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/AdminOrders";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

/* Controls Navbar visibility */
function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar on auth page
  const hideNavbar = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}

      {/* Main content */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* AUTH / HOME */}
          <Route path="/" element={<AuthPage />} />

          {/* MAIN PAGES */}
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/products/page2" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
