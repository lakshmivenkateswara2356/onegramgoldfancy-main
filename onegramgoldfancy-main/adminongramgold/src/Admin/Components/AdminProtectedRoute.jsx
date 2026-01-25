import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!token || !admin || admin.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtectedRoute;
