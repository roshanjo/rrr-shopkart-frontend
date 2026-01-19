import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/AdminOrders";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";
  const hideFooter =
    location.pathname === "/" || location.pathname === "/success";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
