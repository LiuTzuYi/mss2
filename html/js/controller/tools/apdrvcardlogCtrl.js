/*
* @Author: Zilvia Kam
* @Date:   2019-08-29 17:33:05
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:19:20
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apdrvcardlogCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,$filter
 * @description
 *   Controller for admin panel - driver card import log page.
 */
angular.module('carSafety').controller("apdrvcardlogCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", "$filter", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService, $filter){
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

    $translate.use('en')

	window.document.title = 'Driver Card Import - Admin Panel'

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
        $state.go('apdrvcardlog', {}, { reload: true })
    }

	$scope.predicates = [{
		'label': 'Company Code',
		'value': 'company_code'
	}, {
		'label': 'Total Count',
		'value': 'totalCnt'
	}, {
		'label': 'Inserted Count',
		'value': 'insertedCnt'
	}, {
		'label': 'Updated Count',
		'value': 'updatedCnt'
	}, {
		'label': 'File Path',
		'value': 'filepath'
	}, {
		'label': 'Import Time',
		'value': 'create_ts'
	}];

    $scope.selectedPredicate = $scope.predicates[0].value;

	$scope.refreshList = function () {
        $http({
            method: 'GET',
            url: '/api/adminpanel/drvcard/log',
            headers: {
    			'Authorization': token
			}
        }).then(function successCallback(response) {
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.contentAlert('error','internalErr_title','internalErr_text')
            }
            else {
                $scope.rowCollection = response.data.data
                $scope.realCollection = $scope.rowCollection.map(function (obj) {
                    return {
                        company_code: obj.company_code,
						totalCnt: obj.totalCnt,
						insertedCnt: obj.insertedCnt,
						updatedCnt: obj.updatedCnt,
						filepath: obj.filepath,
						create_ts: obj.create_ts
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

    $scope.addDrvCard = function(){
    	$state.go('apdrvcardadd', {token: token}, { reload: true })
    }

}]);