(function () {
  angular.module('Navigate.directives',[])
      .directive('formLista', function () {
          return {
              restrict: 'E',
              templateUrl: '/js/01_core/partials/formulario-lista.html'
          };
      })
      .directive('onFinishRender',['$timeout', '$parse', function ($timeout, $parse) {
          return {
              restrict: 'A',
              link: function (scope, element, attr) {
                  if (scope.$last === true) {
                      $timeout(function () {
                          scope.$emit('ngRepeatFinished');
                          if(!!attr.onFinishRender){
                              $parse(attr.onFinishRender)(scope);
                          }
                      });
                  }
              }
          }
      }])
      .directive('fileModel', ['$parse', function ($parse) {
          return {
              restrict: 'A',
              link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;

                  element.bind('change', function(){
                      scope.$apply(function(){
                          modelSetter(scope, element[0].files[0]);
                      });
                  });
              }
          };
      }]);
})();
