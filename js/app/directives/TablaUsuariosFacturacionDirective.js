angular.module("wellnessApp").directive("tablaUsuariosFacturacion", function (){
    return {
        restrict: "AE",
        replace: true,
        scope: true,
        templateUrl: "views/facturacion/facturas/tablausuariosfacturacion.html",
        link: function(scope, element, attributes) {

        }
    };
});