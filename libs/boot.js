module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
	app.listen(app.get("port"), () => {
		console.log(`Exchange Rate API - Port ${app.get("port")}`);
	});
  }
};