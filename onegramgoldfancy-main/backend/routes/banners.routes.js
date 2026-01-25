const express = require("express");
const router = express.Router();
const BannerController = require("../controllers/banner.controller");

// ❌ MULTER REMOVED COMPLETELY

router.get("/", BannerController.getBanners);
router.post("/", BannerController.addBanner);
router.put("/:id", BannerController.updateBanner);
router.delete("/:id", BannerController.deleteBanner);

module.exports = router;
