/**
 * Created by marco on 05/11/2016.
 */

angular.module("wellnessApp").service("ApiService", ["$http", "configuracion", '$window', function($http, configuracion, $window) {
    this.login = function(username, password) {
        json = {
            username: username,
            password: password
        };

        return $http.post(configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiLogin, json);

    };

    this.logout = function() {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiLogout,
            method: 'GET',
            headers : cabecera
        };*/
        peticion = creaPeticion('GET',configuracion.rutaApiLogout,undefined, undefined);
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
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers,
            method: 'GET',
            headers : cabecera
        };*/
        peticion = creaPeticion('GET', configuracion.rutaApiGetUsers, undefined, undefined);
        return $http(peticion);
    };

    this.getUserFromApi = function(id) {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers+id+"/",
            method: 'GET',
            headers : cabecera
        };*/
        peticion = creaPeticion('GET', configuracion.rutaApiGetUsers, undefined, id);
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
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiDeleteUser+id+"/",
            method: 'DELETE',
            headers : cabecera
        };*/
        peticion = creaPeticion('DELETE', configuracion.rutaApiDeleteUser, undefined, id);
        return $http(peticion);
    };

    this.modificaUsuario = function(usuario, id) {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers+id+"/",
            method: 'PUT',
            headers : cabecera,
            data : usuario
        };*/
        peticion = creaPeticion('PUT', configuracion.rutaApiGetUsers, usuario, id);
        return $http(peticion);
    };

    this.creaUsuario = function(usuario) {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetUsers,
            method: 'POST',
            headers : cabecera,
            data : usuario
        };*/
        peticion = creaPeticion('POST', configuracion.rutaApiGetUsers, usuario, undefined);
        return $http(peticion);
    }

    this.getConsumos = function(id) {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetConsumos+id,
            method: 'GET',
            headers : cabecera,
        };*/
        peticion = creaPeticion('GET',configuracion.rutaApiGetConsumos, undefined, id);
        // Necesitamos quitar el ultimo '/' de la petición de búsqueda
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    }

    this.getPrecio = function(id, iterador) {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetPrecio+id+"/",
            method: 'GET',
            headers : cabecera,
        };*/
        peticion = creaPeticion('GET', configuracion.rutaApiGetPrecio, undefined, id);
        return $http(peticion);
    };

    this.getPrecios = function() {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetPrecio,
            method: 'GET',
            headers : cabecera,
        };*/
        peticion = creaPeticion('GET',configuracion.rutaApiGetPrecio,undefined, undefined );
        return $http(peticion);
    };

    this.editarPrecio = function(json) {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        datos = {
            fecha:json.fecha,
            precio:json.precio
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetPrecio+json.id+"/",
            method: 'PUT',
            headers : cabecera,
            data: datos
        };*/
        datos = {
            fecha:json.fecha,
            precio:json.precio
        };

        peticion = creaPeticion('PUT', configuracion.rutaApiGetPrecio, datos, json.id);

        return $http(peticion);
    }

    this.crearPrecio = function(precio) {
        /*token = "Token " + this.getToken();

        cabecera = {
            'Authorization' : token
        };

        peticion = {
            url:configuracion.protocol+"://"+configuracion.host+"/"+configuracion.rutaApiGetPrecio,
            method: 'POST',
            headers : cabecera,
            data : precio
        };*/

        peticion = creaPeticion('POST', configuracion.rutaApiGetPrecio, precio, undefined);

        return $http(peticion);
    }

    function creaPeticion(metodo, ruta, datos, argumentoUrl) {
        var peticion = {};
        token = "Token " + configuracion.sesion.token;

        cabecera = {
            'Authorization' : token
        };

        url = (argumentoUrl == undefined) ? configuracion.protocol+"://"+configuracion.host+"/"+ruta : configuracion.protocol+"://"+configuracion.host+"/"+ruta+argumentoUrl+"/";
        if (datos == undefined) {
            peticion = {
                url:url,
                method: metodo,
                headers : cabecera,
            };
        }
        else {
            peticion = {
                url:url,
                method: metodo,
                headers : cabecera,
                data : datos
            };
        }

        return peticion;
    }
}]);
