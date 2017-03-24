/**
 * Initialize Rate model
 */
module.exports = app => {
	var Schema = app.db.Schema;
	// create rate schema
	var rateSchema = new Schema({
  		disclaimer: String,
  		license: String,
  		timestamp: Number,
  		base: String,
  		rates: {}
	});
	// compile the rates model
	return app.db.model('rate', rateSchema);
};