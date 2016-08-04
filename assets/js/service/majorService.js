(function(){
  "use strict";

  var egoApp = angular.module('egoApp');

  egoApp.service('majorService', ['$http', function ($http) {
    return {
      getListMajor: function() {
        return $http.get('/api/major');
      },

      deleteMajor: function(id) {
        return $http.delete('/api/major/' + id );
      },

      getRemainMajorsBySchoolId: function(id) {
        return $http.get('/api/major/remainbyschool/' + id );
      },
      
      getMajor: function(id) {
        return $http.get('/api/major/'+ id);
      }
    }
  }]);
})();


