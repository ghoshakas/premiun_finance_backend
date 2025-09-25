"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, change the column type from ENUM to STRING
    await queryInterface.changeColumn("transactions", "type", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert back to ENUM
    await queryInterface.changeColumn("transactions", "type", {
      type: Sequelize.ENUM("inward", "outward"),
      allowNull: false,
    });
  },
};
