/**
 * Created by Sandino Dávila on 19/08/15.
 */

(function () {
    angular.module('delta.controllers')
        .controller('usuariosController', ['$scope', '$routeParams','$location','$window','$rootScope','$localStorage','usuariosService', function ($scope, $routeParams,$location,$window,$rootScope,$localStorage,usuariosService) {

            // variables globales
            var usuario = {};
            var defaultForm = {
                perfil : "",
                departamento : "",
                tipo: "",
                liderazgo: "",
                nombre: "",
                apellido: "",
                email: "",
                cedula: "",
                estado: "A"
            };

            /**
             * listado de cada options de los selects
             */
            usuariosService.getSelects().then(function (data){
                // listado de selects
                $scope.perfiles = data.data.perfil.data;
                $scope.departamentos = data.data.departamento.data;
                $scope.tipos = data.data.catalogo.data;
                $scope.liderazgos = data.data.catalogo1.data;
                $scope.secciones = data.data.catalogo2.data;

                // selected defaults
                defaultForm.perfil = data.data.perfil.data[0].perf_codigo;
                defaultForm.departamento = data.data.departamento.data[0].depa_codigo;
                defaultForm.tipo = data.data.catalogo.data[0].regi_codigo;
                defaultForm.liderazgo = data.data.catalogo1.data[0].regi_codigo;
                // cargar el primer dato
                $scope.form = {
                    perfil: data.data.perfil.data[0].perf_codigo,
                    departamento: data.data.departamento.data[0].depa_codigo,
                    tipo: data.data.catalogo.data[0].regi_codigo,
                    liderazgo: data.data.catalogo1.data[0].regi_codigo,
                    estado: 'A'
                }
            },function(reason){
                message(1,400,'Error en consulta.');
            }, function(update) {

            });

            /**
             * listado de usuarios
             */
            usuariosService.getUsuarios("campos=usua_codigo,CONCAT(usua_nombre,' ',usua_apellido) as nombre&estado='A','I'").then(function (data){
                    $scope.usuarios = data.data.data;
                    //$('#datatable-icons').dataTable();
            },function(reason){
                message(1,400,'Error en consulta.');
            }, function(update) {

            });

            /**
             * obtiene un usuario por el código
             * @param codigo
             */
            $scope.seleccionar = function(codigo){
                usuariosService.getUsuarios("codigo=" + codigo).then(function (data){
                    $scope.form.codigo = data.data.data[0].usua_codigo;
                    $scope.form.perfil = data.data.data[0].perf_codigo;
                    $scope.form.departamento = data.data.data[0].depa_codigo;
                    $scope.form.tipo = data.data.data[0].regi_codigotipo;
                    $scope.form.seccion = data.data.data[0].regi_codigoseccion;
                    $scope.form.liderazgo = data.data.data[0].regi_codigoliderazgo;
                    $scope.form.nombre = data.data.data[0].usua_nombre;
                    $scope.form.apellido = data.data.data[0].usua_apellido;
                    $scope.form.email = data.data.data[0].usua_email;
                    $scope.form.cedula = data.data.data[0].usua_cedula;
                    $scope.form.estado = data.data.data[0].usua_estado;
                },function(reason){
                    message(1,400,'Error en consulta.');
                }, function(update) {

                });
            }

            /**
             * acciones usuarios
             */

            $scope.accion = function(parAcc)
            {
                switch(parAcc)
                {
                    /**
                     * Ingresar usuario
                     */
                    case 'I':
                        ingresar();
                        break;
                    /**
                     * Actualizar usuario
                     */
                    case 'A':
                        actualizar();
                        break;
                    /**
                     * Eliminar usuario
                     */
                    case 'E':
                        eliminar();
                        break;
                }
            }

            /**
             * ingresar usuario
             */
            ingresar = function(){
                // seteo variables
                seteoUsuario();
                // llamado al servicio
                usuariosService.postUsuario(usuario).then(function (data) {

                    $scope.usuarios.push({
                        usua_codigo: data.data.data.codigo,
                        usua_nombre: $scope.nombre,
                        usua_apellido: $scope.apellido
                    });
                    message(0, 0, "Usuario ingresado con &Eacute;xito.");
                    limpiar();

                },function(reason){
                    message(1,400,'Error en consulta.');
                }, function(update) {

                });
            }

            /**
             * actualizar usuario
             */
            actualizar = function(){
                // seteo variables
                seteoUsuario();
                // llamado al servicio
                usuariosService.putUsuario(usuario).then(function (data) {
                        $scope.usuarios.push({
                            usua_codigo: data.data.data.codigo,
                            usua_nombre: $scope.nombre,
                            usua_apellido: $scope.apellido
                        });
                        message(0, 0, "Usuario actualizado con &Eacute;xito.");
                        limpiar();
                },function(reason){
                    message(1,400,'Error en consulta.');
                }, function(update) {

                });
            }

            /**
             * eliminar usuario
             */
            eliminar = function(){
                // seteo variables
                usuario.codigo = $scope.codigo;
                // llamado al servicio
                usuariosService.deleteUsuario(usuario).then(function (data) {
                    if(data.status === 200){
                        $scope.usuarios.push({
                            usua_codigo: data.data.data.codigo,
                            usua_nombre: $scope.nombre,
                            usua_apellido: $scope.apellido
                        });
                        message(0, 0, "Usuario eliminado con &Eacute;xito.");
                        limpiar();
                    }
                });
            }

            /**
             * limpia los campos del formulario
             */
            $scope.limpiar = function(){
                // setea los input
                $scope.form = defaultForm;
                $scope.formUsuario.$setPristine();
            }

            /**
             * setea las variables con los campos input
             */
            seteoUsuario = function(){
                usuario = $scope.form;
            }

            /**
             * init data table
             */
            $scope.initDataTable = function()
            {
                //Horizontal Icons dataTable
                $('#datatable-icons').dataTable();
            }
        }])
})();