module.exports = app => {
	const Rates = app.models.rates;
	app.route("/latest")
	    .all(app.auth.authenticate())
		.get((req, res) => {
			Rates.findOne({timestamp : 1490086800})
				.then(rate => {
					if (rate) {
						res.json(rate);
					} else {
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
};