(function(){
  "use strict";

  var modules = [
      'ngRoute',
      'ngSanitize',
      'angularMoment',
      'ui-notification',
      'angularify.semantic.dropdown',
      'angularify.semantic.modal'
  ];

  var egoApp = angular.module('egoApp', modules);

  egoApp.constant('StatusReq', {
    ok: 200
  });

  egoApp.config(function($routeProvider, $locationProvider, NotificationProvider) {
    $routeProvider.when('/', {
      redirectTo: "/school"
    });

    // For School
    $routeProvider
    .when('/school', {
      templateUrl: 'templates/school.html',
      controller: 'schoolController'
    })
    .when('/school/add', {
      templateUrl: '/templates/addschool.html',
      controller: 'schoolController'
    })
    .when('/school/:schoolId', {
      templateUrl: '/templates/schooldetail.html',
      controller: 'schoolController'
    });

    // For Major
    $routeProvider
    .when('/major', {
      templateUrl: 'templates/major.html',
      controller: 'majorController'
    })
    .when('/major/add', {
      templateUrl: '/templates/addMajor.html',
      controller: 'majorController'
    })
    .when('/major/:majorId', {
      templateUrl: '/templates/majordetail.html',
      controller: 'majorController'
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    NotificationProvider.setOptions({
        delay: 3000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });

  });

  egoApp.run(function(amMoment) {
      amMoment.changeLocale('vi');
  });
})();


