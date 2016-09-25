angular.module("appModule").component("hxCalendarSingle",{
    templateUrl:"./component/commonView/hxCalendar/hxCalendarSingle.html",
    controller:[function(){
        var $ctrl=this;
        $ctrl.selectDay=function(day){
            $ctrl.onSelectDay({day:day});
        };
        //阻止事件外传
        $ctrl.preventBubble=function($event){
            $event.stopPropagation();
        };
    }],
    bindings:{
        show:"=",
        onSelectDay:"&"
    }
});