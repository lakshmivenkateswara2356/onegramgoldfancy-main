const pool = require("../config/db");

exports.getLatestPrice = async () => {
  const res = await pool.query("SELECT * FROM gold_prices ORDER BY created_at DESC LIMIT 1");
  return res.rows[0];
};

exports.setPrice = async (price) => {
  const res = await pool.query(
    "INSERT INTO gold_prices (price_per_gram) VALUES ($1) RETURNING *",
    [price]
  );
  return res.rows[0];
};
