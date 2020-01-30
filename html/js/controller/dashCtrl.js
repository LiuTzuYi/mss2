/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:22:21
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name dashCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,user,Idle,Keepalive,httpSuccessCheck,alertBox,refetchMapService,appConfig
 * @description
 *   Controller for dashboard page.
 */
angular.module('carSafety').controller("dashCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate", "user", "Idle", "Keepalive", "httpSuccessCheck", "alertBox", "refetchMapService", "appConfig", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, user, Idle, Keepalive, httpSuccessCheck, alertBox, refetchMapService, appConfig){
	Idle.watch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	/*$scope.setTitle = function(){
		window.setTimeout(function(){
			window.document.title = $translate.instant('dashboard');
		}, 50);
	}*/

	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;

    $scope.supportInfo = appConfig.support
	/*$translate.use($scope.lang);
	$scope.setTitle();*/
    window.document.title = $translate.instant('dashboard');

    if(window.scrollY>0||window.scrollX>0){
        window.scrollTo(0,0)
    }

	$scope.updatelang = function(){
        var postData = {
            lang: $scope.lang
        }
        $http({
            method: 'POST',
            url: '/api/updateLang',
            data: postData
        }).then(function successCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkHttp(response)
            if(errorphp){
                alertBox.errorAlert('90006_01')
                $scope.lang = $scope.userInfo.lang;
            }
            else{
                if($scope.userInfo.map=='googleMap'){
                    refetchMapService.deleteGoogle()
                }
                $state.reload()
            }
        }, function errorCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if(errorphp){
                alertBox.errorAlert('90006_'+errorphp)
            }
            else{
                alertBox.errorAlert(response.data.code)
            }
            $scope.lang = $scope.userInfo.lang;
        });
    }

    $scope.$on('IdleStart', function () {
        alertBox.idleAlert()
    })

    $scope.$on('IdleEnd', function () {
        swal.close(function(){
            clearInterval(timerInterval)
        })
    })

    $scope.$on('IdleTimeout', function () {
        swal.close(function(){
            clearInterval(timerInterval)
        })
        var func = function(result){
            $state.go('login', {}, { reload: true })
        }
        $http({
            method: 'GET',
            url: '/api/logout'
        }).then(function successCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            alertBox.timeoutAlert(func)
        }, function errorCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            alertBox.timeoutAlert(func)
        });
    })

    $scope.toPage = function(path){
        window.scrollTo(0, 0);
        $state.go(path, {}, { reload: true })
    }

}]);