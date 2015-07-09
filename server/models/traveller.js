var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TravellerSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
	destination: String,
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
	created_at: {type: Date, default: Date.now}
});
mongoose.model('Traveller', TravellerSchema);