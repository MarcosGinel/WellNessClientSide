/**
 * Created by marco on 09/11/2016.
 */

angular.module("wellnessApp").controller("LoaderController", ['$scope','ApiService', 'configuracion', function($scope, ApiService, configuracion){
    $scope.mensaje = "Cargando datos...";
    usuarios = [
        {
            first_name: "usuarioPruebaQuintaCarga1",
            last_name: "usuarioPruebaQuintaCarga1",
            username: "usuarioPruebaQuintaCarga1",
            email: "wellness@wellness.com",
            password: "wellness"
        },
        {
            first_name: "usuarioPruebaQuintaCarga2",
            last_name: "usuarioPruebaQuintaCarga2",
            username: "usuarioPruebaQuintaCarga2",
            email: "wellness@wellness.com",
            password: "wellness"
        },
        {
            first_name: "usuarioPruebaQuintaCarga3",
            last_name: "usuarioPruebaQuintaCarga3",
            username: "usuarioPruebaQuintaCarga3",
            email: "wellness@wellness.com",
            password: "wellness"
        },
        {
            first_name: "usuarioPruebaQuintaCarga4",
            last_name: "usuarioPruebaQuintaCarga4",
            username: "usuarioPruebaQuintaCarga4",
            email: "wellness@wellness.com",
            password: "wellness"
        },

    ];

    precios = [
        
            {
                fecha: "2017-01-03",
                precio: "0.65"
            },
            {
                fecha: "2017-01-04",
                precio: "2.10"
            }
        
    ]

    ApiService.login("admin", "wellness").then(
        function( resultado ) {
            configuracion.sesion.username = 'admin';
            configuracion.sesion.token = resultado.data.token;
            for(i = 0; i < usuarios.length;i++) {
                ApiService.creaUsuario(usuarios[i]).then(
                    function(resultado){
                        console.log("Añadido usuario");
                    },
                    function(resultado) {
                        console.log("Ooops... al crear usuario");
                    }

                );
            }
            for(i = 0; i < precios.length;i++) {
                ApiService.crearPrecio(precios[i]).then(
                    function(resultado){
                        console.log("Añadido precio");
                    },
                    function(resultado) {
                        console.log("Ooops... al crear usuario");
                    }

                );
            }
            $scope.mensaje = "Usuarios y precios creados";
        },
        function( resultado ){
            console.log("Oops...");
        }
    );


}]);