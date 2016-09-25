/**
 * Created by lica on 8/13/2016.
 */
angular.module('appModule').component('permissionListPopup', {
    bindings: {
        roles: '='
    },
    templateUrl: "./component/commonView/permissionListPopup/permissionListPopup.html",
    controller: ['$scope', '$timeout', '$element', 'authorizationService', 'authorizationUrl', function ($scope, $timeout, $element, authorizationService, authorizationUrl) {
        var $ctrl = this;
        $scope.fnCurrent = 0;
        $scope.dataCurrent = 0;
        $scope.currentRole = null;
        $scope.lastRole = null;
        $scope.filter = {effect: [1]};
        $scope.data = {};
        $scope.fn = {};
        $scope.appsConf = {
            clickSelect: false,
            multiple: true,
            multiClick: false,
            isOpen: true,
            label: "displayName",
            createTreeCallback: function (item) {
                if (item.effect) {
                    if (item.children.length > 0) {
                        var bool = true;
                        for (var g = 0; g < item.children.length; g++) {
                            if (!item.children[g].effect) {
                                bool = false;
                            }
                        }
                        if (bool) {
                            item.status = "checked";
                        } else {
                            item.status = "halfchecked";
                        }
                    } else {
                        item.status = "checked";
                    }
                    $scope.selectedAppRole.push(item);
                }
            }
        }

        $(window).resize(function () {
            var search = $($element).find('.right-part-title')[0].offsetTop;
            var footer = $($element).find('#popup-footer')[0].offsetTop;
            $scope.scrollHeight = footer - search - 50;
            $scope.css = "height:" + $scope.scrollHeight + "px;overflow: auto;padding-bottom: 8px;";

            $scope.$apply(function () {
                //do something to update current scope based on the new innerWidth and let angular update the view.
            });
        });

        $timeout(function () {
            var search = $($element).find('.right-part-title')[0].offsetTop;
            var footer = $($element).find('#popup-footer')[0].offsetTop;
            $scope.scrollHeight = footer - search - 50;
            $scope.css = "height:" + $scope.scrollHeight + "px;overflow: auto;padding-bottom: 8px;";

        }, 0);

        authorizationService.serviceGet(authorizationUrl.getAllApps).then(function (res) {
            $scope.fnApps = res;
        }, function (err) {
            $.alert("服务器请求失败");
        })

        $scope.clickRoleItem = function (index, role) {
            console.log('role', role);
            $scope.lastRole = $scope.currentRole;
            $scope.currentRole = role;
            $scope.currentIndex = index;
            if ($scope.tabStatus == undefined) {
                $scope.tabStatus = 'fn';
            }

            $scope.roleName = role.roleId;
            if (!$scope.appName) {
                $scope.appName = $scope.fnApps[0].name;
            }
            var url = authorizationUrl.getRolesPrivileges + "?roleName=" + $scope.roleName + "&appName=" + $scope.appName;
            authorizationService.serviceGet(url).then(function (res) {
                $scope.appRole = res;
                var array = $scope.appRole.RBSimpleRuleDTOs.concat([]);
                for (var i = 0; i < array.length; i++) {
                    if (array[i].effect == undefined || array[i].effect == 0) {
                        array.splice(i, 1);
                        i--;
                    }
                }
                $scope.appRoleData = array;
            }, function (err) {
                $.alert("服务器请求失败");
            })

            $scope.roleName = $scope.currentRole.roleId;
            var url = authorizationUrl.getUIElements + "?roleName=" + $scope.roleName;
            authorizationService.serviceGet(url).then(function (res) {
                $scope.appRole = res;
                var array = $scope.appRole.RBSimpleRuleDTOs.concat([]);
                $scope.dataApps = array;
            }, function (err) {
                $.alert("服务器请求失败");
            })
        }

        $scope.selectedApp = function (item, i) {
            $scope.appName = item.name;
            $scope.fnCurrent = i;
            if ($scope.roleName) {
                var url = authorizationUrl.getRolesPrivileges + "?roleName=" + $scope.roleName + "&appName=" + $scope.appName;
                authorizationService.serviceGet(url).then(function (res) {
                    $scope.appRole = res;
                    var array = $scope.appRole.RBSimpleRuleDTOs.concat([]);
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].effect == undefined || array[i].effect == 0) {
                            array.splice(i, 1);
                            i--;
                        }
                    }
                    $scope.appRoleData = array;
                }, function (err) {
                    $.alert("服务器请求失败");
                })
            }
        }

        $scope.selectedElm = function (i) {
            $scope.current = i;
        }

        $scope.openFnTab = function () {
            $scope.tabStatus = 'fn';
            $scope.fn.init();
        }

        $scope.openDataTab = function () {
            $scope.tabStatus = 'data';

            if ($scope.currentRole !== $scope.lastRole && $scope.currentRole) {
                $scope.roleName = $scope.currentRole.roleId;
                var url = authorizationUrl.getUIElements + "?roleName=" + $scope.roleName;
                authorizationService.serviceGet(url).then(function (res) {
                    $scope.appRole = res;
                    var array = $scope.appRole.RBSimpleRuleDTOs.concat([]);
                    $scope.dataApps = array;
                }, function (err) {
                    $.alert("服务器请求失败");
                })
            }
            $scope.data.init();
        }
    }]
})