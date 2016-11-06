angular.module("wellnessApp", ["ngRoute", "route-segment", "view-segment", "ui.grid", 'ui.grid.selection', 'ui.bootstrap']);

angular.module("wellnessApp").config(["$routeSegmentProvider", "$routeProvider", function($routeSegmentProvider, $routeProvider) {
    $routeSegmentProvider.when("/login", "login");
    $routeSegmentProvider.when("/facturacion", "facturacion");
    $routeSegmentProvider.when("/dropdown", "dropdown");
    $routeSegmentProvider.when("/dropdownUsuarios", "dropdown");
    $routeSegmentProvider.when("/dropdownFacturas", "dropdown");
    $routeSegmentProvider.when("/facturacion/crearUsuario", "facturacion.crearUsuario");
    $routeSegmentProvider.when("/facturacion/listarUsuarios", "facturacion.listarUsuarios");
    $routeSegmentProvider.when("/facturacion/crearPrecio", "facturacion.crearPrecio");
    $routeSegmentProvider.when("/facturacion/listarFacturas", "facturacion.listarFacturas");

    $routeSegmentProvider.segment("login", {
        controller: "MainController",
        templateUrl: "views/formularioLogin/login.html"
    });

    $routeSegmentProvider.segment("facturacion", {
        controller: "FacturacionMainController",
        templateUrl: "views/facturacion/facturacion.html"
    });

    $routeSegmentProvider.within("facturacion").segment("listarUsuarios", {
        controller: "ListarUsuariosController",
        templateUrl: "views/facturacion/usuarios/listar.html"
    });

    $routeSegmentProvider.within("facturacion").segment("crearPrecio", {
        controller: "CrearFacturaController",
        templateUrl: "views/facturacion/facturas/crear.html"
    });

    $routeSegmentProvider.within("facturacion").segment("listarFacturas", {
        controller: "ListarFacturasController",
        templateUrl: "views/facturacion/facturas/listar.html"
    });

    $routeSegmentProvider.segment("dropdown", {
        controller: '',
        templateUrl: ""
    });

    $routeProvider.otherwise({redirectTo: '/login'});
}]);