(function (_) {

  angular.module('delta.controllers', [])
    .controller('EntornoController', ['$scope', '$routeParams','$location','$window','$rootScope','$localStorage','$filter','entornoService', function ($scope, $routeParams,$location,$window,$rootScope,$localStorage,$filter,entornoService) {
        var codigoUsuario = $localStorage.usua_codigo;
        $scope.rand = $filter('date')(new Date(),'yyyyMMddHHmmss');

        entornoService.getUser(codigoUsuario).then(function (data) {
            if(data.status===200) {
                $scope.usuario = data.data.data[0];
                $scope.menu = data.data.data;

                // redirecciono a la primera opcion
                if(Object.keys($scope.menu).length==1)
                {
                    $location.path( "/" +  $scope.menu[0].siop_url);
                }
            }
            else
                $window.location.href = '/';
        });
    }])
})();
