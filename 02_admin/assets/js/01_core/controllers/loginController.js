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
              labels.colegio = $scope.frm.colegio;
              labels.email = $scope.frm.email;
              labels.password = $scope.frm.password;
            }

            var get = function(){
                return labels;
            }

            return {set:set,get:get}

        }();
        //endregion



        logeoService.getColegios().then(function (data) {

          objecResp = new decodeJson(data);

          $scope.colegios = objecResp.data;

        }, function(reason){

        }, function(update) {
          alert('Got notification: ' + update);
        });



        $scope.ejecuta = function()
        {
            objeto.set();


            logeoService.login(objeto.get()).then(function (data) {

                objecResp = new decodeJson(data);
                // redirecciono a entorno
                $window.location.href = './views/00_paginas/entorno.html';

            }, function(reason){
                toastr.warning('Alerta!', 'Email o password incorrectos!');

            }, function(update){

                alert('Got notification: ' + update);
            });

        };
    }])

})();
