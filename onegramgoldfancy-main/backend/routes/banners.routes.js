const express = require("express");
const router = express.Router();
const bannerUpload = require("../middleware/bannerUpload");
const BannerController = require("../controllers/banner.controller");

router.get("/", BannerController.getBanners);

router.post(
  "/",
  bannerUpload.single("image"), // FIELD NAME MUST BE "image"
  BannerController.addBanner
);

router.put(
  "/:id",
  bannerUpload.single("image"),
  BannerController.updateBanner
);

router.delete("/:id", BannerController.deleteBanner);

module.exports = router;
