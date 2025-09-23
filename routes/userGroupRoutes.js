const express = require("express");
const router = express.Router();
const userGroupController = require("../controllers/userGroupController");
const { checkAuth } = require("../middleware/auth");

// GET /api/user-groups - Get all user groups
router.get("/", checkAuth, userGroupController.findAll);

// GET /api/user-groups/:id - Get user group by ID
router.get("/:id", checkAuth, userGroupController.findOne);

// POST /api/user-groups - Create new user group
router.post("/", checkAuth, userGroupController.create);

// PUT /api/user-groups/:id - Update user group
router.put("/:id", checkAuth, userGroupController.update);

// DELETE /api/user-groups/:id - Delete user group
router.delete("/:id", checkAuth, userGroupController.delete);

module.exports = router;
