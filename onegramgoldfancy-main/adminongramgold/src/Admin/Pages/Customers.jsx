import React from "react";
import { useAdmin } from "../../context/AdminContext";

const AdminCustomers = () => {
  const { customers } = useAdmin();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.phone} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.address}</td>
                  <td className="px-4 py-2">
                    {new Date(c.joinedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
