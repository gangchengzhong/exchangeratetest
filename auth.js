const passport = require("passport");
const jwt = require("passport-jwt");
const cfg = require("./libs/config.js");

module.exports = app => {
  const Users = app.models.users;
  const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeader()
  };
  const strategy = new jwt.Strategy(params, (payload, done) => {
  	  var id = app.db.Types.ObjectId(payload.id);
      Users.findOne({_id : id})
        .then(user => {
          if (user) {
            return done(null, {
              id: user._id,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(error => done(error, null));
    });
  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};