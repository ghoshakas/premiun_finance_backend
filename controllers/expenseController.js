const { Expense } = require("../models");

exports.create = async (req, res) => {
  try {
    res.json(await Expense.createExpense(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.json(await Expense.getAllExpenses());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const expense = await Expense.getExpenseById(req.params.id);
    if (!expense) return res.status(404).json({ error: "Not found" });
    res.json(expense);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    res.json(await Expense.updateExpense(req.params.id, req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Expense.deleteExpense(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
