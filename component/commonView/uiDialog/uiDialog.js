angular.module('appModule')
.directive("ngDialog", function() {
    return {
        restrict: "A",
        replace:true,
        template:[
        "<div class='ngDialog' style='display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index:9996;'>",
        "<div class='ngDialogBg' style='position:absolute;width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,0.3);{{ngDialogBgStyle}}'></div>",
        "<div class='ngDialogBox' style='width:80%;height:80%;background:#fff;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0px 0px 10px rgba(0,0,0,0.5);{{ngDialogStyle}}'>",
        "<img ng-click='ngDialog.closeDialog(closeType)' src='./asset/image/pop_close.png' style='position:absolute;z-index:2;right:10px;top:10px;cursor:pointer;' />",
        "<div style='position:absolute;left:0;top:0;width:100%;height:46px;line-height:36px;font-size:16px;padding:10px 20px 0px 10px;'>{{ngDialogTitle}}</div>",
        "<div style='height:100%;width:100%;padding:66px 20px 50px 20px;'><div ng-transclude style='height:100%;'></div></div>",
        "<div ng-if='ngDialog.btnOpen' style='width:100%;position:absolute;bottom:0;left:0;height:50px; padding:10px 0px; text-align:center; background:#f1f1f1; border-top:1px solid #dcdcdc;'><button class='btn btn-warning btn-sm' ng-click='ngDialog.btnsure()' style='margin:0 10px;'>确定</button><a style='color:#3BC0C3;margin:0 10px;cursor:pointer;' ng-click='ngDialog.btncancel()'>取消</a></div>",
        "</div>",
        "</div>"].join(''),
        transclude: true,
        scope: {
                ngDialogBgStyle:'@',
                ngDialogStyle:'@',
                ngDialogTitle:'@',
                ngDialog:'='
            },
        link:function(scope,element,attr){
            scope.speed=' 0.5s';
            scope.ngDialog.showDialog=function(type,speed){
                type=type?type:'none';
                scope.speed=speed?speed:scope.speed;
                var box=element.find(".ngDialogBox");
                var bg=element.find(".ngDialogBg");
                switch(type){
                    case 'fadeIn':
                        bg.css({opacity:0});
                        box.css({opacity:0});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1});
                        break;
                    case 'fadeLeft':
                        bg.css({opacity:0});
                        box.css({opacity:0,left:'40%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,left:'50%'});
                        break;
                    case 'fadeRight':
                        bg.css({opacity:0});
                        box.css({opacity:0,left:'60%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,left:'50%'});
                        break;
                    case 'fadeTop':
                        bg.css({opacity:0});
                        box.css({opacity:0,top:'35%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,top:'50%'});
                        break;
                    case 'fadeBottom':
                        bg.css({opacity:0});
                        box.css({opacity:0,top:'65%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,top:'50%'});
                        break;
                    case 'slideUp':
                        bg.css({opacity:0});
                        box.css({top:'-50%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,top:'50%'});
                        break;
                    case 'slideDown':
                        bg.css({opacity:0});
                        box.css({top:'150%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,top:'50%'});
                        break;
                    case 'slideLeft':
                        bg.css({opacity:0});
                        box.css({left:'-50%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,left:'50%'});
                        break;
                    case 'slideRight':
                        bg.css({opacity:0});
                        box.css({left:'150%'});
                        element.show();
                        bg.animate({opacity:1});
                        box.animate({opacity:1,left:'50%'});
                        break;
                    /*case 'enlarge':
                        bg[0].style.opacity=0;
                        box.css({transform:scale(0,0)});
                        element.show();
                        bg.css({opacity:1});
                        box.css({opacity:1,transform:scale(1,1)});
                        break;
                    case 'inside':
                        bg[0].style.opacity=0;
                        box.css({transform:'rotateY(90deg)'});
                        element.show();
                        bg.css({opacity:1});
                        box.css({opacity:1,transform:'rotateY(0deg)'});
                        break;
                    case 'spread':
                        bg[0].style.opacity=0;
                        box.css({transform:scale(0,1)});
                        element.show();
                        bg.css({opacity:1});
                        box.css({opacity:1,transform:scale(1,1)});
                        break;*/
                    case 'none':
                        element.show();
                        bg.css({opacity:1});
                        box.css({opacity:1});
                        break;
                }
                scope.closeType=type;
            };
            scope.ngDialog.closeDialog=function(type,speed){
                type=type?type:'none';
                speed=speed?speed/1000+"s":'0.5s';
                var box=element.find(".ngDialogBox");
                var bg=element.find(".ngDialogBg");
                switch(type){
                    case 'fadeIn':
                        bg.animate({opacity:0});
                        box.animate({opacity:0},function(){element.hide();});
                        break;
                    case 'fadeLeft':
                        bg.animate({opacity:0});
                        box.animate({opacity:0,left:'40%'},function(){element.hide();});
                        break;
                    case 'fadeRight':
                        bg.animate({opacity:0});
                        box.animate({opacity:0,left:'60%'},function(){element.hide();});
                        break;
                    case 'fadeTop':
                        bg.animate({opacity:0});
                        box.animate({opacity:0,top:'35%'},function(){element.hide();});
                        break;
                    case 'fadeBottom':
                        bg.animate({opacity:0});
                        box.animate({opacity:0,top:'65%'},function(){element.hide();});
                        break;
                    case 'slideUp':
                        bg.animate({opacity:0});
                        box.animate({top:'-50%'},function(){element.hide();});
                        break;
                    case 'slideDown':
                        bg.animate({opacity:0});
                        box.animate({top:'150%'},function(){element.hide();});
                        break;
                    case 'slideLeft':
                        bg.animate({opacity:0});
                        box.animate({left:'-50%'},function(){element.hide();});
                        break;
                    case 'slideRight':
                        bg.animate({opacity:0});
                        box.animate({left:'150%'},function(){element.hide();});
                        break;
                    /*case 'enlarge':
                        bg.css({opacity:1});
                        box.css({transition:'all '+speed+' ease 0',transform:scale(1,1)});
                        bg.css({opacity:0});
                        box.css({transform:scale(0,0)});
                        element.hide();
                        break;
                    case 'inside':
                        bg.css({opacity:1});
                        box.css({transition:'all '+speed+' ease 0',transform:'rotateY(0deg)'});
                        bg.css({opacity:0});
                        box.css({opacity:1,transform:'rotateY(90deg)'});
                        element.hide();
                        break;
                    case 'spread':
                        bg.css({opacity:1});
                        box.css({transition:'all '+speed+' ease 0',transform:scale(1,1)});
                        bg.css({opacity:0});
                        box.css({opacity:1,transform:scale(0,1)});
                        element.hide();
                        break;*/
                    case 'none':
                        bg.css({opacity:0});
                        box.css({opacity:0});
                        element.hide();
                        break;
                }
            }
        }
    }
})

