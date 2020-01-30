/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:27:25
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name warnvideoDownloadCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user,Idle,Keepalive,httpSuccessCheck,alertBox,refetchMapService,$filter,appConfig,regexConfig
 * @description
 *   Controller for warning video batch download page.
 */
angular.module('carSafety').controller("warnVideoDownloadCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService","$document","$window","$mdDialog","formValidService","tmhDynamicLocale","user", "Idle", "Keepalive", "httpSuccessCheck", "alertBox", "refetchMapService","$filter","appConfig","regexConfig", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user, Idle, Keepalive, httpSuccessCheck, alertBox, refetchMapService,$filter,appConfig,regexConfig){
	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	/*$scope.setTitle = function(){
		$timeout(function(){
			window.document.title = $translate.instant('warnvideoDownload');
		}, 50);
	}*/
	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;
	/*$translate.use($scope.lang);
	$scope.setTitle();*/
	window.document.title = $translate.instant('warnVideoDownload');

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

    $scope.filenameregex = regexConfig.filenameregex

	$scope.videoArray=[];

	$scope.validate = function(formstr){
		$timeout(function () {
			var validate = document.getElementsByName(formstr)[0]
			var invalidFunc = 'setInvalid'
	        var validFunc = 'setValid'
			if($scope.vdoConfig[formstr].$invalid){
	            formValidService[invalidFunc](validate)
	        }
	        else{
	            formValidService[validFunc](validate)
	        }
	    })
	}

	$scope.submit = function(){
		if($scope.videoArray.length==0){
			alertBox.contentAlert('warning','emptyVideoId','inputVideoId')
		}
		else if($scope.videoArray.length>50){
			alertBox.contentAlert('warning','limitVideoId','limitVideoIdCnt')
		}
		else{
			blockUi.addClass('block-ui-active block-ui-visible')
			var zipname
			var postData
			if($scope.archiveFilename){
				zipname = $scope.archiveFilename
			}
			else{
				zipname = "VideoArchive_"+$filter('date')(new Date(), 'yyyyMMdd', $scope.userInfo.timezone)
			}
			if($scope.videoPrefix){
				postData = {
					archiveFilename: zipname,
					videoPrefix: $scope.videoPrefix,
					videoArray: $scope.videoArray
				}
			}
			else{
				postData = {
					archiveFilename: zipname,
					videoArray: $scope.videoArray
				}
			}
			$http({
				method: 'POST',
				url: '/api/getVideoArchive',
				data: postData,
				/*responseType: "arraybuffer",
				transformResponse: function(data, headersGetter, status){
					var type = headersGetter("Content-Type");
			      	if (!type.startsWith("application/json")) {
			        	return data;
			      	};
			      	var decoder = new TextDecoder("utf-8");
			      	var domString = decoder.decode(data);
			      	var json = JSON.parse(domString);
			      	return json;
				}*/
			})
			.then(function successCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkHttp(response)
				if(errorphp){
					alertBox.errorAlert('92001_01')
				}
				else{
					/*var contentDisposition = response.headers('Content-Disposition');
					var filename = contentDisposition.split(';')[1].split('filename="')[1].split('"')[0].trim();*/
					//var downloadpopup = document.createElement('a');
					/*var blob = new Blob([response.data], { type: "application/octet-stream'" });
					var url = window.URL.createObjectURL(blob);*/
            		/*downloadpopup.setAttribute('href', response.data.url);
            		downloadpopup.setAttribute("download", zipname + '.zip');
					downloadpopup.click()*/

					//window.open(response.data.url, "_blank");
					var iframe;
					iframe = document.getElementById("hiddenDownloader");
       				if (iframe == null) {
		            	iframe = document.getElementById("hiddenDownloader");
			            if (iframe == null) {
			                iframe = document.createElement('iframe');
			                iframe.id = "hiddenDownloader";
			                iframe.style.display = 'none';
			                iframe.addEventListener("load", function() {
			                	var fail = document.getElementById("hiddenDownloader").contentDocument.body.innerHTML.indexOf("Fail")
			                	if(fail!==-1){
			                		errCode = document.getElementById("hiddenDownloader").contentDocument.body.innerHTML.substring(fail+14,fail+19)
			                		alertBox.errorAlert(errCode)
			                	}
							});
			                document.body.appendChild(iframe);
			            }
			        }
					iframe.src = response.data.url;
				}
			}, function errorCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkerrorHttp(response)
	            if(errorphp){
	                alertBox.errorAlert('92001_'+errorphp)
	            }
	            else{
	                alertBox.errorAlert(response.data.code)
	            }
			});
		}
	}

	$timeout(function () {
		var table = document.getElementsByClassName('warnvideo-download-input-box')[0]
		var headerHeight = document.getElementsByClassName('warnvideo-download-content-header')[0].clientHeight
		table.style.minHeight = table.children[0].clientHeight+250+'px'
		table.style.height = 'calc( 100% - '+headerHeight+'px )'
	})

	angular.element($window).bind('resize', function () {
		var table = document.getElementsByClassName('warnvideo-download-input-box')[0]
		var headerHeight = document.getElementsByClassName('warnvideo-download-content-header')[0].clientHeight
		table.style.minHeight = table.children[0].clientHeight+250+'px'
		table.style.height = 'calc( 100% - '+headerHeight+'px )'
	})

	$scope.$on('$destroy', function(){
		angular.element($window).unbind('resize')
	})
}]);