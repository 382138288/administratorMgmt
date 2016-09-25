angular.module("appModule")
.directive('listFilterMenu',[function(){
    return {
        scope:{
            items:"=",
            show:"=",
            onSearch:"&",
            data:"="
        },
        templateUrl:"component/commonView/listFilter/listFilterMenu.html",
        link:function ($scope) {
        },
        controller:['$scope',function($scope){
            $scope.search=function($event){
                $event.stopPropagation();
                $scope.onSearch($scope.items);
            };
            $scope.onItemClick=function(event,item){
                event.stopPropagation();
                item.selected=!item.selected;
                if(item.selected){$scope.data.push(item.des);}
                else{
                    for(var i=0;i<$scope.data.length;i++){
                        if($scope.data[i]==item.des){$scope.data.splice(i,1);}
                    }
                }
            };
            $scope.preventBubble=function(event){
                event.stopPropagation();
            };
        }]
    };
}]);