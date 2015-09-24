(function () {

  angular.module('delta.services')

    .factory('informeService', ['$http', '$q', '$filter', '$window','$localStorage', function ($http, $q, $filter, $window,$localStorage) {

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
                deferred.resolve(objectResp);
              })

          return deferred.promise;
        }

        function getInformes(form,listado,usuario)
        {
            var deferred = $q.defer();
            var token = $localStorage.token;
            var codigoUsuario = $localStorage.usua_codigo;
            var strForm = "";

            if(form!==undefined)
                strForm = "&" + $.param(form);

            $http.get('/api/index.php/evaluacion_controller?codigousuario=' + codigoUsuario + '&token=' + token + '&usuario=' + usuario + '&listado=' + listado + strForm)
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
        getFiltros : getFiltros,
          getInformes : getInformes
      };

    }]);

})();
