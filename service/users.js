const User = require('../model/schemas/UserSchema');

const getOne = filter => {
  return User.findOne(filter);
};

const getById = id => {
  return User.findById(id);
};

const add = async ({ email, password }) => {
  const user = new User({ email, password });
  return await user.save();
};

const update = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = {
  getOne,
  add,
  getById,
  update,
};
