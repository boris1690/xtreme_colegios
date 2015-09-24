(function (_) {

  angular.module('delta.controllers')
      .controller('monitoreoagrupadoController', ['$scope', '$routeParams','$location','$window','$rootScope','$localStorage','monitoreoagrupadoService','$filter','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, $routeParams,$location,$window,$rootScope,$localStorage,monitoreoagrupadoService,$filter,$resource, DTOptionsBuilder, DTColumnDefBuilder) {


          //region Description Variables de iniciacion
          var listado = 'monitorear';
          var itemTable = "";
          var bndPoint = 0;
          $scope.listaEvaluaciones = {};
          $scope.formCons = {};
          $scope.formCons.evaluacion = "";
          $scope.formCons.departamento = "";
          $scope.modelEvaluador = "";
          $scope.modelEvaluado = "";
          //endregion

          //region Description Carga filtros en monitoreo
          monitoreoagrupadoService.getFiltros().then(function (data) {
                $scope.departamentos = data.data.departamento.data;
                $scope.evaluaciones = data.data.evaluacion.data;
                $scope.evaluadores = data.data.usuario.data;
                $scope.evaluados = data.data.usuario.data;
                $scope.relaciones = data.data.relacion.data;
                $scope.listaEvaluacionesNotEmpty = (Object.keys($scope.listaEvaluaciones).length > 0);

                $scope.formCons.evaluacion = $scope.evaluaciones[0].eval_codigo;
                $scope.formCons.departamento = "";
                $scope.modelEvaluador = $scope.evaluadores[0].usua_codigo;
                $scope.modelEvaluado = $scope.evaluados[0].usua_codigo;
                $scope.modelRelacion = $scope.relaciones[0].rela_codigo;

          }, function(reason){

          }, function(update) {
              alert('Got notification: ' + update);
          });
          //endregion

          //region Description Consulta Evaluaciones
          $scope.consultaEvaluaciones = function()
          {
              monitoreoagrupadoService.getEvaluaciones($scope.formCons,listado).then(function (data) {
                  $scope.listaEvaluaciones = data.data.data;
                  $scope.listaEvaluacionesNotEmpty = (Object.keys($scope.listaEvaluaciones).length > 0);
                  bndPoint = 1;
              },function(reason){
                  message(1,400,'Error en consulta.');
              }, function(update) {

              });
          }
          //endregion

          //region Description Ingresar Evaluacion
          $scope.ingresarEvaluacion = function()
          {
              monitoreoagrupadoService.addEvaluacion($scope.formCons.evaluacion,$scope.modelEvaluado,$scope.modelEvaluador,$scope.modelRelacion,$filter('date')(new Date(),'yyyy-MM-dd')).then(function (data) {
                  message(0,0,'Evaluaci&oacute; creada con &Eacute;xito.');
                  $('#modal-tab-not').niftyModal('hide');
              }, function(reason) {
                  message(1,400,'Error en consulta.');
              }, function(update) {
                  alert('Got notification: ' + update);
              });
          }
          //endregion

          //region Description Limpia evaluacion
          $scope.limpiaEvaluacion = function(item)
          {
              evaluacion = item.eval_codigo;
              evaluado = item.usua_codigoevaluado;
              evaluador = item.usua_codigoevaluador;

              monitoreoService.setEvaluacion(evaluacion,evaluado,evaluador).then(function (data) {
                  item.eval_usua_estado = "P";
                  message(0,0,"Evaluaci&oacute;n limpiada con &Eacute;xtio.");
              },function(reason){
                  message(1,400,'Error en consulta.');
              }, function(update) {
                  alert('Got notification: ' + update);
              });

          }
          //endregion

          $scope.eliminarEvaluacion = function(item)
          {
              // Recupero el index del Item
              var index = $scope.listaEvaluaciones.indexOf(item);

              evaluacion = item.eval_codigo;
              evaluado = item.usua_codigoevaluado;
              evaluador = item.usua_codigoevaluador;

              monitoreoService.delEvaluacion(evaluacion,evaluado,evaluador).then(function (data) {
                      // cambio de estado
                      item.eval_usua_estado = "X";
                      // elimino el item en la view
                      $scope.listaEvaluaciones.splice(index, 1);
                      // mensaje de exito
                      message(0,0,"Evaluaci&oacute;n eliminada con &Eacute;xtio.");
              },function(reason){
                  message(1,400,'Error en consulta.');
              }, function(update) {
                  alert('Got notification: ' + update);
              });
          }

          /**
           * init data table
           */

          var vm = this;
          vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);

      }])


})();
