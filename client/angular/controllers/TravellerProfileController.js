// Traveller Profile
myApp.controller('TProfileController', function($scope, $routeParams, mainfactory){

    // $scope.review = [];
    console.log("traveller profile");
    console.log($routeParams.id);
    mainfactory.getTraveller($routeParams.id, function(data){
 
      $scope.traveller = data;
      $scope.traveller.username;
      // for (var x of data.reviews){
      //   $scope.reviews.push(x);
      //   console.log(x);
      // }    });
    // addReview method
    });
    console.log()

    $scope.fellowTravellers = [];
    $scope.fellowTravellers = function(){
      mainfactory.fellowTravellers($scope.traveller.destination, function(output){
        for (var i = 0; i < output.length; i ++ ){
          if (output[i].username == $scope.traveller.username){
            output.splice(i, 1);
          }
        }
        $scope.fellowTravellers = output;
      })
    };
    
      $scope.searchGuides = function(destination){
      console.log(destination);
      mainfactory.searchGuides({area:destination}, function(output){
        $scope.localGuides = output;
      });

    };


    $scope.publicMsg = [];
    mainfactory.socketOn('server_send_message', function(msg){
      // console.log(msg);
      $scope.publicMsg.push(msg);
    });

    $scope.sendMesage = function(){
      var msg = {
        message: $scope.userMessage,
        sender: $scope.traveller.username
      }
      mainfactory.socketEmit('client_send_message',msg);
      $scope.userMessage = "";
    };

  
  
});