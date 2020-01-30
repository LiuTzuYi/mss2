/*
* @Author: Zilvia Kam
* @Date:   2019-08-26 11:53:10
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:18:31
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apcompanylistCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,$filter
 * @description
 *   Controller for admin panel - company list page.
 */
angular.module('carSafety').controller("apcompanylistCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", "$filter", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService, $filter){
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

    $translate.use('en')

	window.document.title = 'Company Management - Admin Panel'

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
        $state.go('apcompanylist', {}, { reload: true })
    }

    $scope.disclaimerType = ['default','en','zhtw','zhcn']

	$scope.predicates = [{
		'label': 'Company Code',
		'value': 'company_code'
	}, {
		'label': 'Company Name',
		'value': 'company_name'
	}, {
		'label': 'Timezone',
		'value': 'timezone'
	}, {
		'label': 'Acc. Lock Times',
		'value': 'pwd_lockout_cnt'
	}, {
		'label': 'Password Req. Length',
		'value': 'pwd_length'
	}, {
		'label': 'Password Req. Rule',
		'value': 'pwd_rule'
	}, {
		'label': 'Password Change Limit',
		'value': 'pwd_change_limit'
	}, {
		'label': 'Password History Record',
		'value': 'pwd_history'
	}, {
		'label': 'Password Renewal Day',
		'value': 'pwd_renewal_day'
	}, {
		'label': 'Status',
		'value': 'status'
	}, {
        'label': 'Disclaimer',
        'value': 'banner'
    }];

    $scope.selectedPredicate = $scope.predicates[0].value;

	$scope.refreshList = function () {
        $http({
            method: 'GET',
            url: '/api/adminpanel/company',
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
                	var pwd_renewal_day = obj.pwd_renewal_day
                	if(obj.pwd_renewal_day===null){
                		pwd_renewal_day = 'NA'
                	}
                    var banner = obj.banner
                    if(obj.banner=='Y'){
                        var file = ""
                        var valid = false
                        angular.forEach($scope.disclaimerType, function(value, key) {
                            if(obj['banner_'+value]!==null){
                                if(valid){
                                    file += ", "
                                }
                                file += value
                                valid = true;
                            }
                        });
                        if(valid){
                            banner += " ("+file+")"
                        }
                    }
                	var functmp = obj.func
                    var sortingArr = appConfig.userFunc
                    var order = Object.create(null);
                    sortingArr.forEach(function (a, i) {
                        order[a] = i;
                    });
                    functmp.sort(function (a, b) {
                        return order[a] - order[b]
                    });
                    var func = functmp.map(function (element) {
                        return $translate.instant(element)
                    }).join(', ')
                    return {
                        company_code: obj.company_code,
						company_name: obj.company_name,
						timezone: obj.timezone,
						pwd_lockout_cnt: obj.pwd_lockout_cnt,
						pwd_length: obj.pwd_length,
						pwd_rule: obj.pwd_rule,
						pwd_change_limit: obj.pwd_change_limit,
						pwd_history: obj.pwd_history,
						pwd_renewal_day: pwd_renewal_day,
						status: obj.status,
                        banner: banner,
						func: func
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

    $scope.addCompany = function(){
    	$state.go('apcompanyadd', {token: token}, { reload: true })
    }

    $scope.editCompany = function(){
    	if ($scope.selectedRow) {
            row = $scope.rowCollection.find(function (element) {
                return $scope.selectedRow == element.company_code;
            });
        }
    	$state.go('apcompanyedit', {token: token, company: row}, { reload: true })
    }
}]);