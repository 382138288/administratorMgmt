angular.module('appModule')
    .factory('authorizationService', ['$q', '$http', 'Url', 'serviceLoading', function ($q, $http, Url, serviceLoading) {
        function handleResponse(promise) {
            return promise.then(function (res) {
                //if (res.data.status == "ok")
                serviceLoading.hideLoading();
                return $q.resolve(res.data);
                //else
                //    return $q.reject(res.data.message);
            }, function (res) {
                serviceLoading.hideLoading();
                return $q.reject("服务器请求异常");
            });
        }

        //设置10s请求超时
        var timeout = 1000;
        return {
            //销售管理客户列表分页请求
            serviceGet: function (url) {
                serviceLoading.showLoading();
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            serviceGetLite: function (url) {
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            serviceGetParse: function (url,data) {
                serviceLoading.showLoading();
                var promise = $http.get(url,data,{timeout: timeout});
                return handleResponse(promise);
            },
            servicePost: function (url, data) {
                serviceLoading.showLoading();
                var promise = $http.post(url, data, {timeout: timeout});
                return handleResponse(promise);
            },
            serviceDelete: function (url) {
                serviceLoading.showLoading();
                var promise = $http.delete(url, {timeout: timeout});
                return handleResponse(promise);
            }
        };
    }])
    .factory('authorizationUrl', [function () {
        var hostAddress = "/g1/service/common/";
        var hostAddress2 = "/g1/temp/";
        //var hostAddress="/g1/api/attach/";

        return {
            //获取角色列表
            getEntireRoles: hostAddress + "securityman/usermgmt/getEntireRoles",
            //获取权限分配列表
            getRolesPrivileges: hostAddress + "securityman/entitlement/getRolesPrivileges",
            //提交角色权限分配
            createRolesPrivileges: hostAddress + "securityman/entitlement/createRolesPrivileges",
            //获取资源列表
            getResourceType: hostAddress + "orgman/conf/getResourceTypes",
            //获取组织架构树
            getOrgTree: hostAddress + "orgman/conf/getOrgTree",
            //
            getResourceTree: hostAddress + "orgman/conf/getResourceTree",
            //
            getBundledMgrs: hostAddress + "securityman/customer/getBundledMgrs",
            //获取分配资源树
            getBaseTreeForResource: hostAddress + "orgman/conf/getBaseTreeForResource",
            //获取可分配资源
            getChoosableRes: hostAddress + "orgman/conf/getChoosableRes",
            //
            getStaff: hostAddress + "securityman/customer/bulkBundleMgr2Staffs",
            //获取页面元素权限列表
            getUIElements: hostAddress + "securityman/entitlement/getUIElements",
            //提交页面元素权限
            createUIElements: hostAddress + "securityman/entitlement/createUIElements",
            //
            getAllApps: hostAddress + "securityman/entitlement/getAllApps",
            //角色管理
            getEntireMgmtRoles: hostAddress + "orgman/usermgmt/getEntireRoles",
            getUserRoles:hostAddress+'orgman/usermgmt/getUserRoles',
            createRole: hostAddress + "orgman/usermgmt/createRole",
            deleteRole: hostAddress + "orgman/usermgmt/deleteRole",
            updateRole: hostAddress + "orgman/usermgmt/updateRole",
            getEntireUsers: hostAddress + 'orgman/usermgmt/getEntireUsers',
            getEntireUsersTotal: hostAddress + 'orgman/usermgmt/getEntireUsersTotal',
            createUserInfo: hostAddress + 'orgman/usermgmt/createUserInfo',
            getUser: hostAddress + 'orgman/usermgmt/getUser',
            updateUserProfile: hostAddress + 'orgman/usermgmt/updateUserProfile',
            updOrgTree: hostAddress + 'orgman/conf/updOrgTree',
            deleteUser: hostAddress + 'orgman/usermgmt/deleteUser',
            bindResource: hostAddress + 'securityman/resource/bindResource',
            getBindedResource: hostAddress + 'securityman/resource/getBindedResource',
            getUserElements: hostAddress + 'securityman/entitlement/getUserElements',
            assignElements: hostAddress + 'securityman/entitlement/assignElements',
            searchUser: hostAddress + 'orgman/usermgmt/searchUser',
            getUserPermissions: hostAddress + 'securityman/entitlement/getUserPermissions',
            delegateUserPermission: hostAddress + 'securityman/entitlement/delegateUserPermission',
            getRole: hostAddress + 'orgman/usermgmt/getRole',
            checkUserExist: hostAddress + 'orgman/usermgmt/checkUserExist',
            changePassword: hostAddress + 'orgman/usermgmt/changePassword',
            getPersonalImage: hostAddress + 'orgman/usermgmt/getPersonalImage',
            //角色管理
            // updateRole:'/g1/common/api/orgman/usermgmt/updateRole',
            resetResourceListFromOrg:hostAddress+'orgman/conf/resetResourceListFromOrg',
            //权限访问控制
            //获取登录用户名
            getCurrentUserId:hostAddress + 'securityman/usermgmt/getCurrentUserId',
            bindMgr2Staff: hostAddress2+"securityman/resource/bindMgr2Staff",
            getBindedMgrs:hostAddress2+"securityman/resource/getBindedMgrs",
            getResourceListFromOrg:hostAddress+'orgman/conf/getResourceListFromOrg',
            searchRolesByOptName:hostAddress+'securityman/entitlement/searchRolesByOptName',
            getPositionRoles:hostAddress+'orgman/usermgmt/getPositionRoles'
        };
    }])
.factory("serviceLoading", ['$timeout',function($timeout) {
        return {
            timeoutCount:0,
            showLoading: function() {
                this.timeoutCount++;
                str = "<div class='serviceLoadingBg' style='position: fixed; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); left: 0; top: 0; z-index: 9998;'></div>" +
                    "<div class='serviceLoading' style='width:250px; height:90px; position: fixed; left: 50%; top: 50%; margin:-50px 0px 0px -100px; z-index: 9999; padding:20px;'>" +
                    '<div class="spinner"><div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div>' +
                    "<p style=' padding:5px; font-family:"+'"'+'MicroSoft YaHei'+'"'+"; line-height: 26px; text-align: center; font-weight: bold; color: #fff; font-family: Arial;'>Loading...</p>" +
                    "</div>";
                if ($("body").find(".serviceLoadingBg").length < 1 && $("body").find(".serviceLoading").length < 1) {
                    $("body").append(str);
                }
            },
            hideLoading: function() {
                this.timeoutCount--;
                if(this.timeoutCount<1){
                    $("body").find(".serviceLoadingBg").remove();
                    $("body").find(".serviceLoading").remove();
                }
            }
        }
    }])
    .factory('httpInterceptor', [ '$q', '$injector','serviceLoading',function($q, $injector,serviceLoading) {  
        var httpInterceptor = {
            'responseError' : function(response) {
                return $q.reject("response",response);
            },
            'response' : function(response){
                if(typeof(response.data)=="string"&&response.data.indexOf('<div class="loading-text">Loading CIIC SSO...</div>')!=-1){
                    $.alert('登录超时!',function(){window.location.reload();});
                    return false;
                }else if(response.status==202){
                    $.alert('没有当前操作权限!');
                    return false;
                }else{
                    return response;
                }
            },
            'request' : function(config) {
                return config;
            },
            'requestError' : function(config){
                return $q.reject(config);
            }
        };
        return httpInterceptor;
    }])
    .config([ '$httpProvider','$stateProvider','$urlRouterProvider',function($httpProvider,$stateProvider, $urlRouterProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);