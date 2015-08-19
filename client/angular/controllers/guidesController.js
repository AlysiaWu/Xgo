// Guides Controller
     myApp.controller('guidesController', function ($scope,  $location, mainfactory){
         mainfactory.getGuides(function(data){
            $scope.guides = data;
            // console.log($scope.users);
            });

          $scope.addGuide = function(){
              console.log($scope.new_guide);
              if ($scope.new_guide.password.length<7)
                {
                  $scope.err_password = {msg: "the password needs to be at least 7 characters!"};

                }else{
                  mainfactory.addGuide($scope.new_guide, function(output){
                  console.log('checkout');
                  console.log(output);
                  $scope.guides.push(output);
                 $scope.new_guide={};
                  // $scope.prop2 = "Second";
                  console.log(output._id);
                //    $scope.both = sharedProperties.setProperty(output) + $scope.prop2;
                $location.path("/guide/" + output._id);
                  });
                }
            }
          $scope.loginguide= function (){
            mainfactory.loginguide($scope.login, function(output){
                  // console.log(output[0]._id);
            $location.path("/guide/" + output[0]._id);

          })

        }



      });



