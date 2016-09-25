/**
 * Created by lica on 8/15/2016.
 */
angular.module('appModule').component('permissionSetPopup', {
    bindings: {
        userName: '='
    },
    templateUrl: "./component/commonView/permissionSetPopup/permissionSetPopup.html",
    controller: ['$scope', '$timeout', '$element', 'authorizationService', 'authorizationUrl', function ($scope, $timeout, $element, authorizationService, authorizationUrl) {
        var $ctrl = this;
        console.log($ctrl.userName);
        $scope.current = 0;
        $scope.carousel = {};

        $scope.authConf = {
            clickSelect: false,
            multiple: false,
            multiClick: false,
            isOpen: true,
            label: 'displayName'
        }

        $(window).resize(function () {
            var header = $($element).find('#popup-header')[0].offsetTop;
            var footer = $($element).find('#popup-footer')[0].offsetTop;
            $scope.scrollHeight = footer - header - 50;
            $scope.css = "height:" + $scope.scrollHeight + "px;overflow: auto;margin-top: 42px;padding-bottom: 8px;padding-left:20px;";

            $scope.$apply(function () {
                //do something to update current scope based on the new innerWidth and let angular update the view.
            });
        });

        $timeout(function () {
            var header = $($element).find('#popup-header')[0].offsetTop;
            var footer = $($element).find('#popup-footer')[0].offsetTop;
            $scope.scrollHeight = footer - header - 50;
            $scope.css = "height:" + $scope.scrollHeight + "px;overflow: auto;margin-top: 42px;padding-bottom: 8px;padding-left:20px;";

        }, 0);

        $scope.selectedOrg = [];
        authorizationService.serviceGet(authorizationUrl.getUserPermissions + '?userId=' + $ctrl.userName).then(function (res) {
            $scope.auths = res;
            $scope.authData = $scope.auths[0].RBSimpleRuleDTOs;
            for (var i = 0; i < $scope.authData.length; i++) {
                if ($scope.authData[i].effect == undefined || $scope.authData[i].effect == 0) {
                    $scope.authData.splice(i, 1);
                    i--;
                }
            }
            $scope.carousel.init();
        }, function (error) {
            $.alert("服务器请求失败");
        });

        $scope.selectAppName = function (index) {
            $scope.current = index;
            $scope.authData = $scope.auths[index].RBSimpleRuleDTOs;
            for (var i = 0; i < $scope.authData.length; i++) {
                if ($scope.authData[i].effect == undefined || $scope.authData[i].effect == 0) {
                    $scope.authData.splice(i, 1);
                    i--;
                }
            }
        }
    }]
})