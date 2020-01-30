/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:30
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:25:39
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name tripDrvImportCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user,Idle,Keepalive,httpSuccessCheck,alertBox,refetchMapService
 * @description
 *   Controller for trip driver import page.
 */
angular.module('carSafety').controller("tripDrvImportCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService","$document","$window","$mdDialog","formValidService","tmhDynamicLocale","user", "Idle", "Keepalive", "httpSuccessCheck", "alertBox", "refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user, Idle, Keepalive, httpSuccessCheck, alertBox, refetchMapService){
	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	/*$scope.setTitle = function(){
		$timeout(function(){
			window.document.title = $translate.instant('roster');
		}, 50);
	}*/
	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;
	/*$translate.use($scope.lang);
	$scope.setTitle();*/
	window.document.title = $translate.instant('tripDrvImport');

	$scope.updatelang = function(){
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
			if(errorphp){
				alertBox.errorAlert('90006_01')
				$scope.lang = $scope.userInfo.lang;
			}
			else{
				if($scope.userInfo.map=='googleMap'){
                    refetchMapService.deleteGoogle()
                }
            	$state.reload()
            }
        }, function errorCallback(response) {
        	blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if(errorphp){
                alertBox.errorAlert('90006_'+errorphp)
            }
            else{
                alertBox.errorAlert(response.data.code)
            }
            $scope.lang = $scope.userInfo.lang;
        });
	}

    $scope.$on('IdleStart', function () {
        alertBox.idleAlert()
    })

    $scope.$on('IdleEnd', function () {
        swal.close(function(){
            clearInterval(timerInterval)
        })
    })

    $scope.$on('IdleTimeout', function () {
        swal.close(function(){
            clearInterval(timerInterval)
        })
        var func = function(result){
            $state.go('login', {}, { reload: true })
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

	$scope.showexample='show';

	$scope.examplestateChange = function(){
		if($scope.showexample=='show'){
			$scope.showexample='hide'
		}
		else{
			$scope.showexample='show';
		}
		$timeout(function () {
			var table = document.getElementsByClassName('tripdrvi-input-box')[0]
			table.style.minHeight = table.children[0].clientHeight+250+'px'
		})
	}

	$scope.csv=[];

	function consecutiveArray(arr){
		var result = arr.reduce(function(r, n){
			const lastSubArray = r[r.length - 1];
			if(!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) {
			r.push([]);
			}
			r[r.length - 1].push(n);
			return r;
		}, []);

    	var returnArr = Array();
	    result.forEach(function(ele){
	    	if(ele.length>1){
		      	var first = ele[0]
		        var last = ele[ele.length-1]
		        returnArr.push(first+"-"+last)
		    }
		    else{
		    	returnArr.push(ele[0])
		    }
	    })
    	return returnArr;
	}

	$scope.submit = function(){
		if($scope.csv.length==0){
			alertBox.emptyTripDrvImportAlert('warning','emptyTripDrvImport','inputTripDrv')
		}
		else{
			var csvpattern = new RegExp(/^[\d]+?,[^,]+?$/)
			var error = []
			for (var i = 0; i<$scope.csv.length; i++) {
				var match = csvpattern.test($scope.csv[i])
				if(!match){
					error.push(i+1)
				}
			}
			if(error.length!==0){
				error = consecutiveArray(error);
				var title = 'wrongPattern'
				var htmltext = "<div class='alert-server-error'><h6>"+$translate.instant('wrongLines')+": </h6><h6>["+error.join(", ")+"]</h6></div>"
				alertBox.setImportErrAlert(title,htmltext,'warning')
			}
			else{
				var postData = {
					tripDrv: $scope.csv
				}
				$http({
					method: 'POST',
					url: '/api/tripDrvImport',
					data: postData
				})
				.then(function successCallback(response) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					var errorphp = httpSuccessCheck.checkHttp(response)
					if(errorphp){
						alertBox.errorAlert('91804_01')
					}
					else{
						if(response.data.message=='Success'){
							var message = $translate.instant('setImportSuccess',{count:response.data.data})
							var func = function(){
								$scope.csv = []
							}
	                        alertBox.setImportSuccessAlert('success',message,func)
						}
						else{
							var title = 'importFailure_title'
                            var htmltext = "<div class='alert-server-error'><h6 style='white-space: pre-wrap;'>"+$translate.instant(response.data.code+'_text')+": </h6><h6>["+response.data.data.join(", ")+"]</h6></div>"
                            alertBox.setImportAlert(title,htmltext,'warning',response.data.code)
						}
		            }
				}, function errorCallback(response) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					var errorphp = httpSuccessCheck.checkerrorHttp(response)
		            if(errorphp){
		                alertBox.errorAlert('91804_'+errorphp)
		            }
		            else{
		                alertBox.errorAlert(response.data.code)
		            }
				});
			}
		}
	}

	$timeout(function () {
		var table = document.getElementsByClassName('tripdrvi-input-box')[0]
		table.style.minHeight = table.children[0].clientHeight+250+'px'
		var headerHeight = document.getElementsByClassName('tripdrvi-content-header')[0].clientHeight
		table.style.minHeight = table.children[0].clientHeight+250+'px'
		table.style.height = 'calc( 100% - '+headerHeight+'px )'
	})

	angular.element($window).bind('resize', function () {
		var table = document.getElementsByClassName('tripdrvi-input-box')[0]
		var headerHeight = document.getElementsByClassName('tripdrvi-content-header')[0].clientHeight
		table.style.minHeight = table.children[0].clientHeight+250+'px'
		table.style.height = 'calc( 100% - '+headerHeight+'px )'
	})

	$scope.$on('$destroy', function(){
		angular.element($window).unbind('resize')
	})
}]);