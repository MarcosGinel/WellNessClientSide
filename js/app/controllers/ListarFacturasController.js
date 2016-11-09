/**
 * Created by marco on 06/11/2016.
 */


angular.module("wellnessApp").controller("ListarFacturasController", ['$scope', 'ApiService', '$rootScope', function($scope, ApiService, $rootScope) {
    $scope.nombreController = 'ListarFacturasController';

    $scope.usuarioSeleccionado = false;

    $scope.consumos = undefined;

    $scope.$on("idClickeado", function(event, data) {
        $scope.usuarioSeleccionado = true;
        console.log("Usuario pinchado que llega");
        $scope.usuario = data;
    });

    $scope.$on("usuarioDeseleccionado", function(event, data) {
        $scope.usuarioSeleccionado = false;
    })
    // Manejo de fechas

    $scope.$on("datosDeConsumosConFechas", function(event, data) {
        $scope.consumos = data;
    });

    $scope.$watch('consumos', function(newValue, oldValue) {
        if(newValue != undefined) {
            configurarDatePickers($scope);
        }
    });

    function configurarDatePickers($scope) {

        $scope.format = 'yyyy-MM-dd';

        function getMaxFecha() {
            maxFecha = new Date(1900, 11, 31);
            for(i = 0; i < $scope.consumos.length; i++) {
                temp = new Date($scope.consumos[i].fechaNormal);
                if(maxFecha < temp)
                    maxFecha = temp;
            }
            console.log("Fecha máxima: " + maxFecha);
            $scope.maxFecha = maxFecha;
            return maxFecha;
        };

        function getMinFecha() {
            minFecha = new Date(2100, 11, 31);
            for(i = 0; i < $scope.consumos.length; i++) {
                temp = new Date($scope.consumos[i].fechaNormal);
                if(minFecha > temp)
                    minFecha = temp;
            }
            console.log("Fecha mínima: " + minFecha);
            $scope.minFecha = minFecha;
            return minFecha;
        };

        // Hay que restarle uno al mes
        $scope.minimaFecha = new Date(2016, 10, 08);

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: getMinFecha(),
            maxDate: getMaxFecha(),
            showWeeks: true
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: getMaxFecha(),
            minDate: getMinFecha(),
            startingDay: 1
        };

        $scope.toggleMinMax = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? $scope.inlineOptions.minDate : getMinFecha();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            $scope.inlineOptions.maxDate = $scope.inlineOptions.maxDate ? $scope.inlineOptions.maxDate : getMaxFecha();
            $scope.dateOptions.maxDate = $scope.inlineOptions.maxDate;
        };

        $scope.toggleMinMax();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        /*
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];*/

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    };

    $scope.filtrarDatos = function() {
        fechas = {
            from: $scope.dt,
            to: $scope.dtFin
        }
        $rootScope.$broadcast("renderizarDatosFiltradosPorFecha", fechas);
    }

    $scope.cancelarFechas = function() {
        $rootScope.$broadcast("renderizarDatosNoFiltradosPorFecha");
        $scope.dtFin = undefined;
    }

}]);