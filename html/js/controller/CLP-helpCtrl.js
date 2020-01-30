/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:23:20
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name CLP-helpCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,$location,$anchorScroll
 * @description
 *   Controller for [CLP] help page (all languages).
 */
angular.module('carSafety').controller("CLP-helpCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "$location", "$anchorScroll", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Idle, Keepalive, appConfig, httpSuccessCheck, alertBox, $location, $anchorScroll) {
	Idle.unwatch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	$scope.setTitle = function () {
		window.document.title = $translate.instant('helpPage');
	}

	$scope.gotoAnchor = function (anchor) {
		$location.hash(anchor);
		$anchorScroll();
	};

	window.onscroll = function () {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			document.getElementById("goToTopBtn").style.display = "block";
		} else {
			document.getElementById("goToTopBtn").style.display = "none";
		}
	}

	// When the user clicks on the button, scroll to the top of the document
	$scope.topFunction = function () {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	if (window.location.href.contains('help-')) {
		var str = window.location.href.split('help-')[1]
		if (str.contains('#')) {
			$scope.gotoAnchor(str.split('#')[1])
			str = str.split('#')[0]
		}
		$scope.lang = str
	} else {
		$scope.lang = 'en'
	}

	$translate.use($scope.lang).then(function () {
		$scope.setTitle();
	});

	$scope.dataCoVer = {
        crtyear: new Date().getFullYear(),
        version: appConfig.version
    }

}]);