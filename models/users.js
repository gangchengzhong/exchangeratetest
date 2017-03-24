module.exports = app => {
	var Schema = app.db.Schema;
	// create user schema
	var userSchema = new Schema({
  		name: String,
  		email: String,
  		password: String
	});
	// compile the user model
	return app.db.model('user', userSchema);
};