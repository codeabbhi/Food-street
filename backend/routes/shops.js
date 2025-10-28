const express = require("express");
const shopController = require("../controllers/shopController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", shopController.getAllShops);
router.get("/:shopId", shopController.getShopById);

// Protected routes (admin)
router.post("/", authMiddleware.verifyToken, shopController.createShop);
router.put("/:shopId", authMiddleware.verifyToken, shopController.updateShop);
router.delete("/:shopId", authMiddleware.verifyToken, shopController.deleteShop);

module.exports = router;
