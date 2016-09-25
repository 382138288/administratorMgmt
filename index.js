/**
 *  主文件
 *
 * Description
 */
angular.module('appModule', ['ngAnimate', 'ui.router', 'ngSanitize', 'pascalprecht.translate'])
    //路由配置
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home/main');
            $stateProvider.state('home', {
                    url: '/home',
                    abstract: true,
                    views: {
                        'viewMain': {
                            templateUrl: './view/home/main.html',
                            controller: 'homeCtrl'
                        }
                    }
                })
                .state('home.main', {
                    url: '/home',
                    abstract: true,
                    views: {
                        'homeMain': {
                            templateUrl: './view/home/main.html',
                            controller: 'homeCtrl'
                        }
                    }
                })
        }
    ]);
