/*
* @Author: Zilvia Kam
* @Date:   2019-05-16 18:46:22
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:18:51
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apdeviceeditCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - edit device page.
 */
angular.module('carSafety').controller("apdeviceeditCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
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

	if($state.params.device){
		$scope.device = $state.params.device
		$scope.editdevice = angular.copy($scope.device)
	}
	else{
		$state.go('apdevicelist', {}, { reload: true })
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

    $scope.deviceTypes = ['Basic Terminal','Video Terminal','1076 Video Terminal','Initiative Defense Terminal']
    $scope.photocams = []
    $scope.videocams = []

    for (var i = 1; i<= 8; i++) {
    	$scope.photocams.push(i);
    	$scope.videocams.push(i);
    }

	$scope.submit = function(){
		var postData = {}
		postData.setting1 = {}
		postData.setting2 = {}

		if($scope.editdevice.device_type!==$scope.device.device_type){
			if($scope.editdevice.device_type=='Basic Terminal'){
				postData.setting1.device_type = 0
				postData.setting1.device_icon = 0
			}
			else if($scope.editdevice.device_type=='Video Terminal'){
				postData.setting1.device_type = 1
				postData.setting1.device_icon = 1
			}
			else if($scope.editdevice.device_type=='1076 Video Terminal'){
				postData.setting1.device_type = 16
				postData.setting1.device_icon = 2
			}
			else{
				postData.setting1.device_type = 32
				postData.setting1.device_icon = 3
			}
		}

		if($scope.editdevice.photocam_no!==$scope.device.photocam_no){
			postData.setting1.photocam_no = $scope.editdevice.photocam_no
		}

		if($scope.editdevice.videocam_no!==$scope.device.videocam_no){
			postData.setting1.videocam_no = $scope.editdevice.videocam_no
		}

		if($scope.editdevice.flameout_mode!==$scope.device.flameout_mode){
			if($scope.editdevice.flameout_mode=='Yes'){
				postData.setting1.flameout_mode = 1
			}
			else{
				postData.setting1.flameout_mode = 0
			}
		}

		if($scope.editdevice.BSD_CAM1!==$scope.device.BSD_CAM1){
			postData.setting2.BSD_CAM1 = $scope.editdevice.BSD_CAM1
		}

		if($scope.editdevice.DMS_CAM2!==$scope.device.DMS_CAM2){
			postData.setting2.DMS_CAM2 = $scope.editdevice.DMS_CAM2
		}

		if($scope.editdevice.ADAS_CAM3!==$scope.device.ADAS_CAM3){
			postData.setting2.ADAS_CAM3 = $scope.editdevice.ADAS_CAM3
		}

		if(Object.getOwnPropertyNames(postData.setting1).length==0){
			delete postData.setting1;
		}
		if(Object.getOwnPropertyNames(postData.setting2).length==0){
			delete postData.setting2;
		}

		if(postData.setting1 || postData.setting2){
			postData.sn = $scope.device.sn
			$http({
				method: 'PATCH',
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