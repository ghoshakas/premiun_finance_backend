module.exports = (sequelize, DataTypes) => {
  const CentralFund = sequelize.define(
    "CentralFund",
    {
      name: DataTypes.STRING,
      total_balance: DataTypes.DECIMAL,
    },
    { tableName: "central_fund", underscored: true }
  );

  CentralFund.createFund = (data) => CentralFund.create(data);
  CentralFund.getAllFunds = () => CentralFund.findAll();
  CentralFund.getFundById = (id) => CentralFund.findByPk(id);
  CentralFund.updateFund = (id, data) =>
    CentralFund.update(data, { where: { id } });
  CentralFund.deleteFund = (id) => CentralFund.destroy({ where: { id } });

  return CentralFund;
};
