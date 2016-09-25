angular.module("appModule")
.directive('loadMore',[function(){
    return {
        templateUrl:'./component/commonView/loadMore/loadMore.html',
        restrict:"E",
        scope:{
            active:"=",
            loadmore:"&loadmore"
        },
        link:function($scope, iElm, iAttrs, controller){
            var id=null;
            $scope.$watch(function(){
                return $scope.active;
            },function(newvalue){
                if(newvalue){
                    if(id==null){
                        active();
                        id=setInterval(function(){
                            active();
                        },1200);
                    }
                }else{
                    clearInterval(id);
                    id=null;
                }
            });
            
            function active(){
                iElm.find(".red").velocity({scale:[1.5,1]},{duration:300}).velocity("reverse");
                iElm.find(".blue").velocity({scale:[1.5,1]},{delay:300,duration:300}).velocity("reverse");
                iElm.find(".gray").velocity({scale:[1.5,1]},{delay:600,duration:300}).velocity("reverse");
            }
            
            $scope.$on("$destroy",function(){
                if(id!=null){
                    clearInterval(id);
                    id=null;
                }
            });
            
        }
    };
}]);