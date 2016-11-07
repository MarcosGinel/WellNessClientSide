/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("TablaUsuariosController", ['$scope', 'ApiService', '$log', '$uibModal','$location', '$rootScope', function($scope, ApiService, $log, $uibModal, $location, $rootScope){
    $scope.modoFacturas = $location.absUrl().endsWith("listarFacturas") ? true : false;
    $scope.mostrarGrid = true;

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

    multiSeleccion = false;
    enableSelectAll = false;

    if(!$scope.modoFacturas) {
        multiSeleccion = true;
        enableSelectAll = true;

    }

    $scope.gridOptions = {
        enableRowSelection: true,
        enableSelectAll: enableSelectAll,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter:true,
        multiSelect: multiSeleccion
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
                    if(resultado.status != 403) {
                        console.log("Problemas al borrar al usuario");
                    }
                    else {
                        var parentElem = angular.element('.modal-demo ');
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'model-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'views/modal/myModalContentErrorAlCrear.html',
                            controller: 'ModalInstanceCtrl',
                            controllerAs: '$scope',
                            appendTo: parentElem,
                        });
                    }
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

    function editarUsuario(id) {
        var parentElem = angular.element('.modal-demo ');

        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'model-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/modal/myModalContentEdition.html',
            controller: 'ModalInstanceEditionCtrl',
            controllerAs: '$scope',
            appendTo: parentElem,
            size: 'lg',
            resolve: {
                id: function() {
                    return id;
                }
            }
        });
    }

    $scope.editUser = function(editar) {
        if(editar) {
            seleccionados = $scope.gridApi.selection.getSelectedRows();
            if (seleccionados.length > 1) {
                errorModal();
            }
            else if (seleccionados.length == 1) {
                id = seleccionados[0].id;
                editarUsuario(id);
            }
        }
        else {
            editarUsuario(null);
        }
    };



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
            $scope.mostrarGrid = false;
            $rootScope.$broadcast("idClickeado", row.entity);
        });


        gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
            //var msg = 'rows changed ' + rows.length;
            //$log.log(msg);
            //$log.log(row);

        });

        $scope.gridApi = gridApi;
    };

    $scope.$on("recargaDatos", function(event, data) {
        pideDatos();
    });

    $scope.verGrid = function() {
        return $scope.mostrarGrid;
    };

    $scope.$on("atras", function(event, data) {
        $scope.mostrarGrid = true;
    });
}]);