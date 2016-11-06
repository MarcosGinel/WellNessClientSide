/**
 * Created by marco on 06/11/2016.
 */

angular.module('wellnessApp').controller('ModalInstanceCtrl', ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {
    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
