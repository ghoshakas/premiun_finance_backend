"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash the default password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash("geogo123", saltRounds);

    await queryInterface.bulkInsert("users", [
      {
        name: "Geogo Admin",
        email: "geogo@gmail.com",
        password: hashedPassword,
        role: "SuperAdmin",
        group_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: "superadmin@nodefund.com",
    });
  },
};
