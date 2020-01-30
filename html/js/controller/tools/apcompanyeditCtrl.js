/*
* @Author: Zilvia Kam
* @Date:   2019-08-26 11:53:42
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:18:22
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name apcompanyeditCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for admin panel - edit company page.
 */
angular.module('carSafety').controller("apcompanyeditCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox","refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Keepalive, appConfig, httpSuccessCheck,alertBox,refetchMapService){
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

	$scope.disclaimerType = ['default','en','zhtw','zhcn']

	if($state.params.company){
		$scope.funcs = appConfig.userFunc;
		if($state.params.company.pwd_renewal_day===null){
    		$scope.pwd_renewal_day_enable = 'N'
    	}
    	else{
    		$scope.pwd_renewal_day_enable = 'Y'
    	}
    	angular.forEach($scope.disclaimerType, function(value, key) {
		  	if($state.params.company['banner_'+value]===null){
	    		$scope['disclaimer_'+value] = 'N'
	    	}
	    	else{
	    		$scope['disclaimer_'+value] = 'Y'
	    		$state.params.company['banner_'+value] += " (uploaded)"
	    	}
		});
    	$scope.pwd_renewal_day_display = 'NA'
		$scope.company = $state.params.company
		$scope.editcompany = angular.copy($scope.company)
	}
	else{
		$state.go('apcompanylist', {}, { reload: true })
	}

	$scope.toNav = function(){
        $state.go('adminpanelnav', {}, { reload: true })
    }

    $scope.toList = function(){
        $state.go('apcompanylist', {}, { reload: true })
    }

	$scope.toLogout = function(){
    	sessionStorage.removeItem('adminpanel_token');
    	$state.go('adminpanellogin', {}, { reload: true })
    }

    $scope.pwdRules = []

    for (var i = 1; i<= 4; i++) {
    	$scope.pwdRules.push(i);
    }

    $scope.toggleSelection = function(func) {
	    var idx = $scope.editcompany.func.indexOf(func);
	    if (idx > -1) {
	      	$scope.editcompany.func.splice(idx, 1);
	    }

	    else {
	      	$scope.editcompany.func.push(func);
	    }
	};

    $scope.compareArr = function(_arr1,_arr2){
    	if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length){
	      	return false;
    	}
	    var arr1 = _arr1.concat().sort();
	    var arr2 = _arr2.concat().sort();
	    for (var i = 0; i < arr1.length; i++) {
	        if (arr1[i] !== arr2[i]){
	            return false;
	        }
	    }
	    return true;
    }

    $scope.enablePwdRenew = function(){
    	if($scope.pwd_renewal_day_enable == 'Y'){
    		if($scope.editcompany.pwd_renewal_day===null){
    			$scope.editcompany.pwd_renewal_day = 90
    		}
    	}
    }

    $scope.uploadFile = function (ev) {
        var element = ev.target;
        if (element.files && element.files[0]) {
            var file = element.files[0];
            var checkcsv = new RegExp(/^.+\.html$/)
            if (checkcsv.test(file.name) == false) {
                alertBox.titleAlert('warning', 'notCSV')
            }
            else {
            	var type = element.name.split('_')[1];
            	if(element.name.split('_')[1]){
            		$scope['file_'+type] = file
            	}
            	$scope.$apply();
            }
        }
    }

    $scope.enableDisclaimer = function(){
    	if($scope.editcompany.banner=='Y'){
    		$scope.disclaimer_default='Y'
    	}
    }

    $scope.disclaimerCheck = function(){
    	var check = true;
    	if($scope.editcompany.banner=='Y'){
    		angular.forEach($scope.disclaimerType, function(value, key) {
    			if($scope['disclaimer_'+value]=='Y'){
    				if(!$scope.editcompany['banner_'+value] && !$scope['file_'+value]){
			    		check = false
			    	}
    			}
			});
    	}
    	return check;
    }

    $scope.hasFileUpload = function(){
    	var check = false;
    	if($scope.editcompany.banner=='Y'){
    		angular.forEach($scope.disclaimerType, function(value, key) {
    			if($scope['disclaimer_'+value]=='Y'){
    				if($scope['file_'+value]){
			    		check = true
			    	}
    			}
			});
    	}
    	return check;
    }

	$scope.submit = function(){
		var postData = {}
		postData.setting = {}

		if($scope.editcompany.timezone!==$scope.company.timezone){
			postData.setting.timezone = $scope.editcompany.timezone
		}

		if($scope.editcompany.pwd_lockout_cnt!==$scope.company.pwd_lockout_cnt){
			postData.setting.pwd_lockout_cnt = $scope.editcompany.pwd_lockout_cnt
		}

		if($scope.editcompany.pwd_length!==$scope.company.pwd_length){
			postData.setting.pwd_length = $scope.editcompany.pwd_length
		}

		if($scope.editcompany.pwd_rule!==$scope.company.pwd_rule){
			postData.setting.pwd_rule = $scope.editcompany.pwd_rule
		}

		if($scope.editcompany.pwd_change_limit!==$scope.company.pwd_change_limit){
			if($scope.editcompany.pwd_change_limit=='Yes'){
				postData.setting.pwd_change_limit = 'Y'
			}
			else{
				postData.setting.pwd_change_limit = 'N'
			}
		}

		if($scope.editcompany.pwd_history!==$scope.company.pwd_history){
			postData.setting.pwd_history = $scope.editcompany.pwd_history
		}

		if($scope.pwd_renewal_day_enable == 'Y'){
			if($scope.editcompany.pwd_renewal_day!==$scope.company.pwd_renewal_day){
				postData.setting.pwd_renewal_day = $scope.editcompany.pwd_renewal_day
			}
		}
		else{
			if($scope.company.pwd_renewal_day!==null){
				postData.setting.pwd_renewal_day = 'NULL'
			}
		}

		if($scope.editcompany.status!==$scope.company.status){
			if($scope.editcompany.status=='Active'){
				postData.setting.status = 'A'
			}
			else{
				postData.setting.status = 'I'
			}
		}

		if($scope.editcompany.banner!==$scope.company.banner){
			postData.setting.banner = $scope.editcompany.banner
		}

		if($scope.editcompany.banner=='Y'){
			angular.forEach($scope.disclaimerType, function(value, key) {
    			if($scope['disclaimer_'+value]=='Y'){
    				if($scope['file_'+value]){
			    		postData['file_'+value] = $scope['file_'+value]
			    	}
    			}
			});
		}

		if(Object.getOwnPropertyNames(postData.setting).length==0){
			delete postData.setting;
		}

		if(!$scope.compareArr($scope.editcompany.func,$scope.company.func)){
			postData.func = $scope.editcompany.func
		}

		if(postData.setting || postData.func || $scope.hasFileUpload()){
			postData.company_id = $scope.company.company_id
			var httpRequestSet = {
				method: 'POST',
				url: '/api/adminpanel/company/edit',
				headers: {
	    			'Authorization': token
	            },
	            data: postData
			}
			if($scope.hasFileUpload()){
				httpRequestSet.headers['Content-Type'] = undefined
				httpRequestSet.transformRequest = function (data) {
	                var formData = new FormData();
	                angular.forEach(postData, function(value, key) {
	                	if(!key.includes("file_")){
	                		if(typeof(value) === 'object'){
	                			formData.append(key, JSON.stringify(value));
	                		}
	                		else{
	                			formData.append(key, value);
	                		}
	                	}
	                });
	                angular.forEach($scope.disclaimerType, function(value, key) {
	                	if($scope['disclaimer_'+value]=='Y'){
	                		console.log(postData['file_'+value])
		    				if(postData['file_'+value]){
					    		formData.append('file_'+value, $scope['file_'+value]);
					    	}
					    }
					});
					console.log(formData)
	                return formData;
	            }
			}
			$http(httpRequestSet).then(function successCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkHttp(response)
				if(errorphp){
					alertBox.contentAlert('error','internalErr_title','internalErr_text')
				}
				else{
					alertBox.titleAlert('success', 'editSuccess', $scope.toList)
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
		else{
			alertBox.titleAlert('success', 'editSuccess', $scope.toList)
		}
	}
}]);