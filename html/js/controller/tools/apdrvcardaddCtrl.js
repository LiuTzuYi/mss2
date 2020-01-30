/*
* @Author: Zilvia Kam
* @Date:   2019-08-29 17:33:21
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:19:12
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apdrvcardaddCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - driver card import page.
 */
angular.module('carSafety').controller("apdrvcardaddCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
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

	$scope.toLogout = function(){
    	sessionStorage.removeItem('adminpanel_token');
    	$state.go('adminpanellogin', {}, { reload: true })
    }

    $scope.getList = function () {
		$http({
			method: 'GET',
			url: '/api/adminpanel/complistselect',
            headers: {
    			'Authorization': token
			}
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			$scope.file = null;
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.contentAlert('error','internalErr_title','internalErr_text')
			}
			else{
				$scope.companylist = response.data.data
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

	$scope.getList()

    $scope.uploadFile = function (ev) {
        var element = ev.target;
        if (element.files && element.files[0]) {
            var file = element.files[0];
            var checkcsv = new RegExp(/^.+\.csv$/)
            if (checkcsv.test(file.name) == false) {
                alertBox.titleAlert('warning', 'notCSV')
            }
            else {
            	$scope.file = file
            	$scope.$apply();
            }
        }
    }

	$scope.submit = function(){
		var postData = {
			file: $scope.file
		}
		$http({
			method: 'POST',
            url: '/api/adminpanel/drvcard/add/'+$scope.selectedcomp.company_id,
            headers: {
            	'Authorization': token,
                'Content-Type': undefined
            },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("file", $scope.file);
                return formData;
            },
            data: postData
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.contentAlert('error','internalErr_title','internalErr_text')
			}
			else{
				$scope.file = null;
				$scope.attempt = false;
				var text = 'Total: '+response.data.data.totalCnt+'; Inserted: '+response.data.data.insertedCnt+'; Updated: '+response.data.data.updatedCnt
				alertBox.notranslationAlert($translate.instant('addSuccess'),text,'success',$scope.toList)
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if(errorphp){
              	alertBox.contentAlert('error','internalErr_title','internalErr_text')
            }
            else{
            	if(response.data.data){
            		var htmltext = "<div class='alert-server-error'><h6>" + response.data.detail + ": </h6><h6>[" + response.data.data.join(", ") + "]</h6></div>"
            		alertBox.notranslationAlertHTML(response.data.message,htmltext,'error')
            	}
            	else if(response.data.dup_data){
            		var htmlData = ''
            		for (var i = 0; i < response.data.dup_data.length; i++) {
                        htmlData += response.data.dup_data[i] + "<br>"
                    }
            		var htmltext = "<div class='alert-server-error'><h6>" + response.data.detail + ": </h6><h6>" + htmlData + "</h6></div>"
            		alertBox.notranslationAlertHTML(response.data.message,htmltext,'error')
            	}
            	else{
            		alertBox.notranslationAlert(response.data.message,response.data.detail,'error')
            	}
            }
		})
	}
}]);