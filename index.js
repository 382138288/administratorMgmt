/**
 *  主文件
 *
 * Description
 */
angular.module('appModule', [ 'ui.router', 'pascalprecht.translate'])
    //路由配置
    .config(['$stateProvider', '$urlRouterProvider',
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
