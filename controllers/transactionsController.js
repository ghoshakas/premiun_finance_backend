const { Transaction } = require("../models");

// Controller to handle all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { type, amount, description, date } = req.body;
    const transaction = await Transaction.create({
      type,
      amount,
      description,
      date,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
};
