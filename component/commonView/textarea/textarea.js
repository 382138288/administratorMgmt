angular.module('appModule')
    .directive('ciicTextarea', [function() {
        return {
            scope: {
                textareaValue: '=ngModel',
                max: '@maxLength',
                placeholder: '@placeholder',
                width: '@width',
                height: '@height',
                onInput: '&'
            },
            restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: './component/commonView/textarea/textarea.html',
            // template: '<div class="textContain" ng-style="containstyle">' + '<textarea ng-style="textareastyle" style="width:100%;height:100%"  ng-model="textareaValue" ng-keyup="toggle();"  placeholder="{{placeholder}}"></textarea>' + '<div class="tab"><span ng-style="spanerror">{{currentLen}}</span><span>/{{max}}</span></div></div>',
            //replace: true,
            link: function(scope, element, attrs) {
                scope.$watch(function() {
                    return scope.textareaValue;
                }, function(newvalue, oldvalue) {
                    if (scope.textareaValue) {
                        scope.currentLen = scope.textareaValue.toString().length;
                    } else {
                        scope.currentLen = 0;
                    };


                });
                scope.containstyle = { "width": scope.width, "height": scope.height, };

                scope.toggle = function toggle() {
                    if (scope.textareaValue) {
                        scope.currentLen = scope.textareaValue.toString().length;
                    } else {
                        scope.currentLen = 0
                    }

                    if (scope.currentLen > scope.max) {
                        scope.textareastyle = { "border-color": "#F06868" };
                        scope.spanerror = { "color": "#F06868" };
                    } else {
                        scope.textareastyle = {};
                        scope.spanerror = {};
                    }

                    scope.onInput({textareaValue: scope.textareaValue});
                };


            }
        };
    }])
