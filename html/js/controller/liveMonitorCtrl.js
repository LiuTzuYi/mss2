/*
* @Author: Zilvia Kam
* @Date:   2019-08-14 16:45:45
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:24:20
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name liveMonitorCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,appConfig,$interval,$filter,user,Idle,Keepalive,responsiveCheck,httpSuccessCheck,alertBox,$sce,refetchMapService
 * @description
 *   Controller for live monitor page.
 */
angular.module('carSafety').controller("liveMonitorCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "appConfig", "$interval", "$filter", "user", "Idle", "Keepalive", "responsiveCheck", "httpSuccessCheck", "alertBox", "$sce", "refetchMapService", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, appConfig, $interval, $filter, user, Idle, Keepalive, responsiveCheck, httpSuccessCheck, alertBox, $sce, refetchMapService) {
	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	blockUi.addClass('block-ui-active block-ui-visible')

	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;

	window.document.title = $translate.instant('liveMonitor');

	$scope.updatelang = function () {
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
			if (errorphp) {
				alertBox.errorAlert('90006_01')
				$scope.lang = $scope.userInfo.lang;
			} else {
				if ($scope.userInfo.map == 'googleMap') {
					refetchMapService.deleteGoogle()
				}
				$state.reload()
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('90006_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
			$scope.lang = $scope.userInfo.lang;
		});
	}

	$scope.$on('IdleStart', function () {
		alertBox.idleAlert()
	})

	$scope.$on('IdleEnd', function () {
		swal.close(function () {
			clearInterval(timerInterval)
		})
	})

	$scope.$on('IdleTimeout', function () {
		swal.close(function () {
			clearInterval(timerInterval)
		})
		var func = function (result) {
			$state.go('login', {}, {
				reload: true
			})
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

	if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
		$scope.supportBrowser = false
	}
	else if(window.navigator.userAgent.match(/(MSIE|Trident)/)){
		$scope.supportBrowser = false
	}
	else{
		$scope.supportBrowser = true
	}

	$scope.dataSelected = []
	$scope.selectedCam = {}

	$scope.listDataSelect = {
		template: '{{option.display}}',
		smartButtonTextConverter: function (skip, option) {
			return option.name;
		},
		keyboardControls: false,
		scrollableHeight: 'auto',
		scrollable: true,
		searchField: 'display',
		enableSearch: true,
		showCheckAll: false,
		showUncheckAll: false,
		selectionLimit: 1,
		closeOnSelect: true,
		smartButtonMaxItems: 1,
		closeOnDeselect: true,
		idProperty: 'id',
		displayProp: 'display',
		buttonClasses: 'profile-list-select'
	}
	//window.setTimeout(function(){
	$scope.listDataSelectTexts = {
		buttonDefaultText: $translate.instant('selectVehicle'),
		searchPlaceholder: $translate.instant('search'),
	}
	//},50)
	$scope.listDataSelectEvent = {
		onItemSelect: function (item) {
			$scope.dataSelected[0] = angular.copy(item)
			for (var i = 0; i < $scope.camList.length; i++) {
				$scope.selectedCam[$scope.camList[i]] = $scope.dataSelected[0][$scope.camList[i]]
			}
			$scope.updateURL();
		},
		onItemDeselect: function (item) {
			$scope.dataSelected[0] = angular.copy(item)
		}
	}

	$scope.getList = function () {
		$http({
			method: 'GET',
			url: '/api/liveMonitor'
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.errorAlert('91606_01')
			} else {
				$scope.dataLabels = response.data.data
				$scope.camList = response.data.camlist
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91606_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.getList()

	$scope.monitorDefaultURL = '/liveMonitor/play'

	$scope.monitorURL = $scope.monitorDefaultURL

	$scope.updateURL = function(){
		var cam = ''
		var url = $scope.monitorDefaultURL
		angular.forEach($scope.selectedCam, function(value, key) {
		  	if(value=='Y'){
		  		cam += key.split('CAM')[1]+"-"
		  	}
		});
		if($scope.dataSelected[0]){
			url += '/'+$scope.dataSelected[0].name
			if(cam!==""){
				url += '/'+cam.slice(0, cam.length-1)
			}
		}
		$scope.monitorURL = url
	}

	angular.element($window).bind('resize', function () {
		var frame = document.getElementsByClassName('monitor')[0]
		frame.style.height = 'unset';
		frame.style.width = 'unset';
		frame.style.minHeight = 'unset';
		frame.style.minWidth = 'unset';
		$scope.$apply();
		$timeout(function(){
			frame.removeAttribute("style");
			$scope.$apply();
		},true)
	})

	$scope.$on('$destroy', function () {
		angular.element($window).unbind('resize');
	})

}]);