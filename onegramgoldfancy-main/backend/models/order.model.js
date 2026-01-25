const pool = require("../config/db");

exports.addOrder = async (req, res) => {
  const userId = req.user.id;

  const { grams, total_amount, address, customer_name, phone } = req.body;

  if (!grams || !total_amount || !address || !customer_name || !phone) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const result = await pool.query(
    `INSERT INTO orders
     (user_id, grams, total_amount, address, customer_name, phone, status)
     VALUES ($1,$2,$3,$4,$5,$6,'pending')
     RETURNING *`,
    [userId, grams, total_amount, address, customer_name, phone]
  );

  res.status(201).json(result.rows[0]);
};


// Get all orders with user + address details
const getAllOrders = async () => {
  const result = await pool.query(`
    SELECT 
      o.id,
      o.status,
      o.total_amount,
      o.created_at,
      u.name AS customer_name,
      u.phone,
      a.address
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN addresses a ON a.user_id = u.id
    ORDER BY o.id DESC
  `);

  return result.rows;
};

// Get single order
const getOrderById = async (id) => {
  const result = await pool.query(`
    SELECT 
      o.id,
      o.status,
      o.total_amount,
      o.created_at,
      u.name AS customer_name,
      u.phone,
      a.address
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN addresses a ON a.user_id = u.id
    WHERE o.id = $1
  `, [id]);

  return result.rows[0];
};

// Create order
const createOrder = async (data) => {
  const { user_id, total_amount } = data;

  const result = await pool.query(
    `INSERT INTO orders (user_id, total_amount, status)
     VALUES ($1, $2, 'pending')
     RETURNING *`,
    [user_id, total_amount]
  );

  return result.rows[0];
};

// Update order status
const updateOrderStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE orders
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  return result.rows[0];
};

// Delete order
const deleteOrder = async (id) => {
  await pool.query(`DELETE FROM orders WHERE id = $1`, [id]);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
