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
            $stateProvider.state('main', {
                    url: '/main',
                    abstract: true,
                    templateUrl: './view/home/main.html'
                    }
                })
                .state('main.entry', { 
                    url: '/entry',
                    abstract: true,
                    views: {
                        'homeMain': {
                            templateUrl: './view/home/entry.html',
                            controller: 'home.entryCtrl'
                        }
                    }
                })
        }
    ]);
