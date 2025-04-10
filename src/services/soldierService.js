const db = require('../db/db');
const ENTITY = 'soldiers';

module.exports = {
  getAll: () => db.getAll(ENTITY),
  getById: (id) => db.getById(ENTITY, id),
  create: (data) => db.create(ENTITY, data),
  update: (id, data) => db.update(ENTITY, id, data),
  patch: (id, data) => db.patch(ENTITY, id, data),
  remove: (id) => db.remove(ENTITY, id)
};
