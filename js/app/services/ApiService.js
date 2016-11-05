/**
 * Created by marco on 05/11/2016.
 */

angular.module("wellnessApp").service("ApiService", ["$http", "configuracion", function($http, configuracion) {
    this.login = function(username, password) {
        json = {
            username: username,
            password: password
        }
        headers = {
            'content-type' : 'application/json'
        }
        return $http.post(configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiLogin, json);

    }

    this.saveToken = function(token, username) {
        configuracion.sesion.token = token;
        configuracion.sesion.username = username;
    }

    this.getToken = function() {
        return configuracion.sesion.token;
    }

    this.getUser = function() {
        return configuracion.sesion.username;
    }
}]);
