(function (_) {

  angular.module('xtreme.controllers', [])
    .controller('IndexController', ['$scope', '$routeParams', 'xtremeService', function ($scope, $routeParams, xtremeService) {
      //var type = $routeParams.type;

      /*if (type) {
        $scope.type = type;

        pokemonService.byType(type).then(function (data) {
          $scope.pokemons = data
          $scope.groupped = partition(data, 4);
        });
      } else {
        pokemonService.all().then(function (data) {
          $scope.pokemons = data;
          $scope.groupped = partition(data, 4);
        });
      }

    */

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }


          xtremeService.all().then(function (data){

              $scope.blogs = data;
              $scope.groupped = partition(data, 4);

          })

          $scope.tipo="1";


    }])
    .controller('BlogController', ['$scope', '$routeParams', 'xtremeService', function ($scope, $routeParams, xtremeService) {

      var name = $routeParams.name;
      $scope.blogs = {};

      xtremeService.byName(name)
      .then(function (data) {
        $scope.blogs = data;
      });
    }]);

})(_);
