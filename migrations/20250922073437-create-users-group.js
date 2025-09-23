"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_groups", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      default_amount: Sequelize.DECIMAL,
      default_frequency: Sequelize.ENUM(
        "Monthly",
        "Quarterly",
        "SemiAnnual",
        "Annual"
      ),
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("user_groups");
  },
};
