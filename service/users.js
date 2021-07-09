const User = require('../model/schemas/UserSchema');
const sendEmail = require('../service/email');
const { nanoid } = require('nanoid');

const getOne = filter => {
  return User.findOne(filter);
};

const getById = id => {
  return User.findById(id);
};

const add = async ({ email, password }) => {
  const verifyToken = nanoid();
  const user = await new User({
    email,
    password,
    verification: false,
    verifyToken,
  });
  await sendEmail(verifyToken, email);
  return await user.save();
};

const update = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const findByVerificationToken = async verifyToken => {
  return await User.findOne({ verifyToken });
};

const updateVerificationToken = async (userId, verification, verifyToken) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { verification, verifyToken },
  );
};

module.exports = {
  getOne,
  add,
  getById,
  update,
  findByVerificationToken,
  updateVerificationToken,
};
