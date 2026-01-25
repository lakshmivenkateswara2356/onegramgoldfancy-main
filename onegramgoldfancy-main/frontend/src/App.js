import { Routes, Route } from "react-router-dom";

// ---------- PUBLIC PAGES ----------
import Home from "./Components/Home";
import Panchalohalu from "./Pages/Panchalohalu";
import Onegramgold from "./Pages/Onegramgold";

// ---------- AUTH PAGES ----------
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

// ---------- PROTECTED PAGES ----------
import Account from "./Pages/Account/Account";
import Favorites from "./Pages/Favorites";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import OrderSuccess from "./Pages/OrderSuccess"; // ✅ ADD THIS

// ---------- UTILS ----------
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/category/panchalohalu" element={<Panchalohalu />} />
      <Route path="/category/one-gram-gold" element={<Onegramgold />} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= PROTECTED ================= */}
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

      {/* ✅ ORDER LIST */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* ✅ ORDER SUCCESS PAGE */}
      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
