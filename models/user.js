const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM(
        "SuperAdmin",
        "Manager",
        "Approver",
        "Cashier",
        "Member"
      ),
      group_id: DataTypes.INTEGER,
    },
    {
      tableName: "users",
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const saltRounds = 12;
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password") && user.password) {
            const saltRounds = 12;
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
      },
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.UserGroup, { foreignKey: "group_id", as: "group" });
    User.hasMany(models.ContributionPlan, { foreignKey: "user_id" });
    User.hasMany(models.InwardTransaction, { foreignKey: "user_id" });
    User.hasMany(models.OutwardTransaction, { foreignKey: "requested_by" });
    User.hasMany(models.OutwardTransaction, { foreignKey: "approved_by" });
    User.hasMany(models.Expense, { foreignKey: "requested_by" });
    User.hasMany(models.Expense, { foreignKey: "approved_by" });
  };

  // Instance method to compare password
  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  // Static method to hash password manually if needed
  User.hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  };

  // Static method to find user by email and verify password
  User.authenticateUser = async (email, password) => {
    const user = await User.findOne({
      where: { email },
      include: "group",
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return null;
    }

    return user;
  };

  // CRUD Methods
  User.createUser = (data) => User.create(data);
  User.getAllUsers = () =>
    User.findAll({
      include: "group",
      attributes: { exclude: ["password"] }, // Exclude password from general queries
    });
  User.getUserById = (id) =>
    User.findByPk(id, {
      include: "group",
      attributes: { exclude: ["password"] }, // Exclude password from general queries
    });
  User.updateUser = (id, data) => User.update(data, { where: { id } });
  User.deleteUser = (id) => User.destroy({ where: { id } });

  return User;
};
