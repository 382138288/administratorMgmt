angular.module('appModule')
.directive('scrollIndicator', ['$rootScope',function($rootScope){
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
			$scope.curIndex=0;
            $rootScope.$on('scrollenter',function(event,data){
                $scope.$apply(function(){
                    for(var i=0;i<$scope.points.length;i++){
                        if($scope.points[i]==data){
                            $scope.curIndex=i;
                            break;
                        }
                    }
                });
            });
            $rootScope.$on('scrollleave',function(event,data){
                $scope.$apply(function(){
                    for(var i=0;i<$scope.points.length;i++){
                        if($scope.points[i]==data){
                            $scope.curIndex=-1;
                            break;
                        }
                    }
                });
            });
            $scope.scrollTo=function(index){
                $scope.actions[index]();
                $scope.curIndex=index;
            };
            //上一个
            $scope.next=function(){
                if($scope.curIndex<$scope.points.length-1){
                    $scope.curIndex++;
                    $scope.scrollTo($scope.curIndex);
                }
                
            };
            //下一个
            $scope.prev=function(){
                if($scope.curIndex>0){
                    $scope.curIndex--;
                    $scope.scrollTo($scope.curIndex);
                }
            };
		}],
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: './component/commonView/scrollIndicator/scrollIndicator.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
			
		}
	};
}])
//侦听滚动进入事件
.directive('scrollReport',[function(){
    // Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
            onEnter:"&onEnter",
            onLeave:"&onLeave",
            relativeTo:"@relativeTo"
        }, // {} = isolate, true = child, false/undefined = no change
		controller: ['$scope', '$element', '$attrs', '$transclude',function($scope, $element, $attrs, $transclude) {
			
		}],
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		//templateUrl: '/components/directive/scrollIndicator/scrollIndicator.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
            var father=document.querySelector($scope.relativeTo);
            var scrolldeal=function(event){
                getTop();
                var curLoc=father.scrollTop+father.clientHeight/2;
                if(curLoc>realTop && oldLoc<realTop
                ||curLoc<realTop+iElm[0].offsetHeight && oldLoc>realTop+iElm[0].offsetHeight){
                    //进入事件
                    if($scope.onEnter!=null)
                        $scope.onEnter();
                }
                if(curLoc>realTop+iElm[0].offsetHeight && oldLoc<realTop+iElm[0].offsetHeight
            ||curLoc<realTop && oldLoc>realTop){
                    //离开事件
                    if($scope.onLeave!=null)
                        $scope.onLeave();
                }
                oldLoc=curLoc;
            };
            var getTop=_.throttle(function(){
                realTop=getRealTop(iElm[0],father);
            },500);
            //旧的位置
            var oldLoc=0;
            //获取元素相对于整个文档的高度
            var realTop=0;
            function getRealTop(ele,father){
                var total=ele.offsetTop;
                while(!(ele.offsetParent==father||ele.offsetParent==null)){
                    ele=ele.offsetParent;
                    total+=ele.offsetTop;
                }
                return total;
            }
			$(father).bind('scroll',scrolldeal);
            $scope.$on('$destroy',function(){
                $(father).unbind('scroll',scrolldeal);
            });
		}
	};
}])
.directive('scrollTo',[function(){
    // Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {
        //     id:"@scrollTo"
        // }, // {} = isolate, true = child, false/undefined = no change
		controller: ['$scope', '$element', '$attrs', '$transclude',function($scope, $element, $attrs, $transclude) {
			
		}],
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		//templateUrl: '/components/directive/scrollIndicator/scrollIndicator.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
            $scope.$on('scrollTo',function(event,data){
                var container=document.querySelector(iAttrs['container']);
                 var offset=0;
                if(iAttrs['offset']==null)
                    offset=0;
                else
                    offset=iAttrs['offset'];
                if(data==iAttrs['scrollTo']){
                    var shouldScroll=getRealTop(iElm[0],container);
                    $(container).scrollTop(shouldScroll-offset);
                }
                
            });
            function getRealTop(ele,father){
                var total=ele.offsetTop;
                while(!(ele.offsetParent==father||ele.offsetParent==null)){
                    ele=ele.offsetParent;
                    total+=ele.offsetTop;
                }
                return total;
            }
		}
	};
}])
.directive('hxTransform',[function(){
    // Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
            onArriveTop:"&onArriveTop",
            onArriveBottom:"&onArriveBottom",
            onLeaveTop:"&onLeaveTop",
            onLeaveBottom:"&onLeaveBottom",
            onArriveLeft:"&onArriveLeft",
            onArriveRight:"&onArriveRight",
            onLeaveLeft:"&onLeaveLeft",
            onLeaveRight:"&onLeaveRight",
            offset:"=offset",
            horizon:"="
        }, // {} = isolate, true = child, false/undefined = no change
		controller: ['$scope', '$element', '$attrs', '$transclude',function($scope, $element, $attrs, $transclude) {
			
		}],
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		//templateUrl: '/components/directive/scrollIndicator/scrollIndicator.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
            
            var transform=0;
            var offset=0;
            if($scope.offset!=null)
                offset=new Number($scope.offset);
            
            var delay=_.throttle(function(event,data){
                var containerDistance=0;
                var entityDistance=0;
                if($scope.horizon==true){
                    containerDistance=iElm[0].parentNode.offsetWidth-offset;
                    entityDistance=iElm[0].offsetWidth;
                }else{
                    containerDistance=iElm[0].parentNode.offsetHeight-offset;
                    entityDistance=iElm[0].offsetHeight;
                }
                
                
                switch(data){
                    case "down":
                        if(transform==0)
                            $scope.onLeaveTop();
                        transform+=160;
                        if(transform>entityDistance-containerDistance){
                            transform=entityDistance-containerDistance;
                            $scope.onArriveBottom();
                        }
                        iElm.velocity({translateY:-transform});
                        break;
                    case "up":
                        if(transform==entityDistance-containerDistance)
                            $scope.onLeaveBottom();
                        transform-=160;
                        if(transform<0){
                            transform=0;
                            $scope.onArriveTop();
                        }
                        iElm.velocity({translateY:-transform});
                        break;
                    case "left":
                        if(transform==entityDistance-containerDistance)
                            $scope.onLeaveRight();
                        transform-=160;
                        if(transform<0){
                            transform=0;
                            $scope.onArriveLeft();
                        }
                        iElm.velocity({translateX:-transform});
                        break;
                    case "right":
                        if(transform==0)
                            $scope.onLeaveLeft();
                        transform+=160;
                        if(transform>entityDistance-containerDistance){
                            transform=entityDistance-containerDistance;
                            $scope.onArriveRight();
                        }
                        iElm.velocity({translateX:-transform});
                        break;
                }
            },500);
            $scope.$on('hxTransform',function(event,data){
                delay(event,data);
            });
		}
	};
}])
.directive("horizonScrollContainer",['$compile',function($compile){
    return {
        templateUrl:"./component/commonView/scrollIndicator/horizonScrollContainer.html",
        controller:['$scope',function($scope){
            $scope.toleft=function(){
                $scope.$broadcast("hxTransform", "left");
            };
            $scope.toright=function(){
                $scope.$broadcast("hxTransform", "right");
            };
        }],
        link:function($scope, iElm, iAttrs, controller){
            var out=iElm.find("div[ng-transclude]")[0];
            if(out.children.length==1){
                var child=out.children[0];
                child.setAttribute("hx-transform","");
                child.setAttribute("horizon","true");
                $compile(child)($scope);
            }else{
                throw new Error("horizonScrollContainer的内容必须只能有一个父容器好吧");
            }
        },
        transclude:true
    };
}]);