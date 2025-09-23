const express = require("express");
const router = express.Router();
const centralFundController = require("../controllers/centralFundController");
const { checkAuth } = require("../middleware/auth");

// GET /api/central-funds - Get all central funds
router.get("/", checkAuth, centralFundController.findAll);

// GET /api/central-funds/:id - Get central fund by ID
router.get("/:id", checkAuth, centralFundController.findOne);

// POST /api/central-funds - Create new central fund
router.post("/", checkAuth, centralFundController.create);

// PUT /api/central-funds/:id - Update central fund
router.put("/:id", checkAuth, centralFundController.update);

// DELETE /api/central-funds/:id - Delete central fund
router.delete("/:id", checkAuth, centralFundController.delete);

module.exports = router;
