/**
 * Created by lica on 7/19/2016.
 */
angular.module('appModule').directive('selectTag', function () {
    return {
        templateUrl: './component/commonView/selectTag/selectTag.html',
        restrict: "E",
        scope: {
            datalist: '=',
            selectedMap: '=',
            id: '@',
            name: '@',
            onClick: '&'
        },
        controller: ['$scope', function ($scope) {
            $scope.selectedIdList = [];
            $scope.selectedNameList = [];
            $scope.selectedTagMap = new Map();
            $scope.$watch(function () {
                if ($scope.selectedMap != undefined)
                    return $scope.selectedMap.container
            }, function (newVal, oldVal) {
                if ($scope.selectedMap == undefined)
                    return;
                $scope.selectedTagMap.clear();
                $scope.selectedTagMap.putAll($scope.selectedMap.container);
                $scope.onClick({
                    selectedIdList: $scope.selectedTagMap.keySet(),
                    selectedNameList: $scope.selectedTagMap.values()
                });
            }, true)
            $scope.select = function (roleId, roleName) {
                if ($scope.selectedTagMap.get(roleId) != undefined) {
                    $scope.selectedTagMap.remove(roleId);
                } else {
                    $scope.selectedTagMap.put(roleId, roleName);
                }
                $scope.selectedIdList = $scope.selectedTagMap.keySet();
                $scope.selectedNameList = $scope.selectedTagMap.values();
                $scope.onClick({selectedIdList: $scope.selectedIdList, selectedNameList: $scope.selectedNameList});
            }
        }],
        link: function ($scope) {

        }
    }
})