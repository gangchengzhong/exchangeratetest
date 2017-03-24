const bcrypt = require("bcrypt");

module.exports = app => {
	const Users = app.models.users;
	app.route("/user")
	   .all(app.auth.authenticate())
	   /**
        * @api {get} /user Return the authenticated user's data
        * @apiGroup User
        * @apiHeader {String} Authorization Token of authenticated user
        * @apiHeaderExample {json} Header
        *   {"Authorization": "JWT abc.def.123.ght"}
        * @apiSuccess {Objectid} _id User id
        * @apiSuccess {String} name User name
        * @apiSuccess {String} email User email
        * @apiSuccessExample {json} Success
        *   HTTP/1.1 200 OK
        *   {
        *     "_id": "58d33e7ce4d6157cb6b6c9d8",
        *     "name": "John",
        *     "email": "john@test.com"
        *   }
        * @apiErrorExample {json} Find error
        *   HTTP/1.1 412 Precondition Failed
        */
	   .get((req, res) => {
			var id = req.user.id;
			Users.findOne({_id : app.db.Types.ObjectId(id)}, 'name email')
				.then(user => {
					if (user) {
						res.json(user);
					} else {
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
	    })
	    /**
         * @api {delete} /user Deletes an authenticated user
         * @apiGroup User
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *  {"Authorization": "JWT abc.def.123.ght"}
         * @apiSuccessExample {json} Success
         *  HTTP/1.1 204 No Content
         * @apiErrorExample {json} Delete error
         *  HTTP/1.1 412 Precondition Failed
         */
		.delete((req, res) => {
			var id = req.user.id;
			Users.remove({ _id: app.db.Types.ObjectId(id) })
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
	    });
	
	/**
     * @api {post} /users Register a new user
     * @apiGroup User
     * @apiParam {String} name User name
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParamExample {json} Input
     *   {
     *     "name": "John",
     *     "email": "john@test.com",
     *     "password": "12345"
     *   }
     * @apiSuccess {Objectid} _id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccess {String} password User encrypted password
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 OK
     *   {
     *     "_id": "58d33e7ce4d6157cb6b6c9d8",
     *     "name": "John",
     *     "email": "john@test.com",
     *     "password": "$2a$10$sy6TouSAAIxJBMVwpa"
     *   }
     * @apiErrorExample {json} Register error
     *   HTTP/1.1 412 Precondition Failed
     */
	app.post("/users", (req, res) => {
		var salt = bcrypt.genSaltSync();
		var password = bcrypt.hashSync(req.body.password, salt);
		req.body.password = password;
		Users.create(req.body)
			.then(result => res.json(result))
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
	});
};