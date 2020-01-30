/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:21:56
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name 404Ctrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,appConfig
 * @description
 *   Controller for 404 page.
 */
angular.module('carSafety').controller("404Ctrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "appConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, appConfig) {
	/**
	 * @memberOf 404Ctrl
	 * @member $scope
	 * @property {Object} $scope $scope object that can be used in HTML
	 * @property {String} $scope.lang language of user
	 * @property {Object} $scope.dataCoVer
	 * @property {String} $scope.dataCoVer.crtyear current year
	 * @property {String} $scope.dataCoVer.version version number
	 */
	$scope.lang = langService.checkLang();
	$translate.use($scope.lang)
		.then(function () {
			window.document.title = $translate.instant('404Title');
		});
	$scope.dataCoVer = {
		crtyear: appConfig.vyear,
		version: appConfig.version
	}
}]);