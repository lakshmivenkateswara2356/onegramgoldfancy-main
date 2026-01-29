const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // multer cloudinary
const productController = require("../controllers/product.controller");

// ADD PRODUCT (single or multiple images)
router.post(
  "/add",
  upload.array("images", 5),
  productController.addProduct
);

// GET ALL PRODUCTS
router.get("/", productController.getProducts);

// UPDATE PRODUCT
router.put(
  "/:id",
  upload.array("images", 5),
  productController.editProduct
);

// DELETE PRODUCT
router.delete("/:id", productController.removeProduct);

module.exports = router;
