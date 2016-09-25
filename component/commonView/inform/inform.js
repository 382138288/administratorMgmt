angular.module("appModule").component("inform", {
    templateUrl: "./component/commonView/inform/inform.html",
    controller: ['$scope', 'authorizationService', 'authorizationUrl', function($scope, authorizationService, authorizationUrl) {
        var $ctrl = this;
        console.log($scope, 111);
        $ctrl.owlopen = true;
        $ctrl.enlarge = true;
        $ctrl.inform = {
                approval: 0,
                contact: 0,
                task: 0
            }
            // console.log("xxx");
        $ctrl.toggleShow = function() {
            console.log("click")
            $ctrl.enlarge = !$ctrl.enlarge;
        };
        //跳转连接
        $ctrl.gointernalcomm = function(num) {
            console.log("num:", num)
            location.href = "http://172.16.8.138/g1/app/common/internalcomm/"
            authorizationService.serviceGet(authorizationUrl.getCurrentUserId).then(function(res) {
                console.log("点击res", res)
                ws.send('read:{"subType":num,"userId":res.userId}');
            }, function(err) {
                $.alert("服务器请求失败");
            });
            // ws.send('read:{"subType":num,"userId":"zhouxiaoxiao"}');
        }

        $ctrl.connect = function() {
            ws = new WebSocket("ws://172.16.8.179:8080/notification/websck");
            // ws = new WebSocket("ws://10.53.4.115:8080/notification/websck");
            // ws = new WebSocket("ws://localhost:8080/notification/websck");
            console.log('new ws');
            ws.onopen = function() {
                authorizationService.serviceGet(authorizationUrl.getCurrentUserId).then(function(res) {
                    console.log("onopen res", res)

                    ws.send('active:{"userName": res.userId}');
                }, function(err) {
                    $.alert("服务器请求失败");
                });

                // ws.send('active:{"userName": "zhouxiaoxiao"}');
                console.log('wsopen');
            };
            ws.onmessage = function(event) {
                console.log('Received: ', event.data);
                var informObj = JSON.parse(event.data).items
                console.log('Received:', informObj);
                informObj.forEach(function(item, index, array) {
                    if (item.subType == "100100") {
                        $ctrl.inform.approval = item.num;
                        $ctrl.enlarge = true;
                        console.log('$ctrl.inform.approval:', $ctrl.inform.approval);
                    }
                    if (item.subType == "100101") {
                        $ctrl.inform.contact = item.num;
                        $ctrl.enlarge = true;
                    }
                    if (item.subType == "100102") {
                        $ctrl.inform.task = item.num;
                        $ctrl.enlarge = true;
                    }
                    //$ctrl
                    $scope.$apply();
                })
            };
            ws.onclose = function(event) {

            };
        }
        $ctrl.connect()


    }]
})
