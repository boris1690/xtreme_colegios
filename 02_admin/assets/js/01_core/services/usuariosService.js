/**
 * Created by Sandino Dávila on 19/08/15.
 */

(function () {
    angular.module('delta.services')
        .factory('usuariosService', ['$http', '$q', '$filter', '$window', '$localStorage', function ($http, $q, $filter, $window, $localStorage){
            // variables globales
            var token = $localStorage.token;
            var codigoUsuario = $localStorage.usua_codigo;

            /**
             * Consulta las tablas a cargar en combos
             * @returns {promise|a.fn.promise}
             */
            function getSelects(){
                // declaración variable local
                var deferred = $q.defer();
                // llamada api GET genérico
                $http.get('/api/index.php/generic_controller?consulta={"tabla":{"ref_perfil":{"campos":"perf_codigo,perf_nombre","estado":"\'A\'"},"dat_departamento":{"campos":"depa_codigo,depa_nombre","estado":"\'A\'"},"sis_catalogo":{"codigo":"1"},"sis_catalogo1":{"codigo":"2"},"sis_catalogo2":{"codigo":"4"}}}&token=' + token + '&codigousuario=' + codigoUsuario)
                    .then(
                    function(response) {
                        objectResp = response.data.response;
                        deferred.resolve(objectResp);
                    },
                    function(response) {
                        // Handle error here
                        objectResp = response.data.response;
                        deferred.reject(objectResp);
                    }
                )
                return deferred.promise;
            }

            /**
             * Consulta los usuarios
             * @returns {promise|a.fn.promise}
             */
            function getUsuarios(filtros){
                // declaración variable local
                var deferred = $q.defer();
                var data = "?codigousuario=" + codigoUsuario + "&token=" + token + "&items=1000";
                if(filtros != '')
                    data += "&" + filtros;
                // llamada api GET usuarios
                $http.get("/api/index.php/usuario_controller" + data)
                    .then(
                        function(response) {
                            objectResp = response.data.response;
                            deferred.resolve(objectResp);
                        },
                        function(response) {
                            // Handle error here
                            objectResp = response.data.response;
                            deferred.reject(objectResp);
                        }
                    )
                return deferred.promise;
            }

            /**
             * inserta un nuevo usuario
             * @param usuario
             * @returns {promise|a.fn.promise}
             */
            function postUsuario(usuario){
                // declaración variable local
                var deferred = $q.defer();
                usuario.codigousuario = codigoUsuario;
                usuario.token = token;

                var form_data = new FormData();
                for ( var key in usuario ) {
                    form_data.append(key, usuario[key]);
                }
                // post usuario
                $http({
                    url: '/api/index.php/usuario_controller',
                    method: "POST",
                    data: form_data,
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(
                    function(response) {
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

            /**
             * actualización del usuario
             * @param usuario
             * @returns {promise|a.fn.promise}
             */
            function putUsuario(usuario){

                // declaración variable local
                var deferred = $q.defer();
                usuario.codigousuario = codigoUsuario;
                usuario.token = token;

                var form_data = new FormData();
                for ( var key in usuario ) {
                    form_data.append(key, usuario[key]);
                }
                // post usuario
                $http({
                    url: '/api/index.php/usuario_controller',
                    method: "PUT",
                    data: form_data,
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(
                    function(response) {
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

            /**
             * eliminar un usuario
             * @param usuario
             * @returns {promise|a.fn.promise}
             */
            function deleteUsuario(usuario){
                // declaración variable local
                var deferred = $q.defer();
                usuario.codigousuario = codigoUsuario;
                usuario.token = token;
                // post usuario
                $http({
                    url: '/api/index.php/usuario_controller',
                    method: "DELETE",
                    data: usuario
                }).then(
                    function(response) {
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

            /**
             * Retorna las consultas
             */
            return {
                getSelects : getSelects,
                getUsuarios : getUsuarios,
                postUsuario : postUsuario,
                putUsuario : putUsuario,
                deleteUsuario : deleteUsuario
            };
        }])
})();