const Product = require("../models/product.model");

// Helper
const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

/* ---------------- ADD PRODUCT ---------------- */
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, old_price, description } = req.body;

    // ✅ Cloudinary already uploaded → file.path
    const image_urls = req.files?.map((file) => file.path) || [];

    const discount = calculateDiscount(Number(price), Number(old_price));

    const product = await Product.createProduct({
      name,
      description,
      price,
      stock,
      category,
      old_price,
      discount,
      images: image_urls,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- UPDATE PRODUCT ---------------- */
exports.editProduct = async (req, res) => {
  try {
    const { name, category, price, stock, old_price, description } = req.body;

    const image_urls =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.path)
        : null;

    const discount = calculateDiscount(Number(price), Number(old_price));

    const product = await Product.updateProduct(req.params.id, {
      name,
      description,
      price,
      stock,
      category,
      old_price,
      discount,
      images: image_urls,
    });

    res.json(product);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- GET PRODUCTS ---------------- */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- GET SINGLE PRODUCT ---------------- */
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- DELETE PRODUCT ---------------- */
exports.removeProduct = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
