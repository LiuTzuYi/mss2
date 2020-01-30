/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:30
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:26:31
 */

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name userSetCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,$filter,refetchMapService,exportConfig,regexConfig
 * @description
 *   Controller for user maintenance page.
 */
angular.module('carSafety').controller("userSetCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "tmhDynamicLocale", "user", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "$filter", "refetchMapService", "exportConfig", "regexConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, tmhDynamicLocale, user, Idle, Keepalive, appConfig, httpSuccessCheck, alertBox, $filter, refetchMapService, exportConfig, regexConfig) {
    Idle.watch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
    blockUi.addClass('block-ui-active block-ui-visible')
    /*$scope.setTitle = function(){
		$timeout(function(){
			window.document.title = $translate.instant('userSet');
		}, 50);
	}*/
    $scope.permission = user.func_code;

    $scope.userInfo = user;

    $scope.lang = $scope.userInfo.lang;
    /*$translate.use($scope.lang);
    $scope.setTitle();*/
    window.document.title = $translate.instant('userSet');

    $scope.updatelang = function () {
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
            if (errorphp) {
                alertBox.errorAlert('90006_01')
                $scope.lang = $scope.userInfo.lang;
            } else {
                if ($scope.userInfo.map == 'googleMap') {
                    refetchMapService.deleteGoogle()
                }
                $state.reload()
            }
        }, function errorCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if (errorphp) {
                alertBox.errorAlert('90006_' + errorphp)
            } else {
                alertBox.errorAlert(response.data.code)
            }
            $scope.lang = $scope.userInfo.lang;
        });
    }

    $scope.$on('IdleStart', function () {
        alertBox.idleAlert()
    })

    $scope.$on('IdleEnd', function () {
        swal.close(function () {
            clearInterval(timerInterval)
        })
    })

    $scope.$on('IdleTimeout', function () {
        if(angular.element(document.body).hasClass('md-dialog-is-showing')){
            $mdDialog.cancel()
        }
        swal.close(function () {
            clearInterval(timerInterval)
        })
        var func = function (result) {
            $state.go('login', {}, {
                reload: true
            })
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
    $scope.itemsByPage = 25;
    $scope.displayPage = 5;

    $scope.refreshList = function () {
        $http({
            method: 'GET',
            url: '/api/userSet'
        }).then(function successCallback(response) {
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.errorAlert('90901_01')
            } else {
                for (var i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].lastLogin) {
                        var part = response.data.data[i].lastLogin.split(" ")
                        var subpart1 = part[0].split("-")
                        response.data.data[i].lastLogin = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " " + part[1])
                    }
                }
                $scope.rowCollection = response.data.data
                $scope.realCollection = $scope.rowCollection.map(function (obj) {
                    var lang = $translate.instant(obj.lang)
                    var map = $translate.instant(obj.map)
                    var status = $translate.instant(obj.status)
                    var lastLogin = null
                    if (obj.lastLogin) {
                        lastLogin = $filter('date')(obj.lastLogin, 'yyyy-MM-dd HH:mm:ss')
                    }
                    return {
                        fullName: obj.fullName,
                        groupname: obj.groupname.groupname,
                        lang: lang,
                        lastLogin: lastLogin,
                        map: map,
                        retryLogin: obj.retryLogin,
                        status: status,
                        userId: obj.userId,
                        username: obj.username,
                        email: obj.email,
                        department: obj.department.department,
                        updateBy: obj.updated_by
                    }
                })
                var y = window.pageYOffset
                window.scrollBy(0, -y)
                $scope.departments = response.data.departments
                blockUi.removeClass('block-ui-active block-ui-visible')
            }
        }, function errorCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if (errorphp) {
                alertBox.errorAlert('90901_' + errorphp)
            } else {
                alertBox.errorAlert(response.data.code)
            }
        });
    }

    $scope.refreshList()

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        swal({
                title: $translate.instant('delete_item'),
                type: 'question',
                target: document.getElementsByTagName('BODY')[0],
                showCancelButton: true,
                confirmButtonText: $translate.instant('ok'),
                cancelButtonText: $translate.instant('cancel'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            })
            .then(function (result) {
                if (result.value) {
                    var postData = {
                        user_id: row.userId
                    }
                    $http({
                        method: 'DELETE',
                        url: '/api/userSet',
                        data: postData,
                        headers: {
                            'Content-type': 'application/json;charset=utf-8'
                        }
                    }).then(function successCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90905_01')
                        } else {
                            alertBox.titleAlert('success', 'deleteSuccess')
                            $scope.refreshList()
                        }
                    }, function errorCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkerrorHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90905_' + errorphp)
                        } else {
                            alertBox.errorAlert(response.data.code)
                        }
                    });
                }
            })
    }

    $scope.excelOrder = exportConfig.userSetExcelOrder

    $scope.getcsvHeader = function () {
        var headerArr = []
        headerArr.push($translate.instant('userID'))
        headerArr.push($translate.instant('username'))
        headerArr.push($translate.instant('fullName'))
        headerArr.push($translate.instant('email'))
        headerArr.push($translate.instant('userRole'))
        headerArr.push($translate.instant('department'))
        headerArr.push($translate.instant('language'))
        headerArr.push($translate.instant('mapset'))
        headerArr.push($translate.instant('lastLogin'))
        headerArr.push($translate.instant('retryLogin'))
        headerArr.push($translate.instant('status'))
        headerArr.push($translate.instant('lastUpdateBy'))
        return headerArr
    }

    $scope.getcsvData = function (data) {
        var csvdata = angular.copy(data)
        return csvdata
    }

    var scrollvflag = false;

    var docscroll = function () {
        var table = document.getElementsByTagName('table')[0]
        var firstRow = table.children[1].children[0]
        if (firstRow && firstRow.children.length > 1) {
            var trh = table.children[0].children[0]
            var th = table.children[0]
            var cellwidth = []
            var offsetParent = table.children[1].scrollHeight + table.children[2].scrollHeight
            var scroll = angular.element(document.querySelector('.ng-table-content'))[0]
            if (offsetParent == table.scrollHeight || offsetParent == table.scrollHeight - 1) {
                var offset_val = table.offsetTop - table.children[0].offsetHeight
            } else {
                var offset_val = table.offsetTop
            }
            if (window.pageYOffset > offset_val) {
                for (var i = 0; i < trh.children.length; i++) {
                    var cellbody = firstRow.children[i]
                    var cell = trh.children[i]
                    var setWidth = cell.clientWidth > cellbody.clientWidth ? cell.clientWidth : cellbody.clientWidth
                    cellwidth.push(setWidth)
                }
                if (scrollvflag == false) {
                    for (var i = 0; i < cellwidth.length; i++) {
                        if (i == cellwidth.length - 1) {
                            firstRow.children[i].style.width = 120 + 'px'
                            trh.children[i].style.width = 120 + 'px'
                            firstRow.children[i].style.minWidth = 120 + 'px'
                            trh.children[i].style.minWidth = 120 + 'px'
                        } else {
                            firstRow.children[i].style.width = cellwidth[i] + 'px'
                            trh.children[i].style.width = cellwidth[i] + 'px'
                            firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                            trh.children[i].style.minWidth = cellwidth[i] + 'px'
                        }
                    }
                    table.children[0].classList.add('table-stickyheader')
                    scrollvflag = true
                }
                //table.offsetTop = table.children[0].clientHeight
            } else {
                scrollvflag = false;
                var colength = firstRow.children.length<=trh.children.length?firstRow.children.length:trh.children.length
                for (var i = 0; i < colength; i++) {
                    firstRow.children[i].removeAttribute("style")
                    trh.children[i].removeAttribute("style")
                }
                table.children[0].classList.remove('table-stickyheader')
            }
            if (scroll.scrollLeft == 0 && window.pageXOffset == 0) {
                th.style.removeProperty("left")
                th.style.removeProperty("margin-left")
            } else if (window.pageXOffset !== 0 && scroll.scrollLeft !== 0) {
                var leftscroll = scroll.scrollLeft + window.pageXOffset
                th.style.left = -leftscroll + 'px'
                th.style.marginLeft = 5 + 'px'
            } else {
                if (window.pageXOffset == 0) {
                    th.style.left = -(scroll.scrollLeft) + 'px'
                    th.style.marginLeft = 5 + 'px'
                } else {
                    th.style.left = -(window.pageXOffset) + 'px'
                    th.style.marginLeft = 5 + 'px'
                }
            }
        }
    }

    $document.bind('scroll', docscroll)

    var tablescroll = function () {
        var scroll = angular.element(document.querySelector('.ng-table-content'))[0]
        var table = document.getElementsByTagName('table')[0]
        var th = table.children[0]
        if (scroll.scrollLeft == 0 && window.pageXOffset == 0) {
            th.style.removeProperty("left")
            th.style.removeProperty("margin-left")
        } else {
            if (window.pageXOffset !== 0) {
                var leftscroll = scroll.scrollLeft + window.pageXOffset
                th.style.left = -leftscroll + 'px'
                th.style.marginLeft = 5 + 'px'
            } else {
                th.style.left = -(scroll.scrollLeft) + 'px'
                th.style.marginLeft = 5 + 'px'
            }
        }
    }

    angular.element(document.querySelector('.ng-table-content')).bind('scroll', tablescroll)

    angular.element($window).bind('resize', function () {
        var table = document.getElementsByTagName('table')[0]
        var tbody = table.children[1]
        var firstRow = table.children[1].children[0]
        if (firstRow && firstRow.children.length > 1) {
            var trh = table.children[0].children[0]
            var cellwidth = []
            var offsetParent = table.children[1].scrollHeight + table.children[2].scrollHeight
            if (offsetParent == table.scrollHeight || offsetParent == table.scrollHeight - 1) {
                var offset_val = table.offsetTop - table.children[0].offsetHeight
            } else {
                var offset_val = table.offsetTop
            }
            if (window.pageYOffset > offset_val) {
                for (var i = 0; i < trh.children.length; i++) {
                    trh.children[i].removeAttribute("style")
                }
                for (var j = 0; j < tbody.children.length; j++) {
                    for (var k = 0; k < firstRow.children.length; k++) {
                        tbody.children[j].children[k].removeAttribute("style")
                    }
                }
                table.children[0].classList.remove('table-stickyheader')
                for (var i = 0; i < trh.children.length; i++) {
                    var cellbody = firstRow.children[i]
                    var cell = trh.children[i]
                    var setWidth = cell.clientWidth > cellbody.clientWidth ? cell.clientWidth : cellbody.clientWidth
                    cellwidth.push(setWidth)
                }
                for (var i = 0; i < cellwidth.length; i++) {
                    if (i == cellwidth.length - 1) {
                        firstRow.children[i].style.width = 120 + 'px'
                        trh.children[i].style.width = 120 + 'px'
                        firstRow.children[i].style.minWidth = 120 + 'px'
                        trh.children[i].style.minWidth = 120 + 'px'
                    } else {
                        firstRow.children[i].style.width = cellwidth[i] + 'px'
                        trh.children[i].style.width = cellwidth[i] + 'px'
                        firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                        trh.children[i].style.minWidth = cellwidth[i] + 'px'
                    }
                }
                table.children[0].classList.add('table-stickyheader')
            }
        }
    })


    $scope.$watch('displayedCollection', function (newValue, oldValue) {
        var scrollY = window.pageYOffset
        $timeout(function () {
            var table = document.getElementsByTagName('table')[0]
            if(table){
                var firstRow = table.children[1].children[0]
                if (firstRow && firstRow.children.length > 1) {
                    var trh = table.children[0].children[0]
                    var cellwidth = []
                    var offsetParent = table.children[1].scrollHeight + table.children[2].scrollHeight
                    if (offsetParent == table.scrollHeight || offsetParent == table.scrollHeight - 1) {
                        var offset_val = table.offsetTop - table.children[0].offsetHeight
                    } else {
                        var offset_val = table.offsetTop
                    }
                    if (window.pageYOffset == 0 || scrollY > offset_val) {
                        var colength = firstRow.children.length<=trh.children.length?firstRow.children.length:trh.children.length
                        for (var j = 0; j < colength; j++) {
                            firstRow.children[j].removeAttribute("style")
                            trh.children[j].removeAttribute("style")
                        }
                        /*for (var j = 0; j < trh.children.length; j++) {
                            firstRow.children[j].removeAttribute("style")
                            trh.children[j].removeAttribute("style")
                        }*/
                        table.children[0].classList.remove('table-stickyheader')
                        $scope.$apply()
                    }
                    var maxScrollY = document.body.scrollHeight - document.body.clientHeight;
                    if (scrollY !== window.pageYOffset && window.pageYOffset < maxScrollY && scrollY < maxScrollY) {
                        window.scrollTo(window.pageXOffset, scrollY);
                    }
                    $timeout(function () {
                        if (window.pageYOffset > offset_val) {
                            var cellwidth = []
                            for (var i = 0; i < trh.children.length; i++) {
                                var cellbody = firstRow.children[i]
                                var cell = trh.children[i]
                                var setWidth = cell.clientWidth > cellbody.clientWidth ? cell.clientWidth : cellbody.clientWidth
                                cellwidth.push(setWidth)
                            }
                            for (var i = 0; i < cellwidth.length; i++) {
                                firstRow.children[i].style.width = cellwidth[i] + 'px'
                                trh.children[i].style.width = cellwidth[i] + 'px'
                                firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                                trh.children[i].style.minWidth = cellwidth[i] + 'px'
                            }
                            table.children[0].classList.add('table-stickyheader')
                        }
                    })
                }
            }
        }, true)
    }, true);


    $scope.addeditItem = function (ev, action, row) {
        if (row) {
            row = $scope.rowCollection.find(function (element) {
                return row.userId == element.userId;
            });
        }
        var dialoggroups
        $http({
            method: 'GET',
            url: '/api/userAddL'
        }).then(function successCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                alertBox.errorAlert('90904_01')
            } else {
                dialoggroups = response.data.data
                $document.unbind('scroll')
                angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/view/component/dialog/userSetDialog.html',
                        parent: angular.element(document.querySelector('.setting-wrap')),
                        targetEvent: ev,
                        locals: {
                            action: action,
                            row: angular.copy(row),
                            groups: angular.copy(dialoggroups),
                            user: $scope.userInfo,
                            departments: $scope.departments,
                            scroll: window.pageYOffset,
                            scrollx: window.pageXOffset
                        },
                        clickOutsideToClose: false,
                        escapeToClose: false,
                        focusOnOpen: false,
                        //hasBackdrop:false,
                        disableParentScroll: true,
                        fullscreen: true // Only for -xs, -sm breakpoints.
                    })
                    .then(function (answer) {
                        $document.bind('scroll', docscroll)
                        angular.element(document.querySelector('.ng-table-content')).bind('scroll', tablescroll)
                        alertBox.titleAlert('success', answer)
                        $scope.refreshList()
                    }, function () {
                        var table = document.getElementsByTagName('table')[0]
                        var firstRow = table.children[1].children[0]
                        if (firstRow && firstRow.children.length > 1) {
                            var trh = table.children[0].children[0]
                            var colength = firstRow.children.length<=trh.children.length?firstRow.children.length:trh.children.length
                            for (var i = 0; i < colength; i++) {
                                firstRow.children[i].removeAttribute("style")
                                trh.children[i].removeAttribute("style")
                            }
                            table.children[0].classList.remove('table-stickyheader')
                            var cellwidth = []
                            var offsetParent = table.children[1].scrollHeight + table.children[2].scrollHeight
                            if (offsetParent == table.scrollHeight || offsetParent == table.scrollHeight - 1) {
                                var offset_val = table.offsetTop - table.children[0].offsetHeight
                            } else {
                                var offset_val = table.offsetTop
                            }
                            if (window.pageYOffset > offset_val) {
                                for (var i = 0; i < trh.children.length; i++) {
                                    var cellbody = firstRow.children[i]
                                    var cell = trh.children[i]
                                    var setWidth = cell.clientWidth > cellbody.clientWidth ? cell.clientWidth : cellbody.clientWidth
                                    cellwidth.push(setWidth)
                                }
                                for (var i = 0; i < cellwidth.length; i++) {
                                    if (i == cellwidth.length - 1) {
                                        firstRow.children[i].style.width = 120 + 'px'
                                        trh.children[i].style.width = 120 + 'px'
                                        firstRow.children[i].style.minWidth = 120 + 'px'
                                        trh.children[i].style.minWidth = 120 + 'px'
                                    } else {
                                        firstRow.children[i].style.width = cellwidth[i] + 'px'
                                        trh.children[i].style.width = cellwidth[i] + 'px'
                                        firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                                        trh.children[i].style.minWidth = cellwidth[i] + 'px'
                                    }
                                }
                                table.children[0].classList.add('table-stickyheader')
                                window.scrollBy(0, 42);
                            }
                        }
                        $document.bind('scroll', docscroll)
                        angular.element(document.querySelector('.ng-table-content')).bind('scroll', tablescroll)
                    });
            }
        }, function errorCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if (errorphp) {
                alertBox.errorAlert('90904_' + errorphp)
            } else {
                alertBox.errorAlert(response.data.code)
            }
        });

    };

    $scope.$on('$destroy', function () {
        if(angular.element(document.body).hasClass('md-dialog-is-showing')){
            $mdDialog.cancel()
        }
        $document.unbind('scroll')
        angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
        angular.element($window).unbind('resize')
    })

    function DialogController($scope, $mdDialog, $window, action, row, groups, formValidService, appConfig, user, departments, scroll, scrollx, regexConfig) {

        var html = document.getElementsByTagName('HTML')[0]
        var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
        $timeout(function () {
            html.style.removeProperty('overflow-y')
        })


        $scope.action = action;

        $timeout(function () {
            var body = document.getElementsByTagName('body')[0]
            body.style.position = 'fixed'
            //body.style.top=0+'px'
            body.style.width = 100 + '%'
            var table = document.getElementsByTagName('table')[0]
            var firstRow = table.children[1].children[0]
            if (firstRow && firstRow.children.length > 1) {
                var trh = table.children[0].children[0]
                var th = table.children[0]
                var scroll2 = angular.element(document.querySelector('.ng-table-content'))[0]
                var cellwidth = []
                var offsetParent = table.children[1].scrollHeight + table.children[2].scrollHeight
                if (offsetParent == table.scrollHeight || offsetParent == table.scrollHeight - 1) {
                    var offset_val = table.offsetTop - table.children[0].offsetHeight
                } else {
                    var offset_val = table.offsetTop
                }
                if (scroll > offset_val) {
                    for (var i = 0; i < trh.children.length; i++) {
                        var cellbody = firstRow.children[i]
                        var cell = trh.children[i]
                        var setWidth = cell.clientWidth > cellbody.clientWidth ? cell.clientWidth : cellbody.clientWidth
                        cellwidth.push(setWidth)
                    }
                    for (var i = 0; i < cellwidth.length; i++) {
                        if (i == cellwidth.length - 1) {
                            firstRow.children[i].style.width = 120 + 'px'
                            trh.children[i].style.width = 120 + 'px'
                            firstRow.children[i].style.minWidth = 120 + 'px'
                            trh.children[i].style.minWidth = 120 + 'px'
                        } else {
                            firstRow.children[i].style.width = cellwidth[i] + 'px'
                            trh.children[i].style.width = cellwidth[i] + 'px'
                            firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                            trh.children[i].style.minWidth = cellwidth[i] + 'px'
                        }
                    }
                }
                if (scroll2.scrollLeft == 0 && scrollx == 0) {
                    th.style.removeProperty("left")
                    th.style.removeProperty("margin-left")
                } else if (scrollx !== 0 && scroll2.scrollLeft !== 0) {
                    var leftscroll = scroll2.scrollLeft + scrollx
                    th.style.left = -leftscroll + 'px'
                    th.style.marginLeft = 5 + 'px'
                } else {
                    if (scrollx == 0) {
                        th.style.left = -(scroll2.scrollLeft) + 'px'
                        th.style.marginLeft = 5 + 'px'
                    } else {
                        th.style.left = -(scrollx) + 'px'
                        th.style.marginLeft = 5 + 'px'
                    }
                }
            }
        })

        var defaultdepart = {
            id: user.ou_id,
            department: user.department
        }

        $scope.departments = departments

        if (row) {
            $scope.row = row
            if (!$scope.row.groupname.groupname) {
                $scope.row.groupname = undefined
            }
            if (!$scope.row.department.department) {
                $scope.row.department = defaultdepart
            }
            if (!$scope.row.lang) {
                $scope.row.lang = "en"
            }
            if (!$scope.row.map) {
                $scope.row.map = "googleMap"
            }
            if (!$scope.row.status) {
                $scope.row.status = "A"
            }
        } else {
            $scope.row = {
                username: "",
                fullName: "",
                pwd: "",
                confirmPwd: "",
                groupname: undefined,
                department: defaultdepart,
                lang: "en",
                map: "googleMap",
                status: "A",
                email: ""
            }
            $scope.typeConPwd = "password"
            $scope.typePwd = "password"
        }

        $scope.groups = groups

        $scope.editWrongMatch = false

        $scope.usernameregex = regexConfig.usernameregex
        $scope.pwdSetting = user.pwdSetting
        $scope.passwordmin = $scope.pwdSetting.char
        $scope.passwordregex = regexConfig['passwordregex_' + $scope.pwdSetting.type];
        $scope.emailregex = regexConfig.emailregex

        $scope.confirmpwregex = "";

        $scope.newconfirmregex = function (str) {
            $scope.confirmpwregex = "";
            var symbol = new RegExp(regexConfig.symbolregex)
            var len = str.length;
            for (var i = 0; i < len; i++) {
                if (symbol.test(str[i])) {
                    $scope.confirmpwregex += "\\" + str[i];
                } else {
                    $scope.confirmpwregex += str[i];
                }
            }
        }

        if ($scope.action == 'edit') {
            var dataArr = ['userId', 'username', 'fullName', 'groupTAH', 'lang', 'map', 'status', 'email', 'departmentTAH']
            $timeout(function () {
                for (var i = 0; i < dataArr.length; i++) {
                    var validate = document.getElementsByName(dataArr[i])[0]
                    if (dataArr[i].indexOf('TAH') !== -1) {
                        formValidService.setValidTAH(validate)
                    } else if (dataArr[i].indexOf('IPG') !== -1) {
                        formValidService.setValidIPG(validate)
                    } else {
                        /*if(dataArr[i]=='email'){
                            $scope.validateEmail($scope.row.email)
                            if($scope.checkEmail){
                                formValidService.setValid(validate)
                            }
                            else{
                                formValidService.setInvalid(validate)
                            }
                        }
                        else{*/
                        formValidService.setValid(validate)
                        /*}*/
                    }
                }
            })
        } else {
            var dataArr = ['username', 'fullName', 'pwdIPGMatch', 'pwdIPGConfirm', 'groupTAH', 'lang', 'map', 'status', 'email', 'departmentTAH']
            $timeout(function () {
                var validate = document.getElementsByName('departmentTAH')[0]
                formValidService.setValidTAH(validate)
            })
        }

        $scope.$watch(function () {
                if (document.getElementsByClassName('set-dialog-wrap')[0]) {
                    return document.getElementsByClassName('set-dialog-wrap')[0].scrollTop;
                } else {
                    return false;
                }
            },
            function (newValue, oldValue) {
                if (newValue !== 0 && newValue !== false) {
                    document.getElementsByClassName('set-dialog-wrap')[0].scrollTop = 0;
                }
            })

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.submit = function (answer) {
            var group_id = null
            var ou_id = null
            if (answer.groupname !== undefined) {
                group_id = answer.groupname.group_id
            }
            if (answer.department !== undefined) {
                ou_id = answer.department.id
            }
            if ($scope.action == 'add') {
                var postData = {
                    username: answer.username,
                    fullname: answer.fullName,
                    password: answer.pwd,
                    group_id: group_id,
                    ou_id: ou_id,
                    status: answer.status,
                    lang: answer.lang,
                    map: answer.map,
                    email: answer.email
                }
                $http({
                    method: 'POST',
                    url: '/api/userSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90902_01')
                    } else {
                        $mdDialog.hide('addSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90902_' + errorphp)
                    } else {
                        alertBox.errorAlert(response.data.code)
                    }
                });
            } else {
                var postData = {
                    user_id: answer.userId,
                    fullname: answer.fullName,
                    password: answer.pwd,
                    group_id: group_id,
                    ou_id: ou_id,
                    status: answer.status,
                    lang: answer.lang,
                    map: answer.map,
                    email: answer.email,
                    version: answer.version
                }
                $http({
                    method: 'PATCH',
                    url: '/api/userSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90903_01')
                    } else {
                        $mdDialog.hide('editSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90903_' + errorphp)
                    } else {
                        alertBox.errorAlert(response.data.code)
                    }
                });
            }
        };

        $scope.typeaheadscroll = function () {
            $timeout(function () {
                if (document.querySelector('.md-virtual-repeat-sizer').clientHeight < 80) {
                    document.querySelector('.md-virtual-repeat-offsetter').style.transform = "translateY(0)"
                }
            })
        }

        $scope.validate = function (formstr) {
            $timeout(function () {
                var validate = document.getElementsByName(formstr)[0]
                var invalidFunc
                var validFunc
                var validMatch
                var tahValidModel
                if (formstr.indexOf('Match') !== -1) {
                    validMatch = formstr.split("Match")[0] + 'Confirm'
                }
                if (formstr.indexOf('TAH') !== -1) {
                    validate = document.getElementsByName(formstr)[1]
                    tahValidModel = formstr.split("TAH")[0]
                    invalidFunc = 'setInvalidTAH'
                    validFunc = 'setValidTAH'
                } else if (formstr.indexOf('IPG') !== -1) {
                    invalidFunc = 'setInvalidIPG'
                    validFunc = 'setValidIPG'
                } else {
                    invalidFunc = 'setInvalid'
                    validFunc = 'setValid'
                }
                if (validate) {
                    if (formstr.indexOf('TAH') !== -1) {
                        if ($scope.addEdit[formstr].$invalid) {
                            formValidService[invalidFunc](validate)
                        } else {
                            if ($scope.row[tahValidModel]) {
                                if ($scope['noResults' + formstr]) {
                                    formValidService[invalidFunc](validate)
                                } else {
                                    formValidService[validFunc](validate)
                                }
                            } else {
                                formValidService[validFunc](validate)
                            }
                        }
                    } else if ($scope.addEdit[formstr].$invalid) {
                        formValidService[invalidFunc](validate)
                    } else {
                        /*if(formstr=='email'){
                            $scope.validateEmail($scope.row.email)
                            if($scope.checkEmail){
                                formValidService[validFunc](validate)
                            }
                            else{
                                formValidService[invalidFunc](validate)
                            }
                        }
                        else{*/
                        formValidService[validFunc](validate)
                        /*}*/
                    }
                }
                if (validMatch) {
                    $scope.validate(validMatch)
                }
            })
        }

        $scope.validateSelect = function (formstr) {
            var validate = document.getElementsByName(formstr)[0]
            formValidService.setValidTAH(validate)
        }

        $scope.validateForm = function () {
            $scope.attempt = true;
            for (var i = 0; i < dataArr.length; i++) {
                var validate = document.getElementsByName(dataArr[i])[0]
                if (!$scope.addEdit[dataArr[i]].$touched) {
                    if (dataArr[i].indexOf('TAH') !== -1) {
                        formValidService.setValidTAH(validate)
                    } else if (dataArr[i].indexOf('IPG') !== -1) {
                        if ($scope.addEdit[dataArr[i]].$invalid) {
                            formValidService.setInvalidIPG(validate)
                        } else {
                            formValidService.setValidIPG(validate)
                        }
                    } else {
                        /*if(dataArr[i]=='email'){
                            $scope.validateEmail($scope.row.email)
                            if($scope.checkEmail){
                                formValidService.setValid(validate)
                            }
                            else{
                                formValidService.setInvalid(validate)
                            }
                        }
                        else{*/
                        formValidService.setValid(validate)
                        /*}*/
                    }
                }
            }
        }
    }

    DialogController.$inject = ["$scope", "$mdDialog", "$window", "action", "row", "groups", "formValidService", "appConfig", "user", "departments", "scroll", "scrollx", "regexConfig"];
}]);