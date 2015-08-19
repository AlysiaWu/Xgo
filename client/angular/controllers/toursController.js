myApp.controller('toursController', function($scope, $routeParams, mainfactory){
	mainfactory.getTours(function(data){
		$scope.tours = data;
		console.log(data);
	});

	// mainfactory.book(function())
	$scope.book=function(){
		
	}
})