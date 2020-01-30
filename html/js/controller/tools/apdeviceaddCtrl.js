
/*
* @Author: Zilvia Kam
* @Date:   2019-05-16 18:46:22
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:18:43
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apdeviceaddCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - add device page.
 */
angular.module('carSafety').controller("apdeviceaddCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

	$translate.use('en')

	window.document.title = 'Device Management - Admin Panel'

	var token

	if($state.params.token){
		token = $state.params.token
	}
	else if(sessionStorage.getItem('adminpanel_token')){
		token = sessionStorage.getItem('adminpanel_token')
	}
	else{
		$state.go('adminpanellogin', {}, { reload: true })
	}

	$scope.toNav = function(){
        $state.go('adminpanelnav', {}, { reload: true })
    }

    $scope.toList = function(){
        $state.go('apdevicelist', {}, { reload: true })
    }

	$scope.toLogout = function(){
    	sessionStorage.removeItem('adminpanel_token');
    	$state.go('adminpanellogin', {}, { reload: true })
    }

	$scope.submit = function(){
		var postData = {
			sn: $scope.sn
		}
		$http({
			method: 'POST',
			url: '/api/adminpanel/device',
			data: postData,
            headers: {
    			'Authorization': token
			}
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.contentAlert('error','internalErr_title','internalErr_text')
			}
			else{
				alertBox.titleAlert('success', 'addSuccess', $scope.toList)
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
}]);