var mongoose = require('mongoose');
var Tour = mongoose.model('Tour');
// var Xgo = mongoose.model('Xgo');
module.exports = (function(){
return {
	addTour:function(req, res){
		var new_tour = new Tour({_id: req.params.id, tour_name: req.body.tour_name, fee: req.body.fee, duration:req.body.duration, tour_description: req.body.tour_description, availabilities: req.body.availabilities});
			new_tour.save(function(err, results){
			if(err){
				console.log("ERROR");
			}else{
				console.log("addtour");
				res.json(results);
			}
		})
	}, 
	show: function(req, res){
		Tour.find({}, function(err, results){
			if (err){
				console.log(err);
			}else {
				res.json(results);
			}
		}) 
	}
}


})();