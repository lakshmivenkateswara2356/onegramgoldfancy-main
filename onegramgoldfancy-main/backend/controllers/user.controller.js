const pool = require("../db"); // your PostgreSQL pool connection

/**
 * Get the logged-in user's profile
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT id, name, email, phone, address, role, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Update the logged-in user's address info
 */
const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await pool.query(
      "UPDATE users SET name = $1, phone = $2, address = $3 WHERE id = $4",
      [name, phone, address, userId]
    );

    res.json({ message: "Address updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateAddress,
};
