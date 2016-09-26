angular.module('routerApp')
    .factory('httpService', ['$q', '$http', 'serviceLoading', function($q, $http, serviceLoading) {
            function handleResponse(promise, t) {
                return promise.then(function(res) {
                            if (t) { serviceLoading.hideLoading(); }
                            if (res.status == 200 || res.status == 304) {
                                return $q.resolve(res.data);
                            } else {
                                res.data = {};
                                res.data.message = "服务器请求异常";
                                return $q.reject(res.data.message);
                            }
                    },
                    function(res) {
                        if (t) { serviceLoading.hideLoading(); }
                        return $q.reject("服务器请求异常");
                    });
        }

        //设置10s请求超时
        var timeout = 1000;
        return {
            //销售管理客户列表分页请求
            serviceGet: function(url) {
                var promise = $http.get(url, { timeout: timeout });
                return handleResponse(promise);
            },
            serviceGetLoading: function(url) {
                serviceLoading.showLoading();
                var promise = $http.get(url, { timeout: timeout });
                return handleResponse(promise, true);
            },
            servicePost: function(url, data) {
                var promise = $http.post(url, data, { timeout: timeout });
                return handleResponse(promise);
            },
            servicePostLoading: function(url, data) {
                serviceLoading.showLoading();
                var promise = $http.post(url, data, { timeout: timeout });
                return handleResponse(promise, true);
            },
            /*serviceDelete: function(url) {
                var promise = $http.delete(url, { timeout: timeout });
                return handleResponse(promise);
            },
            serviceDeleteLoading: function(url) {
                serviceLoading.showLoading();
                var promise = $http.delete(url, { timeout: timeout });
                return handleResponse(promise, true);
            },*/
            /*servicePut: function(url) {
                var promise = $http.put(url, { timeout: timeout });
                return handleResponse(promise);
            },
            servicePutLoading: function(url) {
                serviceLoading.showLoading();
                var promise = $http.put(url, { timeout: timeout });
                return handleResponse(promise, true);
            }*/
        };
    }])
    .factory('Url', [function() {
        var hostAddress = "/g1/service/common/";
        return {
            //获取角色列表
            getEntireRoles: hostAddress + "securityman/usermgmt/getEntireRoles",
        };
    }])
    .factory("serviceLoading", ['$timeout', function($timeout) {
        return {
            timeoutCount: 0,
            showLoading: function() {
                this.timeoutCount++;
                str = "<div class='serviceLoadingBg' style='position: fixed; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); left: 0; top: 0; z-index: 9998;'></div>" +
                    "<div class='serviceLoading' style='width:250px; height:90px; position: fixed; left: 50%; top: 50%; margin:-50px 0px 0px -100px; z-index: 9999; padding:20px;'>" +
                    '<div class="spinner"><div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div>' +
                    "<p style=' padding:5px; font-family:" + '"' + 'MicroSoft YaHei' + '"' + "; line-height: 26px; text-align: center; font-weight: bold; color: #fff; font-family: Arial;'>Loading...</p>" +
                    "</div>";
                if ($("body").find(".serviceLoadingBg").length < 1 && $("body").find(".serviceLoading").length < 1) {
                    $("body").append(str);
                }
            },
            hideLoading: function() {
                this.timeoutCount--;
                if (this.timeoutCount < 1) {
                    $("body").find(".serviceLoadingBg").remove();
                    $("body").find(".serviceLoading").remove();
                }
            }
        }
    }])
