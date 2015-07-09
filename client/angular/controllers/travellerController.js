// Traveller Controller
  myApp.controller('travellersController', function ($scope,  $location, mainfactory){
     mainfactory.getTravellers(function(data){
        $scope.travellers = data;
        // console.log($scope.users);
        });

      $scope.addTraveller = function(){
          console.log($scope.new_traveller);
          if ($scope.new_traveller.password.length<7)
            {
              $scope.err_password = {msg: "the password needs to be at least 7 characters!"};
            
            }else{
              mainfactory.addTraveller($scope.new_traveller, function(output){

              // console.log($scope.new_traveller);
              // console.log('checkout');
              // console.log(output);
              $scope.travellers.push(output);
              $scope.new_traveller={};
              // $scope.prop2 = "Second";
            //    $scope.both = sharedProperties.setProperty(output) + $scope.prop2;
              // console.log('transfer');
              $location.path("/traveller/" + output._id);
              });
            }
        }
        $scope.logintraveller= function (){

          mainfactory.logintraveller($scope.login, function(output){
            // console.log(output[0]._id);
             $location.path("/traveller/" + output[0]._id);

          })

        }







  });