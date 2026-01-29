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
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        image_urls.push(uploadResult.secure_url);
      }
    }

    const discount =
      old_price && old_price > price
        ? Math.round(((old_price - price) / old_price) * 100)
        : 0;

    const product = await Product.createProduct({
      name,
      category,
      price,
      stock,
      old_price,
      description,
      images: image_urls, // ✅ array
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
