/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:23:13
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name forgetPwdCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,regexConfig
 * @description
 *   Controller for forget password page.
 */
angular.module('carSafety').controller("forgetPwdCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "regexConfig", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Idle, Keepalive, appConfig, httpSuccessCheck,alertBox,regexConfig){
	Idle.unwatch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	$scope.setTitle = function(){
		window.document.title = $translate.instant('forgetPwd');
	}
	if($state.params.lang){
		$scope.lang = $state.params.lang
	}
	else{
		$scope.lang = langService.checkLang();
	}

	$state.params.lang = null;
	$translate.use($scope.lang).then(function(){
		$scope.setTitle();
	});

	$scope.emailregex = regexConfig.emailregex

	$scope.requestLink = function(){
		var func = function(){
			$state.go('login', {}, { reload: true })
		}
		var postData = {
			comp: $stateParams.company_code,
			username: $scope.username,
			email: $scope.email,
			lang: $scope.lang
		}
		$http({
			method: 'POST',
			url: '/api/requestPwdChange',
			data: postData
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.errorAlert('90008_01')
			}
			else{
				alertBox.contentAlert('success','forgetpwd_success_title','forgetpwd_success_text',func)
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if(errorphp){
				alertBox.errorAlert('90008_'+errorphp)
			}
			else{
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.toLogin = function(){
        $state.go('login', {}, { reload: true })
    };
}]);