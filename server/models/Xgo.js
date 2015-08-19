var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var XgoSchema = new mongoose.Schema({
	//user info
	email: String,
	username: String,
	password: String,
	area: String,
	role: String,
	//tour info
	tour_name: String,
	fee: String,
	duration: String,
	tour_description: String,
	availabilities: String,
	//review
	review: String,
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
	created_at: {type: Date, default: Date.now}
});

mongoose.model('Xgo', XgoSchema);