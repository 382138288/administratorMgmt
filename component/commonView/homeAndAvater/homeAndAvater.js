angular.module("appModule").component("homeAndAvater",{
    templateUrl:"./component/commonView/homeAndAvater/homeAndAvater.html",
    controller:['$state',function($state){
        var $ctrl=this;
        $ctrl.goHome=function(){
            $state.go('home.entry');
        };
    }],
    bindings:{

    }
})
.component("homeBarWithoutTab",{
    templateUrl:"./component/commonView/homeAndAvater/homeBarWithoutTab.html",
    controller:[function(){
        
    }],
    bindings:{
        title:"@"
    }
});