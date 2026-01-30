const Product = require("../models/product.model");

// Helper
const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

/* ---------------- ADD PRODUCT ---------------- */
exports.addProduct = async (req, res) => {
  try {
    let { name, category, price, stock, old_price, description } = req.body;

    // ✅ normalize values
    price = Number(price);
    stock = Number(stock || 0);
    old_price = old_price ? Number(old_price) : null;
    description = description || "";

    let image_urls = [];

    // ✅ Cloudinary (multer-storage-cloudinary)
    if (req.files && req.files.length > 0) {
      image_urls = req.files.map((file) => file.path);
    }

    const discount = calculateDiscount(price, old_price);

    const product = await Product.createProduct({
      name,
      description,
      price,
      stock,
      category,
      old_price,
      discount,
      images: image_urls, // ✅ ALWAYS ARRAY
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
    let { name, category, price, stock, old_price, description } = req.body;

    price = Number(price);
    stock = Number(stock || 0);
    old_price = old_price ? Number(old_price) : null;
    description = description || "";

    let image_urls = null;

    if (req.files && req.files.length > 0) {
      image_urls = req.files.map((file) => file.path);
    }

    const discount = calculateDiscount(price, old_price);

    const product = await Product.updateProduct(req.params.id, {
      name,
      description,
      price,
      stock,
      category,
      old_price,
      discount,
      images: image_urls, // null → keeps old images
    });

    res.json(product);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- GET ALL PRODUCTS ---------------- */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();

    const formatted = products.map((p) => ({
      ...p,
      images:
        Array.isArray(p.images) && p.images.length > 0
          ? p.images
          : ["https://via.placeholder.com/150"],
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- GET SINGLE PRODUCT ---------------- */
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);

    if (!product.images || product.images.length === 0) {
      product.images = ["https://via.placeholder.com/150"];
    }

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
