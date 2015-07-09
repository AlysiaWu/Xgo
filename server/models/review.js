var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReviewSchema = new mongoose.Schema({
	review: String,
	_traveller: {type: Schema.ObjectId, ref: 'Traveller'},
	_guide: {type: Schema.ObjectId, ref: 'Guide'},
	created_at: {type: Date, default: Date.now}
});

mongoose.model('Review', ReviewSchema);