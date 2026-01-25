const express = require("express");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { getAllUsers, getAllOrders } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/users", auth, isAdmin, getAllUsers);
router.get("/orders", auth, isAdmin, getAllOrders);

module.exports = router;
