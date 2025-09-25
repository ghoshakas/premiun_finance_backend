const { Transaction } = require("../models");
const { Op } = require("sequelize");

// Get monthly balances with surplus carry-over
const getMonthlyBalances = async (req, res) => {
  try {
    // Get all transactions ordered by date
    const transactions = await Transaction.findAll({
      order: [["transactiondate", "ASC"]],
    });

    // Group transactions by month/year
    const monthlyData = {};
    transactions.forEach((tx) => {
      const date = new Date(tx.transactiondate);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!monthlyData[key]) monthlyData[key] = { income: 0, expense: 0 };
      if (tx.type.toLowerCase() === "income") {
        monthlyData[key].income += tx.amount;
      } else if (tx.type.toLowerCase() === "expense") {
        monthlyData[key].expense += tx.amount;
      }
    });

    // Calculate balances with surplus carry-over
    let prevSurplus = 0;
    const result = [];
    Object.keys(monthlyData)
      .sort()
      .forEach((key) => {
        const { income, expense } = monthlyData[key];
        const surplus = income - expense;
        const currentBalance = income - expense + prevSurplus;
        result.push({
          month: key,
          income,
          expense,
          surplus,
          currentBalance,
        });
        prevSurplus = surplus > 0 ? surplus : 0;
      });

    res.status(200).json({
      message: "Monthly balances with surplus carry-over",
      data: result,
    });
  } catch (error) {
    console.error("Error calculating monthly balances:", error);
    res.status(500).json({
      error: "Failed to calculate monthly balances",
      details: error.message,
    });
  }
};

module.exports = { getMonthlyBalances };
