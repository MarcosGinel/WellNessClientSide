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
        $http(creaPeticion('GET',configuracion.rutaApiLogout,undefined, undefined)).then(
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
        return $http(creaPeticion('GET', configuracion.rutaApiGetUsers, undefined, undefined));
    };

    this.getUserFromApi = function(id) {
        return $http(creaPeticion('GET', configuracion.rutaApiGetUsers, undefined, id));
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
        return $http(creaPeticion('DELETE', configuracion.rutaApiDeleteUser, undefined, id));
    };

    this.modificaUsuario = function(usuario, id) {
        return $http(creaPeticion('PUT', configuracion.rutaApiGetUsers, usuario, id));
    };

    this.creaUsuario = function(usuario) {
        return $http(creaPeticion('POST', configuracion.rutaApiGetUsers, usuario, undefined));
    }

    this.getConsumos = function(id) {
        peticion = creaPeticion('GET',configuracion.rutaApiGetConsumos, undefined, id);
        // Necesitamos quitar el ultimo '/' de la petición de búsqueda
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    }

    this.getPrecio = function(id, iterador) {
        return $http(creaPeticion('GET', configuracion.rutaApiGetPrecio, undefined, id));
    };

    this.getPrecios = function() {
        return $http(creaPeticion('GET',configuracion.rutaApiGetPrecio,undefined, undefined ));
    };

    this.editarPrecio = function(json) {
        return $http(creaPeticion('PUT', configuracion.rutaApiGetPrecio, json, json.id));
    }

    this.crearPrecio = function(precio) {
        return $http(creaPeticion('POST', configuracion.rutaApiGetPrecio, precio, undefined));
    }

    this.borrarConsumo = function(id) {
        return $http(creaPeticion('DELETE', configuracion.rutaApiDeleteConsumo, undefined, id));
    }

    this.getConsumo = function(id) {
        return $http(creaPeticion('GET', configuracion.rutaApiDeleteConsumo, undefined, id));
    }

    this.editarConsumo = function(datos, id) {
        return $http(creaPeticion('PUT', configuracion.rutaApiDeleteConsumo, datos, id));
    }

    this.crearConsumo = function(consumo) {
        return $http(creaPeticion('POST', configuracion.rutaApiDeleteConsumo, consumo, undefined));
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
