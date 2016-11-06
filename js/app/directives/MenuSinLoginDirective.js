/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").directive("menuSinLogin", function() {
   return {
      restrict: "AE",
      replace: true,
      templateUrl: "views/formularioLogin/menu.html",
      link: function(scope, element, attributes) {

      }
   };
});