module.exports = (sequelize, DataTypes) => {
  const ContributionPlan = sequelize.define(
    "ContributionPlan",
    {
      user_id: DataTypes.INTEGER,
      group_id: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      frequency: DataTypes.ENUM("Monthly", "Quarterly", "SemiAnnual", "Annual"),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    { tableName: "contribution_plans", underscored: true }
  );

  ContributionPlan.associate = function (models) {
    ContributionPlan.belongsTo(models.User, { foreignKey: "user_id" });
    ContributionPlan.belongsTo(models.UserGroup, { foreignKey: "group_id" });
    ContributionPlan.hasMany(models.InwardTransaction, {
      foreignKey: "contribution_plan_id",
    });
  };

  ContributionPlan.createPlan = (data) => ContributionPlan.create(data);
  ContributionPlan.getAllPlans = () =>
    ContributionPlan.findAll({ include: ["User", "UserGroup"] });
  ContributionPlan.getPlanById = (id) => ContributionPlan.findByPk(id);
  ContributionPlan.updatePlan = (id, data) =>
    ContributionPlan.update(data, { where: { id } });
  ContributionPlan.deletePlan = (id) =>
    ContributionPlan.destroy({ where: { id } });

  return ContributionPlan;
};
