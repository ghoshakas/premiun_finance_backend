"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add foreign key constraint to users table for group_id
    await queryInterface.addConstraint("users", {
      fields: ["group_id"],
      type: "foreign key",
      name: "fk_users_group_id",
      references: {
        table: "user_groups",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove foreign key constraint
    await queryInterface.removeConstraint("users", "fk_users_group_id");
  },
};
