const express = require("express");
const router = express.Router();
const contributionPlanController = require("../controllers/contributionPlanController");
const { checkAuth } = require("../middleware/auth");

// GET /api/contribution-plans - Get all contribution plans
router.get("/", checkAuth, contributionPlanController.findAll);

// GET /api/contribution-plans/:id - Get contribution plan by ID
router.get("/:id", checkAuth, contributionPlanController.findOne);

// POST /api/contribution-plans - Create new contribution plan
router.post("/", checkAuth, contributionPlanController.create);

// PUT /api/contribution-plans/:id - Update contribution plan
router.put("/:id", checkAuth, contributionPlanController.update);

// DELETE /api/contribution-plans/:id - Delete contribution plan
router.delete("/:id", checkAuth, contributionPlanController.delete);

module.exports = router;
