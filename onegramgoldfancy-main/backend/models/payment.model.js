const pool = require("../config/db");

/**
 * Create order (Guest checkout – no login)
 */
exports.createOrder = async ({ grams, pricePerGram, totalAmount }) => {
  const res = await pool.query(
    `
    INSERT INTO orders (user_id, grams, price_per_gram, total_amount)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      null,          // user_id → guest checkout
      grams,         // REQUIRED
      pricePerGram,
      totalAmount,
    ]
  );

  return res.rows[0];
};

/**
 * Admin: Get all orders
 */
exports.getAllOrders = async () => {
  const res = await pool.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  return res.rows;
};
