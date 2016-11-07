/**
 * Created by marco on 07/11/2016.
 */

angular.module("wellnessApp").directive("consumoDiario", [function() {
    return {
        restrict: "AE",
        replace: true,
        scope: true,
        templateUrl: "views/facturacion/facturas/consumodiario.html",
        controller: 'ConsumoDiarioController',
        //controller: "TablaUsuariosController",
        link: function(scope, element, attributes) {

        }
    };
}]);