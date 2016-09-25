/**
 * Created by lica on 8/18/2016.
 */
angular.module('appModule').component('selectDepartPopup', {
    bindings: {
        organizations: '=',
        orgData: '<',
        selectedMap: '=',
        selectedMapCopy: '=',
        onClose: '&'
    },
    templateUrl: "./component/commonView/selectDepartPopup/selectDepartPopup.html",
    controller: ['$scope', '$timeout', '$element', 'cloneservice', function ($scope, $timeout, $element, cloneservice) {
        var $ctrl = this;
        for (var i = 0; i < $ctrl.orgData.length; i++) {
            if ($ctrl.orgData[i].position) {
                $ctrl.orgData.splice(i, 1);
                i--;
            }
        }

        $scope.treeStatus = true;
        $scope.clickitems = [];
        $scope.orgConf = {
            clickSelect: true,
            multiClick: false,
            multiple: false,
            isOpen: false,
            addChildNode: false,
            editNode: false,
            deleteNode: false,
            createTreeCallback: function (item) {
                if (item.position) {
                    item.$$isFolder = false;
                } else {
                    item.$$isFolder = true;
                }
                for (var key in $ctrl.selectedMapCopy.container) {
                    if (item.uuid == key) {
                        item.$$active = true;
                        var iterator = item
                        expandFolders();
                        function expandFolders() {
                            if (!iterator.$$parent) {
                                iterator.$$isOpen = true;
                            } else {
                                iterator.$$isOpen = true;
                                iterator = iterator.$$parent;
                                expandFolders();
                            }
                        }

                        $scope.clickitems.push(item);
                        return;
                    }
                }
                item.$$active = false;
            }
        };
        if ($ctrl.selectedMapCopy.size() == 0) {
            $scope.orgConf.isOpen = true;
        }
        $(window).resize(function () {
            var search = $($element).find('#tree-switch')[0].offsetTop;
            var footer = $($element).find('#popup-footer')[0].offsetTop;
            $scope.scrollHeight = footer - search - 50;
            $scope.css = "height:" + $scope.scrollHeight + "px";

            $scope.$apply(function () {
                //do something to update current scope based on the new innerWidth and let angular update the view.
            });
        });

        $timeout(function () {
            var search = $($element).find('#tree-switch')[0].offsetTop;
            var footer = $($element).find('#popup-footer')[0].offsetTop;
            $scope.scrollHeight = footer - search - 50;
            $scope.css = "height:" + $scope.scrollHeight + "px";

        }, 0);

        $scope.clickOrg = function (item) {
            for (var i = 0; i < $scope.clickitems.length; i++) {
                $scope.clickitems[i].$$active = false;
            }
            $ctrl.selectedMapCopy.clear();
            $ctrl.selectedMapCopy.put(item.uuid, item.name);

        }

        $scope.onDelete = function (key) {
            for (var i = 0; i < $scope.clickitems.length; i++) {
                if ($scope.clickitems [i].uuid == key) {
                    $scope.clickitems [i].$$active = false;
                    $scope.clickitems.splice(i, 1);
                    break;
                }
            }
        }

        $scope.openOrgTree = function () {
            $scope.orgConf.openTree();
            $scope.treeStatus = true;
        }
        $scope.closeOrgTree = function () {
            $scope.orgConf.closeTree();
            $scope.treeStatus = false;
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
    }
    ]
})
