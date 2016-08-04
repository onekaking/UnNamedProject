var egoApp = angular.module('egoApp');

egoApp.controller('majorController', ['$scope', '$location', '$window','majorService', 'StatusReq', '$routeParams',
  function ($scope, $location, $window, majorService, StatusReq, $routeParams) {
    // Declare variables
    $scope.majors = [];
    var alertModalInstance = null;

    // Event Handler
    $scope.deleteMajor = function(item) {
      if (item.disabled) {
        return;
      }

      item.disabled = true;

      majorService.deleteMajor(item.id).then(function(result) {
        if(result.status == StatusReq.ok) {
          var index = $scope.majors.indexOf(item);
          $scope.majors.splice(index, 1);
        }
      });
    }

    $scope.loadMajorEdit = function() {
      $scope.majorEdit = { loading : true };

      majorService.getMajor($routeParams.majorId).then(function(result) {
        if(result.status == StatusReq.ok) {
          $scope.majorEdit = result.data;
          $scope.majorEdit.loading = false;
        }
      });

    }

    $scope.initListMajor = function() {
      majorService.getListMajor().then(function(result) {
        $scope.majors = result.data;
      });
    }

  }
]);
