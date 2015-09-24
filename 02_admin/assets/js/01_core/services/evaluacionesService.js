(function () {

  angular.module('delta.services')

    .factory('evaluacionesService', ['$http', '$q', '$filter', '$window','$localStorage', function ($http, $q, $filter, $window,$localStorage) {

        function getEvaluaciones(codigo,listado) {

          var deferred = $q.defer();
          var token = $localStorage.token;
          var codigoUsuario = $localStorage.usua_codigo;

          $http.get('/api/index.php/evaluacion_controller?codigousuario=' + codigoUsuario + '&token=' + token + '&listado=' + listado + '&usuario=' + codigo)
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

        function getEvaluacion(codigo,listado,liderazgo,evaluado,evaluacion) {

            var deferred = $q.defer();
            var token = $localStorage.token;
            var codigoUsuario = $localStorage.usua_codigo;
            var codigoevaluado = evaluado;
            var codigoevaluador = codigo;
            var evaluacion = evaluacion;

             $http.get('/api/index.php/conducta_controller?codigousuario=' + codigoUsuario + '&token=' + token + '&codigoevaluado=' + evaluado + '&codigoevaluador=' + codigoevaluador + '&evaluacion=' + evaluacion + '&campos=cond_codigo,cond_nombre,regi_codigotipocompetencia&estado=A')
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

          function setEvaluacion(usuarioevaluado,evaluacion,usuarioevaluador,codigo,comentarios,accion) {

              var deferred = $q.defer();
              var token = $localStorage.token;
              var codigoUsuario = $localStorage.usua_codigo;

              var deferred = $q.defer();
              var token = $localStorage.token;
              var codigoUsuario = $localStorage.usua_codigo;
              var accionGuarFina = "";

              if(accion=='G')
                  accionGuarFina = 'guardar';
              else
                  accionGuarFina = 'finalizar';

              // add lel token
              var form = {};
              form.codigousuario = codigoUsuario;
              form.token = token;
              form.usuarioevaluado = usuarioevaluado;
              form.evaluacion = evaluacion;
              form.usuarioevaluador = usuarioevaluador;
              form.codigo = codigo;
              form.comentarios = comentarios;
              form.accion = accionGuarFina;

              $http({
                  url: '/api/index.php/conducta_controller',
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

      return {
        getEvaluaciones : getEvaluaciones,
        getEvaluacion : getEvaluacion,
        setEvaluacion : setEvaluacion
      };

    }]);

})();
