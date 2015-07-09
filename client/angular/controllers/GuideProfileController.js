// Guide Profile
  myApp.controller('GuideProfileController', function($scope, $routeParams, mainfactory){
    // $scope.review = [];
    console.log("in the controller");
    console.log($routeParams.id);
    mainfactory.getGuide($routeParams.id, function(data){
      $scope.guide = data;
      console.log($scope.guide);
      // for (var x of data.reviews){
      //   $scope.reviews.push(x);
      //   console.log(x);
      // }
    });
// addReview method

  })