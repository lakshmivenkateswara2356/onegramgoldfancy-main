const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const adminAuth = require("../middleware/admin.middleware");
const orderController = require("../controllers/order.controller");

// USER – CREATE ORDER
router.post("/", auth, orderController.addOrder);

// USER – GET OWN ORDERS
router.get("/", auth, orderController.getOrders);

// ADMIN – GET ALL ORDERS
router.get("/admin", auth, adminAuth, orderController.getAllOrders);

// ADMIN – UPDATE TRACKING INFO
router.put("/:id/tracking", auth, adminAuth, orderController.updateTracking);

module.exports = router;
