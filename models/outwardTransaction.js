module.exports = (sequelize, DataTypes) => {
  const OutwardTransaction = sequelize.define(
    "OutwardTransaction",
    {
      requested_by: DataTypes.INTEGER,
      approved_by: DataTypes.INTEGER,
      expense_id: DataTypes.INTEGER,
      transaction_date: DataTypes.DATE,
      amount: DataTypes.DECIMAL,
      reason: DataTypes.TEXT,
      transaction_ref: DataTypes.STRING,
      payment_mode: DataTypes.ENUM("UPI", "Cash"),
      status: DataTypes.ENUM("Pending", "Completed", "Rejected"),
    },
    { tableName: "outward_transactions", underscored: true }
  );

  OutwardTransaction.associate = function (models) {
    OutwardTransaction.belongsTo(models.User, {
      foreignKey: "requested_by",
      as: "requester",
    });
    OutwardTransaction.belongsTo(models.User, {
      foreignKey: "approved_by",
      as: "approver",
    });
    OutwardTransaction.belongsTo(models.Expense, { foreignKey: "expense_id" });
  };

  OutwardTransaction.createTxn = (data) => OutwardTransaction.create(data);
  OutwardTransaction.getAllTxns = () =>
    OutwardTransaction.findAll({ include: ["requester", "approver"] });
  OutwardTransaction.getTxnById = (id) => OutwardTransaction.findByPk(id);
  OutwardTransaction.updateTxn = (id, data) =>
    OutwardTransaction.update(data, { where: { id } });
  OutwardTransaction.deleteTxn = (id) =>
    OutwardTransaction.destroy({ where: { id } });

  return OutwardTransaction;
};
