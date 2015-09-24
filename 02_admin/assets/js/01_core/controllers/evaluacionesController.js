(function (_) {

  angular.module('delta.controllers')
    .controller('evaluacionesController', ['$scope', '$routeParams','$location','$window','$rootScope','$localStorage','evaluacionesService','$filter', function ($scope, $routeParams,$location,$window,$rootScope,$localStorage,evaluacionesService,$filter) {
          var codigo = $localStorage.usua_codigo;
          var listado = 'rendir';
          var codigoliderazgo = "";
          var itemLst;
          $scope.rand = $filter('date')(new Date(),'yyyyMMddHHmmss');
          $scope.$param = "XX";
          $scope.rendir = {};
          $scope.formrendir = {};
          $scope.formrendir.rdb = {};
          $scope.formrendir.select = '0';
          $scope.tab = 1;
          $scope.totalcompetencia = 1;
          $scope.objCompetencias = {};

          evaluacionesService.getEvaluaciones(codigo,listado).then(function (data) {
              $scope.evaluaciones = data.data.data;
          });

          $scope.recuperaEvaluacion = function(item,index){
              $scope.tab = 1;
              console.log(item);
              codigoliderazgo = item.regi_codigoliderazgo;
              $scope.rendir.rand = $filter('date')(new Date(),'yyyyMMddHHmmss');
              $scope.rendir.cedula = item.usua_cedula;
              $scope.rendir.foto = item.usua_foto;
              $scope.rendir.nombre = item.usua_nombre + " " + item.usua_apellido;
              $scope.rendir.departamento = item.depa_nombre;
              $scope.rendir.relacion = item.rela_nombre;
              $scope.rendir.codigorelacion = item.rela_codigo;

              $scope.formrendir.evaluacion = item.eval_codigo;
              $scope.formrendir.evaluador = codigo;
              $scope.formrendir.evaluado = item.usua_codigo;
              itemLst = item;
              codigoEvaluado = $scope.formrendir.evaluado;
              codigoEvaluacion = $scope.formrendir.evaluacion;
              $scope.submitted = false;


              evaluacionesService.getEvaluacion(codigo,listado,codigoliderazgo,codigoEvaluado,codigoEvaluacion).then(function (data) {

                  var competenciaconducta = data.data.data;

                  angular.forEach(competenciaconducta, function(value, key) {
                      competenciaconducta[key].checked = competenciaconducta[key].eval_usua_comp_valor;
                  });
                  //console.log(competenciaconducta);

                  delete $scope.competenciaconducta;

                  $scope.competenciaconducta = competenciaconducta;
                  $scope.totalcompetencia = $filter('groupBy')($scope.competenciaconducta,'regi_nombre');
                  $scope.objCompetencias = $scope.totalcompetencia;
                  $scope.totalcompetencia = Object.keys($scope.totalcompetencia).length;

                  $('#reply-ticket').niftyModal('show');
                  $('.md-overlay').unbind('click')
                  //initialize the javascript
                  $(".tab-content").scrollTop(0);
              });

          }

          $scope.guardaevaluacion = function(accion){

              var usuarioevaluado = "";
              var evaluacion = "";
              var usuarioevaluador = "";
              var codigo = "";
              var comentarios = "";
              var lstCodigos = {};


              angular.forEach($scope.competenciaconducta, function(value, key) {
                  lstCodigos[value['cond_codigo']] = value['checked'];
              });

              usuarioevaluado = $scope.formrendir.evaluado;
              evaluacion = $scope.formrendir.evaluacion;
              usuarioevaluador = $scope.formrendir.evaluador;
              codigo = lstCodigos;
              comentarios = $scope.formrendir.comentarios;

              evaluacionesService.setEvaluacion(usuarioevaluado,evaluacion,usuarioevaluador,codigo,comentarios,accion).then(function (data) {

                  if(data.status === 200)
                  {
                      if(accion=='F') {
                          itemLst.eval_usua_estado = 'F';
                          message(0, 0, "Evaluaci&oacute;n realizada con &Eacute;xito.");
                          $('#reply-ticket').niftyModal('hide');
                      }else if(accion=='G') {
                          itemLst.eval_usua_estado = 'G';
                          message(0, 0, "Evaluaci&oacute;n guardada con &Eacute;xito.");
                      }
                  }
              });

          }

          $scope.validaForm = function()
          {
              if($scope.myForm.$invalid)
                  message(1,400,'Faltan validar campos.');
          }

          $scope.selectTab = function (tab) {
              var validaConductas = true;

              if (tab == 'S') {
                  angular.forEach($scope.objCompetencias[Object.keys($scope.objCompetencias)[$scope.tab - 1]], function (value, key) {
                      if (value.checked == null) {
                          validaConductas = false;
                      }
                  });
                  if (validaConductas == true) {
                      if (($scope.tab + 1) <= $scope.totalcompetencia)
                      {
                          $scope.guardaevaluacion('G');
                          $scope.tab = $scope.tab + 1;

                      }
                  }
                  else {
                      if ($scope.myForm.$invalid)
                          message(1, 400, 'Faltan validar campos.');
                  }
              }
              else {
                  if (($scope.tab - 1) > 0)$scope.tab = $scope.tab - 1;
              }
          };
    }])
})();
