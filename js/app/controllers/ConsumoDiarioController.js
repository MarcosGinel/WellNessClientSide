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
                        if(data.i == $scope.consumos.length - 1) {
                            $rootScope.$broadcast("datosDeConsumosConFechas", $scope.consumos);
                            $scope.consumosDesdeApi = $scope.consumos;
                            calculaConsumoTotal();
                        }
                    });
                }
                $rootScope.$broadcast("datosDeConsumos", $scope.consumos);
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

    $scope.$on("renderizarDatosFiltradosPorFecha", function(event, data) {
        $scope.fechaDesde = data.from.setHours(0,0,0,0);
        $scope.fechaHasta = data.to.setHours(23,59,59,999);
        calculaConsumoTotal();
    });

    $scope.$on("renderizarDatosNoFiltradosPorFecha", function(event, data) {
        $scope.fechaDesde = undefined;
        $scope.fechaHasta = undefined;
        calculaConsumoTotal();
    });


    function calculaConsumoTotal() {
        $scope.consumoTotal = 0;
        if($scope.fechaDesde != undefined && $scope.fechaHasta != undefined) {
            for(i=0; i < $scope.consumosDesdeApi.length; i++) {
                fechaFila = new Date($scope.consumosDesdeApi[i].fechaNormal);
                if(fechaFila >= $scope.fechaDesde && fechaFila <= $scope.fechaHasta)
                    $scope.consumoTotal += $scope.consumosDesdeApi[i]['precioDia'] * $scope.consumosDesdeApi[i]['cantidad'];
            }
        } else {
            for(i=0; i < $scope.consumosDesdeApi.length; i++)
                $scope.consumoTotal += $scope.consumosDesdeApi[i]['precioDia'] * $scope.consumosDesdeApi[i]['cantidad'];
        }
    }

}]);