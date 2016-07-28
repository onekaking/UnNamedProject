var modules = [
    'ui.router',
    'ngSanitize'
];

var egoApp = angular.module('egoApp', modules);

egoApp.constant('StatusReq', {
  ok: 200
});

egoApp.config(function($locationProvider, $stateProvider) {
  // $routeProvider
  //  .when('/', {
  //   templateUrl: 'templates/index.html',
  //   controller: 'schoolController'
  // })
  // .when('/university', {
  //   templateUrl: 'templates/school.html',
  //   controller: 'schoolController'
  // });

  $stateProvider.
    state('index', {
      url: '/',
      templateUrl: 'templates/index.html',
      controller: 'schoolController'
    })

    .state('university', {
      url: '/university',
      templateUrl: 'templates/school.html',
      controller: 'schoolController'
    })

    .state('university.addPopup', {
      templateUrl: 'templates/addSchool.html'
    });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

});
