angular.module("wellnessApp").controller('formularioLoginController', ['ApiService', '$scope', 'LoginService', '$window', function(ApiService, $scope, LoginService, $window) {
    console.log("Cargado formularioLoginController");

    $scope.credencialesErroneas = false;

    $scope.login = function(){
        if(LoginService.validate($scope.username, $scope.password)) {
            console.log($scope.username);
            console.log($scope.password);
            ApiService.login($scope.username, $scope.password).then(
                function( resultado ) {
                    if (resultado.data.token) {
                        $scope.credencialesErroneas = false;
                        // El token se debería guardar en localStorage, pero lo hago en values para meter algo más de AngularJS.
                        ApiService.saveToken(resultado.data.token, $scope.username);
                        $window.location.href = '#/facturacion';

                    }
                },
                function(resultado) {
                    if(resultado.status != 404)
                        $scope.credencialesErroneas = true;
                    else
                        console.log("Error en la configuración de la APP en servidor");
                }
            );
        }
        inspeccionarVacios($scope);
    }

    function inspeccionarVacios($scope) {
        $scope.usernameVacio = ($scope.username == undefined || $scope.username == "");
        $scope.passwordVacio = ($scope.password == undefined || $scope.password == "");
    }

}]);