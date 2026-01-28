import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import AdminProvider from "./context/AdminContext";

// Pages
import AdminLogin from "./Admin/Pages/Login";
import Dashboard from "./Admin/Pages/Dashboard";
import Products from "./Admin/Pages/Products";
import Categories from "./Admin/Pages/Categories";
import Orders from "./Admin/Pages/Orders";
import Customers from "./Admin/Pages/Customers";
import Offers from "./Admin/Pages/Offers";
import Inventory from "./Admin/Pages/Inventory";
import Banners from "./Admin/Pages/Banners";
import Reports from "./Admin/Pages/Reports";
import Settings from "./Admin/Pages/Settings";

// Components
import AdminProtectedRoute from "./Admin/Components/AdminProtectedRoute";
import AdminLayout from "./Admin/AdminLayout";

const App = () => {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Public login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
};

export default App;
