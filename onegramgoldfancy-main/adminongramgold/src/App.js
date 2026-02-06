import { BrowserRouter, Routes, Route } from "react-router-dom";


// Context
import AdminProvider from "./context/AdminContext";

// Pages
import AdminLogin from "./Admin/Pages/Login";
import Dashboard from "./Admin/Pages/Dashboard";
import Products from "./Admin/Pages/Products";
import Orders from "./Admin/Pages/Orders";
import Customers from "./Admin/Pages/Customers";

import Banners from "./Admin/Pages/Banners";


// Components
import AdminProtectedRoute from "./Admin/Components/AdminProtectedRoute";
import AdminLayout from "./Admin/AdminLayout";

const App = () => {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Layout */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            {/* DEFAULT → /admin */}
            <Route index element={<Dashboard />} />

            {/* /admin/dashboard */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* /admin/products */}
            <Route path="products" element={<Products />} />

            
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            
            <Route path="banners" element={<Banners />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
};

export default App;
