const unitService = require('../services/unitService');

module.exports = {
  getAll: (req, res) => res.json(unitService.getAll()),

  getById: (req, res) => {
    const unit = unitService.getById(req.params.id);
    if (!unit) return res.status(404).json({ error: 'Часть не найдена' });
    res.json(unit);
  },

  create: (req, res) => {
    const newUnit = unitService.create(req.body);
    res.status(201).json(newUnit);
  },

  update: (req, res) => {
    const updated = unitService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Часть не найдена' });
    res.json(updated);
  },

  patch: (req, res) => {
    const patched = unitService.patch(req.params.id, req.body);
    if (!patched) return res.status(404).json({ error: 'Часть не найдена' });
    res.json(patched);
  },

  remove: (req, res) => {
    unitService.remove(req.params.id);
    res.status(204).send();
  }
};
