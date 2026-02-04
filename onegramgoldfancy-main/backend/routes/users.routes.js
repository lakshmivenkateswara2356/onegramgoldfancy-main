const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

// GET logged-in user's profile
router.get("/profile", auth, userController.getProfile);

// PUT update logged-in user's address
router.put("/address", auth, userController.updateAddress);

module.exports = router;
