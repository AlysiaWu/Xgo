// var prompt = prompt ("hey");
var myApp = angular.module('myApp', ['ngRoute', 'ui.calendar']);
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
     .when('/tours', {
        templateUrl: 'partials/tours.html'
     })
     .when('/book', {
        templateUrl: 'partials/book.html'
     })
      .otherwise({
        redirectTo: '/'
      });
  });

  myApp.factory("mainfactory", function($http, $rootScope){
    var factory = {};
    var travellers = [];
    var guides = [];
    var tours = [];
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
        console.log('in addTraveller in mainfactory');
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

      factory.addTour = function(id, info, callback){
      console.log(id)
        $http.post('/addTour/id', info).success(function(output){
          callback(output);
        })
      }

      factory.getTours = function(callback){
        $http.get('/tours').success(function(output){
          callback(output);
        })
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


// ********************************************

//  // Guide Profile
//   myApp.controller('GuideProfileController', function($scope, $routeParams, mainfactory){
//     // $scope.review = [];
//     console.log("in the controller");
//     console.log($routeParams.id);
//     mainfactory.getGuide($routeParams.id, function(data){
//       $scope.guide = data;
//       console.log($scope.guide);
//       // for (var x of data.reviews){
//       //   $scope.reviews.push(x);
//       //   console.log(x);
//       // }
//     });
// // addReview method

//   })

// // Guides Controller
//      myApp.controller('guidesController', function ($scope,  $location, mainfactory){
//          mainfactory.getGuides(function(data){
//             $scope.guides = data;
//             // console.log($scope.users);
//             });
//           $scope.addGuide = function(){
//               console.log($scope.new_guide);
//               if ($scope.new_guide.password.length<7)
//                 {
//                   $scope.err_password = {msg: "the password needs to be at least 7 characters!"};

//                 }else{
//                   mainfactory.addGuide($scope.new_guide, function(output){
//                   console.log('checkout');
//                   console.log(output);
//                   $scope.guides.push(output);
//                  $scope.new_guide={};
//                   // $scope.prop2 = "Second";
//                   console.log(output._id);
//                 //    $scope.both = sharedProperties.setProperty(output) + $scope.prop2;
//                 $location.path("/guide/" + output._id);
//                   });
//                 }
//             }
//               $scope.loginguide= function (){
//           mainfactory.loginguide($scope.login, function(output){
//             // console.log(output[0]._id);
//              $location.path("/guide/" + output[0]._id);

//           })
//         }
//       });

// // Traveller Controller
//   myApp.controller('travellersController', function ($scope,  $location, mainfactory){
//      mainfactory.getTravellers(function(data){
//         $scope.travellers = data;
//         // console.log($scope.users);
//         });

//       $scope.addTraveller = function(){
//           console.log($scope.new_traveller);
//           if ($scope.new_traveller.password.length<7)
//             {
//               $scope.err_password = {msg: "the password needs to be at least 7 characters!"};

//             }else{
//               mainfactory.addTraveller($scope.new_traveller, function(output){

//               // console.log($scope.new_traveller);
//               // console.log('checkout');
//               // console.log(output);
//               $scope.travellers.push(output);
//               $scope.new_traveller={};
//               // $scope.prop2 = "Second";
//             //    $scope.both = sharedProperties.setProperty(output) + $scope.prop2;
//               // console.log('transfer');
//               $location.path("/traveller/" + output._id);
//               });
//             }
//         }
//         $scope.logintraveller= function (){

//           mainfactory.logintraveller($scope.login, function(output){
//             // console.log(output[0]._id);
//              $location.path("/traveller/" + output[0]._id);

//           })

//         }

//   });

// // Traveller Profile
// myApp.controller('TProfileController', function($scope, $routeParams, mainfactory){

//     // $scope.review = [];
//     console.log("traveller profile");
//     console.log($routeParams.id);
//     mainfactory.getTraveller($routeParams.id, function(data){

//       $scope.traveller = data;
//       $scope.traveller.username;
//     });
//     console.log()

//     $scope.fellowTravellers = [];
//     $scope.fellowTravellers = function(){
//       mainfactory.fellowTravellers($scope.traveller.destination, function(output){
//         for (var i = 0; i < output.length; i ++ ){
//           if (output[i].username == $scope.traveller.username){
//             output.splice(i, 1);
//           }
//         }
//         $scope.fellowTravellers = output;
//       })
//     };
//       $scope.searchGuides = function(destination){
//       console.log(destination);
//       mainfactory.searchGuides({area:destination}, function(output){
//         $scope.localGuides = output;
//       });

//     }

//     $scope.publicMsg = [];
//     mainfactory.socketOn('server_send_message', function(msg){
//       // console.log(msg);
//       $scope.publicMsg.push(msg);
//     });

//     $scope.sendMesage = function(){
//       var msg = {
//         message: $scope.userMessage,
//         sender: $scope.traveller.username
//       }
//       mainfactory.socketEmit('client_send_message',msg);
//       $scope.userMessage = "";
//     };
// });






