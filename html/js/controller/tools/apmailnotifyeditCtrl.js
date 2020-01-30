/*
* @Author: Zilvia Kam
* @Date:   2019-09-06 18:08:26
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:21:00
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apmailnotifyeditCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - edit mail notification page.
 */
angular.module('carSafety').controller("apmailnotifyeditCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
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

	if($state.params.notify){
		$scope.mailnotify = $state.params.notify
		$scope.editmailnotify = angular.copy($scope.mailnotify)
	}
	else{
		$state.go('apmailnotifylist', {}, { reload: true })
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

	$scope.submit = function(){
		var postData = {}

		if($scope.editmailnotify.status!==$scope.mailnotify.status){
			postData.status = $scope.editmailnotify.status
		}

		if(Object.getOwnPropertyNames(postData).length>0){
			postData.notify_id = $scope.mailnotify.notify_id
			$http({
				method: 'PATCH',
				url: '/api/adminpanel/mailnotify',
				headers: {
	    			'Authorization': token
	            },
	            data: postData
			}).then(function successCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkHttp(response)
				if(errorphp){
					alertBox.contentAlert('error','internalErr_title','internalErr_text')
				}
				else{
					alertBox.titleAlert('success', 'editSuccess', $scope.toList)
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
		else{
			alertBox.titleAlert('success', 'editSuccess', $scope.toList)
		}
	}
}]);