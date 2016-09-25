angular.module('appModule').directive("listFilter", [function() {
    return {
        templateUrl: "component/commonView/listFilter/listFilter.html",
        controller: ['$scope', function($scope) {
            $scope.isShowCal = false;
            console.log($scope.filterData, "items");
            $('body').click(function(event){
                for (var i = 0; i < $scope.list.length; i++) {
                        $scope.list[i].filterShow = false;
                        $scope.list[i].filterShow2 = false;
                }
                $scope.$apply();
                event.stopPropagation();
            })
            $scope.showFilter = function($event,item) {
                console.log($event);
                
                //if(item.filterType="list"){
                if (item.filterType != 'list' && item.filterType != "date") {
                    item.filterShow = !item.filterShow;
                } else {
                    if (item.filterShow2) {
                        item.filterShow2 = false;
                    } else {
                        item.filterShow2 = true;
                    }
                }
                for (var i = 0; i < $scope.list.length; i++) {
                    if ($scope.list[i].column != item.column) { 
                        $scope.list[i].filterShow = false;
                        $scope.list[i].filterShow2 = false;
                    }
                }
                $($event.target).siblings('.hxTitleInput').find("input").focus();
                $event.stopPropagation();
            };
            $scope.stopevent=function($event){
                $event.stopPropagation();
            }
            $scope.onSelectSearch = function(items) {

                $scope.onSelect();
                items.filterShow = false;
                items.filterShow2 = false;
            };
            $scope.newsSearch = function($event, item) {
                if ($event.keyCode == 13) {
                    $scope.onSelectSearch(item);
                }
            }
        }],
        scope: {
            filterData: "=",
            list: "=",
            onSelect: "&"
        }
    }
}])
.filter('imghover',function(){
    return function(value,src){
        var url=src;
        if(typeof(value)=='object'&& value!=null &&value!=undefined){
            if(value.length>0){
                url=url.substring(0,src.lastIndexOf('.'))+"_ov.png";
            }
        }else{
            if(value){
                url=url.substring(0,src.lastIndexOf('.'))+"_ov.png";
            }
        }
        return url;
    }
})

