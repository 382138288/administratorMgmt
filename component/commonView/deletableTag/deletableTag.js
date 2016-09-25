/**
 * Created by lica on 8/9/2016.
 */
angular.module("appModule")
    .directive("deletableTag", [function () {
        return {
            templateUrl: "./component/commonView/deletableTag/deletableTag.html",
            restrict: 'E',
            scope: {
                selectedMap: '=',
                onDelete: '&',
                tagMarginLeft: '@',
                tagMarginTop: '@',
                tagPadding: '@',
                isDeleteable: '@'
            },

            link: function () {

            },
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.datas = ['西毒', '东邪', '南帝', '北丐', '中神通', '老顽童', '靖哥哥', '蓉儿'];
                $scope.deleteTag = function (key) {
                    $($element).find('#' + key + "").fadeOut('slow', function () {
                        $(this).remove();
                    });
                    $scope.onDelete({key: key});
                    $scope.selectedMap.remove(key);
                }

                $scope.myNgIf = function () {
                    if ($scope.isDeleteable) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }]
        }
    }])