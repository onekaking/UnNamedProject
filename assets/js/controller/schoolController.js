var egoApp = angular.module('egoApp');

egoApp.controller('schoolController', ['$scope', '$location', '$window','schoolService', 'StatusReq',
  function ($scope, $location, $window, schoolService, StatusReq, $modal) {
    // Declare variables
    $scope.schools = [];
    var alertModalInstance = null;

    schoolService.getListSchool().then(function(result) {
      $scope.schools = result.data;
    });

    // Event Handler
    $scope.deleteSchool = function(item) {
      if (item.disabled) {
        return;
      }

      item.disabled = true;

      schoolService.deleteSchool(item.id).then(function(result) {
        if(result.status == StatusReq.ok) {
          var index = $scope.schools.indexOf(item);
          $scope.schools.splice(index, 1);
        }
      });
    }

    // $scope.showPopupAddSchool = function() {
    //   alertModalInstance = $modal.open({
    //     animation: true,
    //     templateUrl: 'templates/addSchool.html',
    //     scope: $scope
    //   });
    // }

  }
]);
