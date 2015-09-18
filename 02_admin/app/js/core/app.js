(function () {

  var app = angular.module('xtreme', [
      'ngRoute',
      'xtreme.controllers',
      'xtreme.directives',
      'xtreme.filters',
      'xtreme.services'

  ])
      .factory("authenticationSvc", function($http, $q, $window) {
          var userInfo;

          function login(userName, password) {
              var deferred = $q.defer();

              /*$http.post("/api/login", {
                  userName: userName,
                  password: password
              }).then(function(result) {
                  userInfo = {
                      accessToken: result.data.access_token,
                      userName: result.data.userName
                  };
                  $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                  deferred.resolve(userInfo);
              }, function(error) {
                  deferred.reject(error);
              });

              return deferred.promise;*/
              return true;
          }

          return {
              login: login
          };
      });


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
