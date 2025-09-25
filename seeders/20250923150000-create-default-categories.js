"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const defaultCategories = [
      {
        name: "Food & Dining",
        color: "#ef4444",
        type: "expense",
        description: "Restaurant meals, groceries, and dining expenses",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Transportation",
        color: "#f97316",
        type: "expense",
        description: "Fuel, public transport, taxi, and vehicle maintenance",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Shopping",
        color: "#eab308",
        type: "expense",
        description: "Clothing, electronics, and general shopping",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Entertainment",
        color: "#8b5cf6",
        type: "expense",
        description: "Movies, games, events, and recreational activities",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Utilities",
        color: "#6b7280",
        type: "expense",
        description: "Electricity, water, gas, internet, and phone bills",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Healthcare",
        color: "#06b6d4",
        type: "expense",
        description: "Medical expenses, pharmacy, and health insurance",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Education",
        color: "#84cc16",
        type: "expense",
        description: "Tuition fees, books, courses, and educational materials",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Salary",
        color: "#22c55e",
        type: "income",
        description: "Monthly salary and regular employment income",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Freelance",
        color: "#3b82f6",
        type: "income",
        description: "Freelance work and project-based income",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Investments",
        color: "#ec4899",
        type: "income",
        description: "Returns from stocks, bonds, and other investments",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Business",
        color: "#f59e0b",
        type: "income",
        description: "Business revenue and entrepreneurial income",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Other",
        color: "#64748b",
        type: "both",
        description: "Miscellaneous income and expenses",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("categories", defaultCategories);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
