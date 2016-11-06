/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").directive("menuConLogin", function() {
    return {
        restrict: "AE",
        replace: true,
        scope: {
            username: '@'
        },
        templateUrl: "views/facturacion/menu.html",
        controller: "MenuConLogController",
        link: function(scope, element, attributes) {

        }
    };
});