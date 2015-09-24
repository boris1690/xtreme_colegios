(function (_) {

  angular.module('login.controllers', [])
    .controller('LogeoController', ['$scope', '$routeParams', 'logeoService','$location','$rootScope','$localStorage','$window', function ($scope, $routeParams, logeoService,$location,$rootScope,$localStorage,$window) {

        //region Inicializo objeto
        var objeto = function(){
            var labels = {
              'colegio' : '',
              'email' : '',
              'password' : ''

            }

            var set = function(){
              labels.colegio = $scope.colegio;
              labels.email = $scope.email;
              labels.password = $scope.password;
            }

            return {set:set,get:labels}

        }();
        //endregion



        logeoService.getColegios().then(function (data) {
          console.log(data);

        }, function(reason){

        }, function(update) {
          alert('Got notification: ' + update);
        });

        $scope.ejecuta = function()
        {
          objeto.set();

          logeoService.login(objeto.get()).then(function (data) {
            if(data.status===200)
            {
              objecData = data.data.data;

              $localStorage.token = objecData.token;
              $localStorage.usua_codigo = objecData.usua_codigo;
              $localStorage.$save();

              // redirecciono a entorno
              $window.location.href = './views/00_paginas/entorno.html';
            }
            else
            {
              mostrarMensajeError(data.error.error);
            }

          });

        };
    }])

})();
