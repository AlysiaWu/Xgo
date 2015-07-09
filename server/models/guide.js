var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GuideSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
	area: String,
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
	created_at: {type: Date, default: Date.now}
});

mongoose.model('Guide', GuideSchema);