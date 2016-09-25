angular.module('appModule')
    .directive('ciicLogo', ['$state',function($state) {
        return {
            scope: {
               
            },
            //require: '$state',
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<div id="headercontain">' + '<div class="logo">' + '<img src="asset/image/logo.png" alt="ciicLogo">' + '</div>' + '<div class="searchbar">' + '<div style="float:left;clear:both;" class="searchSwitch" ng-click="switch()">' + '<img ng-if="isCompany" src="asset/image/top_search_company.png" alt="">' + '<img ng-if="!isCompany" src="asset/image/top_search_people.png" alt="">' + '</div>' + '<div class="search">' + '<input type="text" style="" ng-model="searchContent" placeholder="{{placeholder}}" ng-keypress="keypress($event)">' + '<img src="asset/image/icon_project_search_big.png" alt="" ng-click="sendKw()">' + '</div>' + '<div style="clear:both;"></div>' + '</div>' + '<div style="clear:both;"></div>' + '</div>',
            templateUrl: './component/commonView/logo/logo.html',
            replace: true,
            link: function(scope, element, attrs) {

                function redirectURL(){
                    if(scope.isCompany){
                          // $state.go('home.accountList', { kw: scope.searchContent });
                          var url1="../../af/salesmgmt/#/home/list/?"+scope.searchContent;
                          location.href=encodeURI(url1);
                    }
                    else{
                          // $state.go('home.accountList', { kw: scope.searchContent });
                          var url2="../../af/salesmgmt/#/home/employeeList/?"+scope.searchContent;
                          location.href=encodeURI(url2);
                    }
                }
                scope.isCompany = true;
                scope.placeholder= "请输入企业名称或代码";
                scope.switch = function() {
                    scope.isCompany = !scope.isCompany;
                    if(scope.isCompany){
                       scope.placeholder= "请输入企业名称或代码";
                    }
                    else{
                        scope.placeholder= "请输入雇员名称";
                    }
                };
                scope.keypress = function(event) {
                    if (event.keyCode == 13) {
                      redirectURL();
                    }
                };
                scope.sendKw = function() {
                    redirectURL();
                    //$state.go('home.accountList', { kw: scope.searchContent });
                }
            }
        };
    }])
