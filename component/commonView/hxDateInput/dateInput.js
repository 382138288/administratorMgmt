angular.module("appModule").directive("dateInput", ['formatDateFilter','hxCalendarCaculate',
function (formatDateFilter,hxCalendarCaculate) {
    return {
        templateUrl: "./component/commonView/hxDateInput/dateInput.html",
        scope:{
            accurate:"="
        },
        require: "^ngModel",
        controller: ['$scope','$element', function ($scope,$element) {
            $scope.show = false;
            $scope.toggleCal = function () {
                $scope.show = !$scope.show;
                if($scope.show==true){
                    setTimeout(function() {
                        $element.find(".dateInputCalCon").focus();
                    }, 0);
                }
            };
            $scope.selectDay = function (day) {
                $scope.show = false;
                element.find(".hxInput").val(formatDateFilter(day,false));
            };
            $scope.onBlur=function(){
                $scope.show = false;
            };
        }],
        link:function(scope,element,attrs,ngModel){
            ngModel.$render=function(){
                var value=ngModel.$viewValue;
                if(toString.call(ngModel.$viewValue)=="[object Date]"){
                    value=formatDateFilter(ngModel.$viewValue,scope.accurate);
                }
                element.find(".hxInput").val(value);
            };
            element.find(".hxInput").change(function(event){
                var curValue=event.target.value;
                var isValid=true;
                if(/\d{4}-\d{1,2}-\d{1,2}/.test(curValue)){
                    var arry=curValue.split("-");
                    isValid=hxCalendarCaculate.isValid(arry[0],arry[1],arry[2]);
                }else{
                    isValid=false;
                }
                if(isValid){
                    var arry=curValue.split("-");
                    var year=(new Number(arry[0])).valueOf();
                    var month=(new Number(arry[1])).valueOf();
                    var day=(new Number(arry[2])).valueOf();
                    ngModel.$setViewValue(new Date(year,month-1,day));
                }
                else{
                    $.alert("日期格式输入错误",function(){
                        ngModel.$rollbackViewValue();
                    });
                }
            });
            scope.selectDay = function (day) {
                scope.show = false;
                element.find(".hxInput").val(formatDateFilter(day,scope.accurate));
                ngModel.$setViewValue(day);
            };
        }
    };
}]);