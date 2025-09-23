"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("central_fund", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      total_balance: { type: Sequelize.DECIMAL, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("central_fund");
  },
};
