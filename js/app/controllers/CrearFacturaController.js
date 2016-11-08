/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("CrearFacturaController", ['$scope','ApiService','$uibModal', function($scope, ApiService, $uibModal){
    $scope.nombreController = 'CrearFacturaController';

    $scope.errores = false;

    function calculaErrores(json) {
        if(json.precio != undefined)
            if(json.precio[0] != undefined)
                precio = json.precio[0];
            else
                precio = false;
        else
            precio = false;

        if(json.fecha != undefined)
            if(json.fecha[0] != fecha)
                fecha = json.fecha[0];
            else
                fecha = false;
        else
            fecha = false;

        if(precio)
            $scope.errores = precio;
        if(fecha)
            $scope.errores += '<br/>' + fecha;
    }


    $scope.editarPrecio = function(id) {
        console.log("Clickeado sobre id " + id);
    }
    $scope.borrarPrecio = function(id) {
        console.log("Clickeado sobre id " + id);
    };


    $scope.gridOptions = {
        enableRowSelection: false,
        enableSelectAll: false,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter:true,
        multiSelect: false,
    };

    function pideDatos() {
        ApiService.getPrecios().then(
            function ( resultado ) {
                $scope.precios = resultado.data;
                $scope.gridOptions.data = $scope.precios;
            },
            function ( resultado ) {
                console.log("Algo fue mal durante la petición");
            }
        );
    }

    pideDatos();

    $scope.$on("recargaDatos", function(event, data) {
        pideDatos();
    });

    $scope.msg = {};

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope

        gridApi.core.registerColumnsProcessor(hideIdColumn);

        function hideIdColumn(columns){
            columns.forEach(function(column){
                if(column.field==='id'){
                    column.visible=false;
                }
                if(column.field==='fecha') {
                    column.colDef.enableCellEdit = false;
                }
            });
            return columns;
        }

        gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
            $scope.$apply();
            console.log($scope.msg.lastCellEdited);
            ApiService.editarPrecio(rowEntity).then(
                function( resultado ) {
                    console.log(resultado.status + " " + resultado.statusText);
                    $scope.errores = false;
                },
                function( resultado ) {
                    console.log(resultado.status + " " + resultado.statusText);
                    calculaErrores(resultado.data);
                    rowEntity[colDef.name] = oldValue;
                }
            )
        });

        $scope.gridApi = gridApi;
    };

    $scope.crearPrecio = function() {
        var parentElem = angular.element('.modal-demo ');
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'model-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/modal/myModalPrecioEdition.html',
            controller: 'ModalInstancePrecioCtrl',
            controllerAs: '$scope',
            appendTo: parentElem,
            size: 'lg'
        });
    };


}]);