/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").directive("tablaUsuarios", function (){
    return {
        restrict: "AE",
        replace: true,
        templateUrl: "views/facturacion/usuarios/tablausuarios.html",
        //controller: "TablaUsuariosController",
        link: function(scope, element, attributes) {

        }
    };
});