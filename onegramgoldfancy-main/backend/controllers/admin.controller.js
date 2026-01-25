const pool = require("../config/db");
const Order = require("../models/order.model");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id,name,email,role FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
