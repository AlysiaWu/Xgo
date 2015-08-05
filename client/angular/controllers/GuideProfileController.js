// Guide Profile
  myApp.controller('GuideProfileController', function($scope, $routeParams, mainfactory){
    // $scope.review = [];
    // console.log("in the controller");
    // console.log($routeParams.id);
    mainfactory.getGuide($routeParams.id, function(data){
      $scope.guide = data;
      console.log($scope.guide);
      // for (var x of data.reviews){
      //   $scope.reviews.push(x);
      //   console.log(x);
      // }
    });

    $scope.review = {};
    $scope.addR = function(){
      console.log($scope.review);
      // $scope.review.push($scope.new_review);
      // consoel.log($scope.review);

    };
// addReview method

  });
