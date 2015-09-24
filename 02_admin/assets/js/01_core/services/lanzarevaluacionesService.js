(function () {

  angular.module('delta.services')

    .factory('lanzarevaluacionesService', ['$http', '$q', '$filter', '$window','$localStorage', function ($http, $q, $filter, $window,$localStorage) {

        function getEvaluaciones(codigo,listado) {

          var deferred = $q.defer();
          var token = $localStorage.token;
          var codigoUsuario = $localStorage.usua_codigo;

          $http.get('/api/index.php/evaluacion_controller?codigousuario=' + codigoUsuario + '&token=' + token + '&listado=' + listado)
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

        function addEvaluaciones(form) {

          var deferred = $q.defer();
          var token = $localStorage.token;
          var codigoUsuario = $localStorage.usua_codigo;

          // add lel token
          form.codigousuario = codigoUsuario;
          form.token = token;
          form.fecharegistro = "2015-08-12";

          $http({
                url: '/api/index.php/evaluacion_controller',
                method: "POST",
                data: form

              })
              .then(function(response) {
                // success
                objectResp = response.data.response;
                deferred.resolve(objectResp);
              },
              function(response) { // optional
                // failed
                objectResp = response.data.response;
                deferred.resolve(objectResp);
              });

          return deferred.promise;
        }

          function delEvaluacion(evaluacion)
          {
              var deferred = $q.defer();
              var token = $localStorage.token;
              var codigoUsuario = $localStorage.usua_codigo;
              var data = {};
              // armo data
              data.codigo = evaluacion;
              data.codigousuario = codigoUsuario;
              data.token = token;
              data.accion = "cerrarevaluacion";

              $http({
                  url: '/api/index.php/evaluacion_controller',
                  method: "PUT",
                  data: data
              })
                  .then(function(response) {
                      // success
                      objectResp = response.data.response;
                      deferred.resolve(objectResp);
                  },
                  function(response) { // optional
                      // failed
                      objectResp = response.data.response;
                      deferred.resolve(objectResp);
                  });

              return deferred.promise;
          }

      return {
        getEvaluaciones : getEvaluaciones,
        addEvaluaciones : addEvaluaciones,
        delEvaluacion : delEvaluacion
      };

    }]);
})();
