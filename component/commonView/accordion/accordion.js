/**
 * Created by zhouxiux on 2016/6/23.
 */

angular.module('appModule')
    .directive('accordion', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            controller: function() {
                var expanders = [];
                this.gotOpened = function(selectedExpander) {
                    angular.forEach(expanders, function(expander) {
                        if (selectedExpander != expander) {
                            expander.showMe = false;
                        }
                    });
                };
                this.addExpander = function(expander) {
                    expanders.push(expander);
                };
            }
        };
    });
angular.module('appModule')
    .directive('expander', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?accordion',
            scope: {
                expanderTitle: '=title',
                isDisable:  '=isDisable',
                lastModifyDate: '=lastModifyDate'
            },
            template:'<div style="position: relative;">'
            +'<div class="optionItem" style="height:49px" ng-click="toggle()">'
            +'<div style="margin-right:60px;" >'
            +'<div style="float:left;margin-top:15px;">'
            +'<div style="float:left;margin-left:20px;display:inline-block;">'
            +'<div style="float:left;width:14px;height:14px;">'
            +'<img ng-show="itemStatus" style="margin-right:20px;" src="./asset/image/state_jingyong.png">'
            +'</img> </div>'
            +'<div style="float:left; margin-left:16px;">{{expanderTitle}}</div>'
            +' </div>'
            +'<div style="clear:both;"></div>'
            +'</div>'
            +'<div style="float:right;margin-top:16px; margin-right:30px;">'
            +'<img style="float:left;margin-right:10px;margin-top: 3px;" src="asset/image/icon_clock.png"></img>'
            +'<div style="float:left;font-size:12px;color:gray;margin-right:10px;">最后修改时间</div>'
            +'<div style="float:left;font-size:12px;padding-top:2px;">{{lastModifyDate}}</div>'
            +'<div style="clear:both;"></div>'
            +'</div>'
            +'</div>'
            +'<div style="float:right; text-align:center;margin-top:19px;margin-right:20px;position: absolute;right:0;">'
            +'<img ng-if="showMe" src="./asset/image/i_up.png">'
            +'<img ng-if="!showMe" src="./asset/image/i_down.png">'
            +'</div>'
            +'<div style="clear:both;"></div>'
            +'</div>'
            +'<div style="border-top: 0 50px;background-color:#fbfbfb;">'
            +'<div class="ex-body" ng-show="showMe" ng-transclude></div>'
            +'</div>'
            +'</div>',

            link: function(scope, iElement, iAttrs, accordionController) {
                //产品项目状态
                scope.itemStatus=false;
                if(scope.isDisable==1){
                    scope.itemStatus=false;
                }else{
                    scope.itemStatus=true;
                }
                //拉开手风琴
                scope.showMe = false;
                accordionController.addExpander(scope);
                scope.toggle = function toggle() {
                    scope.showMe = !scope.showMe;
                    accordionController.gotOpened(scope);
                };
            }
        };
    });
