/**
 * Created by marco on 05/11/2016.
 */

angular.module("wellnessApp").service("ApiService", ["$http", "configuracion", '$window', function($http, configuracion, $window) {
    this.login = function(username, password) {
        json = {
            username: username,
            password: password
        };
        headers = {
            'content-type' : 'application/json'
        };
        return $http.post(configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiLogin, json);

    };

    this.logout = function() {
        token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiLogout,
            method: 'GET',
            headers : cabecera
        };

        $http(peticion).then(
            function( resultado ) {
                console.log("Deslogeado");
                $window.location.href = '';
                localStorage.remove("Token");
                localStorage.remove("Usuario");
            },
            function( resultado ) {
                console.log("Error al hacer el logout");
            }
        );
    };

    this.getUsers = function() {
        token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers,
            method: 'GET',
            headers : cabecera
        };

        return $http(peticion);
    };

    this.getUserFromApi = function(id) {
        token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers+id+"/",
            method: 'GET',
            headers : cabecera
        };

        return $http(peticion);
    };

    this.saveToken = function(token, username) {
        configuracion.sesion.token = token;
        configuracion.sesion.username = username;
        localStorage.setItem("Token", token);
        localStorage.setItem("Usuario", username);
    };

    this.getToken = function() {
        return configuracion.sesion.token;
    };

    this.getUser = function() {
        return configuracion.sesion.username;
    };

    this.deleteUser = function(id) {
        token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiDeleteUser+id+"/",
            method: 'DELETE',
            headers : cabecera
        };

        return $http(peticion);
    };

    this.modificaUsuario = function(usuario, id) {
        token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers+id+"/",
            method: 'PUT',
            headers : cabecera,
            data : usuario
        };

        return $http(peticion);
    };

    this.creaUsuario = function(usuario) {
        token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers,
            method: 'POST',
            headers : cabecera,
            data : usuario
        };

        return $http(peticion);
    }

    this.getConsumos = function(id) {
        token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetConsumos+id,
            method: 'GET',
            headers : cabecera,
        };

        return $http(peticion);
    }
}]);
