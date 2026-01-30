import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://onegramgoldfancy-main.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto min-h-screen bg-[#fafafa]">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track and manage your purchases
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500">
          Loading your orders...
        </div>
      )}

      {/* EMPTY */}
      {!loading && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-sm">
          <span className="text-4xl mb-3">📦</span>
          <h2 className="text-lg font-semibold text-gray-800">
            No Orders Yet
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            You haven’t placed any orders yet
          </p>
        </div>
      )}

      {/* ORDERS */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border shadow-sm p-5"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-semibold">#{order.id}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {order.status?.toUpperCase()}
              </span>
            </div>

            {/* PRODUCTS */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Products</p>
              <ul className="text-sm text-gray-800 space-y-1">
                {order.items?.map((item, index) => (
                  <li key={index}>
                    • {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Total Amount</p>
                <p className="font-bold text-[#B08A2E]">
                  ₹{order.total_amount || order.total}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Payment</p>
                <p className="font-medium">
                  {order.payment_method || "Online"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Order Date</p>
                <p className="font-medium">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* TRACKING */}
            <div className="mt-4 border-t pt-4">
              {order.tracking_id && order.courier_name ? (
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <p>
                      <span className="text-gray-500">Courier:</span>{" "}
                      <span className="font-medium">
                        {order.courier_name}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Tracking ID:</span>{" "}
                      <span className="font-medium">
                        {order.tracking_id}
                      </span>
                    </p>
                  </div>

                  <a
                    href={`https://www.${order.courier_name}.com/track/${order.tracking_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-4 py-2 rounded-full border border-[#C9A24D] text-[#C9A24D] hover:bg-[#FAF3E0]"
                  >
                    Track Order
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  Tracking will be available once your order is shipped
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
