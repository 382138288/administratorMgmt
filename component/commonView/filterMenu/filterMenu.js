angular.module("appModule")
.directive('filterMenu',[function(){
    return {
        scope:{
            items:"=",
            QuoteItems:"=",
            show:"=",
            onSearch:"&",
            onQuoteSearch:"&",
            type:"@"
        },
        templateUrl:"./component/commonView/filterMenu/filterMenu.html",
        link:function ($scope) {
          //console.log($scope);
        },
        controller:['$scope',function($scope){
            //初始化选中items
            $scope.initItems = function(){
                if($scope.type != 'undefined' && $scope.type == "typeQuot"){
                    console.log($scope.type);
                    for(var i=0;i<$scope.items.length-1;i++){
                        $scope.items[i].selected = true;
                    }
                } else if (($scope.type != 'undefined' && $scope.type == "typeReg" )
                            || ($scope.type != 'undefined' && $scope.type == "typeCon" )) {
                    for(var i=0;i<$scope.items.length;i++){
                        $scope.items[i].selected = true;
                    }
                } else{
                    for(var i=0;i<$scope.items.length-2;i++){
                        $scope.items[i].selected = true;
                    }
                }
            }
            $scope.initItems();
            //状态检索
            $scope.search=function($event){
                $event.stopPropagation();
                var selects=[];
                for(var i=0;i<$scope.items.length;i++){
                    if($scope.items[i].selected)
                        selects.push(i+1);
                }
                $scope.onSearch({items:selects});
            };
            //状态选中
            $scope.onItemClick=function(event,item){
                event.stopPropagation();
                item.selected=!item.selected;
            };
            //状态toggle
            $scope.preventBubble=function(event){
                event.stopPropagation();
            };

            //初始化选中stateItems



        }]
    };
}]);