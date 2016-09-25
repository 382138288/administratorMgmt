angular.module('appModule')
.directive('scrollIndicatorProduct', ['$rootScope',function($rootScope){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
            points:"=points",
            actions:"=actions"
        }, // {} = isolate, true = child, false/undefined = no change
		controller: ['$scope', '$element', '$attrs', '$transclude',function($scope, $element, $attrs, $transclude) {

            //上一个
            $scope.next=function(){

                var height = $("#homeClientDetail")[0].offsetHeight + 30;
                var container = $("#homeClientDetail");
                container.animate({
                    scrollTop: height
                });
            };
            //下一个
            $scope.prev=function(){
                var container = $("#homeClientDetail");
                container.animate({
                    scrollTop: 0
                });
            };
		}],
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: './component/commonView/scrollIndicator/scrollIndicatorProduct.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
			
		}
	};
}])

