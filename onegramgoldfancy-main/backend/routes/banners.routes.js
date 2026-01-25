const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const BannerController = require("../controllers/banner.controller");

router.get("/", BannerController.getBanners);

router.post(
  "/",
  upload.single("image"), // ✅ REQUIRED
  BannerController.addBanner
);

router.put(
  "/:id",
  upload.single("image"),
  BannerController.updateBanner
);

router.delete("/:id", BannerController.deleteBanner);

module.exports = router;
