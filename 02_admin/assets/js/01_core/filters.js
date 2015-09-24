(function () {

  angular.module('delta.filters', [])
    .filter('normalize', function () {
      return function (input) {
          if (!input) return "";

          input = input
                  .replace('♀', 'f')
                  .replace('♂', 'm')
                  .replace(/\W+/g, "");
          return input.toLowerCase();
      };
    })

    .filter('imageify', ['$filter', function ($filter) {
      return function (input) {
        var url = "img/" + $filter('normalize')(input) + ".jpg";
        return url;
      };
    }])
    .filter('keylength', function(){
          return function(input){
              if(angular.isObject(input)){
                  return Object.keys(input).length;
              }

          }
      })
      .filter('num', function() {
          return function(input) {
              return parseInt(input, 10);
          }
      });

})();
