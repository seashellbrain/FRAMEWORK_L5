const fs = require('fs');
const path = require('path');

const getPath = (entity) => path.join(__dirname, `${entity}.json`);

function read(entity) {
  const file = fs.readFileSync(getPath(entity), 'utf-8');
  return JSON.parse(file);
}

function write(entity, data) {
  fs.writeFileSync(getPath(entity), JSON.stringify(data, null, 2));
}

function getAll(entity) {
  return read(entity);
}

function getById(entity, id) {
  return read(entity).find(item => item.id === Number(id));
}

function create(entity, item) {
  const data = read(entity);
  item.id = Date.now();
  data.push(item);
  write(entity, data);
  return item;
}

function update(entity, id, updatedItem) {
  const data = read(entity);
  const index = data.findIndex(item => item.id === Number(id));
  if (index === -1) return null;
  data[index] = { ...updatedItem, id: Number(id) };
  write(entity, data);
  return data[index];
}

function patch(entity, id, patchData) {
  const data = read(entity);
  const index = data.findIndex(item => item.id === Number(id));
  if (index === -1) return null;
  data[index] = { ...data[index], ...patchData };
  write(entity, data);
  return data[index];
}

function remove(entity, id) {
  const data = read(entity);
  const filtered = data.filter(item => item.id !== Number(id));
  write(entity, filtered);
  return true;
}

module.exports = { getAll, getById, create, update, patch, remove };
