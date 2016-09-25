angular.module("appModule").directive("popup",[function(){
    return {
        templateUrl:"./component/commonView/popup/popup.html",
        scope:{
            show:"=",
            ptitle:"@",
        },
        transclude:true,
        controller:['$scope',function($scope){
            console.log('show', $scope.show);
            $scope.hide=function(){
                $scope.show=false;
            };
            $scope.prevent=function(event){
                event.stopPropagation();
            };
        }],
        link:function($scope, iElm, iAttrs, controller){
            var defaultHeight="80%";
            var defaultWidth="80%";
            if(iAttrs['popupheight']!=null)
                defaultHeight=iAttrs['popupheight'];
            if(iAttrs['popupwidth']!=null)
                defaultWidth=iAttrs['popupwidth'];
                //console.log(iAttrs);
            
            var h=percentageToNumber(defaultHeight);
            var w=percentageToNumber(defaultWidth);
            var top=(100-h)/2+"%";
            var left=(100-w)/2+"%";
            $scope.css="top:"+top+";left:"+left+";width:"+w+"%;height:"+h+"%;";
            function percentageToNumber(per){
                var num=per.substr(0,per.length-1);
                return (new Number(num)).valueOf();
            }
        }
    };
}]);