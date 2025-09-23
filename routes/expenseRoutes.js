const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { checkAuth } = require("../middleware/auth");

// GET /api/expenses - Get all expenses
router.get("/", checkAuth, expenseController.findAll);

// GET /api/expenses/:id - Get expense by ID
router.get("/:id", checkAuth, expenseController.findOne);

// POST /api/expenses - Create new expense
router.post("/", checkAuth, expenseController.create);

// PUT /api/expenses/:id - Update expense
router.put("/:id", checkAuth, expenseController.update);

// DELETE /api/expenses/:id - Delete expense
router.delete("/:id", checkAuth, expenseController.delete);

module.exports = router;
