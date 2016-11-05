/**
 * Created by marco on 05/11/2016.
 */

angular.module("wellnessApp").directive('formularioLogin', [function(){
    return {
        restrict: "AE",
        replace: true,
        templateUrl: "views/formularioLogin/formularioLogin.html",
        controller: "formularioLoginController",
        scope: true,
        link: function(scope, element, attributes) {

        }
    };
}]);