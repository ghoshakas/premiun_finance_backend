const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoriesByType,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
} = require("../controllers/categoryController");
const { checkAuth } = require("../middleware/auth");

// Protected routes (require authentication)
// GET /api/categories - Get all categories with optional filters
router.get("/", checkAuth, getAllCategories);

// GET /api/categories/type/:type - Get categories by type (expense, income, both, all)
router.get("/type/:type", checkAuth, getCategoriesByType);

// GET /api/categories/:id - Get single category by ID
router.get("/:id", checkAuth, getCategoryById);

// Protected routes (require authentication)
// POST /api/categories - Create new category
router.post("/", checkAuth, createCategory);

// PUT /api/categories/:id - Update category
router.put("/:id", checkAuth, updateCategory);

// DELETE /api/categories/:id - Delete category (soft delete by default, ?hard_delete=true for permanent)
router.delete("/:id", checkAuth, deleteCategory);

// PATCH /api/categories/:id/restore - Restore soft-deleted category
router.patch("/:id/restore", checkAuth, restoreCategory);

module.exports = router;
