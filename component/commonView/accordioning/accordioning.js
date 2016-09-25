/**
 * Created by zhouxiux on 2016/7/4.
 */
angular.module('appModule')
    .directive('accordioning', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            controller: function() {
                var expands = [];
                this.gotOpened = function(selectedExpand) {
                    angular.forEach(expands, function(expand) {
                        if (selectedExpand != expand) {
                            expand.showMe = false;
                        }
                    });
                };
                this.addExpand = function(expand) {
                    expands.push(expand);
                };
            }
        };
    });
angular.module('appModule')
    .directive('expand', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?accordioning',
            scope: {
                expandTitle: '=title',
                chargeType:  '@chargeType',
                measureUnit: '=measureUnit'
            },
            template:'<div style="position: relative;">'
            +'<div class="optionItem" style="height:49px" ng-click="toggle()">'
            +'<div style="margin-right:60px;" >'
            +'<div style="float:left;margin-top:15px;">'
            +'<div style="float:left;margin-left:30px;display:inline-block;">'

            +'<div style="float:left; margin-left:16px;font-size:16px;font-weight: bold;">{{expandTitle}}</div>'
            +' </div>'
            +'<div style="clear:both;"></div>'
            +'</div>'
            +'<div style="float:right;margin-top:16px;">'
            +'<img style="float:left;margin-right:10px;margin-top: 3px;" src="asset/image/price_icon02.png"></img>'
            +'<div style="float:left;font-size:12px;padding-top:2px;">{{measureUnit}}</div>'
            +'<div style="clear:both;"></div>'
            +'</div>'
            +'<div style="float:right;margin-top:16px; margin-right:30px;">'
            +'<img style="float:left;margin-right:10px;margin-top: 3px;" src="asset/image/price_icon01.png"></img>'
            +'<div style="float:left;font-size:12px;padding-top:2px;">{{chargeType}}</div>'
            +'<div style="clear:both;"></div>'
            +'</div>'

            +'</div>'
            +'<div style="float:right; text-align:center;margin-top:19px;margin-right:20px;position: absolute;right:0;">'
            +'<img ng-if="showMe" src="./asset/image/i_up.png">'
            +'<img ng-if="!showMe" src="./asset/image/i_down.png">'
            +'</div>'
            +'<div style="clear:both;"></div>'
            +'</div>'
            +'<div style="border-top: 50px;background-color:#fbfbfb;">'
            +'<div class="ex-body" ng-show="showMe" ng-transclude></div>'
            +'</div>'
            +'</div>',

            link: function(scope, iElement, iAttrs, accordioningController) {
                //产品项目状态
                scope.itemStatus=false;
                if(scope.isDisable==1){
                    scope.itemStatus=false;
                }else{
                    scope.itemStatus=true;
                }
                //拉开手风琴
                scope.showMe = false;
                accordioningController.addExpand(scope);
                scope.toggle = function toggle() {
                    scope.showMe = !scope.showMe;
                    accordioningController.gotOpened(scope);
                };
            }
        };
    });

