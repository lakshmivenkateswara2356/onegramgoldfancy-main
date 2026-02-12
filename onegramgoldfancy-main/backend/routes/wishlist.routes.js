const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");

router.get("/", auth, getWishlist);

// ✅ productId comes from BODY now
router.post("/", auth, addToWishlist);

// remove stays same
router.delete("/:productId", auth, removeFromWishlist);

module.exports = router;
