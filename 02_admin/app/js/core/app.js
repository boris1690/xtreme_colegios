(function () {

  var app = angular.module('xtreme', [
      'ngRoute',
      'xtreme.controllers',
      'xtreme.directives',
      'xtreme.filters',
      'xtreme.services'

  ]);

  app.config(['$routeProvider', function ($routeProvider) {



    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      })
      .when('/administrador/:name', {
            templateUrl: function(params){ return 'views/' + params.name + ".html" },
            controller: 'GenericoController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
