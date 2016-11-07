/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("ModalInstanceEditionCtrl", ['$uibModalInstance', '$scope', 'ApiService', 'id','$uibModalInstance', '$rootScope', function($uibModalInstance, $scope, ApiService, id, $uibModalInstance, $rootScope) {
    $scope.usuario = {};

    $scope.permisos = false;

    function resetErrores() {
        $scope.errores = {
            last_name : false,
            first_name : false,
            username : false,
            email : false,
            password : false,
        };
    }

    resetErrores();

    $scope.exito = false;

    if(id != undefined) {
        $scope.accion = 'Editar';
        ApiService.getUserFromApi(id).then(
            function( resultado ) {
                $scope.usuario = resultado.data;
            },
            function( resultado ) {
                console.log("Error en la obtención de los datos de usuario");
                console.log(resultado);
            }
        );
    }
    else {
        $scope.accion = 'Crear';
    }

    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.editarUsuario = function() {
        if(id != null) {
            ApiService.modificaUsuario($scope.usuario, id).then(
                function (resultado) {
                    console.log(resultado);
                    resetErrores();
                    $scope.exito = true;
                    $rootScope.$broadcast("recargaDatos");
                },
                function (resultado) {
                    console.log(resultado);
                    parseaErrores(resultado.data);
                }
            );
        } else {
            ApiService.creaUsuario($scope.usuario).then(
                function(resultado){
                    console.log(resultado);
                    resetErrores();
                    $scope.exito = true;
                    $scope.permisos = false;
                    $rootScope.$broadcast("recargaDatos");
                },
                function(resultado) {
                    console.log(resultado);
                    if(resultado.status != 403) {
                        parseaErrores(resultado.data);
                        $scope.permisos = false;
                    }
                    else
                        $scope.permisos = true;
                }
            )
        }
    }

    $scope.getAccion = function() {
        return ($scope.accion == 'Editar') ? false : true;
    }

    function parseaErrores(array) {
        $scope.errores.last_name = array.last_name ? array.last_name[0] : false;
        $scope.errores.first_name = array.first_name ? array.first_name[0] : false;
        $scope.errores.email = array.email ? array.email[0] : false;
        $scope.errores.username = array.username ? array.username[0] : false;
        $scope.errores.password = array.password ? array.password[0] : false;
    }

}]);