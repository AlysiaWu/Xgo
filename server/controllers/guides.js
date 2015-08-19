var mongoose = require('mongoose');
var Traveller = mongoose.model('Traveller');
var Guide = mongoose.model('Guide');
var Review = mongoose.model('Review');
// var Xgo = mongoose.model('Xgo');
module.exports = (function(){
return {
	show:function(req, res){
		Guide.find({}, function(err, results){
			if (err){
				console.log(err);
			}else {
				res.json(results);
			}
		})
	},
	add:function(req, res){
		var new_guide = new Guide({email: req.body.email, username: req.body.username, password: req.body.password, area:req.body.area});
			new_guide.save(function(err, results){
			if(err){
				console.log("ERROR");
			}else{

				res.json(results);
			}
		})
	},
	showone:function(req,res){
		// console.log("showone");
		// console.log(req.params.id);
		// Guide.findOne({_id:req.params.id}).populate('reviews').exec(function(err, guide){

		// 	console.log('inshowone');
		// 	console.log(guide);
		// 	res.json(guide);
		// })
		Guide.findOne({_id:req.params.id}, function(err, guide){
			if(err){
				console.log(err);
			}else {
				// con sole.log(guide);
				res.json(guide);
			}
		});

	},
	searchGuides:function(req,res){
		// console.log(req.body);
	Guide.find(req.body, function(err, result){
		if(err){
				console.log(err);
			}else {
				// console.log(guide);
				res.json(result);
			}
		});
	},
	login: function(req, res){
		// console.log(req.body);
	Guide.find(req.body, function(err, result){
			if(err){
				console.log(err);
			}else {
				// console.log(result);
				res.json(result);
			}
		})
	}
	}

})();