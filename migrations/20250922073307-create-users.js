"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: {
        type: Sequelize.ENUM(
          "SuperAdmin",
          "Manager",
          "Approver",
          "Cashier",
          "Member"
        ),
        allowNull: false,
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // Foreign key constraint will be added in a separate migration after user_groups is created
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
