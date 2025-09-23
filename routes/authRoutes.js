const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { checkAuth } = require("../middleware/auth");

// POST /api/auth/login - User login (no authentication required)
router.post("/login", authController.login);

// PUT /api/auth/change-password - Change password (authentication required)
router.put("/change-password", checkAuth, authController.changePassword);

module.exports = router;
