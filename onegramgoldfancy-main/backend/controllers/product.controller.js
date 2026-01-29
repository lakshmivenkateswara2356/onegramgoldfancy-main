const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

// Helper: calculate discount
const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

/* ---------------- ADD PRODUCT ---------------- */
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, old_price, description } = req.body;

    let image_urls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });
        image_urls.push(uploaded.secure_url);
      }
    }

    const discount = calculateDiscount(Number(price), Number(old_price));

    const product = await Product.createProduct({
      name,
      description,
      price,
      stock,
      category,
      old_price,
      discount,
      images: image_urls.length > 0 ? image_urls : ["https://via.placeholder.com/150"], // fallback if no image
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

    let image_urls = null; // null → keep existing images

    if (req.files && req.files.length > 0) {
      image_urls = [];
      for (const file of req.files) {
        const uploaded = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });
        image_urls.push(uploaded.secure_url);
      }
    }

    const discount = calculateDiscount(Number(price), Number(old_price));

    const product = await Product.updateProduct(req.params.id, {
      name,
      description,
      price,
      stock,
      category,
      old_price,
      discount,
      images: image_urls, // null → keep existing, array → replace
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

    // ensure images array exists
    const formatted = products.map((p) => ({
      ...p,
      images:
        p.images && p.images.length > 0
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
