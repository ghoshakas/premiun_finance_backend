const { Category, User } = require("../models");
const { Op } = require("sequelize");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const { type, is_active } = req.query;

    const filters = {};
    if (type) filters.type = type;
    if (is_active !== undefined) filters.is_active = is_active === "true";

    const categories = await Category.getAllCategories(filters);

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get categories by type (for dropdown/select components)
const getCategoriesByType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!type || !["expense", "income", "both", "all"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Valid type is required (expense, income, both, or all)",
      });
    }

    const categories = await Category.getCategoriesByType(type);

    res.status(200).json({
      success: true,
      message: `${type} categories retrieved successfully`,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error("Get categories by type error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get single category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid category ID is required",
      });
    }

    const category = await Category.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    console.error("Get category by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create new category
const createCategory = async (req, res) => {
  try {
    const { name, color, type, description } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (type && !["expense", "income", "both"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be 'expense', 'income', or 'both'",
      });
    }

    if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
      return res.status(400).json({
        success: false,
        message: "Color must be a valid hex color code",
      });
    }

    // Check if category with same name and type already exists
    const existingCategory = await Category.findOne({
      where: {
        name: name.trim(),
        type: type || "expense",
        is_active: true,
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this name and type already exists",
      });
    }

    const categoryData = {
      name: name.trim(),
      color: color || "#3b82f6",
      type: type || "expense",
      description: description || null,
      created_by: req.user ? req.user.id : null,
    };

    const category = await Category.createCategory(categoryData);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, type, description, is_active } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid category ID is required",
      });
    }

    // Validation
    if (name !== undefined && (!name || !name.trim())) {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty",
      });
    }

    if (type && !["expense", "income", "both"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be 'expense', 'income', or 'both'",
      });
    }

    if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
      return res.status(400).json({
        success: false,
        message: "Color must be a valid hex color code",
      });
    }

    // Check if category exists
    const existingCategory = await Category.getCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check for duplicate name if name is being updated
    if (name && name.trim() !== existingCategory.name) {
      const duplicateCategory = await Category.findOne({
        where: {
          name: name.trim(),
          type: type || existingCategory.type,
          is_active: true,
          id: { [Op.ne]: id },
        },
      });

      if (duplicateCategory) {
        return res.status(409).json({
          success: false,
          message: "Category with this name and type already exists",
        });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (color !== undefined) updateData.color = color;
    if (type !== undefined) updateData.type = type;
    if (description !== undefined) updateData.description = description;
    if (is_active !== undefined) updateData.is_active = is_active;

    const updatedCategory = await Category.updateCategory(id, updateData);

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found or no changes made",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete category (soft delete)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { hard_delete } = req.query;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid category ID is required",
      });
    }

    // Check if category exists
    const existingCategory = await Category.getCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let result;
    if (hard_delete === "true") {
      // Hard delete
      result = await Category.hardDeleteCategory(id);
    } else {
      // Soft delete
      result = await Category.deleteCategory(id);
    }

    if (result[0] === 0 && hard_delete !== "true") {
      return res.status(404).json({
        success: false,
        message: "Category not found or already deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: `Category ${
        hard_delete === "true" ? "permanently deleted" : "deactivated"
      } successfully`,
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Restore deleted category
const restoreCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid category ID is required",
      });
    }

    const updatedCategory = await Category.updateCategory(id, {
      is_active: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category restored successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Restore category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoriesByType,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
};
