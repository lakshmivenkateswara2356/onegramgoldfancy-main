const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");

// Multer config (memory storage is enough, no need to save locally)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getSingleProduct);
router.post("/", upload.single("image"), productController.addProduct);
router.put("/:id", upload.single("image"), productController.editProduct);
router.delete("/:id", productController.removeProduct);

module.exports = router;
