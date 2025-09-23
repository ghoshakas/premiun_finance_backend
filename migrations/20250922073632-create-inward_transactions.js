"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inward_transactions", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      contribution_plan_id: {
        type: Sequelize.INTEGER,
        references: { model: "contribution_plans", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transaction_date: Sequelize.DATE,
      amount: Sequelize.DECIMAL,
      verified_amount: Sequelize.DECIMAL,
      reason: Sequelize.TEXT,
      transaction_ref: Sequelize.STRING,
      payment_mode: Sequelize.ENUM("UPI", "Cash"),
      status: Sequelize.ENUM("Pending", "Completed", "Failed"),
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("inward_transactions");
  },
};
