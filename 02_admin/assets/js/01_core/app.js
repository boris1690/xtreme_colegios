(function () {

  var app = angular.module('LoginApp', [
    'ngRoute',
    'ngStorage',
    'login.controllers',
    'login.directives',
    'login.services',
    'ui.router'
  ]);

  app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

    $stateProvider

      // Index will decide if redirects to Login or Dashboard view
        .state("login", {
          url: '/login',
          templateUrl:'index.html',
          controller:'LogeoController'

        });
  }])
   .run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

      if ($rootScope.loggedInUser == null) {

        // no logged user, redirect to /login
        if (next.templateUrl === "partials/login.html") {
        } else {
          //$location.path('')
        }
      }
    });
  });

  var app = angular.module('DeltaApp', [
    'ngRoute',
    'ngStorage',
    'delta.controllers',
    'delta.services',
    'delta.directives',
    'delta.filters',
    'ui.router',
    'ngLoadingSpinner',
    'angular.filter',
    'datatables',
    'ngResource'

  ]);

  app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

    $stateProvider

      // Index will decide if redirects to Login or Dashboard view
        .state("opcion", {
          url : '/:name',
          templateUrl: function($stateParams){ return '../../views/01_sistema/' + $stateParams.name + '.html'},
            controllerProvider: function ($stateParams) {
                return $stateParams.name + 'Controller as ' + $stateParams.name

            }



        });


    /*$routeProvider
     .when('/', {
     template: '',
     controller: 'validateController'
     })
     .when('/login', {
     templateUrl: 'views/00_paginas/login.html',
     controller: 'LogeoController'
     })

     .when('/entorno', {
     abstract:true,
     url: 'views/00_paginas/entorno.html',
     templateUrl: 'views/00_paginas/entorno.html'
     })

     .otherwise({
     redirectTo: '/'
     });*/


  }])
      .run(function ($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {

            alert();

          if ($rootScope.loggedInUser == null) {

            // no logged user, redirect to /login
            if (next.templateUrl === "partials/login.html") {
            } else {
              //$location.path('')
            }
          }
        });
      });
})();
