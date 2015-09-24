(function (_) {

  angular.module('delta.controllers')
      .controller('lanzarevaluacionesController', ['$scope', '$routeParams','$location','$window','$rootScope','$localStorage','lanzarevaluacionesService','$filter', function ($scope, $routeParams,$location,$window,$rootScope,$localStorage,lanzarevaluacionesService,$filter) {

        var codigo = $localStorage.usua_codigo;
        var listado = 'lanzar';

        //cargo rn rl form el usuario
        $scope.formEval = {};
        $scope.formEval.usuario = codigo;
        $scope.formEval.pesocomppeda = "";
        $scope.formEval.pesocomporga  = "";
        $scope.formEval.fechainicio = "";
        $scope.formEval.fechafin = "";
        $scope.formEval.estado = "A";
        $scope.formEval.fecharegistro = $filter('date')(new Date(),'yyyy-MM-dd');

        $scope.registarevaluacion = function()
        {
          //Valido datos
          if(validaDatos())
          {
            lanzarevaluacionesService.addEvaluaciones($scope.formEval).then(function (data) {

              if(data.status === 200)
              {
                message(0,0,"Evaluaci&oacute;n creada con &Eacute;xtio.");
                $scope.evaluaciones.push({
                    eval_codigo:data.data.data.codigo,
                    eval_evaluados:data.data.data.eval_evaluados,
                    eval_evaluaciones:data.data.data.eval_evaluaciones,
                    eval_porcentaje:data.data.data.eval_porcentaje
                });

                // LImpio
                $scope.formEval = {};
                $scope.formEval.usuario = codigo;
                $scope.formEval.fecharegistro = $filter('date')(new Date(),'yyyy-MM-dd');

                $('#modal-tab-not').niftyModal('hide');
              }
              else
              {
                mostrarMensajeError(data.error.error);
              }

            });
          }

        }

        lanzarevaluacionesService.getEvaluaciones(codigo,listado).then(function (data) {
          $scope.evaluaciones = data.data.data;

          $('.epie-chart').easyPieChart({
            barColor: '#FD9C35',
            trackColor: '#EFEFEF',
            lineWidth: 7,
            animate: 600,
            size: 103,
            onStep: function(val){//Update current value while animation
              $("span", this.$el).html(parseInt(val) + "%");
            }
          });
        })

        $scope.eliminaEvaluacion = function(codigo)
        {
          lanzarevaluacionesService.delEvaluacion(codigo).then(function (data) {
            if(data.status === 200)
            {
              item.eval_usua_estado = "X";
              message(0,0,"Evaluaci&oacute;n eliminada con &Eacute;xtio.");
            }
          })
        }

        /**
         * Inicializo charts
         */
        $scope.initChart = function()
        {
          alert();
          /*$('.epie-chart').easyPieChart({
            barColor: '#FD9C35',
            trackColor: '#EFEFEF',
            lineWidth: 7,
            animate: 600,
            size: 70,
            onStep: function (val) {
              //Update current value while animation
              $("span", this.$el).html(parseInt(val) + "%");
            }

          });*/

        }

        /**
         * init data table
         */
        $scope.initChart = function()
        {
          $('.epie-chart').easyPieChart({
            barColor: '#FD9C35',
            trackColor: '#EFEFEF',
            lineWidth: 7,
            animate: 600,
            size: 70,
            onStep: function (val) {
              //Update current value while animation
              $("span", this.$el).html(parseInt(val) + "%");
            }

          });

        }

        validaDatos = function()
        {
          if($scope.formEval.pesocomppeda == ""){message(1,400,'Ingrese Peso de Valores Pedag&oacute;gico.');return false;};
          if($scope.formEval.pesocomporga  == ""){message(1,400,'Ingrese Peso de Valores Organizacionales.');return false;};
          if($scope.formEval.fechainicio == ""){message(1,400,'Ingrese Fecha de Inicio.');return false;};
          if($scope.formEval.fechafin == ""){message(1,400,'Ingrese Fecha Fin.');return false;};
          if($scope.formEval.fechafin == ""){message(1,400,'Ingrese Fecha Fin.');return false;};
          // Validacion especial
          if((parseInt($scope.formEval.pesocomppeda,10) + parseInt($scope.formEval.pesocomporga,10)) != 100 ){message(1,400,'La suma de los pesos deben se igual a 100.');return false;};

          return true;
        }


      }])
})();
