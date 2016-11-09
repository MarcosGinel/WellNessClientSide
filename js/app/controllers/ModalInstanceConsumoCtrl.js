angular.module("wellnessApp").controller("ModalInstanceConsumoCtrl", ['$uibModalInstance', '$scope', 'ApiService', '$rootScope', 'comboUsuarios', 'comboFechas', 'esParaCreacion', 'esParaEdicion', 'consumo', function($uibModalInstance, $scope, ApiService, $rootScope, comboUsuarios, comboFechas, esParaCreacion, esParaEdicion, consumo) {
    $scope.consumo = consumo;
    console.log("Entro");
    $scope.comboFechas = comboFechas;
    $scope.comboUsuarios = comboUsuarios;
    $scope.esParaEdicion = esParaEdicion;
    $scope.esParaCreacion = esParaCreacion;

    if(esParaEdicion) {
        ApiService.getConsumo($scope.consumo.id).then(
                function (resultado) {
                    $scope.consumo = resultado.data;
                },
                function (resultado) {
                    console.log("Errores en la obtención del consumo");
                }
        );
    }

    $scope.permisos = false;

    function resetErrores() {
        $scope.errores = {
            cantidad : false,
            fecha : false,
            usuario : false,

        };
    }

    resetErrores();

    $scope.exito = false;

    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.editarConsumo = function(esParaEditar) {
        if(esParaEditar){
               ApiService.editarConsumo($scope.consumo, $scope.consumo.id).then(
                    function (resultado) {
                        console.log(resultado);
                        resetErrores();
                        $scope.exito = true;
                        $rootScope.$broadcast("recargaDatosConsumo");
                    },
                    function (resultado) {
                        console.log(resultado);
                        parseaErrores(resultado.data);
                    }
            );
        } else {
            ApiService.crearConsumo($scope.consumo).then(
                    function(resultado){
                        console.log(resultado);
                        resetErrores();
                        $scope.exito = true;
                        $scope.permisos = false;
                        $rootScope.$broadcast("recargaDatosConsumo");
                    },
                    function(resultado) {
                        console.log(resultado);
                        if(resultado.status != 403) {
                            parseaErrores(resultado.data);
                            $scope.permisos = true;
                        }
                        else
                            $scope.permisos = false;
                    }
            )
        }
    }

    $scope.getAccion = function() {
        return ($scope.accion == 'Editar') ? false : true;
    }

    function parseaErrores(array) {
        $scope.errores.usuario = array.usuario ? array.usuario[0] : false;
        $scope.errores.cantidad = array.cantidad ? array.cantidad[0] : false;
        $scope.errores.fecha = array.fecha ? array.fecha[0] : false;

    }

}]);