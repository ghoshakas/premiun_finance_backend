"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("outward_transactions", {
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
      expense_id: {
        type: Sequelize.INTEGER,
        references: { model: "expenses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transaction_date: Sequelize.DATE,
      amount: Sequelize.DECIMAL,
      reason: Sequelize.TEXT,
      transaction_ref: Sequelize.STRING,
      payment_mode: Sequelize.ENUM("UPI", "Cash"),
      status: Sequelize.ENUM("Pending", "Completed", "Rejected"),
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("outward_transactions");
  },
};
