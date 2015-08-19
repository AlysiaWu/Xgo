var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TourSchema = new mongoose.Schema({
	guide_id: String,
	tour_name: String,
	fee: String,
	duration: String,
	tour_description: String,
	availabilities: String,
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
	created_at: {type: Date, default: Date.now}
});

mongoose.model('Tour', TourSchema);