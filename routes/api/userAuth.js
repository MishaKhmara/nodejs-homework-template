// const passport = require("passport");

// const useAuth = (req, res, next)=>{
//     passport.authenticate("jwt", {session: false}, (error, user) => {
//         if(!user || error) {
//             return res.status(401).json({
//                 status: "error",
//                 code: 401,
//                 message: "Unauthorize"
//             })
//         }
//         req.user = user;
//         next();
//     })
// }

// module.exports = useAuth;

const passport = require('passport');
require('../../configs/configPassport');


const useAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const header = req.get('Authorization');
    if (!header) {
      return next({
        status: 401,
        message: 'Not authorized',
      });
    }
    const [, token] = header.split(' ');
    if (!user || err || token !== user.token) {
      return next({
        status: 401,
        message: 'Not authorized',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = useAuth;