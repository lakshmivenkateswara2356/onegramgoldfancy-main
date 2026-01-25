const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const auth = require("../middleware/auth");

router.post("/", auth, cartController.addItem);
router.get("/", auth, cartController.getCart);
router.delete("/:id", auth, cartController.deleteItem);

module.exports = router;
