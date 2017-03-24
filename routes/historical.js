module.exports = app => {
	const Rates = app.models.rates;
	app.route("/historical/:date")
	    .all(app.auth.authenticate())
		.get((req, res) => {
		    var date = req.params;
		    // TODO need to convert date to timestamp
		    // for test, just use 1490054399
		    // since I have only inserted few rates documents
		    var timestamp = 1490054399;
			Rates.findOne({timestamp : timestamp})
				.then(rate => {
					if (rate) {
						res.json(rate);
					} else {
						// not found
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
};