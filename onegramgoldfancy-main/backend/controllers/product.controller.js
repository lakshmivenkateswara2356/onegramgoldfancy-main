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

    let image_url = null;

    // Upload to Cloudinary if file exists
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          image_url = result.secure_url;

          const discount = calculateDiscount(Number(price), Number(old_price));

          const product = await Product.createProduct({
            name,
            category,
            price,
            stock,
            old_price,
            description,
            image_url,
            discount,
          });

          res.status(201).json(product);
        }
      );
      result.end(req.file.buffer); // upload file buffer
      return;
    }

    // If no image uploaded
    const discount = calculateDiscount(Number(price), Number(old_price));
    const product = await Product.createProduct({
      name,
      category,
      price,
      stock,
      old_price,
      description,
      image_url: null,
      discount,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- UPDATE PRODUCT ---------------- */
exports.editProduct = async (req, res) => {
  try {
    const { name, category, price, stock, old_price, description } = req.body;

    let image_url;

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          image_url = result.secure_url;

          const discount = calculateDiscount(Number(price), Number(old_price));

          const product = await Product.updateProduct(req.params.id, {
            name,
            category,
            price,
            stock,
            old_price,
            description,
            discount,
            image_url,
          });

          res.json(product);
        }
      );
      result.end(req.file.buffer);
      return;
    }

    // Update without changing image
    const discount = calculateDiscount(Number(price), Number(old_price));

    const product = await Product.updateProduct(req.params.id, {
      name,
      category,
      price,
      stock,
      old_price,
      description,
      discount,
    });

    res.json(product);
  } catch (err) {
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
