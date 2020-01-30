/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:42
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name navbar
 * @restrict E
 * @description
 *   Navigation bar component
 *
 * @example
 * <navbar></navbar>
 */
angular.module('carSafety').directive('navbar', ['$document','$state','$http', 'Idle', 'Keepalive', 'appConfig', 'httpSuccessCheck', '$translate', 'alertBox', '$stateParams', '$location', '$timeout', 'regexConfig', function($document, $state,$http, Idle, Keepalive, appConfig, httpSuccessCheck, $translate, alertBox, $stateParams, $location, $timeout, regexConfig) {
    return {
        restrict: 'E',
        templateUrl: '../../view/component/navbar.html',
        replace: true,
        scope: true,
        link: function(scope, element, attrs) {
            scope.dataCoVer = {
                crtyear: new Date().getFullYear(),
                version: appConfig.version
            }
            scope.typeOldPwd="password";
            scope.typeNewPwd="password";
            scope.typeConPwd="password";
            scope.navbarSm=false;
            scope.navbarUser=false;
            scope.showChangePwd=false;
            scope.pwdSetting = scope.$parent.userInfo.pwdSetting
            scope.passwordmin = scope.pwdSetting.char
            scope.passwordregex = regexConfig['passwordregex_'+scope.pwdSetting.type];
            scope.current = $state.current.name;
            scope.userdepartment = scope.$parent.userInfo.department
            scope.menu = angular.copy(appConfig.navigateMenu);
            var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

            scope.confirmpwregex = "";

            scope.newconfirmregex = function(str){
                scope.confirmpwregex = "";
                var symbol = new RegExp(regexConfig.symbolregex)
                var len = str.length;
                for (var i = 0; i < len; i++) {
                    if(symbol.test(str[i])){
                        scope.confirmpwregex += "\\"+str[i];
                    }
                    else{
                        scope.confirmpwregex += str[i];
                    }
                }
            }

            scope.hasCurrent = function(list){
                var match = false
                for (var i = 0; i < list.length; i++) {
                    if(scope.current==list[i].path){
                        match = true
                        break;
                    }
                }
                return match
            }

            scope.navchildaccess = function(access){
                var set = false;
                for(var i=0;i<access.length;i++){
                    if(scope.$parent.permission.indexOf(access[i])!==-1){
                        set = true;
                        break;
                    }
                }
                return set;
            }

            scope.hideDropsm = function(){
                for (var i = 0; i<scope.menu.length; i++) {
                    if(scope.menu[i].show){
                        scope.menu[i].show=false;
                    }
                }
            }
            scope.hideAlldrop = function(){
                for (var i = 0; i<scope.menu.length; i++) {
                    if(scope.menu[i].show){
                        scope.menu[i].show=false;
                    }
                    var dropdown = document.getElementById("navbardroptag"+i);
                    if(dropdown){
                        dropdown.classList.remove("show");
                    }
                    var dropdownlist = document.getElementById("navbardroplist"+i);
                    if(dropdownlist){
                        dropdownlist.classList.remove("show");
                    }
                }
            }
            scope.shNavsmdrop = function(num){
                if(scope.menu[num].show==true){
                    scope.hideDropsm();
                }
                else{
                    scope.hideDropsm();
                    scope.menu[num].show=!scope.menu[num].show;
                }
            };
            scope.shNavsm = function(){
                scope.hideDropsm();
                scope.navbarUser = false;
                scope.showChangePwd=false;
                scope.navbarSm = !scope.navbarSm;
            };
            scope.shUser = function(){
                scope.hideAlldrop();
                scope.navbarSm=false;
                scope.showChangePwd=false;
                scope.navbarUser = !scope.navbarUser;
                delete scope.oldPW
                delete scope.newPW
                delete scope.conPW
                delete scope.oldPWC
                delete scope.newPWC
                delete scope.conPWC
            };
            scope.hideOthertab = function(num){
                var profilelist = document.querySelector(".profile-listdata>.multiselect-parent>ul");
                if(profilelist&&profilelist.style.display=='block'){
                    $timeout(function() {
                        angular.element(document.querySelector(".profile-listdata>.multiselect-parent>div")).triggerHandler('click');
                    })
                }
                scope.shNavsmdrop(num);
                scope.navbarUser = false;
                scope.navbarSm=false;
                scope.showChangePwd=false;
            };
            scope.shChangePwd = function(){
                scope.showChangePwd=!scope.showChangePwd;
                delete scope.oldPW
                delete scope.newPW
                delete scope.conPW
                delete scope.oldPWC
                delete scope.newPWC
                delete scope.conPWC
            };
            scope.shPreference = function(){
                scope.showChangePwd=false;
            };
            element.bind('click', function(event) {
                //event.stopPropagation();
                var profilelist = document.querySelector(".profile-listdata>.multiselect-parent>ul");
                if(profilelist&&profilelist.style.display=='block'){
                    $timeout(function() {
                        angular.element(document.querySelector(".profile-listdata>.multiselect-parent>div")).triggerHandler('click');
                    })
                }
                if(event.target.id=='NAVBAR'||event.target.id=='lang-select'){
                    scope.navbarUser = false;
                    scope.navbarSm=false;
                    scope.showChangePwd=false;
                    scope.$apply();
                    scope.hideAlldrop();
                }
                if(event.target.classList.contains('dropdown')==false&&event.target.classList.contains('dropdown-toggle')==false){
                    event.stopPropagation();
                }
            });
            $document.bind('click', function(event){
                if(event.target.classList.contains('dropdown')==false&&event.target.classList.contains('dropdown-toggle')==false&&event.target.classList.contains('updatepw-alert')==false){
                    scope.navbarUser = false;
                    scope.navbarSm=false;
                    scope.showChangePwd=false;
                    scope.$apply();
                    scope.hideAlldrop();
                }
                else if(event.target.classList.contains('dropdown-toggle')&&event.target.classList.contains('profile-list-select')&&event.target.classList.contains('updatepw-alert')==false){
                    scope.navbarUser = false;
                    scope.navbarSm=false;
                    scope.showChangePwd=false;
                    scope.$apply();
                    scope.hideAlldrop();
                }
            });
            scope.toLogout = function(){
                var func =  function(result){
                    Idle.unwatch();
                    window.location.href = "/"+$stateParams.company_code+"/login"
                    //$state.go('login', {}, { reload: true })
                }
                $http({
                    method: 'GET',
                    url: '/api/logout'
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('90003_01',func)
                    }
                    else{
                        Idle.unwatch();
                        window.location.href = "/"+$stateParams.company_code+"/login"
                        //$state.go('login', {}, { reload: true })
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('90003_'+errorphp,func)
                    }
                });
            };

            scope.toDash = function(){
                $state.go('dash', {}, { reload: true })
            };

            scope.toPage = function(path){
                window.scrollTo(0,0)
                $state.go(path, {}, { reload: true })
            }

            scope.toHelp = function(){
                var anchor = $state.current.name
                var url
                if(anchor=='liveLocation'){
                    url = $state.href('help.'+scope.$parent.lang, {'#': anchor});
                }
                else if(anchor.includes("Profile")){
                    anchor = 'profile'
                    url = $state.href('help.'+scope.$parent.lang, {'#': anchor});
                }
                else if(anchor.includes("trip")||anchor.includes("warn")){
                    anchor = 'warning'
                    url = $state.href('help.'+scope.$parent.lang, {'#': anchor});
                }
                else if(anchor.includes("Set")){
                    anchor = 'setting'
                    url = $state.href('help.'+scope.$parent.lang, {'#': anchor});
                }
                else{
                    url = $state.href('help.'+scope.$parent.lang);
                }
                window.open(url,'_blank');
            }

            scope.supportAlert = function(){
                alertBox.supportAlert(appConfig.support);
            }

            scope.updatePw = function (){
                var postdata = {
                    password: scope.oldPW,
                    newpassword: scope.newPW
                }
                $http({
                    method: 'POST',
                    url: '/api/updatepw',
                    data: postdata
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if(errorphp){
                        alertBox.updatepwAlert('90005_01')
                    }
                    else{
                        scope.shUser()
                        alertBox.titleAlert('success','pweditSuccess')
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if(errorphp){
                        alertBox.updatepwAlert('90005_'+errorphp)
                    }
                    else{
                        alertBox.updatepwAlert(response.data.code)
                    }
                });
            }

            scope.inputPW = function(str,pw){
                scope[str] = pw;
                scope[str+'C'] = true;
                if(str=='newPW'){
                    scope.newconfirmregex(pw)
                }
            }

            scope.checkPW = function(str){
                scope[str] = true;
            }
        }
    };

}]);
