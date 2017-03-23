/**
 * Use Mongoose to connect to MongoDB
 */
const mongoose = require("mongoose");
const config = require("./libs/config.js");

mongoose.connect(config.uri, config.options, (error) => {
	if (error) {
		console.error(error.message);
	}
});

module.exports = mongoose;