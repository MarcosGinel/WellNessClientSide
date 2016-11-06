/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("TablaUsuariosController", ['$scope', 'ApiService', function($scope, ApiService){
    $scope.datos = [];

    ApiService.getUsers().then(
        function(resultado) {
            datos = resultado.data.results;
            for(i=0; i<datos.length;i++)
                delete datos[i].password;
            $scope.datos = datos;
        },
        function() {
            $scope.datos = [];
        }
    );
}]);