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
      .when('/articulo/:name', {
        templateUrl: 'views/blog.html',
        controller: 'BlogController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
