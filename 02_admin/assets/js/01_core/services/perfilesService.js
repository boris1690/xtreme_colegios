/**
 * Created by Sandino Dávila on 21/08/15.
 */

(function () {
    angular.module('delta.services')
        .factory('perfilesService', ['$http', '$q', '$filter', '$window', '$localStorage', function ($http, $q, $filter, $window, $localStorage){
            // variables globales
            var token = $localStorage.token;
            var codigoUsuario = $localStorage.usua_codigo;

            /**
             * Consulta las opciones con los módulos
             * @returns {promise|a.fn.promise}
             */
            function getOpciones(){
                // declaración variable local
                var deferred = $q.defer();
                // llamada api GET perfiles
                $http.get("/api/index.php/sistemaopcion_controller?codigousuario=" + codigoUsuario + "&token=" + token + "&campos=siop_codigo,siop_nombre&estado='A'")
                    .then(
                    function(response) {
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    },
                    function(response) {
                        // Handle error here
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    }
                )
                return deferred.promise;
            }

            /**
             * Consulta los perfiles
             * @returns {promise|a.fn.promise}
             */
            function getPerfiles(){
                // declaración variable local
                var deferred = $q.defer();
                // llamada api GET perfiles
                $http.get("/api/index.php/perfil_controller?codigousuario=" + codigoUsuario + "&token=" + token + "&campos=perf_codigo,perf_nombre&estado='A','I'")
                    .then(
                    function(response) {
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    },
                    function(response) {
                        // Handle error here
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    }
                )
                return deferred.promise;
            }

            /**
             * Retorna las consultas
             */
            return {
                getOpciones : getOpciones,
                getPerfiles : getPerfiles
            };
        }])
})();