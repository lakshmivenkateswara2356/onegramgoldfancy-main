const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // multer cloudinary
const productController = require("../controllers/product.controller");

// ADD PRODUCT (single or multiple images)
router.post(
  "/add",
  upload.array("images", 5), // ✅ VERY IMPORTANT
  productController.addProduct
);

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

// UPDATE PRODUCT
router.put(
  "/:id",
  upload.array("images", 5), // ✅ VERY IMPORTANT
  productController.updateProduct
);

// DELETE PRODUCT
router.delete("/:id", productController.deleteProduct);

module.exports = router;
