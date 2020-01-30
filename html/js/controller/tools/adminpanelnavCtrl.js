/*
* @Author: Zilvia Kam
* @Date:   2019-08-26 11:11:32
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:17:57
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name adminpanelnavCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - navigation page.
 */
angular.module('carSafety').controller("adminpanelnavCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

    $translate.use('en')

	window.document.title = 'Admin Panel'

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

	$scope.toPage = function(path){
        window.scrollTo(0,0)
        $state.go(path, {token: token}, { reload: true })
    }

    $scope.toLogout = function(){
    	sessionStorage.removeItem('adminpanel_token');
    	$state.go('adminpanellogin', {}, { reload: true })
    }

    $timeout(function(){
    	refetchMapService.deleteGoogle()
    	refetchMapService.deleteBaidu()
    })
}]);