module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define(
    "UserGroup",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      default_amount: DataTypes.DECIMAL,
      default_frequency: DataTypes.ENUM(
        "Monthly",
        "Quarterly",
        "SemiAnnual",
        "Annual"
      ),
    },
    { tableName: "user_groups", underscored: true }
  );

  UserGroup.associate = function (models) {
    UserGroup.hasMany(models.User, { foreignKey: "group_id" });
    UserGroup.hasMany(models.ContributionPlan, { foreignKey: "group_id" });
  };

  UserGroup.createGroup = (data) => UserGroup.create(data);
  UserGroup.getAllGroups = () => UserGroup.findAll();
  UserGroup.getGroupById = (id) => UserGroup.findByPk(id);
  UserGroup.updateGroup = (id, data) =>
    UserGroup.update(data, { where: { id } });
  UserGroup.deleteGroup = (id) => UserGroup.destroy({ where: { id } });

  return UserGroup;
};
