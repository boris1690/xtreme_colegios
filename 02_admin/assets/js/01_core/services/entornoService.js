(function () {

  angular.module('Navigate.services', [])

    .factory('entornoService', ['$http', '$q', '$filter', '$window','$localStorage', function ($http, $q, $filter, $window,$localStorage) {

        function getUser(codigo) {

          var deferred = $q.defer();
          var token = $localStorage.token;
          var codigoUsuario = $localStorage.usua_codigo;

          $http.get('/api/index.php/navigate_controller?codigousuario=' + codigoUsuario + '&token=' + token + "&codigo=" + codigo)
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
      return {
        getUser : getUser
      };

    }]);

})();
