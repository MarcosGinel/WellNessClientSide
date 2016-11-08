/**
 * Created by marco on 07/11/2016.
 */

angular.module("wellnessApp").controller("DatosUsuarioController", ['$scope','$rootScope', function($scope, $rootScope){
    $scope.$on("idClickeado", function(event, data) {
        console.log(data);
        $scope.usuario = data;
    });

    $scope.verDatos = function() {
        if($scope.usuario != undefined) {
            return true;
        } else {
            return false
        }
    };

    $scope.atras = function() {
        $rootScope.$broadcast("atras", undefined);
        $rootScope.$broadcast("usuarioDeseleccionado", undefined);
    };

    $scope.$on("atras", function(event, data) {
        $scope.usuario = data;
    });
}]);