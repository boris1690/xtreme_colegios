/**
 * Created by Sandino Dávila on 21/08/15.
 */

(function () {
    angular.module('delta.controllers')
        .controller('perfilesController', ['$scope', '$routeParams','$location','$window','$rootScope','$localStorage','perfilesService', function ($scope, $routeParams,$location,$window,$rootScope,$localStorage,perfilesService) {

            /**
             * listado de opciones
             */
            perfilesService.getOpciones().then(function (data){
                if(data.status === 200)
                    $scope.opciones = data.data.data;
            });

            /**
             * listado de perfiles
             */
            perfilesService.getPerfiles().then(function (data){
                if(data.status === 200)
                    $scope.perfiles = data.data.data;
            });
        }])
})();