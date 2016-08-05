(function(){
  "use strict";

  var egoApp = angular.module('egoApp');

  egoApp.service('schoolService', ['$http', function ($http) {
    return {
      getListSchool: function() {
        return $http.get('/api/school');
      },

      deleteSchool: function(id) {
        return $http.delete('/api/school/' + id );
      },

      getSchool: function(id) {
        return $http.get('/api/school/' + id );
      },

      addMajorToSchool: function(schoolId, majorId) {
        return $http.post('/api/school/'+ schoolId +'/addmajor/' + majorId );
      },

      removeMajorFromSchool: function(schoolId, majorId) {
        return $http.delete('/api/school/'+ schoolId +'/removemajor/' + majorId );
      }
    }
  }]);
})();

