/**
 *  主文件
 *
 * Description
 */
var appModule=angular.module('appModule', ['ngAnimate', 'ui.router']);
    //路由配置
    appModule.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/main/entry');
            $stateProvider.state('main', {
                    url: '/main',
                    views: {
                        'viewMain': {
                            templateUrl: './view/home/main.html'
                        }
                    }
                })
                .state('main.entry', {
                    url: '/entry',
                    views: {
                        'homeMain': {
                            templateUrl: './view/home/entry.html'
                        }
                    }
                })
        }
    ]);
