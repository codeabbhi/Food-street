const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require authentication
router.use(authMiddleware.verifyToken);

router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.get("/:orderId", orderController.getOrderById);
router.patch("/:orderId/status", orderController.updateOrderStatus);
router.post("/:orderId/cancel", orderController.cancelOrder);

module.exports = router;
