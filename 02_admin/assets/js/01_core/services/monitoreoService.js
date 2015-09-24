(function () {

  angular.module('delta.services')

    .factory('monitoreoService', ['$http', '$q', '$filter', '$window','$localStorage', function ($http, $q, $filter, $window,$localStorage) {

        function getFiltros() {

          var deferred = $q.defer();
          var token = $localStorage.token;
          var codigoUsuario = $localStorage.usua_codigo;

          $http.get('/api/index.php/generic_controller?consulta={"tabla":{"dat_departamento":{"campos":"depa_codigo,depa_nombre","estado":"\'A\'"},"dat_usuario":{"campos":"usua_codigo,usua_nombre,usua_apellido,usua_estado","estado":"\'A\'"},"dat_evaluacion":{"campos":"eval_codigo,eval_fechainicio,eval_fechafin"},"sis_relacion":{"campos":"rela_codigo,rela_nombre"}}}&token=' + token + '&codigousuario=' + codigoUsuario)
              .then(
              function(response) {
                objectResp = response.data.response;
                deferred.resolve(objectResp);
              },
              function(response) {
                // Handle error here
                objectResp = response.data.response;
                deferred.reject(objectResp);
              })

          return deferred.promise;
        }

        function getEvaluaciones(form,listado)
        {
            var deferred = $q.defer();
            var token = $localStorage.token;
            var codigoUsuario = $localStorage.usua_codigo;
            var codigo = "";
            var departamento = "";
            var estado = "";

            if(form!==undefined)
            {
                codigo = form.evaluacion;
                departamento = form.departamento;
                estado = (form.estado==undefined?'':form.estado);
            }

            $http.get('/api/index.php/evaluacion_controller?codigousuario=' + codigoUsuario + '&token=' + token + '&listado=' + listado + "&codigo=" + codigo + "&departamento=" + departamento + "&estado=" + estado + "&items=-1")
                .then(
                function(response) {
                    objectResp = response.data.response;
                    deferred.resolve(objectResp);
                },
                function(response) {
                    // Handle error here
                    objectResp = response.data.response;
                    deferred.reject(objectResp);
                })

            return deferred.promise;
        }

        function setEvaluacion(evaluacion,evaluado,evaluador)
        {
            var deferred = $q.defer();
            var token = $localStorage.token;
            var codigoUsuario = $localStorage.usua_codigo;
            var data = {};

            // armo data
            data.codigo = evaluacion;
            data.codigoevaluado = evaluado;
            data.codigoevaluador = evaluador;
            data.accion = "limpiarevaluacion";
            data.codigousuario = codigoUsuario;
            data.token = token;

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
                    deferred.reject(objectResp);
                });

            return deferred.promise;
        }

         function delEvaluacion(evaluacion,evaluado,evaluador)
         {
             var deferred = $q.defer();
             var token = $localStorage.token;
             var codigoUsuario = $localStorage.usua_codigo;
             var data = {};
              // armo data
             data.codigo = evaluacion;
             data.codigoevaluado = evaluado;
             data.codigoevaluador = evaluador;

             data.codigousuario = codigoUsuario;
             data.token = token;

             $http({
                 url: '/api/index.php/evaluacion_controller',
                 method: "DELETE",
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
                     deferred.reject(objectResp);
                 });

             return deferred.promise;
         }

          function addEvaluacion(evaluacion,evaluado,evaluador,relacion,fecharegistro)
          {
              var deferred = $q.defer();
              var token = $localStorage.token;
              var codigoUsuario = $localStorage.usua_codigo;
              var data = {};

              // armo data
              data.evaluacion = evaluacion;
              data.evaluado = evaluado;
              data.evaluador = evaluador;
              data.relacion = relacion;
              data.fecharegistro = fecharegistro;

              data.codigousuario = codigoUsuario;
              data.token = token;

              $http({
                  url: '/api/index.php/evaluacionusuario_controller',
                  method: "POST",
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
                      //deferred.resolve(objectResp);
                      deferred.reject(objectResp);
                  });

              return deferred.promise;
          }

      return {
        getFiltros : getFiltros,
        getEvaluaciones : getEvaluaciones,
        setEvaluacion : setEvaluacion,
        delEvaluacion : delEvaluacion,
        addEvaluacion : addEvaluacion
      };

    }]);

})();
