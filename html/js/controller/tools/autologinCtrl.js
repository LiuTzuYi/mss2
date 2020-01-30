/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:19:35
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name autologinCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,$location
 * @description
 *   Controller for autologin tool page.
 */
angular.module('carSafety').controller("autologinCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "refetchMapService", "$location", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Idle, Keepalive, appConfig, httpSuccessCheck, alertBox, refetchMapService, $location) {
	Idle.unwatch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

	window.document.title = $translate.instant('GST');

	/**
	 * @memberOf autologinCtrl
	 * @property {String[]} credential credentials of user
	 */
	var credential = atob(decodeURI($stateParams.credential)).split('&')

	/**
	 * @memberOf autologinCtrl
	 * @member $scope
	 * @property {String} $scope.username username
	 * @property {String} $scope.password password
	 */
	$scope.username = credential[0].split('usr=')[1]
	$scope.password = credential[1].split('pwd=')[1]

	/**
	 * @memberOf autologinCtrl
	 * @property {Object} postData data object posting to server
	 * @property {String} postData.username username of user
	 * @property {String} postData.password password of user
	 * @property {String} postData.company_code company code of user
	 * @property {Boolean} postData.api 
	 */
	var postData = {
		username: $scope.username,
		password: $scope.password,
		company_code: $stateParams.company_code,
		api: true,
	}
	$http({
		method: 'POST',
		url: '/api/login',
		data: postData
	}).then(function successCallback(response) {
		blockUi.removeClass('block-ui-active block-ui-visible')
		var errorphp = httpSuccessCheck.checkHttp(response)
		if (errorphp) {
			alertBox.errorAlert('90002_01')
		} else {
			if (response.data.code) {
				var func = function () {
					Idle.watch();
					$location.path("/" + $stateParams.company_code + "/companyProfile");
				}
				alertBox.errorAlert(response.data.code, func)
			} else {
				Idle.watch();
				$location.path("/" + $stateParams.company_code + "/companyProfile");
			}
		}
	}, function errorCallback(response) {
		blockUi.removeClass('block-ui-active block-ui-visible')
		var errorphp = httpSuccessCheck.checkerrorHttp(response)
		if (errorphp) {
			alertBox.errorAlert('90002_' + errorphp)
		} else {
			if (response.data.code == '10028' || response.data.code == '10029') {
				$state.go('updatePwd', {}, {
					reload: true
				})
			} else if (response.data.link) {
				window.location.href = response.data.link;
			} else {
				alertBox.errorAlert(response.data.code)
			}
		}
	})

}]);