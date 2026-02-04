const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");

router.get("/test", (req, res) => {
  res.json({ wishlist: "route working" });
});

router.get("/", auth, getWishlist);
router.post("/:productId", auth, addToWishlist);
router.delete("/:productId", auth, removeFromWishlist);

module.exports = router;
