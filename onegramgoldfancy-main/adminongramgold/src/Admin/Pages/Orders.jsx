import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const Orders = () => {
  const { orders = [], fetchOrders } = useAdmin();
  const [editing, setEditing] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState({
    tracking_id: "",
    courier_name: "",
  });

  const handleEditClick = (order) => {
    setEditing(order.id);
    setTrackingInfo({
      tracking_id: order.tracking_id || "",
      courier_name: order.courier_name || "",
    });
  };

  const handleSave = async (order) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await fetch(
        `https://onegramgoldfancy-main.onrender.com/api/orders/${order.id}/tracking`,
        {
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
        }
      );

      if (!res.ok) throw new Error("Failed");

      setEditing(null);
      fetchOrders();

      // 📲 WhatsApp message
      if (order.phone) {
        const message = `
Hi ${order.customer} 👋
Your order is being prepared 🛍️

Order ID: ${order.id}
Courier: ${trackingInfo.courier_name}
Tracking ID: ${trackingInfo.tracking_id}

Please complete payment.
Your order will be delivered soon 🙏
        `;

        const whatsappURL = `https://wa.me/91${order.phone}?text=${encodeURIComponent(
          message
        )}`;

        window.open(whatsappURL, "_blank");
      }

      alert("Tracking updated & WhatsApp opened");
    } catch (err) {
      console.error(err);
      alert("Error updating order");
    }
  };

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
      <h2 className="text-3xl font-bold mb-6">Orders Dashboard</h2>

      <div className="flex flex-wrap gap-6">
        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-lg shadow-md w-[340px]"
          >
            <div className={`h-1 ${statusColor(o.status)}`} />

            <div className="p-4 space-y-3">
              {/* Customer */}
              <div className="flex justify-between">
                <p className="font-semibold">{o.customer}</p>
                <span className={`text-xs px-2 py-1 rounded text-white ${statusColor(o.status)}`}>
                  {o.status}
                </span>
              </div>

              {/* Mobile */}
              <p className="text-sm">
                📞 <span className="font-medium">{o.phone || "N/A"}</span>
              </p>

              {/* Products */}
              <div className="text-sm">
                <p className="font-medium">Products:</p>
                <ul className="list-disc ml-5">
                  {o.items?.map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Address */}
              <p className="text-sm">
                📍 {o.address}
              </p>

              {/* Total */}
              <p className="font-semibold">₹ {o.total}</p>

              {/* Tracking */}
              {editing === o.id ? (
                <>
                  <input
                    className="border p-2 w-full rounded"
                    placeholder="Courier Name"
                    value={trackingInfo.courier_name}
                    onChange={(e) =>
                      setTrackingInfo({ ...trackingInfo, courier_name: e.target.value })
                    }
                  />
                  <input
                    className="border p-2 w-full rounded"
                    placeholder="Tracking ID"
                    value={trackingInfo.tracking_id}
                    onChange={(e) =>
                      setTrackingInfo({ ...trackingInfo, tracking_id: e.target.value })
                    }
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(null)} className="px-3 py-1 bg-gray-400 text-white rounded">
                      Cancel
                    </button>
                    <button onClick={() => handleSave(o)} className="px-3 py-1 bg-blue-500 text-white rounded">
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => handleEditClick(o)}
                  className="w-full bg-green-500 text-white py-1 rounded"
                >
                  Add / Update Tracking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
