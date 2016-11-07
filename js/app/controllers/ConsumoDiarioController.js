/**
 * Created by marco on 07/11/2016.
 */

angular.module("wellnessApp").controller("ConsumoDiarioController", ['$scope', 'ApiService', function($scope, ApiService){
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
                $scope.consumos = resultado.data.results;
                console.log($scope.consumos);
            },
            function( resultado ) {
                console.log("Algo fue mal en la petición");
            }
        );
    }
}]);