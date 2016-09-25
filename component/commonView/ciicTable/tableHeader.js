///**
// * Created by lucha on 6/15/2016.
// */
angular.module('appModule').component("tableHeader", {
    templateUrl: "./component/commonView/ciicTable/tableHeader.html",
    controller: ['$element', function ($element) {

        var vm = this;
        var highColor = false;
        //================data model======================
        //列表title显示控制 - 是显示tileName还是搜索框
        vm.showTiltles = [];
        vm.searchConditions = [];
        vm.columnType = {};
        //====================function=======================
        //清除其他列头的search状态，除了当前点击的列
        var clearSearchStatus = function (index) {
            for (var i = 0; i < vm.showTiltles.length; i++) {
                if (i != index) {
                    vm.showTiltles[i] = true;
                }
            }
        }
        //初始化列头的search状态
        var initSearchStatus = function (columnLength) {
            for (var i = 0; i < columnLength; i++) {
                vm.showTiltles[i] = true;
            }
        }
        var initSearchCondition = function (columnLength) {
            for (var i = 0; i < columnLength; i++) {
                vm.searchConditions[i] = '';
            }
        }
        //====================action=========================
        //点击列头，搜索框的显示
        vm.onTitleShowChange = function (index) {
            clearSearchStatus(index);
            setTimeout(function () {
                $element.find("input").focus();
            }, 0);
            vm.showTiltles[index] = !vm.showTiltles[index];

            vm.onClick(
                {
                    $columnIndex: index
                }
            );
        }
        vm.onStringSearch = function ($event, index) {
            /* setTimeout(function(){
                 $element.find("input").focus();
             },0);*/
            if ($event.keyCode == 13 || $event.keyCode == undefined) {
                var confitionValues = []
                vm.onSearch(
                    {
                        $condtions: [vm.searchConditions[index]],
                        $columnIndex: index
                    }
                );
            }
        };

        vm.onEnumSearch = function (conditions, index) {
            vm.showTiltles[index] = true;
            vm.onSearch(
                {
                    $condtions: conditions,
                    $columnIndex: index
                }
            );
        }

        vm.onDateSearch = function (conditions, index) {
            vm.onSearch(
                {
                    $condtions: conditions,
                    $columnIndex: index
                }
            );
        }

        //====================initialize data================

        initSearchStatus(vm.columns.length);
        initSearchCondition(vm.columns.length);
        vm.columnType = ColumnTypeEnum;

    }],
    controllerAs: 'vm',
    bindings: {
        columns: "=",
        onSearch: "&",
        onClick: "&"
    }
});
