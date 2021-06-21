const { Contact } = require("../models");

const getAll = (query) => {
  return Contact.find(query);
};

const getOne = (id) => {
  return Contact.findById(id);
};

const add = (body) => {
  return Contact.create(body);
};

const update = (id, body) => {
  return Contact.findByIdAndUpdate(id, body);
};

const updateStatus = (id, status) => {
  return Contact.findByIdAndUpdate(id, { status });
};

const del = (id) => {
  return Contact.findByIdAndDelete(id);
};

const service = {
  getAll,
  getOne,
  add,
  update,
  del,
  updateStatus,
};

module.exports = service;
