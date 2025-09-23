const { InwardTransaction } = require("../models");

exports.create = async (req, res) => {
  try {
    res.json(await InwardTransaction.createTxn(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.json(await InwardTransaction.getAllTxns());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const transaction = await InwardTransaction.getTxnById(req.params.id);
    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    res.json(await InwardTransaction.updateTxn(req.params.id, req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await InwardTransaction.deleteTxn(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
