const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");

// GET wishlist
router.get("/", auth, getWishlist);

// ADD to wishlist
router.post("/:productId", auth, addToWishlist);

// REMOVE from wishlist
router.delete("/:productId", auth, removeFromWishlist);

module.exports = router;
