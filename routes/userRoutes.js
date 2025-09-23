const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { checkAuth } = require("../middleware/auth");

// GET /api/users - Get all users
router.get("/", checkAuth, userController.findAll);

// GET /api/users/:id - Get user by ID
router.get("/:id", checkAuth, userController.findOne);

// POST /api/users - Create new user
router.post("/", checkAuth, userController.create);

// PUT /api/users/:id - Update user
router.put("/:id", checkAuth, userController.update);

// DELETE /api/users/:id - Delete user
router.delete("/:id", checkAuth, userController.delete);

module.exports = router;
