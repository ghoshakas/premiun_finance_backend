module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "Expense",
    {
      requested_by: DataTypes.INTEGER,
      approved_by: DataTypes.INTEGER,
      total_amount: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      status: DataTypes.ENUM("Pending", "Approved", "Paid", "Rejected"),
    },
    { tableName: "expenses", underscored: true }
  );

  Expense.associate = function (models) {
    Expense.belongsTo(models.User, {
      foreignKey: "requested_by",
      as: "requester",
    });
    Expense.belongsTo(models.User, {
      foreignKey: "approved_by",
      as: "approver",
    });
    Expense.hasMany(models.OutwardTransaction, { foreignKey: "expense_id" });
  };

  Expense.createExpense = (data) => Expense.create(data);
  Expense.getAllExpenses = () =>
    Expense.findAll({ include: ["requester", "approver"] });
  Expense.getExpenseById = (id) => Expense.findByPk(id);
  Expense.updateExpense = (id, data) => Expense.update(data, { where: { id } });
  Expense.deleteExpense = (id) => Expense.destroy({ where: { id } });

  return Expense;
};
