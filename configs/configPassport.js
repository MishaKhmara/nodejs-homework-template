const passport = require('passport');
const passportJWT = require('passport-jwt');
require('dotenv').config();

const users = require('../service/users');

const { ExtractJwt, Strategy } = passportJWT;
const { TOKEN_KEY } = process.env;

const options = {
  secretOrKey: TOKEN_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await users.getById(payload.id);
      if (!user) {
        throw new Error('User not found');
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
