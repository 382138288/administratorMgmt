var routerApp = angular.module('routerApp', ['ui.router','ngSanitize']);
    routerApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main/entry'); //mainwelcome maintradepasswdSet
        $stateProvider
            .state('main',{
                url: '/main',
                templateUrl: './view/home/main.html',
                controller: 'mainCtrl'
            })
            .state('main.entry',{
                url: '/entry',
                views: {
                    '': {
                        templateUrl: './view/home/entry.html',
                        controller: 'entryCtrl'
                    }
                }
            })
    }]);
