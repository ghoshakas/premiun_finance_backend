module.exports = (sequelize, DataTypes) => {
  const InwardTransaction = sequelize.define(
    "InwardTransaction",
    {
      user_id: DataTypes.INTEGER,
      contribution_plan_id: DataTypes.INTEGER,
      transaction_date: DataTypes.DATE,
      amount: DataTypes.DECIMAL,
      verified_amount: DataTypes.DECIMAL,
      reason: DataTypes.TEXT,
      transaction_ref: DataTypes.STRING,
      payment_mode: DataTypes.ENUM("UPI", "Cash"),
      status: DataTypes.ENUM("Pending", "Completed", "Failed"),
    },
    { tableName: "inward_transactions", underscored: true }
  );

  InwardTransaction.associate = function (models) {
    InwardTransaction.belongsTo(models.User, { foreignKey: "user_id" });
    InwardTransaction.belongsTo(models.ContributionPlan, {
      foreignKey: "contribution_plan_id",
    });
  };

  InwardTransaction.createTxn = (data) => InwardTransaction.create(data);
  InwardTransaction.getAllTxns = () =>
    InwardTransaction.findAll({ include: ["User", "ContributionPlan"] });
  InwardTransaction.getTxnById = (id) => InwardTransaction.findByPk(id);
  InwardTransaction.updateTxn = (id, data) =>
    InwardTransaction.update(data, { where: { id } });
  InwardTransaction.deleteTxn = (id) =>
    InwardTransaction.destroy({ where: { id } });

  return InwardTransaction;
};
