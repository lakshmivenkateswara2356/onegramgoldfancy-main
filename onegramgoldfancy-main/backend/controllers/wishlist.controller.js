const pool = require("../config/db");

// ➕ ADD TO WISHLIST
exports.addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body; // ✅ FIXED

  if (!productId) {
    return res.status(400).json({ message: "Product ID required" });
  }

  try {
    await pool.query(
      `INSERT INTO wishlist (user_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, product_id) DO NOTHING`,
      [userId, productId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add wishlist failed" });
  }
};

// 📥 GET USER WISHLIST
exports.getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT product_id FROM wishlist WHERE user_id = $1",
      [userId]
    );

    res.json(result.rows.map(r => r.product_id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch wishlist failed" });
  }
};

// ❌ REMOVE FROM WISHLIST
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
    console.error(err);
    res.status(500).json({ message: "Remove wishlist failed" });
  }
};
