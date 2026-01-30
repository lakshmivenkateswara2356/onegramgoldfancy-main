const pool = require("../config/db");

// ➕ Add to wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    await pool.query(
      "INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, productId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Add wishlist failed" });
  }
};

// 📥 Get wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT product_id FROM wishlist WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Fetch wishlist failed" });
  }
};

// ❌ Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    await pool.query(
      "DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Remove wishlist failed" });
  }
};
