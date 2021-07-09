const users = require('../service/users');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await users.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Alredy register',
      });
    }

    const data = await users.add({
      email,
      password,
    });
    const { TOKEN_KEY } = process.env;
    const payload = {
      id: data._id,
    };
    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Add sucess',
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.getOne({ email });

    if (!user || !user.validPassword(password) || !user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect email or password',
      });
    }

    const payload = {
      id: user._id,
    };
    const { TOKEN_KEY } = process.env;

    const token = await jwt.sign(payload, TOKEN_KEY);

    await users.update(user._id, token);

    return res.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    if (error.message === '') {
      error.message = 'Invalid password';
      error.code = 404;
    }
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await users.update(req.user._id, null);
    return res.status(204).json({
      status: 'success',
      code: 204,
      message: 'Success logout',
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const User = req.user;
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email: User.email,
          subscription: User.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await users.findByVerificationToken(
      req.params.verificationToken,
    );
    if (!user) {
      return next({
        status: 404,
        message: 'User not found',
      });
    }
    await users.updateVerificationToken(user.id, true, null);
    return res.json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  verify,
};
