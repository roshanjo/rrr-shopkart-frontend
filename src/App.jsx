import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";

import AuthPage from "./pages/AuthPage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/AdminOrders";
import AdminPanel from "./pages/AdminPanel";
import AdminRoute from "./components/AdminRoute";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import Address from "./pages/Address";


/* =====================================================
   LAYOUT COMPONENT
   - Controls Navbar & Footer visibility
===================================================== */
function Layout({ children }) {

  const location = useLocation();

  const hideNavbar = location.pathname === "/" || location.pathname === "/admin-panel";
  const hideFooter =
    location.pathname === "/" ||
    location.pathname === "/success" ||
    location.pathname === "/admin-panel";

  return (
    <>
      {!hideNavbar && <Navbar />}

      {children}

      {!hideFooter && <Footer />}
    </>
  );
}


/* =====================================================
   MAIN APP
===================================================== */
export default function App() {

  return (
    <CartProvider>
      <BrowserRouter>

        <Layout>

          <Routes>

            {/* ================= AUTH ================= */}
            <Route
              path="/"
              element={<AuthPage />}
            />

            {/* ================= PRODUCTS ================= */}
            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />

            {/* ================= CART ================= */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* ================= ADMIN ================= */}
            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />

            <Route
              path="/admin-panel"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />

            {/* ================= PAYMENT ================= */}
            <Route
              path="/success"
              element={<Success />}
            />

            <Route
              path="/cancel"
              element={<Cancel />}
            />

            {/* ================= USER ORDERS ================= */}
            <Route
              path="/my-orders"
              element={<MyOrders />}
            />

            <Route
              path="/orders/:id"
              element={<OrderDetails />}
            />

            {/* ================= WISHLIST ================= */}
            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            {/* ================= ADDRESS ================= */}
            <Route
              path="/address"
              element={<Address />}
            />

          </Routes>

        </Layout>

        {/* 🔥 AMAZON-STYLE CART DRAWER */}
        <CartDrawer />

        {/* 🍞 TOAST NOTIFICATIONS */}
        <Toaster position="top-center" reverseOrder={false} />

      </BrowserRouter>
    </CartProvider>
  );
}