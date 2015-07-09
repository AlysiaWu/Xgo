var mongoose = require('mongoose');
var Traveller = mongoose.model('Traveller');
var Guide = mongoose.model('Guide');
var Review = mongoose.model('Review');
module.exports = (function(){
return {
	show:function(req, res){
		Traveller.find({}, function(err, results){
			if (err){
				console.log(err);
			}else {
				res.json(results);
			}
		})
	},
	add:function(req, res){
		console.log('in travellers.js in server controller');
		var new_traveller = new Traveller({email: req.body.email, username: req.body.username, password: req.body.password, destination:req.body.destination});
		new_traveller.save(function(err, results){
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
		Traveller.findOne({_id:req.params.id}, function(err, traveller){
			if(err){
				console.log(err);
			}else {
				// console.log(traveller);
				res.json(traveller);
			}
		});

	}, 
	fellowTravellers: function(req, res){

		Traveller.find(req.body,function(err, result){
			if(err){
				console.log(err);
			}else {
				// console.log(result);
				res.json(result);
			}

		})
	}, 
	login: function(req, res){
		// console.log(req.body);
	Traveller.find(req.body, function(err, result){
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