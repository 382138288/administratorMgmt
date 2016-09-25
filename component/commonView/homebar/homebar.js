angular.module('appModule')
    .directive('ciicHomebar', ['$state', 'netRequest', 'authorizationService', 'authorizationUrl', function ($state, netRequest, authorizationService, authorizationUrl) {
        // Runs during compile
        return {
            restrict: 'E',
            templateUrl: './component/commonView/homebar/homebar.html',
            replace: true,
            transclude: true,
            link: function (scope, $element, iElm, iAttrs, controller) {
                scope.goAccount = function () {
                    location.href = "../../common/portal/index.html#/home/account"
                };
                //回家
                scope.goHome = function () {
                    location.href = "../../common/portal/index.html#/home/entry"
                };
                //系统设置
                scope.goServiceListConfig = function () {
                    // $state.go("home.sysconfig.serviceListConfig");
                    location.href = "../../af/salesmgmt/#/home/sysconfig/serviceListConfig"
                };
                //信息维护
                scope.goNewsList = function () {
                    location.href = "../../common/infopub/src/app/index.html#/home/newslist";
                };
                //其他语言设置
                scope.goLanguageConfiguration = function () {
                    // $state.go("home.languageConfiguration");
                    location.href = "../../af/salesmgmt/#/home/languageConfiguration"
                };
                //权限管理
                scope.gorbac = function () {
                    $state.go("home.authorization.roleBasedAccessCtrl")
                    // location.href = "../../common/orgmgmt/#/home/authorization/userMgmt"
                };
                // 获取当前登录人
                netRequest.getCurrentOrg().then(function (res) {
                    scope.currentUserId = res.userId;
                    scope.currentUserName = res.userName
                    scope.currentUserOrg = res.org.orgName
                    authorizationService.serviceGet(authorizationUrl.getPersonalImage + '?userId=' + scope.currentUserId).then(function (res) {
                        if (res.image) {
                            $element.find('#avatar').attr('src', res.image);
                        }
                    }, function (error) {
                        $.alert("服务器请求失败");
                    })
                }, function (error) {
                    $.alert("服务器请求失败");
                });
            }
        };
    }]);
