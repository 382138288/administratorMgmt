angular.module('appModule')
    .directive('anchorPoint', function($rootScope) {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            replace: true,
            scope: {
                mainid: "=",
                anchorList: "=",
                anchorStyle: '='
            }, // {} = isolate, true = child, false/undefined = no change
            controller: ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
                $scope.scrollTopList = [];
                $scope.scrollheight = $("#" + $scope.mainid).offset().top;
                document.getElementById($scope.mainid).scrollTop = 0;
                $scope.$state = $state;
                //当跳转到其他路由时，注销带滚动条的主元素的scroll事件
                $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    $("#" + $scope.mainid).unbind('scroll');
                });
                if ($scope.anchorList != undefined && $scope.anchorList != null && $scope.anchorList.length > 1) {
                    $("#" + $scope.mainid).scroll(function() {
                        if ($scope.anchorList != undefined && $scope.anchorList != null && $scope.anchorList.length > 1) {
                            for (i = 0; i < $scope.anchorList.length; i++) {
                                if (i < $scope.anchorList.length - 1) {
                                    if ($("#" + $scope.anchorList[i].id).offset().top - $scope.scrollheight <= 0 && $("#" + $scope.anchorList[i + 1].id).offset().top - $scope.scrollheight > 0) {
                                        $(".anchorPoint").find(".anchorPoint_item").eq(i).addClass("active").siblings().removeClass("active");
                                    }
                                } else {
                                    if ($("#" + $scope.anchorList[i].id).offset().top - $scope.scrollheight <= 0) {
                                        $(".anchorPoint").find(".anchorPoint_item").eq(i).addClass("active").siblings().removeClass("active");
                                    }
                                }
                            }
                        }
                    });
                }
                $scope.scroll = function(i) {
                    console.log($scope.scrollTopList[i]);
                    $("#" + $scope.mainid).stop().animate({ scrollTop: $("#" + $scope.anchorList[i].id).offset().top - $scope.scrollheight + $("#" + $scope.mainid).scrollTop() }, 200, "swing", function() { $(".anchorPoint").find(".anchorPoint_item").eq(i).addClass("active").siblings().removeClass("active"); });
                }
                $scope.toUp = function() {
                    var index = $(".anchorPoint").find(".anchorPoint_item.active").index();
                    if (index > 1) {
                        $("#" + $scope.mainid).stop().animate({ scrollTop: $("#" + $scope.anchorList[index-2].id).offset().top - $scope.scrollheight + $("#" + $scope.mainid).scrollTop() }, 200, "swing",function(){
                            $(".anchorPoint").find(".anchorPoint_item").eq(index-2).addClass("active").siblings().removeClass("active");
                        });
                    } else {
                        $("#" + $scope.mainid).stop().animate({ scrollTop: 0 }, 200, "swing");
                    }
                }
                $scope.toDown = function() {
                    var index = $(".anchorPoint").find(".anchorPoint_item.active").index();
                    if (index<$scope.anchorList.length) {
                        $("#" + $scope.mainid).stop().animate({ scrollTop: $("#" + $scope.anchorList[index].id).offset().top - $scope.scrollheight + $("#" + $scope.mainid).scrollTop() }, 200, "swing",function(){
                            $(".anchorPoint").find(".anchorPoint_item").eq(index).addClass("active").siblings().removeClass("active");
                        });
                    } else {
                        var scrollHeight = document.documentElement.clientHieght - $scope.scrollheight || document.body.clientHeight - $scope.scrollheight;
                        var scrollY = document.getElementById($scope.mainid).scrollHeight - document.getElementById($scope.mainid).offsetHeight;
                        $("#" + $scope.mainid).stop().animate({ scrollTop: scrollY }, 200, "swing");
                    }
                }
            }],
            templateUrl: 'component/commonView/anchorPoint/anchorPoint.html',
            link: function($scope, iElm, iAttrs, controller) {}
        };
    })

