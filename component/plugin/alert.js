//各种弹出框
(function($){
    $.extend({
        alert:alert,
        confirm:confirm
    });
    var pending=[];
    var template='<div class="hxAlert"><div class="hxAlertFrameContent"><div class="hxAlertIcon"><div class="hxAlertIconContainer"><img src="./asset/image/icon_warnning.png" alt=""></div></div><div class="hxAlertMsg"><div class="hxAlertContent"><%=msg%></div></div></div><div class="hxAlertOper"></div></div>';
    var alertOper='<button id="hxAlertOk" class="hxButton backgroundBlue hxWhite">确定</button>';
    var confirmOper='<button id="hxAlertOk" class="hxButton backgroundBlue hxWhite">确定</button><button id="hxAlertCancel" class="hxButton backgroundYellow hxWhite">取消</button>';
    /**
     * 弹出确认模态框，
     * msg 内容
     * callback 可选的确认按钮点击回调函数
     */
    function alert(msg,callback){
        pending.push(function(){
            var container=show(_.template(template)({msg:msg}),alertOper);
            container.find("#hxAlertOk").click(function(){
                if(callback!=null){
                    callback();
                }
                hide(container);
                if(pending.length!=0){
                    pending[0]();
                    pending.splice(0,1);
                }
            });
        });
        exhaust();
    }
    /**
     * 弹出带有确认和取消的模态框
     * msg 内容
     * okcallback 可选的确认按钮点击回调
     * cancelcallback 可选的取消按钮点击回调
     */
    function confirm(msg,okcallback,cancelcallback){
        var container=show(_.template(template)({msg:msg}),confirmOper);
        container.find("#hxAlertOk").click(function(){
            if(okcallback!=null){
                okcallback();
            }
            hide(container);
        });
        container.find("#hxAlertCancel").click(function(){
            if(cancelcallback!=null){
                cancelcallback();
            }
            hide(container);
        });
    }
    /**
     * 显示模态框 返回当前模态框的容器
     */
    function show(template,oper){
        var temp=$(template);
        temp.css({
            position:'absolute',
            top:"50%",
            left:"50%",
            marginLeft:"-185px",
            marginTop:"-80px"
        });
        temp.find(".hxAlertOper").append(oper);
        var container=$('<div style="position:absolute;top:0px;left:0px;bottom:0px;right:0px;z-index:100"></div>');
        container.append(temp);
        $('body').css({position:'relative'}).append(container);
        temp.velocity({
            opacity:[1,0],
            scaleX:[1,0.7],
            scaleY:[1,0.7]
        },{
            easing:'spring'
        });
        return container;
    }
    /**
     * 隐藏模态框
     */
    function hide(container){
        container.find(".hxAlert").velocity({
            opacity:[0,1],
            scaleX:[0.7,1],
            scaleY:[0.7,1]
        },{
            easing:'ease',
            complete:function(){
                container.remove();
            }
        });
    }
    function exhaust(){
        if(pending.length>0){
            pending[0]();
            pending.splice(0,1);
        }
    }
})(jQuery);