const { ContributionPlan } = require("../models");

exports.create = async (req, res) => {
  try {
    res.json(await ContributionPlan.createPlan(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.json(await ContributionPlan.getAllPlans());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const plan = await ContributionPlan.getPlanById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Not found" });
    res.json(plan);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    res.json(await ContributionPlan.updatePlan(req.params.id, req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await ContributionPlan.deletePlan(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
