/*
* @Author: Zilvia Kam
* @Date:   2019-05-16 18:46:22
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:19:04
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apdevicelistCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,$filter
 * @description
 *   Controller for admin panel - device list page.
 */
angular.module('carSafety').controller("apdevicelistCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", "$filter", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService, $filter){
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

	$scope.predicates = [{
		'label': 'SN',
		'value': 'sn'
	}, {
		'label': 'Device Type',
		'value': 'device_type'
	}, {
		'label': 'Photo Cam No.',
		'value': 'photocam_no'
	}, {
		'label': 'Video Cam No.',
		'value': 'videocam_no'
	}, {
        'label': 'Video Cam Type',
        'value': 'videocam_type'
    }, {
		'label': 'Watch Video By Flameout',
		'value': 'flameout_mode'
	}, {
		'label': 'Binded',
		'value': 'binding'
	}];

    $scope.selectedPredicate = $scope.predicates[0].value;

	$scope.refreshList = function () {
        $http({
            method: 'GET',
            url: '/api/adminpanel/device',
            headers: {
    			'Authorization': token
			}
        }).then(function successCallback(response) {
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.contentAlert('error','internalErr_title','internalErr_text')
            } else {
                for (var i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].last_access_ts) {
                        var part = response.data.data[i].last_access_ts.split(" ")
                        var subpart1 = part[0].split("-")
                        response.data.data[i].last_access_ts = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " " + part[1])
                    }
                }
                $scope.rowCollection = response.data.data
                $scope.realCollection = $scope.rowCollection.map(function (obj) {
                    var lastAccessTs = null
                    if (obj.last_access_ts) {
                        lastAccessTs = $filter('date')(obj.last_access_ts, 'yyyy-MM-dd HH:mm:ss')
                    }
                    var videocam_type = $scope.getcamType(obj);
                    return {
                        sn: obj.sn,
                        device_type: obj.device_type,
                        photocam_no: obj.photocam_no,
                        videocam_no: obj.videocam_no,
                        videocam_type: videocam_type,
                        flameout_mode: obj.flameout_mode,
                        binding: obj.binding
                    }
                })
                var y = window.pageYOffset
                window.scrollBy(0, -y)
                delete $scope.selectedRow
                blockUi.removeClass('block-ui-active block-ui-visible')
            }
        }, function errorCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if (errorphp) {
                alertBox.contentAlert('error','internalErr_title','internalErr_text')
            } else {
                alertBox.notranslationAlert(response.data.message,response.data.detail,'error')
            }
        });
    }

    if(token){
    	$scope.refreshList()
    }

    $scope.getcamType = function(obj){
        var types = ''
        angular.forEach(obj, function(value, key) {
            if(key.includes("_CAM")){
                if(value=='Y'){
                    types += key.split("_CAM")[0]+","
                }
            }
        });
        if(types!==""){
            types = types.slice(0, types.length-1)
        }
        return types
    }

    $scope.addDevice = function(){
    	$state.go('apdeviceadd', {token: token}, { reload: true })
    }

    $scope.editDevice = function(){
    	if ($scope.selectedRow) {
            row = $scope.rowCollection.find(function (element) {
                return $scope.selectedRow == element.sn;
            });
        }
    	$state.go('apdeviceedit', {token: token, device: row}, { reload: true })
    }
}]);