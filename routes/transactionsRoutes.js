const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");
const { checkAuth } = require("../middleware/auth");

// GET /api/transactions - Get all transactions
router.get("/", checkAuth, getAllTransactions);

// GET /api/transactions/:id - Get transaction by ID
router.get("/:id", checkAuth, getTransactionById);

// POST /api/transactions - Create a new transaction
router.post("/", checkAuth, createTransaction);

// PUT /api/transactions/:id - Update a transaction
router.put("/:id", checkAuth, updateTransaction);

// DELETE /api/transactions/:id - Delete a transaction
router.delete("/:id", checkAuth, deleteTransaction);

module.exports = router;
