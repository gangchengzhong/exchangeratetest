const app = require("express")();
const consign = require("consign")({verbose: false});

consign
	.include("db.js")
	.then("models")
	.then("auth.js")
	.then("libs/middlewares.js")
	.then("routes")
	.then("libs/boot.js")
	.into(app);

module.exports = app;