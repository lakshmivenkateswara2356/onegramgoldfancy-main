const pool = require("../config/db");

/* ---------------- CREATE ---------------- */
exports.createProduct = async (data) => {
  const {
    name,
    description,
    price,
    stock,
    images,
    category,
    old_price,
    discount,
  } = data;

  const result = await pool.query(
    `INSERT INTO products
     (name, description, price, stock, images, category, old_price, discount)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [
      name,
      description,
      price,
      stock,
      images, // ✅ ARRAY
      category,
      old_price,
      discount,
    ]
  );

  return result.rows[0];
};

/* ---------------- GET ALL ---------------- */
exports.getAllProducts = async () => {
  const result = await pool.query(
    `SELECT
      id,
      name,
      description,
      category,
      price,
      old_price,
      discount,
      stock,
      images,
      created_at
     FROM products
     ORDER BY id DESC`
  );

  return result.rows;
};

/* ---------------- GET ONE ---------------- */
exports.getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id=$1",
    [id]
  );
  return result.rows[0];
};

/* ---------------- UPDATE ---------------- */
exports.updateProduct = async (id, data) => {
  const {
    name,
    description,
    price,
    stock,
    images,
    category,
    old_price,
    discount,
  } = data;

  const result = await pool.query(
    `UPDATE products SET
      name=$1,
      description=$2,
      price=$3,
      stock=$4,
      images=COALESCE($5, images),
      category=$6,
      old_price=$7,
      discount=$8
     WHERE id=$9
     RETURNING *`,
    [
      name,
      description,
      price,
      stock,
      images,
      category,
      old_price,
      discount,
      id,
    ]
  );

  return result.rows[0];
};

/* ---------------- DELETE ---------------- */
exports.deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
};
