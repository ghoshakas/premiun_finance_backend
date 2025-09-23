const { UserGroup } = require("../models");

exports.create = async (req, res) => {
  try {
    res.json(await UserGroup.createGroup(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.json(await UserGroup.getAllGroups());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const group = await UserGroup.getGroupById(req.params.id);
    if (!group) return res.status(404).json({ error: "Not found" });
    res.json(group);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    res.json(await UserGroup.updateGroup(req.params.id, req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await UserGroup.deleteGroup(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
