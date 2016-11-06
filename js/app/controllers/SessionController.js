/**
 * Created by marco on 06/11/2016.
 */

angular.module("wellnessApp").controller("SessionController", ["SessionService", function(SessionService) {
    SessionService.checkToken();
}]);