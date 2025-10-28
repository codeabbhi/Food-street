const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware.verifyToken);

router.get("/profile", userController.getUserProfile);
router.put("/profile", userController.updateUserProfile);
router.delete("/account", userController.deleteUserAccount);

// Admin route
router.get("/", userController.getAllUsers);

module.exports = router;
