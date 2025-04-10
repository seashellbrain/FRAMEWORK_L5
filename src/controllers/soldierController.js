const soldierService = require('../services/soldierService');

module.exports = {
  getAll: (req, res) => res.json(soldierService.getAll()),

  getById: (req, res) => {
    const soldier = soldierService.getById(req.params.id);
    if (!soldier) return res.status(404).json({ error: 'Солдат не найден' });
    res.json(soldier);
  },

  create: (req, res) => {
    const newSoldier = soldierService.create(req.body);
    res.status(201).json(newSoldier);
  },

  update: (req, res) => {
    const updated = soldierService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Солдат не найден' });
    res.json(updated);
  },

  patch: (req, res) => {
    const patched = soldierService.patch(req.params.id, req.body);
    if (!patched) return res.status(404).json({ error: 'Солдат не найден' });
    res.json(patched);
  },

  remove: (req, res) => {
    soldierService.remove(req.params.id);
    res.status(204).send();
  }
};
