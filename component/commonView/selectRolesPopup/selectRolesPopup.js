/**
 * Created by lica on 8/10/2016.
 */
angular.module('appModule')
    .component('selectRolesPopup', {
        bindings: {
            selectedMap: '=',
            selectedMapCopy: '=',
            datalist: '=',
            onClose: '&'
        },
        templateUrl: "./component/commonView/selectRolesPopup/selectRolesPopup.html",
        controller: ['$scope', '$timeout', '$element', 'authorizationService', 'authorizationUrl', function ($scope, $timeout, $element, authorizationService, authorizationUrl) {
            var $ctrl = this;
            $ctrl.searchContent = '';
            $(window).resize(function () {
                var search = $($element).find('#role-search')[0].offsetTop;
                var footer = $($element).find('#popup-footer')[0].offsetTop;
                $scope.scrollHeight = footer - search - 50;
                $scope.css = "height:" + $scope.scrollHeight + "px";

                $scope.$apply(function () {
                    //do something to update current scope based on the new innerWidth and let angular update the view.
                });
            });

            $timeout(function () {
                var search = $($element).find('#role-search')[0].offsetTop;
                var footer = $($element).find('#popup-footer')[0].offsetTop;
                $scope.scrollHeight = footer - search - 50;
                $scope.css = "height:" + $scope.scrollHeight + "px";

            }, 0);

            $ctrl.keypress = function (event) {
                if (event.keyCode == 13) {
                    filterRole();
                }
            };

            $ctrl.filterRoles = function () {
                filterRole();
            }

            var filterRole = function () {
                authorizationService.serviceGetLite(authorizationUrl.getUserRoles + '?tagOrName=' + $ctrl.searchContent).then(function (res) {
                    $ctrl.datalist = res;
                }, function (err) {
                    $.alert("服务器请求失败");
                })
            }

            $scope.onClickCard = function (selectedMapCopy) {
                $ctrl.selectedMapCopy.putAll(selectedMapCopy);
            }

            $scope.save = function () {
                $ctrl.selectedMap.clear();
                $ctrl.selectedMap.putAll($ctrl.selectedMapCopy);
                $ctrl.onClose();
            }

            $scope.cancel = function () {
                $ctrl.selectedMapCopy.clear();
                $ctrl.selectedMapCopy.putAll($ctrl.selectedMap);
                $ctrl.onClose();
            }
        }]
    })
