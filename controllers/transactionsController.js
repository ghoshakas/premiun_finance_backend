const { Transaction } = require("../models");

// Controller to handle all transactions
const getAllTransactions = async (req, res) => {
  try {
    const { type } = req.query;
    const where = {};
    if (type) {
      where.type = type;
    }
    const transactions = await Transaction.findAll({
      where,
      order: [["transactiondate", "DESC"]], // Order by transactiondate, most recent first
    });
    res.status(200).json({
      message: "Transactions retrieved successfully",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      error: "Failed to fetch transactions",
      details: error.message,
    });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction retrieved successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({
      error: "Failed to fetch transaction",
      details: error.message,
    });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      description,
      amount,
      category,
      account,
      transactiondate,
      reference,
    } = req.body;

    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await transaction.update({
      type,
      description,
      amount,
      category,
      account,
      transactiondate,
      reference,
    });

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({
      error: "Failed to update transaction",
      details: error.message,
    });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await transaction.destroy();
    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({
      error: "Failed to delete transaction",
      details: error.message,
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const {
      type,
      description,
      amount,
      category,
      account,
      transactiondate,
      reference,
    } = req.body;

    // Basic validation
    if (!type || !amount || !transactiondate) {
      return res.status(400).json({
        error:
          "Missing required fields: type, amount, and transactiondate are required",
      });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        error: "Amount must be a positive number",
      });
    }

    const transaction = await Transaction.create({
      type,
      description,
      amount,
      category,
      account,
      transactiondate,
      reference,
    });

    res.status(201).json({
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      error: "Failed to create transaction",
      details: error.message,
    });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
