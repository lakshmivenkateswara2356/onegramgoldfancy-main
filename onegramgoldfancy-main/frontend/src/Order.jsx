import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://https://onegramgoldfancy-main.onrender.com/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded mb-4">
            <p>Order ID: {order.id}</p>
            <p>Total: ₹{order.total_amount}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
