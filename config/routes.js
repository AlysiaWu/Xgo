var travellers = require('./../server/controllers/travellers.js');
var guides = require('./../server/controllers/guides.js');
var tours = require('./../server/controllers/tours.js');
module.exports = function(app) {
  app.get('/travellers', function (req, res) {
    travellers.show(req, res);
  });
  app.post('/addTraveller', function (req, res) {
    travellers.add(req, res);
  });

  app.post('/fellowTravellers', function (req, res) {
    // console.log(req.body);
    travellers.fellowTravellers(req, res);
  }); 
  app.post('/login', function (req, res) {
    // console.log(req.body);
    passport.authenticate('local');
    travellers.login(req, res);
  });
   app.post('/loginG', function (req, res) {
    // console.log(req.body);
     passport.authenticate('local');
    guides.login(req, res);
  });

  app.get('/guides', function (req, res) {
    guides.show(req, res);
  });
  app.get('/guides/:id', function (req, res) {
    guides.showone(req, res);
  });
   app.post('/searchGuides', function (req, res) {
    guides.searchGuides(req, res);
  });
  app.get('/traveller/:id', function (req, res) {
    travellers.showone(req, res);
  });
  app.post('/addGuide', function (req, res){
    guides.add(req, res);
  });
  app.post('/addTour/:id', function(req, res){
    tours.addTour(req,res);
  })

 app.get('/tours', function (req, res) {
      tours.show(req, res);
    });
  // app.post('/likeAnswer', function (req, res){
  //   answers.likeAnswer(req, res);
  // })


};

