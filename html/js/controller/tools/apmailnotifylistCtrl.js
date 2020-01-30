/*
* @Author: Zilvia Kam
* @Date:   2019-09-06 18:07:50
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:21:42
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apmailnotifylistCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,$filter
 * @description
 *   Controller for admin panel - mail notification list page.
 */
angular.module('carSafety').controller("apmailnotifylistCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", "$filter", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService, $filter){
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

    $scope.predicates = [{
		'label': 'Company Code',
		'value': 'company_code'
	}, {
		'label': 'Notification Item',
		'value': 'notify_item'
	}, {
		'label': 'Status',
		'value': 'status'
	}];

    $scope.selectedPredicate = $scope.predicates[0].value;

	$scope.refreshList = function () {
        $http({
            method: 'GET',
            url: '/api/adminpanel/mailnotify',
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
                    	notify_id: obj.notify_id,
                        company_code: obj.company_code,
						notify_item: obj.notify_item,
						status: obj.status
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

    $scope.addMailnotify = function(){
    	$state.go('apmailnotifyadd', {token: token}, { reload: true })
    }

    $scope.editMailnotify = function(){
    	if ($scope.selectedRow) {
            row = $scope.rowCollection.find(function (element) {
                return $scope.selectedRow == element.notify_id;
            });
        }
    	$state.go('apmailnotifyedit', {token: token, notify: row}, { reload: true })
    }
}]);