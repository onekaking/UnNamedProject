(function(){
  "use strict";

 var egoApp = angular.module('egoApp');

  egoApp.service('imageService', ['$http', function ($http) {
    return {
      getListImage: function() {
        return $http.get('/api/image');
      }
    }
  }]);
})();


