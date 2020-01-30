/*
* @Author: Zilvia Kam
* @Date:   2019-09-06 18:08:10
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:20:23
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apmailnotifyaddCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - add mail notification page.
 */
angular.module('carSafety').controller("apmailnotifyaddCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

	$translate.use('en')

	window.document.title = 'Mail Notification Management - Admin Panel'

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
        $state.go('apmailnotifylist', {}, { reload: true })
    }

	$scope.toLogout = function(){
    	sessionStorage.removeItem('adminpanel_token');
    	$state.go('adminpanellogin', {}, { reload: true })
    }

    $scope.status = 'ON'

    $scope.getList = function () {
		$http({
			method: 'GET',
			url: '/api/adminpanel/complistselect',
            headers: {
    			'Authorization': token
			}
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			$scope.file = null;
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.contentAlert('error','internalErr_title','internalErr_text')
			}
			else{
				$scope.companylist = response.data.data
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

	$scope.getList()

	$scope.submit = function(){
		var postData = {
			company_id: $scope.selectedcomp.company_id,
			notify_item: $scope.notify_item,
			status: $scope.status
		}
		$http({
			method: 'POST',
			url: '/api/adminpanel/mailnotify',
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