angular.module('appModule').component("hxCalendar", {
    templateUrl: "./component/commonView/hxCalendar/hxCalendar.html",
    controller: ['hxCalendarCaculate','$element',function (hxCalendarCaculate,$element) {
        var $ctrl=this;
        $ctrl.now=new Date();
        var curYear=$ctrl.now.getFullYear();
        var curMonth=$ctrl.now.getMonth()+1;
        $ctrl.cur=$ctrl.now;
        $ctrl.days=hxCalendarCaculate.getWholeMonth($ctrl.now.getFullYear(),$ctrl.now.getMonth()+1);
        $ctrl.touched=$ctrl.now;
        $ctrl.toleft=function(){
            if(curMonth==1){
                curMonth=12;
                curYear--;
            }else{
                curMonth--;
            }
            $ctrl.cur=new Date(curYear,curMonth-1);
            $ctrl.days=hxCalendarCaculate.getWholeMonth(curYear,curMonth);
        };
        $ctrl.toright=function(){
            if(curMonth==12){
                curMonth=1;
                curYear++;
            }else{
                curMonth++;
            }
            $ctrl.cur=new Date(curYear,curMonth-1);
            console.log($ctrl.cur);
            $ctrl.days=hxCalendarCaculate.getWholeMonth(curYear,curMonth);
        };
        $ctrl.isEqual=function(date1,date2){
            if(date1.getFullYear()==date2.getFullYear() &&
            date1.getMonth()==date2.getMonth() &&
            date1.getDate()==date2.getDate())
                return true;
            else
                return false;
        };
        $ctrl.selectDay=function(day){
            $ctrl.touched=day;
            console.log(day);
            $ctrl.onSelect({day:day});
        };
        
        $ctrl.search=function($event){
            $event.stopPropagation();
            $ctrl.onSearch({times:[$ctrl.startTime,$ctrl.endTime]});
        };
    }],
    bindings:{
        onSelect:"&"
    }
}).
factory('hxCalendarCaculate', [function () {
    /**获取一年的各月的天数，接收一个年份 */
    function dayNumOfMonth(year, month) {
        var num = 0;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            return 31;
        if (month == 4 || month == 6 || month == 9 || month == 11)
            return 30;
        if (month == 2) {
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                return 29;
            else
                return 28;
        }
        throw new Error("month " + month + " not allowed");
    }
    return {
        /**返回指定月份内的所有天以及往前补到星期一和往后补到星期日的天 */
        getWholeMonth: function (year, month) {
            var num = dayNumOfMonth(year, month);
            var firstday = new Date(year, month - 1, 1);
            var lastday = new Date(year, month - 1, num);
            var before = (firstday.getDay() + 6) % 7;
            var after = (7 - lastday.getDay()) % 7;
            var temp = [];
            for (var i = before; i > 0; i--) {
                temp.push(new Date(firstday.getTime() - i * 24 * 3600 * 1000));
            }
            for (var i = 0; i < num + after; i++)
                temp.push(new Date(firstday.getTime() + i * 24 * 3600 * 1000));
            return temp;
        },
        isValid:function(year,month,day){
            var tempYear=(new Number(year)).valueOf();
            var tempMonth=(new Number(month)).valueOf();
            var tempDay=(new Number(day)).valueOf();
            var dayNumber=dayNumOfMonth(tempYear,tempMonth);
            if(tempYear<0)
                return false;
            if(tempMonth>12 || tempMonth<0)
                return false;
            if(tempDay<0 || tempDay>dayNumber)
                return false;
            return true;
        }
        
    };
}]);