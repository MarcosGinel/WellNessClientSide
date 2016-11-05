/**
 * Created by marco on 05/11/2016.
 */

angular.module("wellnessApp").service("LoginService", [function(){
    this.validate = function(username, password) {
        return (username != undefined && password != undefined && username != "" && password != "");
    }


}]);
