(function(){
  "use strict";

  var egoApp = angular.module('egoApp');

  egoApp.controller('schoolController', ['$scope', '$location', '$window','schoolService', 
    'StatusReq', '$routeParams', '$q', 'majorService', 'Notification', 
    function ($scope, $location, $window, schoolService, StatusReq, $routeParams, $q, majorService, Notification) {
      // Declare variables
      $scope.schools = [];
      var alertModalInstance = null;

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

      $scope.loadSchoolEdit = function() {
        $scope.schoolEdit = { loading : true };
        var getSchoolDef = $q.defer();
        schoolService.getSchool($routeParams.schoolId).then(function(result) {
          if(result.status == StatusReq.ok) {
            $scope.schoolEdit = result.data;
          }
        });

        var getRemainMajorsBySchoolIdDef = $q.defer();
        
        $scope.remainMajors = {};
        majorService.getRemainMajorsBySchoolId($routeParams.schoolId).then(function(result) {
          if(result.status == StatusReq.ok) {
            $scope.remainMajors = result.data.majors;
          }
        });

        $q.all([getSchoolDef.promise , majorService.promise ]).then(
          function() { 
              
              $scope.schoolEdit.loading = false;
          });
      }

      $scope.initListSchool = function() {
        schoolService.getListSchool().then(function(result) {
          $scope.schools = result.data;
        });
      }
      
      $scope.showModalAddMajor = function() {
        $scope.show_modal = true;
      }

      $scope.addMajorToSchool = function(schoolId, major) {
        if( $scope.schoolEdit != undefined) {
          schoolService.addMajorToSchool(schoolId, major.id).then(function(result) {
            if(result.status == StatusReq.ok) {
              var index = $scope.remainMajors.indexOf(major);
              $scope.remainMajors.splice(index, 1);
              Notification.success('Add major sucessfull !!!');
            }
          });
        }
      }

    }
  ]);
})();


