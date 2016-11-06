/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("TablaUsuariosController", ['$scope', 'ApiService', '$log', '$uibModal', function($scope, ApiService, $log, $uibModal){

    function pideDatos() {
        ApiService.getUsers().then(
            function(resultado) {
                datos = resultado.data.results;
                for(i=0; i<datos.length;i++)
                    delete datos[i].password;
                $scope.gridOptions.data = datos;
            },
            function() {
                $scope.datos = [];
            }
        );
    }

    pideDatos();

    $scope.gridOptions = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter:true
    };

    $scope.delete = function() {
        seleccionados = $scope.gridApi.selection.getSelectedRows();
        for(i = 0; i < seleccionados.length; i++) {
            ApiService.deleteUser(seleccionados[i].id).then(
                function(resultado) {
                    console.log(resultado);
                    console.log("Eliminado usuario");
                    pideDatos();
                },
                function(resultado) {
                    console.log("Problemas al borrar al usuario");
                }
            );

        }
    };

    function errorModal() {
        var parentElem = angular.element('.modal-demo ');
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'model-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/modal/myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$scope',
            appendTo: parentElem,
        });
    }

    $scope.editUser = function() {
        seleccionados = $scope.gridApi.selection.getSelectedRows();
        if (seleccionados.length > 1) {
            errorModal();
        }
        else if (seleccionados.length == 1) {

        }
    };

    $scope.gridOptions.multiSelect = true;

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope

        gridApi.core.registerColumnsProcessor(hideIdColumn);

        function hideIdColumn(columns){
            columns.forEach(function(column){
                if(column.field==='id'){
                    column.visible=false;
                }
            });
            return columns;
        }
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            var msg = 'row selected ' + row.isSelected;
            $log.log(msg);
            $log.log(row);

        });


        gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
            var msg = 'rows changed ' + rows.length;
            $log.log(msg);
            $log.log(row);

        });

        $scope.gridApi = gridApi;
    };



}]);