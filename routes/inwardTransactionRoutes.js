const express = require("express");
const router = express.Router();
const inwardTransactionController = require("../controllers/inwardTransactionController");
const { checkAuth } = require("../middleware/auth");

// GET /api/inward-transactions - Get all inward transactions
router.get("/", checkAuth, inwardTransactionController.findAll);

// GET /api/inward-transactions/:id - Get inward transaction by ID
router.get("/:id", checkAuth, inwardTransactionController.findOne);

// POST /api/inward-transactions - Create new inward transaction
router.post("/", checkAuth, inwardTransactionController.create);

// PUT /api/inward-transactions/:id - Update inward transaction
router.put("/:id", checkAuth, inwardTransactionController.update);

// DELETE /api/inward-transactions/:id - Delete inward transaction
router.delete("/:id", checkAuth, inwardTransactionController.delete);

module.exports = router;
