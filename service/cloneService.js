;(function(angular, _){
	angular.module('appModule')
    .factory('cloneservice',[function(){

    	var cloneArray = function(list){
            var localList = [];

            list.forEach(function(n){
                localList.push(cloneObj(n));
            });

            return localList;
        };

        var cloneObj = function(item){
            var obj = _.clone(item);

            _.keys(item).forEach(function(name){
                if(_.isArray(item[name]))
                {
                    obj[name] = cloneArray(item[name]);
                }
                else if(_.isDate(item[name]))
                {
                    obj[name] = new Date(item[name]);
                }
                else if(_.isObject(item[name]))
                {
                    obj[name] = cloneObj(item[name]);
                }
            });

            return obj;
        };

        return {
        	clone:cloneObj
            ,clonearr:cloneArray
        };
        //end of function
    }]);
	//end of service
})(angular, _);