/**
 * Created by marco on 07/11/2016.
 */


angular.module("wellnessApp").controller("ModalInstancePrecioCtrl", ['$uibModalInstance', '$scope', 'ApiService', '$uibModalInstance', '$rootScope', function($uibModalInstance, $scope, ApiService, $uibModalInstance, $rootScope) {
    $scope.precio = {};

    function resetErrores() {
        $scope.errores = {
            fecha : false,
            precio : false
        };
    }

    resetErrores();

    $scope.exito = false;

    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };

    function reverseFecha(fecha) {
        return fecha.toISOString().substring(0, 10);
    }

    $scope.prohibido = false;

    $scope.crearPrecio = function() {
        $scope.precio.fecha = reverseFecha($scope.precio.fecha);
        ApiService.crearPrecio($scope.precio).then(
            function(resultado){
                console.log(resultado);
                resetErrores();
                $scope.exito = true;
                $scope.prohibido = false;
                $rootScope.$broadcast("recargaDatos");
            },
            function(resultado) {
                console.log(resultado);
                if(resultado.status != 403)
                    parseaErrores(resultado.data);
                else
                    $scope.prohibido = true;
            }
        );
    }

    $scope.getAccion = function() {
        return ($scope.accion == 'Editar') ? false : true;
    }

    function parseaErrores(array) {
        $scope.errores.fecha = array.fecha ? array.fecha[0] : false;
        $scope.errores.precio = array.precio ? array.precio[0] : false;
    }

}]);