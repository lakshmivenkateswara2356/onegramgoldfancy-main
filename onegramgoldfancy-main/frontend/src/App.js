import { Routes, Route } from "react-router-dom";

// ---------- PUBLIC PAGES ----------
import Home from "./Components/Home";
import Panchalohalu from "./Pages/Panchalohalu";
import Onegramgold from "./Pages/Onegramgold";
import ProductDetails from "./Pages/ProductDetails";

// ---------- AUTH PAGES ----------
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

// ---------- PROTECTED PAGES ----------
import Account from "./Pages/Account/Account";
import Favorites from "./Pages/Favorites";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import OrderSuccess from "./Pages/OrderSuccess";

// ---------- UTILS ----------
import ProtectedRoute from "./Components/ProtectedRoute";

// ---------- LAYOUT ----------
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Routes>
      {/* ================= LAYOUT ROUTES ================= */}
      <Route element={<MainLayout />}>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/category/panchalohalu" element={<Panchalohalu />} />
        <Route path="/category/one-gram-gold" element={<Onegramgold />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* PROTECTED */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ================= NO LAYOUT ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
