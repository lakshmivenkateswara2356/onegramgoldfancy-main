import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const Orders = () => {
  const { orders = [], fetchOrders } = useAdmin();
  const [editing, setEditing] = useState(null); // currently editing order
  const [trackingInfo, setTrackingInfo] = useState({ tracking_id: "", courier_name: "" });

  const handleEditClick = (order) => {
    setEditing(order.id);
    setTrackingInfo({ tracking_id: order.tracking_id || "", courier_name: order.courier_name || "" });
  };

  const handleSave = async (orderId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await fetch(`https://onegramgoldfancy-main.onrender.com/api/orders/${orderId}/tracking`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tracking_id: trackingInfo.tracking_id,
          courier_name: trackingInfo.courier_name,
          status: "shipped",
        }),
      });

      if (!res.ok) throw new Error("Failed to update tracking");
      await res.json();
      setEditing(null);
      fetchOrders(); // refresh orders
      alert("Order tracking updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating tracking info");
    }
  };

  // Helper: pick status color
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders Dashboard</h2>

      {orders.length === 0 && (
        <p className="text-gray-500 text-center text-lg mt-6">No orders found</p>
      )}

      <div className="flex flex-wrap gap-6 justify-start">
        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border"
            style={{ width: "320px" }} // fixed width for all cards
          >
            {/* Top status bar */}
            <div className={`h-1 w-full ${statusColor(o.status)} rounded-t-lg`}></div>

            <div className="p-4">
              {/* Customer & status */}
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-800">{o.customer}</p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${statusColor(o.status)}`}
                >
                  {o.status.toUpperCase()}
                </span>
              </div>

              {/* Order info */}
              <div className="text-gray-700 text-sm mb-3 space-y-1">
                <p><span className="font-medium">Grams:</span> {o.grams}</p>
                <p><span className="font-medium">Total:</span> ₹{o.total}</p>
                <p><span className="font-medium">Address:</span> {o.address}</p>
              </div>

              {/* Tracking Section */}
              {editing === o.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Courier Name"
                    value={trackingInfo.courier_name}
                    onChange={(e) => setTrackingInfo({ ...trackingInfo, courier_name: e.target.value })}
                    className="border p-2 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Tracking ID"
                    value={trackingInfo.tracking_id}
                    onChange={(e) => setTrackingInfo({ ...trackingInfo, tracking_id: e.target.value })}
                    className="border p-2 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditing(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(o.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center mt-3">
                  {o.tracking_id && o.courier_name ? (
                    <a
                      href={`https://www.${o.courier_name}.com/track/${o.tracking_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm font-medium"
                    >
                      Track Order ({o.courier_name})
                    </a>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Tracking not added</span>
                  )}
                  <button
                    onClick={() => handleEditClick(o)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Confirm / Add
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
