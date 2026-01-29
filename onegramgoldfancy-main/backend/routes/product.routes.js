const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../middleware/uploads"); // ✅ USE THIS ONLY

router.get("/", productController.getProducts);
router.get("/:id", productController.getSingleProduct);

// ✅ MULTI IMAGE UPLOAD
router.post("/", upload.array("images", 5), productController.addProduct);
router.put("/:id", upload.array("images", 5), productController.editProduct);

router.delete("/:id", productController.removeProduct);

module.exports = router;
