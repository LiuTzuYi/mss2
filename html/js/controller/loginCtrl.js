/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:30
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:24:32
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name loginCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,bannerData,refetchMapService
 * @description
 *   Controller for login page.
 */
angular.module('carSafety').controller("loginCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","bannerData","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Idle, Keepalive, appConfig, httpSuccessCheck,alertBox,bannerData,refetchMapService){
	Idle.unwatch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	$scope.setTitle = function(){
		window.document.title = $translate.instant('login');
	}

	$scope.lang = bannerData.lang;
	/*$translate.use($scope.lang).then(function(){
		$scope.setTitle();
	});*/
	window.document.title = $translate.instant('login');

	$scope.updatelang = function(){
		$translate.use($scope.lang).then(function(){
			$scope.setTitle();
		});
	}

	$scope.dataCoVer = {
		crtyear: appConfig.vyear,
		version: appConfig.version
	}

	$scope.toLogin = function(){
		var postData = {
			username: $scope.username,
			password: $scope.password,
			company_code: $stateParams.company_code,
			appVersion: $scope.dataCoVer.version
		}
		$http({
			method: 'POST',
			url: '/api/login',
			data: postData
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.errorAlert('90002_01')
			}
			else{
				if(response.data.code){
					var func = function(){
						Idle.watch();
              			$state.go('dash', {}, { reload: true })
					}
					alertBox.errorAlert(response.data.code,func)
				}
				else{
					Idle.watch();
              		$state.go('dash', {}, { reload: true })
				}
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if(errorphp){
              	alertBox.errorAlert('90002_'+errorphp)
            }
            else{
            	if(response.data.code=='10028'||response.data.code=='10029'){
              		$state.go('updatePwd', {}, { reload: true })
				}
				else if(response.data.link){
					window.location.href = response.data.link;
				}
				else{
					alertBox.errorAlert(response.data.code)
				}
            }
		})
	}

	$scope.toForgetPwd = function(){
		$state.go('forgetPwd', {lang: $scope.lang}, { reload: true })
	}

    $scope.typeLoginPwd="password";

    $timeout(function(){
    	refetchMapService.deleteGoogle()
    	refetchMapService.deleteBaidu()
    })
}]);