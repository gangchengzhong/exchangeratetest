const bcrypt = require("bcrypt");

module.exports = app => {
	const Users = app.models.users;
	app.route("/user")
	   .all(app.auth.authenticate())
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
		.delete((req, res) => {
			var id = req.user.id;
			Users.remove({ _id: app.db.Types.ObjectId(id) })
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
	    });
	
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