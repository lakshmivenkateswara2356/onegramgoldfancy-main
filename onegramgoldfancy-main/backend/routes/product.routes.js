const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", productController.getProducts);
router.get("/:id", productController.getSingleProduct);

// ✅ IMPORTANT CHANGE
router.post("/", upload.array("images", 5), productController.addProduct);
router.put("/:id", upload.array("images", 5), productController.editProduct);

router.delete("/:id", productController.removeProduct);

module.exports = router;
