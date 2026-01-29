const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

/* ---------------- HELPER ---------------- */
const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

/* ---------------- ADD PRODUCT ---------------- */
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      old_price,
      description,
    } = req.body;

    // ✅ Collect Cloudinary image URLs
    const image_urls =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.path)
        : [];

    if (!name || !category || !price || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (image_urls.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const discount = calculateDiscount(Number(price), Number(old_price));

    const product = await Product.createProduct({
      name,
      description,
      price,
      stock,
      category,
      old_price: old_price || null,
      discount,
      images: image_urls, // ✅ ARRAY OF IMAGES
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

/* ---------------- UPDATE PRODUCT ---------------- */
exports.editProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      old_price,
      description,
    } = req.body;

    let image_urls = null;

    // ✅ If new images uploaded → replace old ones
    if (req.files && req.files.length > 0) {
      image_urls = req.files.map((file) => file.path);
    }

    const discount = calculateDiscount(Number(price), Number(old_price));

    const product = await Product.updateProduct(req.params.id, {
      name,
      description,
      price,
      stock,
      category,
      old_price: old_price || null,
      discount,
      images: image_urls, // null keeps existing images
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

/* ---------------- GET PRODUCTS ---------------- */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();

    const formatted = products.map((p) => ({
      ...p,
      images:
        p.images && p.images.length > 0
          ? p.images
          : ["https://via.placeholder.com/150"],
    }));

    res.json(formatted);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

/* ---------------- GET SINGLE PRODUCT ---------------- */
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.images || product.images.length === 0) {
      product.images = ["https://via.placeholder.com/150"];
    }

    res.json(product);
  } catch (err) {
    console.error("GET SINGLE PRODUCT ERROR:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

/* ---------------- DELETE PRODUCT ---------------- */
exports.removeProduct = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
