(function () {

  angular.module('login.services', [])

    .factory('logeoService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {

        function login(object) {

            var deferred = $q.defer();
            var data = object;

            $http({
                url: '/xapi/login',
                method: "POST",
                data: data
            })
                .then(function(response) {
                    // success
                    objectResp = response.data;
                    deferred.resolve(objectResp);
                },
                function(response) { // optional
                    // failed
                    objectResp = response.data;
                    deferred.reject(objectResp);
                });


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
