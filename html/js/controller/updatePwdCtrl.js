/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:30
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:25:59
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name updatePwdCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,user,regexConfig
 * @description
 *   Controller for update password page.
 */
angular.module('carSafety').controller("updatePwdCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "user", "regexConfig", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, Idle, Keepalive, appConfig, httpSuccessCheck,alertBox,user, regexConfig){
	Idle.watch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

	window.document.title = $translate.instant('updatePwd');

	$scope.userInfo = user;

	$scope.pwdSetting = $scope.userInfo.pwdSetting
    $scope.passwordmin = $scope.pwdSetting.char
    $scope.passwordregex = regexConfig['passwordregex_'+$scope.pwdSetting.type];

	$scope.username = $scope.userInfo.user;
	$scope.type = $scope.userInfo.type;

	$scope.typeoldPwd="password";
	$scope.typePwd="password";
	$scope.typePwdConfirm="password";

	$scope.confirmpwregex = "";

    $scope.newconfirmregex = function(str){
        $scope.confirmpwregex = "";
        var symbol = new RegExp(regexConfig.symbolregex)
        var len = str.length;
        for (var i = 0; i < len; i++) {
            if(symbol.test(str[i])){
                $scope.confirmpwregex += "\\"+str[i];
            }
            else{
                $scope.confirmpwregex += str[i];
            }
        }
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

	$scope.updatePW = function(){
		var func = function(){
			$state.go('login', {}, { reload: true })
		}
		var postData = {
			password: $scope.oldpassword,
			newpassword: $scope.confirmPwd
		}
		$http({
			method: 'POST',
			url: '/api/updatepw',
			data: postData
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.errorAlert('90005_01')
			}
			else{
				alertBox.titleAlert('success','pweditSuccess',func)

			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if(errorphp){
				alertBox.errorAlert('90005_'+errorphp)
			}
			else{
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.toLogin = function(){
        $state.go('login', {}, { reload: true })
    };
}]);