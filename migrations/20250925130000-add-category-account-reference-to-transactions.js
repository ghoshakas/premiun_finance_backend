"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("transactions", "category", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("transactions", "account", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("transactions", "reference", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("transactions", "category");
    await queryInterface.removeColumn("transactions", "account");
    await queryInterface.removeColumn("transactions", "reference");
  },
};
