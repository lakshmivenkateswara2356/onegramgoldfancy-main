import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

      {/* EMPTY STATE */}
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

      {/* ORDERS LIST */}
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              bg-white rounded-2xl
              border border-gray-100
              shadow-sm hover:shadow-md
              transition-all duration-300
              p-5
            "
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="text-sm font-semibold text-gray-900">
                  #{order.id}
                </p>
              </div>

              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                {order.status?.toUpperCase()}
              </span>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Total Amount</p>
                <p className="font-bold text-[#B08A2E]">
                  ₹{order.total_amount}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Payment</p>
                <p className="font-medium text-gray-800">
                  {order.payment_method || "Online"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Order Date</p>
                <p className="font-medium text-gray-800">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* ACTION */}
            <div className="mt-4 flex justify-end">
              <button
                className="
                  text-xs font-semibold
                  px-4 py-2
                  rounded-full
                  border border-[#C9A24D]
                  text-[#C9A24D]
                  hover:bg-[#FAF3E0]
                  transition
                "
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
