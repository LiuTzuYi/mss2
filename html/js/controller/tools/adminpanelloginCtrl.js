/*
* @Author: Zilvia Kam
* @Date:   2019-05-16 18:46:22
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:17:50
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name adminpanelloginCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - login page.
 */
angular.module('carSafety').controller("adminpanelloginCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

    $translate.use('en')

	window.document.title = 'Admin Panel'

	$scope.toLogin = function(){
		var postData = {
			username: $scope.username,
			password: $scope.password,
		}
		$http({
			method: 'POST',
			url: '/api/adminpanel/login',
			data: postData
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.contentAlert('error','internalErr_title','internalErr_text')
			}
			else{
				sessionStorage.setItem('adminpanel_token', response.data.token);
              	$state.go('adminpanelnav', {token: response.data.token}, { reload: true })
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if(errorphp){
              	alertBox.contentAlert('error','internalErr_title','internalErr_text')
            }
            else{
				alertBox.notranslationAlert(response.data.message,response.data.detail,'error')
            }
		})
	}

    $timeout(function(){
    	refetchMapService.deleteGoogle()
    	refetchMapService.deleteBaidu()
    })
}]);