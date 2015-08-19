// Guide Profile
myApp.controller('GuideProfileController', function($scope, $routeParams, mainfactory){
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
   /* event source that contains custom events on the scope */
$scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
   /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

   $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };

     /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

/* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

/* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
/* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };


 /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

$scope.uiconfig = {
      height: 450,
      width: 500,
      editable: true,
      calendar: {
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      dayClick: $scope.alertEventOnClick,
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender,
      defaultView: 'agendaWeek',
      selectable: true,
      selectHelper: true,
      select: function(start, end, allDay) {
         // console.log("hehe");
          var title = prompt('Event Title:');
           // console.log("haha");
          if (title) {
              $scope.$apply(function(start, end){
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
      editable: true,
    }
};
// $scope.eventSources = [$scope.events];

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
