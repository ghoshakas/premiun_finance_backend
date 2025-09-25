module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#3b82f6",
        validate: {
          isHexColor(value) {
            if (!/^#[0-9A-F]{6}$/i.test(value)) {
              throw new Error("Color must be a valid hex color code");
            }
          },
        },
      },
      type: {
        type: DataTypes.ENUM("expense", "income", "both"),
        allowNull: false,
        defaultValue: "expense",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "categories",
      underscored: true,
      indexes: [
        {
          fields: ["type"],
        },
        {
          fields: ["is_active"],
        },
        {
          fields: ["created_by"],
        },
      ],
    }
  );

  Category.associate = function (models) {
    // Association with User who created the category
    Category.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });

    // Categories can be used in transactions (we'll add this later)
    // Category.hasMany(models.InwardTransaction, { foreignKey: "category_id" });
    // Category.hasMany(models.OutwardTransaction, { foreignKey: "category_id" });
    // Category.hasMany(models.Expense, { foreignKey: "category_id" });
  };

  // Instance methods
  Category.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    // Remove sensitive information if needed
    return values;
  };

  // Static methods for CRUD operations
  Category.createCategory = async (data) => {
    return await Category.create(data);
  };

  Category.getAllCategories = async (filters = {}) => {
    const whereClause = {};

    if (filters.type && filters.type !== "all") {
      if (filters.type === "both") {
        // Return all categories when type is 'both'
      } else {
        whereClause[sequelize.Sequelize.Op.or] = [
          { type: filters.type },
          { type: "both" },
        ];
      }
    }

    if (filters.is_active !== undefined) {
      whereClause.is_active = filters.is_active;
    }

    if (filters.created_by) {
      whereClause.created_by = filters.created_by;
    }

    return await Category.findAll({
      where: whereClause,
      include: [
        {
          model: sequelize.models.User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["name", "ASC"]],
    });
  };

  Category.getCategoryById = async (id) => {
    return await Category.findByPk(id, {
      include: [
        {
          model: sequelize.models.User,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    });
  };

  Category.updateCategory = async (id, data) => {
    const [updatedRowsCount] = await Category.update(data, {
      where: { id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return null;
    }

    return await Category.getCategoryById(id);
  };

  Category.deleteCategory = async (id) => {
    // Soft delete - mark as inactive instead of hard delete
    return await Category.update({ is_active: false }, { where: { id } });
  };

  Category.hardDeleteCategory = async (id) => {
    // Hard delete - completely remove from database
    return await Category.destroy({ where: { id } });
  };

  Category.getCategoriesByType = async (type) => {
    const whereClause = {
      is_active: true,
    };

    if (type && type !== "all" && type !== "both") {
      whereClause[sequelize.Sequelize.Op.or] = [
        { type: type },
        { type: "both" },
      ];
    }

    return await Category.findAll({
      where: whereClause,
      attributes: ["id", "name", "color", "type"],
      order: [["name", "ASC"]],
    });
  };

  return Category;
};
