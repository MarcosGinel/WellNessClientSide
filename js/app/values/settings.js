/**
 * Created by marco on 05/11/2016.
 */

angular.module("wellnessApp").value("configuracion", {
    "protocol" : "http",
    "host" : "localhost:8000",
    "rutaApiLogin" : "users/api/v1/login/",
    "rutaApiLogout" : "users/api/v1/logout/",
    "rutaApiGetUsers" : "users/api/v1/users/",
    "sesion" : {}
});