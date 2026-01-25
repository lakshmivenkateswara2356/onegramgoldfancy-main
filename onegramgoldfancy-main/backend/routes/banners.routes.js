// backend/routes/banner.routes.js
const express = require("express");
const router = express.Router();

const BannerController = require("../controllers/banner.controller");

router.get("/", BannerController.getBanners);

// ✅ Cloudinary upload happens HERE
router.post("/", upload.single("image"), BannerController.addBanner);

router.put("/:id", BannerController.updateBanner);
router.delete("/:id", BannerController.deleteBanner);

module.exports = router;
