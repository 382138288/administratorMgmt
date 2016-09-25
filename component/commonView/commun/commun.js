// JavaScript Document
angular.module("appModule")
    .directive("communicate", function() {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: "./component/commonView/commun/commun.html",
            scope: {
                projId: "@"
            },
            controller: ["$scope", "$state", "communicationServiceProxy", "Url2", "RTVManager", function($scope, $state, communicationServiceProxy, Url2, RTVManager) {
                //客户沟通列表
                $scope.managingId = RTVManager.getManageId();
                $scope.datalist = [];
                $scope.time=[];
                communicationServiceProxy.resourceGET(Url2.getWays).then(function(res) {
                    $scope.waymodes = res;
                }, function(res) {
                    console.log(res);
                });
                var url = Url2.getcmctYear + "?projectid=" + $state.params.projId + "&manageingid=" + $scope.managingId;
                $scope.filters = { firstResult: 0, maxResults: 50, filters: [{ attrName: "projectid", attrValue: $state.params.projId }, { attrName: "managingid", attrValue: $scope.managingId }] }
                communicationServiceProxy.resourceGET(url).then(function(res) {
                    $scope.time = res;
                    if($scope.time!=undefined&&$scope.time!=null&&$scope.time.length>0){
                        $scope.dates = $scope.time[0];
                        $scope.filters.filters.push($scope.dateFromTo($scope.dates));
                        $scope.$broadcast("EVENT_TIME");
                    }
                    
                }, function(err) {
                    console.log(err);
                });
                $scope.dateFromTo = function(year) {
                    var date1 = year + "-01-01";
                    var date2 = year + "-12-31";
                    var obj = {};
                    obj.attrName = "contacttimes";
                    obj.dateValues = [];
                    obj.dateValues.push(date1);
                    obj.dateValues.push(date2);
                    return obj;
                }
                $scope.yearChange = function() {
                    console.log($scope.dates);
                    $scope.filters.filters[2] = $scope.dateFromTo($scope.dates);
                    communicationServiceProxy.resourcePOST(Url2.cmctlistByYear, $scope.filters).then(function(res) {
                        $scope.datalist = res;
                    }, function(err) {
                        console.log(err);
                    });
                }
                $scope.$on("EVENT_TIME", function(event) {
                    communicationServiceProxy.resourcePOST(Url2.cmctlistByYear, $scope.filters).then(function(res) {
                        $scope.datalist = res;
                    }, function(err) {
                        console.log(err);
                    });
                });
                $scope.goDetail = function(item) {
                    $state.go("home.accountmain.cmctdetail", { cmctid: item.id });
                }
            }]

        }
    });

