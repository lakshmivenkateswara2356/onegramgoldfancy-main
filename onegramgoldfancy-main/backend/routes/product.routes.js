const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // Multer instance
const productController = require("../controllers/product.controller");

// Add product with multiple images
router.post("/products", upload.array("images", 5), productController.addProduct);

// Update product
router.put("/products/:id", upload.array("images", 5), productController.editProduct);

// Get all products
router.get("/products", productController.getProducts);

// Get single product
router.get("/products/:id", productController.getSingleProduct);

// Delete product
router.delete("/products/:id", productController.removeProduct);

module.exports = router;
