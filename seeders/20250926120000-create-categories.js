"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Food",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Entertainment",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Acceries",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
