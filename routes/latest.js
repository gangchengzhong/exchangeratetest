module.exports = app => {
	const Rates = app.models.rates;
	app.route("/latest")
	    .all(app.auth.authenticate())
	    /**
         * @api {get} /latest Get the latest exchange rates
         * @apiGroup Latest
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *   {"Authorization": "JWT abc.def.123.ght"}
         * @apiSuccess {Objectid} _id User id
         * @apiSuccess {String} disclaimer Exchange rates disclaimer
         * @apiSuccess {String} license Exchange rates license
         * @apiSuccess {Number} timestamp Exchange rates created timestamp
         * @apiSuccess {String} base Default Exchange rate
         * @apiSuccess {Object} rates Exchange rates information
         * @apiSuccessExample {json} Success
         *   HTTP/1.1 200 OK
         *   {
         *     "_id": "58d33e7ce4d6157cb6b6c9d8",
         *     "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
         *     "license": "https://openexchangerates.org/license",
         *     "timestamp": "1490086800",
         *     "base": "USD",
         *     "rate":
         *       {
         *         AED:3.672896
         *         AFN:66.83
         *         ALL:125.754441
         *         ......
         *       }
         *   }
         * @apiErrorExample {json} Latest exchange rates not found error
         *   HTTP/1.1 404 Not Found
         * @apiErrorExample {json} List error
         *   HTTP/1.1 412 Precondition Failed
         */
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