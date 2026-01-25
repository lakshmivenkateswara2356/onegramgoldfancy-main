const pool = require("../config/db");

exports.getOrCreateCart = async (userId) => {
  const cart = await pool.query(
    "SELECT * FROM carts WHERE user_id=$1",
    [userId]
  );

  if (cart.rows.length) return cart.rows[0];

  const newCart = await pool.query(
    "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
    [userId]
  );
  return newCart.rows[0];
};

exports.addToCart = async (cartId, productId, quantity) => {
  const result = await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity)
     VALUES ($1,$2,$3)
     ON CONFLICT (cart_id, product_id)
     DO UPDATE SET quantity = cart_items.quantity + $3
     RETURNING *`,
    [cartId, productId, quantity]
  );
  return result.rows[0];
};

exports.getCartItems = async (cartId) => {
  const result = await pool.query(
    `SELECT ci.*, p.name, p.price, p.image_url
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id=$1`,
    [cartId]
  );
  return result.rows;
};

exports.removeItem = async (id) => {
  await pool.query("DELETE FROM cart_items WHERE id=$1", [id]);
};
