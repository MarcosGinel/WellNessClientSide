/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("MenuConLogController", ['$scope', 'ApiService', function($scope, ApiService) {
    console.log("Cargado controlador de Menu logeado con username = "+ $scope.username);

    $scope.logout = function() {
        ApiService.logout();
    }
}]);