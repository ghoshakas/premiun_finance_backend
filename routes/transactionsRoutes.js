const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  createTransaction,
} = require("../controllers/transactionsController");

// GET /api/transactions - Get all transactions
router.get("/", getAllTransactions);

// POST /api/transactions - Create a new transaction
router.post("/", createTransaction);

module.exports = router;
