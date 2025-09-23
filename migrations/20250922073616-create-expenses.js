"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("expenses", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      requested_by: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      approved_by: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      total_amount: { type: Sequelize.DECIMAL, allowNull: false },
      description: Sequelize.TEXT,
      status: Sequelize.ENUM("Pending", "Approved", "Paid", "Rejected"),
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("expenses");
  },
};
