import React, { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import useLogout from "../Pages/useLogout";
import AdminLayout from "../AdminLayout";
import AdminLogout from "./AdminLogout";

const Dashboard = () => {
  const { orders, loadingOrders, fetchOrders, products } = useAdmin();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const recentOrders = orders.slice(0, 3); // ✅ Only show 3 most recent orders

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <useLogout />
      <AdminLogout/>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-2xl font-semibold mt-1">₹{totalRevenue}</h2>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-semibold mt-1">{orders.length}</h2>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-2xl font-semibold mt-1">{products.length}</h2>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-sm">Customers</p>
          <h2 className="text-2xl font-semibold mt-1">—</h2>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-md p-5 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : recentOrders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">#</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Customer</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Phone</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Grams</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Total</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Status</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={o.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{o.customer}</td>
                  <td className="px-4 py-2">{o.phone}</td>
                  <td className="px-4 py-2">{o.grams}g</td>
                  <td className="px-4 py-2">₹{o.total}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        o.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : o.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
