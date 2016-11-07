/**
 * Created by marco on 07/11/2016.
 */

angular.module("wellnessApp").controller("DatosUsuarioController", ['$scope', function($scope){
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
    }
}]);