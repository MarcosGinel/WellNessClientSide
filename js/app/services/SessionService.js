/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").service("SessionService", ['configuracion', function(configuracion) {
    this.checkToken = function() {
        if(configuracion.sesion.token == undefined || configuracion.sesion.token == "" || configuracion.sesion.username == undefined || configuracion.sesion.username == "")
            if (localStorage.getItem("Token") !== null && localStorage.getItem("Usuario") !== null) {
                configuracion.sesion.token = localStorage.getItem("Token");
                configuracion.sesion.username = localStorage.getItem("Usuario");
            }


    };
}]);