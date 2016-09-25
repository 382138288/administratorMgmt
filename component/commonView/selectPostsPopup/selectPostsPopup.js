/**
 * Created by lica on 8/11/2016.
 */
angular.module('appModule').component('selectPostsPopup', {
    bindings: {
        organizations: '=',
        orgData: '<',
        selectedMap: '=',
        selectedMapCopy: '=',
        onClose: '&'
    },
    templateUrl: "./component/commonView/selectPostsPopup/selectPostsPopup.html",
    controller: ['$scope', '$timeout', '$element', function ($scope, $timeout, $element) {
        var $ctrl = this;
        $scope.treeStatus = true;
        $scope.selectedOrg = [];
        $scope.orgConf = {
            clickSelect: false,
            multiClick: false,
            multiple: true,
            multipleType: 'check',
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
                        item.$$status = 'checked';
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

                        $scope.selectedOrg.push(item);
                        return;
                    }
                }
                item.$$status = 'unchecked';
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

        $scope.$watch(function () {
            return $scope.selectedOrg;
        }, function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $ctrl.selectedMapCopy.clear();
                for (var i = 0; i < newVal.length; i++) {
                    $ctrl.selectedMapCopy.put(newVal[i].uuid, newVal[i].name);
                }
            }
        }, true)

        $scope.clickOrg = function (item) {

            $ctrl.selectedMapCopy.clear();

            for (var i = 0; i < item.length; i++) {
                $ctrl.selectedMapCopy.put(item[i].uuid, item[i].name);
            }
        }

        $scope.onDelete = function (key) {
            for (var i = 0; i < $scope.selectedOrg.length; i++) {
                if ($scope.selectedOrg[i].uuid == key) {
                    $scope.selectedOrg[i].$$status = 'unchecked';
                    $scope.selectedOrg.splice(i, 1);
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