(function () {

  angular.module('xtreme.services', [])

    .factory('xtremeService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {

      var normalize = $filter('normalize');
      var localStorage = $window.localStorage;

      function all() {
        var deferred = $q.defer();

        $http.get('http://api.xtreme.colegiosweb/generic/{"tables":["web_usuarios"]}')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }


      function byName(name) {
        name = normalize(name);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (blog) {
            return normalize(blog.blog_nombre) === name;
          });

          if (results.length > 0) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject();
          }


        });

        return deferred.promise;
      }

      function byType(type) {
        type = normalize(type);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (pokemon) {
            return pokemon.type.some(function (t) {
              return normalize(t) === type;
            });
          });

          deferred.resolve(results);
        });

        return deferred.promise;
      }


      function saveComment(pokemon, comment) {
        var comments = getComments(pokemon);

        comments.push(comment);
        localStorage.setItem(pokemon, JSON.stringify(comments));
      }

      function getComments(pokemon) {
        var comments = localStorage.getItem(pokemon);

        if (!comments) {
          comments = [];
        } else {
          comments = JSON.parse(comments);
        }

        return comments;
      }

      return {
        all: all,
        byName: byName,
        byType: byType,
        saveComment: saveComment,
        getComments: getComments
      };

    }]);

})();
