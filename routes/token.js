const jwtS = require("jwt-simple");
const bcrypt = require("bcrypt");
const cfg = require("../libs/config.js");

module.exports = app => {
  const Users = app.models.users;

  /**
   * @api {post} /token Authentication Token
   * @apiGroup Credentials
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *   {
   *     "email": "john@test.com",
   *     "password": "123"
   *   }
   * @apiSuccess {String} token Token of authenticated user
   * @apiSuccessExample {json} Success
   *   HTTP/1.1 200 OK
   *   {"token": "xxxxxx"}
   * @apiErrorExample {json} Authentication error
   *   HTTP/1.1 401 Unauthorized
   */
  app.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      Users.findOne({email: email})
        .then(user => {
          if (bcrypt.compareSync(password, user.password)) {
            var payload = {id: user._id};
            res.json({
              token: jwtS.encode(payload, cfg.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    } else {
        res.sendStatus(401);
    }
  });
};