angular.module("appModule")
    .directive("leftSidebar", function () {
        return {
            restrict: 'E',
            scope: {
                sidebarData: '=',
                onClick: '&',
                selectedItemName: '='
            },
            link: function ($scope, $element) {
            },
            controller: ['$scope', '$element', '$interval', '$timeout', function ($scope, $element, $interval, $timeout) {
                var marginToTop = 0;
                var barHeight = 0;
                var step = 0;
                var bar = $($element).find('#bar');
                $scope.isShowTop = true;
                $scope.isShowBottom = true;

                $timeout(function () {
                    barHeight = bar.height();
                    step = barHeight / ($scope.sidebarData.length * 2);
                    var up = $($element).find('.up-arrow')[0].offsetTop;
                    var down = $($element).find('.down-arrow')[0].offsetTop;
                    if (barHeight < down - up) {
                        $scope.isShowBottom = false;
                    } else {
                        $scope.isShowBottom = true;
                    }
                }, 0);

                $scope.$watch(function () {
                    return marginToTop;
                }, function (newVal, oldVal) {
                    if (newVal < 0) {
                        $scope.isShowTop = true;
                    } else {
                        $scope.isShowTop = false;
                    }
                });

                $(window).resize(function () {
                    var up = $($element).find('.up-arrow')[0].offsetTop;
                    var down = $($element).find('.down-arrow')[0].offsetTop;
                    if (barHeight < down - up) {
                        $scope.isShowBottom = false;
                    } else {
                        $scope.isShowBottom = true;
                    }

                    $scope.$apply(function () {
                        //do something to update current scope based on the new innerWidth and let angular update the view.
                    });
                });

                $scope.toUp = function () {
                    var up = $($element).find('.up-arrow')[0].offsetTop;
                    var down = $($element).find('.down-arrow')[0].offsetTop;
                    if (down - up - marginToTop <= barHeight) {
                        $scope.isShowBottom = true;
                    }
                    if (step < -marginToTop) {
                        $interval(function () {
                            bar.css({'margin-top': marginToTop = marginToTop + 2});

                        }, 10, step / 2).then(function () {
                            return;
                        })
                    }
                    if (-marginToTop < step && -marginToTop > 0) {
                        $interval(function () {
                            bar.css({'margin-top': marginToTop = marginToTop + 2});

                        }, 10, -marginToTop / 2).then(function () {
                            return;
                        })
                    }
                };

                $scope.toDown = function () {
                    var up = $($element).find('.up-arrow')[0].offsetTop;
                    var down = $($element).find('.down-arrow')[0].offsetTop;
                    if (down - up - marginToTop > barHeight) {
                        $scope.isShowBottom = false;
                        return;
                    }
                    if (barHeight - (down - up - marginToTop ) > step) {
                        $interval(function () {
                            bar.css({'margin-top': marginToTop = marginToTop - 2});

                        }, 10, step / 2).then(function () {
                            return;
                        })
                    }
                    if (barHeight - (down - up - marginToTop ) < step && barHeight - (down - up - marginToTop ) > 0) {
                        $interval(function () {
                            bar.css({'margin-top': marginToTop = marginToTop - 2});

                        }, 10, (barHeight - (down - up - marginToTop )) / 2).then(function () {
                            $scope.isShowBottom = false;
                        })
                    }
                };

                $scope.clickItem = function (item) {
                    $scope.currentItem = item.name;
                    $scope.onClick({item: item});
                }

            }],
            templateUrl: "./component/commonView/leftSidebar/leftSidebar.html"
        };
    })
    .filter('normalOrPressed', function () {
        return function (item, selectedItemName, currentItem) {
            if (currentItem == item.name || item.name == selectedItemName)
                return item.imgSrcPressed;
            else
                return item.imgSrc;
        }
    });