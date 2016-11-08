/**
 * Created by marco on 07/11/2016.
 */

angular.module("wellnessApp").controller("ConsumoDiarioController", ['$scope', 'ApiService', '$rootScope', function($scope, ApiService, $rootScope){
    $scope.$on("idClickeado", function(event, data) {
        console.log("Id Clickeado: " + data);
        $scope.usuario = data;
        getDatos();
    });

    $scope.verDatos = function() {
        if($scope.usuario != undefined) {
            return true;
        } else {
            return false
        }
    }

    function getDatos() {
        ApiService.getConsumos($scope.usuario.id).then(
            function( resultado ) {
                $scope.consumos = resultado.data;
                console.log($scope.consumos);
                for(i=0; i < $scope.consumos.length; i++){
                    pedirPrecio($scope.consumos[i].fecha, i);
                    $scope.$on("precioConseguido", function(event, data) {
                        $scope.consumos[data.i]['precioDia'] = data.precio;
                        $scope.consumos[data.i]['fechaNormal'] = data.fecha;
                    });
                }
                $rootScope.$broadcast("datosDeConsumos");
            },
            function( resultado ) {
                console.log("Algo fue mal en la petición de consumos del usuario");
            }
        );
    }

    $scope.$on("datosDeConsumos", function(event, data) {
        console.log("Terminados los datos");
        console.log($scope.consumos);
    });

    function pedirPrecio(idFecha, i) {
        ApiService.getPrecio($scope.consumos[i].fecha, i).then(
            function( resultado ) {
                datos = {
                    i:i,
                    precio: resultado.data.precio,
                    fecha: resultado.data.fecha
                }
                $rootScope.$broadcast("precioConseguido", datos);
            },
            function( resultado ) {
                console.log("Algo fue mal en la petición de fechas");
            }
        );

    };

    $scope.$on("atras", function(event, data) {
        $scope.usuario = data;
    });

}]);