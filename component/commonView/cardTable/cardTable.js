/**
 * Created by lica on 8/5/2016.
 */
angular.module("appModule")
    .directive("cardTable", function () {
        return {
            templateUrl: "./component/commonView/cardTable/cardTable.html",
            restrict: 'E',
            scope: {
                datalist: '=',
                cardWidth: '@',
                cardHeight: '@',
                id: '@',
                name: '@',
                selectedMap: '=',
                isSelectable: '@',
                filter: '=',
                onClick: '&'
            },
            link: function () {

            },
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.click = function (id, name) {
                    if (!$scope.isSelectable) {
                        return;
                    }
                    if ($scope.selectedMap.get(id))
                        $scope.selectedMap.remove(id)
                    else
                        $scope.selectedMap.put(id, name);

                    $scope.onClick({selectedMap: $scope.selectedMap});
                }

                $scope.myNgIf = function (item) {
                    if (!$scope.filter) {
                        return true;
                    }
                    for (var key in $scope.filter) {
                        for (var i = 0; i < $scope.filter[key].length; i++) {
                            if (item[key] == $scope.filter[key][i]) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

            }]
        }
    })