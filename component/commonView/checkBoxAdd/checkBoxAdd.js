//singleedit.js
;
(function(angular) {
    angular.module('appModule')
        .directive('checkBoxAdd', [function() {
            return {
                restrict: 'EA',
                scope: {
                    datas: '=',
                    value: '='
                },
                template: [
                    '<style>.checkBoxItem{display: inline-block; padding:0px 12px; cursor:pointer; border-radius:5px; margin:0px 10px 5px 10px; border:1px solid #dcdcdc; color:#a5a5a5;}.checkBoxItemSelect{ border:1px solid #3bc0c3; background:#3bc0c3; color:#fff;}</style>',
                    '<input class="hxInput  textControl" ng-model="value" type="text" readonly="readonly" style="display:block">', '<div style="margin-top:10px;">',
                    '<span class="checkBoxItem" ng-class="{checkBoxItemSelect:item.selected}" ng-click="selected(item)" ng-repeat="item in datas">{{item.displayname}}</span>', '</div>'
                ].join(''),
                controller: ['$scope', function($scope) {
                        $scope.selected = function(item) {
                            item.selected = !item.selected;
                            $scope.value = concatCheckString($scope.datas, $scope.value);
                            console.log($scope);
                        };

                        function concatCheckString(datas, value) {
                            value = "";
                            for (var i = 0; i < datas.length; i++) {
                                if (datas[i].selected) {
                                    value += "+" + datas[i].displayname;
                                }
                            }
                            if (value.length > 0) {
                                value = value.substring(1);
                            }
                            return value;
                        };

                    }]
                    // end of return
            }
            //end of directive
        }])
        //end of block
})(angular);

