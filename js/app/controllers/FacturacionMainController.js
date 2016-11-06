/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("FacturacionMainController", ["$scope", "ApiService", function($scope, ApiService) {
    console.log("Cargado controlador principal de facturacion");

    $scope.username = ApiService.getUser();
}]);