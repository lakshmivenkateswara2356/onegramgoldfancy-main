import React, { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import AdminLogout from "./AdminLogout";

const Dashboard = () => {
  const {
    orders,
    loadingOrders,
    fetchOrders,
    products,
    customers,
  } = useAdmin();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <AdminLogout />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: `₹${totalRevenue}` },
          { label: "Total Orders", value: orders.length },
          { label: "Total Products", value: products.length },
          { label: "Customers", value: customers.length },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-xl sm:text-2xl font-semibold mt-1">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="block md:hidden space-y-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>

        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : recentOrders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          recentOrders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-xl shadow p-4 space-y-2"
            >
              <div className="flex justify-between">
                <p className="font-semibold">{o.customer}</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    o.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : o.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">📞 {o.phone}</p>
              <p className="text-sm text-gray-600">⚖ {o.grams} g</p>
              <p className="font-semibold text-gray-800">
                ₹{o.total}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(o.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ================= DESKTOP / TABLET VIEW ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow-md p-5 mt-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : recentOrders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Grams</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={o.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{o.customer}</td>
                  <td className="px-4 py-2">{o.phone}</td>
                  <td className="px-4 py-2">{o.grams}g</td>
                  <td className="px-4 py-2">₹{o.total}</td>
                  <td className="px-4 py-2 capitalize">{o.status}</td>
                  <td className="px-4 py-2">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
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
