var myApp = angular.module('myApp', ['ngRoute']);
  myApp.config(function ($routeProvider) {
    $routeProvider
      .when('/',{
        templateUrl: 'partials/home.html'
      })
      .when('/travellers',{
        templateUrl: 'partials/travellers.html'    
      })
      .when('/guides',{
        templateUrl: 'partials/guides.html'    
      })
      .when('/guide/:id/',{
        templateUrl: 'partials/show_guide.html'
      })
      // .when('/question/:id/new_answer',{
      //   templateUrl: 'partials/new_answer.html'
      // })
     .when('/traveller/:id/',{
          templateUrl: 'partials/show_traveller.html'
        })

      .otherwise({
        redirectTo: '/'
      });
  });

  myApp.factory("mainfactory", function($http, $rootScope){
    var factory = {};
    var travellers = [];
    var guides = [];
      factory.getTravellers = function(callback) {
          $http.get('/travellers').success(function(output) {
            travellers = output;
            callback(travellers);
          });
        };
      factory.getTraveller = function(id, callback){

        $http.get('/traveller/'+id).success(function(output) {
         traveller = output;
          callback(traveller);
       });
      };

      factory.addTraveller = function(info, callback) {
        $http.post('/addTraveller',info).success(function(output) {
          console.log('new travel', output);
          if (Array.isArray(output)){
            error(output);
          } 
          else {
            callback(output);
          }       
        });
      };
      factory.fellowTravellers= function (info, callback){
        // console.log(info);
        $http.post('/fellowTravellers', {destination: info}).success(function(output){
            callback(output);
        }); 
      }; 
      factory.logintraveller= function (info, callback){
        console.log(info);
        $http.post('/login', info).success(
          function(output){
            console.log(output);
          callback(output);
        });

      };
      factory.loginguide= function (info, callback){
        console.log(info);
        $http.post('/loginG', info).success(
          function(output){
            console.log(output);
          callback(output);
        });

      };
      factory.getGuides = function(callback) {
        $http.get('/guides').success(function(output) {
          guides = output;
          callback(guides);
        });
      };

      factory.getGuide = function(id, callback){

        $http.get('/guides/'+id).success(function(output) {
          guide = output;
          callback(guide);
        });
      };
      factory.addGuide = function(info, callback) {
        $http.post('/addGuide',info).success(function(output) {
          console.log('new guide', output);
          if (Array.isArray(output)){
            error(output);
          } else {
            callback(output);
          }         
        });
      };

      factory.searchGuides = function (destination, callback){
        console.log(destination);
        $http.post('/searchGuides',destination).success(
          function(output){
            callback(output);
          });
      }


      // factory.selectGuide = function(info, callback) {
      //   $http.post('/selectGuide', info).success(function(output) {
      //     travellers.push(output);
      //     callback(travellers);
      //   });
      // };

      var socket = io.connect();

      factory.socketOn = function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      }

      factory.socketEmit = function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }

return factory;
  }); 

 
 






