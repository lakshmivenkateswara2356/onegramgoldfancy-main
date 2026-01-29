const pool = require("../config/db");

// ---------------- CREATE PRODUCT ----------------
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
      images || [], // always store as array
      category,
      old_price,
      discount,
    ]
  );

  return result.rows[0];
};

// ---------------- GET ALL PRODUCTS ----------------
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
      image_url,
      created_at
     FROM products
     ORDER BY id DESC`
  );

  // Ensure every product has an images array (fallback to image_url or empty)
  return result.rows.map((p) => {
    let imgs = p.images;
    if ((!imgs || imgs.length === 0) && p.image_url) {
      imgs = [p.image_url];
    } else if (!imgs || imgs.length === 0) {
      imgs = [];
    }
    return { ...p, images: imgs };
  });
};

// ---------------- GET SINGLE PRODUCT ----------------
exports.getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
  const p = result.rows[0];
  if (!p) return null;

  let imgs = p.images;
  if ((!imgs || imgs.length === 0) && p.image_url) {
    imgs = [p.image_url];
  } else if (!imgs || imgs.length === 0) {
    imgs = [];
  }

  return { ...p, images: imgs };
};

// ---------------- UPDATE PRODUCT ----------------
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
    [name, description, price, stock, images, category, old_price, discount, id]
  );

  return result.rows[0];
};

// ---------------- DELETE PRODUCT ----------------
exports.deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
};
