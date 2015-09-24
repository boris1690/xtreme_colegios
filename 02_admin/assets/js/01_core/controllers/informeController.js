(function (_) {

  angular.module('delta.controllers')
      .controller('informeController', ['$scope', '$routeParams','$location','$window','$rootScope','$localStorage','informeService','$filter','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, $routeParams,$location,$window,$rootScope,$localStorage,informeService,$filter,$resource, DTOptionsBuilder, DTColumnDefBuilder) {

          var listado = 'informe';
          var usuario = $localStorage.usua_codigo;

          $scope.listaInformes = {};
          $scope.formCons = {};
          $scope.formCons.evaluacion = "";
          $scope.formCons.departamento = "";


          informeService.getFiltros().then(function (data) {
            if(data.status === 200)
            {
                $scope.departamentos = data.data.departamento.data;
                $scope.evaluaciones = data.data.evaluacion.data;

                if(Object.keys($scope.evaluaciones).length>0)$scope.formCons.evaluacion = $scope.evaluaciones[0].eval_codigo;
                if(Object.keys($scope.departamentos).length>0)$scope.formCons.departamento = "";
            }
            else
            {

            }
          });

          $scope.consultaInformes = function()
          {
              informeService.getInformes($scope.formCons,listado,usuario).then(function (data) {
                  $scope.listaInformes = data.data.data;

              });
          }

          $scope.consultaInforme = function(informe)
          {
              $('#modal-tab-not').niftyModal('show');
          }

          /**
           * init data table
           */

          var vm = this;
          vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);

          }])
})();