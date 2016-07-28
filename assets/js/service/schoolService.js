var egoApp = angular.module('egoApp');

egoApp.service('schoolService', ['$http', function ($http) {
  return {
    getListSchool: function() {
      return $http.get('/api/school');
    },
    deleteSchool: function(id) {
      return $http.delete('/api/school/' + id );
    }
  }
}]);
