(function () {

  var app = angular.module('xtreme', [
      'ngRoute',
      'xtreme.controllers'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      })
      .when('/:type', {
        templateUrl: 'views/pokedex.html',
        controller: 'PokedexController'
      })
      .when('/pokemon/:name', {
        templateUrl: 'views/pokemon.html',
        controller: 'PokemonController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
