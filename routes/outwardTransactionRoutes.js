const express = require("express");
const router = express.Router();
const outwardTransactionController = require("../controllers/outwardTransactionController");
const { checkAuth } = require("../middleware/auth");

// GET /api/outward-transactions - Get all outward transactions
router.get("/", checkAuth, outwardTransactionController.findAll);

// GET /api/outward-transactions/:id - Get outward transaction by ID
router.get("/:id", checkAuth, outwardTransactionController.findOne);

// POST /api/outward-transactions - Create new outward transaction
router.post("/", checkAuth, outwardTransactionController.create);

// PUT /api/outward-transactions/:id - Update outward transaction
router.put("/:id", checkAuth, outwardTransactionController.update);

// DELETE /api/outward-transactions/:id - Delete outward transaction
router.delete("/:id", checkAuth, outwardTransactionController.delete);

module.exports = router;
