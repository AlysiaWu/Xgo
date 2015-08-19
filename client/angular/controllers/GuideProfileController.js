// Guide Profile
  myApp.controller('GuideProfileController', function($scope, $routeParams, mainfactory){
$scope.events = [];
$scope.calendarOptions = {
  height: 450,
  editable: true,
    calendar: {
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        defaultView: 'agendaWeek',
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
           console.log("hehe");
            var title = prompt('Event Title:');
             console.log("haha");
            if (title) {
                $scope.$apply(function(){
                    $scope.events.push({
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    });
                });

            }
            // should call 'unselect' method here
        },
        editable: true
    }
};
$scope.eventSources = [$scope.events];

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

  $scope.addTour= function(){

    console.log($scope.new_tour);
    mainfactory.addTour($routeParams.id, $scope.new_tour, function(output){
      $scope.tour=output;
      console.log(output);
      $scope.new_tour={};
    })
    };



  });
