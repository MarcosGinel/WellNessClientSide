/**
 * Created by marco on 07/11/2016.
 */

angular.module("wellnessApp").directive("datosUsuario", [function() {
    return {
        restrict: "AE",
        replace: true,
        scope:true,
        templateUrl: "views/facturacion/facturas/datosusuario.html",
        controller: 'DatosUsuarioController',
        link: function(scope, element, attributes) {

        }
    };
}]);