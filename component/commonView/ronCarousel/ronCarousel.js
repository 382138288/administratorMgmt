angular.module("appModule")
    .directive("ronCarousel", function() {
        return {
            restrict: "A",
            replace: true,
            transclude: true,
            scope: {
                carouselStyle:'@',
                speed:'@',
                carouselType:'@',
                carouse:"=",
                carouselIcoStyle:'@'
            },
            template: '<div class="ronCarousel" style="{{carouselStyle}}"><i class="carousel_left" style="{{carouselIcoStyle}}" ng-show="length" ng-mousedown="moveLeft()" ng-mouseup="moveOverLeft()"></i><div class="carousel_list" ng-transclude></div><i class="carousel_right" ng-show="length" style="{{carouselIcoStyle}}" ng-mousedown="moveRight()" ng-mouseup="moveOverRight()"></i></div>',
            controller: ['$scope', '$element','$timeout', function($scope, $element,$timeout) {
                var obj = $($element).find(".carousel_list");
                if($scope.carouse==undefined){ $scope.carouse={};}
                if($scope.speed==undefined||$scope.speed==null){$scope.speed=100;}
                if($scope.carouselType==undefined||$scope.carouselType==null){$scope.carouselType='mousedown';}
                var timer=$timeout(function() {
                    var width = 0;
                    $scope.length=obj.children().length;
                    obj.children().each(function() {
                        width += parseFloat($(this).css('margin-left'));
                        width += parseFloat($(this).css('margin-right'));
                        width += parseFloat($(this).css('padding-left'));
                        width += parseFloat($(this).css('padding-right'));
                        width += parseFloat($(this).css('border-left-width'));
                        width += parseFloat($(this).css('border-right-width'));
                        width += parseFloat($(this).css('width'));
                    })
                    obj.width(width);
                });
                $scope.carouse.init=function(){
                    $timeout(function() {
                        $scope.length=obj.children().length;
                        var width=0;
                        obj.children().each(function() {
                            width += parseFloat($(this).css('margin-left'));
                            width += parseFloat($(this).css('margin-right'));
                            width += parseFloat($(this).css('padding-left'));
                            width += parseFloat($(this).css('padding-right'));
                            width += parseFloat($(this).css('border-left-width'));
                            width += parseFloat($(this).css('border-right-width'));
                            width += parseFloat($(this).css('width'));
                        })
                        obj.width(width);
                    });
                }
                var t1, t2;
                var left = 0;
                $scope.moveLeft = function() {
                    if($scope.carouselType=='mousedown'){
                    if (left < 0) {
                        t2 = setInterval(function() {
                            if (left < 0) {
                                left += 2;
                                obj.css({ "margin-left": left });
                            } else {
                                clearInterval(t2);
                            }
                        }, 100/parseInt($scope.speed));
                    }
                    }
                }
                $scope.moveRight = function() {
                    if($scope.carouselType=='mousedown'){
                    if ($($element).width() < obj.width() + left) {
                        t1 = setInterval(function() {
                            if ($($element).width() < obj.width() + left) {
                                left -= 2;
                                obj.css({ "margin-left": left });
                            } else {
                                clearInterval(t1);
                            }
                        }, 100/parseInt($scope.speed));
                    }
                    }
                }
                $scope.moveOverLeft = function() {
                    if($scope.carouselType=='mousedown'){
                    clearInterval(t2);
                    }
                }
                $scope.moveOverRight = function() {
                    if($scope.carouselType=='mousedown'){
                    clearInterval(t1);
                    }
                }
                $scope.$on("$destroy",function( event ) {
                        $timeout.cancel( timer );
                });
            }]
        }
    });

