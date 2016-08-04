var egoApp = angular.module('egoApp');

egoApp.controller('majorController', ['$scope', '$location', '$window','imageService', 'StatusReq', '$routeParams',
  function ($scope, $location, $window, imageService, StatusReq, $routeParams) {
    // Declare variables
    $scope.images = [];

    // Event Handler
    

    $scope.initListImage = function() {
      imageService.getListImage().then(function(result) {
        $scope.images = result.data;
      });
    }

  }
]);
