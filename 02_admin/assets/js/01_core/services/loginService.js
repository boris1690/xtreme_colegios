(function () {

  angular.module('login.services', [])

    .factory('logeoService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {

        function login(username,password) {

          var deferred = $q.defer();

          $http.get('/api/index.php/login_controller?usuario=' + username + '&password=' + password)
              .then(
              function(response) {
                objectResp = response.data.response;
                deferred.resolve(objectResp);
              },
              function(response) {
                // Handle error here
                objectResp = response.data.response;
                deferred.resolve(objectResp);

              })


          return deferred.promise;
        }

        function getColegios() {

          var deferred = $q.defer();

          $http.get('/xapi/publicocolegios')
              .then(
              function(response) {
                objectResp = response.data;
                deferred.resolve(objectResp);
              },
              function(response) {
                // Handle error here
                objectResp = response.data;
                deferred.reject(objectResp);
              })

          return deferred.promise;
        }



      return {
        login : login,
        getColegios : getColegios
      };

    }]);

})();
