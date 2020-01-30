/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:29
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:23:05
 */

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name driverSetCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user,$filter,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,exportConfig,regexConfig,$compile
 * @description
 *   Controller for driver maintenance page.
 */
angular.module('carSafety').controller("driverSetCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "tmhDynamicLocale", "user", "$filter", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "refetchMapService", "exportConfig", "regexConfig", "$compile", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, tmhDynamicLocale, user, $filter, Idle, Keepalive, appConfig, httpSuccessCheck, alertBox, refetchMapService, exportConfig, regexConfig, $compile) {
    Idle.watch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
    blockUi.addClass('block-ui-active block-ui-visible')
    /*$scope.setTitle = function(){
		$timeout(function(){
			window.document.title = $translate.instant('driverSet');
		}, 50);
	}*/
    $scope.permission = user.func_code;

    $scope.userInfo = user;

    $scope.lang = $scope.userInfo.lang;
    /*$translate.use($scope.lang);
    $scope.setTitle();*/
    window.document.title = $translate.instant('driverSet');
    tmhDynamicLocale.set($scope.lang);

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
            url: '/api/driverSet'
        }).then(function successCallback(response) {
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.errorAlert('90501_01')
            } else {
                for (var i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].dobirth) {
                        var subpart1 = response.data.data[i].dobirth.split("-")
                        response.data.data[i].dobirth = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " 00:00:00")
                    }
                }
                $scope.rowCollection = response.data.data
                $scope.realCollection = $scope.rowCollection.map(function (obj) {
                    var defaultdrv = $translate.instant(obj.defaultdrv)
                    var dobirth = null
                    if (obj.dobirth) {
                        dobirth = $filter('date')(obj.dobirth, 'yyyy-MM-dd')
                    }
                    return {
                        defaultdrv: defaultdrv,
                        dobirth: dobirth,
                        driverCode: obj.driverCode,
                        driverId: obj.driverId,
                        name: obj.name,
                        phoneHome: obj.phoneHome,
                        phoneMobile: obj.phoneMobile,
                        phoneOffice: obj.phoneOffice,
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
                alertBox.errorAlert('90501_' + errorphp)
            } else {
                alertBox.errorAlert(response.data.code)
            }
        });
    }

    /*$rootScope.$on('$translateChangeSuccess', function() {
      tmhDynamicLocale.set($scope.lang);
    });*/

    $scope.refreshList()

    $scope.uploadFile = function (ev) {
        var element = ev.target;
        if (element.files && element.files[0]) {
            var file = element.files[0];
            var checkcsv = new RegExp(/^.+\.csv$/)
            if (checkcsv.test(file.name) == false) {
                alertBox.titleAlert('warning', 'notCSV')
            } else {
                var postData = {
                    file: file
                }
                $http({
                    method: 'POST',
                    url: '/api/driverImport',
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: function (data) {
                        var formData = new FormData();
                        formData.append("file", file);
                        return formData;
                    },
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    element.value = ""
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90506_01')
                    } else {
                        var message = $translate.instant('setImportSuccess', {
                            count: response.data.data
                        })
                        alertBox.setImportSuccessAlert('success', message)
                        $scope.refreshList();
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    element.value = ""
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90506_' + errorphp)
                    } else {
                        if (response.data.code == '10510' || response.data.code == '10520' || response.data.code == '10521' || response.data.code == '10522' || response.data.code == '10523') {
                            var title = response.data.code + '_title'
                            var htmltext = "<div class='alert-server-error'><h6>" + $translate.instant(response.data.code + '_text') + ": </h6><h6>[" + response.data.data.join(", ") + "]</h6>"
                            if (response.data.code == '10510') {
                                htmltext += "<br><p style='white-space: pre-wrap; color: red; font-size: 12px; margin-bottom: .5rem;'>" + $translate.instant('drivercodeRegex') + "\n•  " + $translate.instant('dobirth') + ": 'YYYY-mm-dd'</p></div>"
                            } else if (response.data.code == '10521') {
                                var htmlData = ''
                                for (var i = 0; i < response.data.drv_code.length; i++) {
                                    htmlData += response.data.drv_code[i] + "<br>"
                                }
                                htmltext += "<br><h6 onclick='if(document.getElementsByClassName(\"alert-server-error-detail-content\")[0].style.display==\"none\"){document.getElementsByClassName(\"alert-server-error-detail\")[0].innerHTML=\"&#9660;\";document.getElementsByClassName(\"alert-server-error-detail-content\")[0].style.display=\"block\";}else{document.getElementsByClassName(\"alert-server-error-detail\")[0].innerHTML=\"&#9654;\";document.getElementsByClassName(\"alert-server-error-detail-content\")[0].style.display=\"none\";}' style='cursor: pointer;'><span class='alert-server-error-detail' style='margin-left: -2.5px;'>&#9654;</span> " + $translate.instant(response.data.code + '_detail') + "</h6><h6 style='max-height: 100px; overflow: auto; display: none;' class='alert-server-error-detail-content'>" + htmlData + "</h6></div>"
                            } else {
                                htmltext += "</div>"
                            }
                            alertBox.setImportAlert(title, htmltext, 'warning', response.data.code)
                        } else {
                            alertBox.errorAlert(response.data.code)
                        }
                    }
                });
            }
        }
    };

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
                        driver_id: row.driverId,
                        driver_code: row.driverCode
                    }
                    $http({
                        method: 'DELETE',
                        url: '/api/driverSet',
                        data: postData,
                        headers: {
                            'Content-type': 'application/json;charset=utf-8'
                        }
                    }).then(function successCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90505_01')
                        } else {
                            alertBox.titleAlert('success', 'deleteSuccess')
                            $scope.refreshList()
                        }
                    }, function errorCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkerrorHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90505_' + errorphp)
                        } else {
                            alertBox.errorAlert(response.data.code)
                        }
                    });
                }
            })
    }

    $scope.excelOrder = exportConfig.driverSetExcelOrder

    $scope.getcsvHeader = function () {
        var headerArr = []
        headerArr.push($translate.instant('driverID'))
        headerArr.push($translate.instant('name'))
        headerArr.push($translate.instant('driverCode'))
        headerArr.push($translate.instant('department'))
        headerArr.push($translate.instant('phoneHome'))
        headerArr.push($translate.instant('phoneMobile'))
        headerArr.push($translate.instant('phoneOffice'))
        headerArr.push($translate.instant('defaultdrv'))
        headerArr.push($translate.instant('dobirth'))
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
                return row.driverId == element.driverId;
            });
        }
        if (action == 'edit') {
            var dialogavatar
            $http({
                method: 'GET',
                url: '/api/drvAvatar/' + row.driverId
            }).then(function successCallback(response) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                var errorphp = httpSuccessCheck.checkHttp(response)
                if (errorphp) {
                    alertBox.errorAlert('90504_01')
                } else {
                    if (response.data.data) {
                        dialogavatar = response.data.data
                    } else {
                        dialogavatar = appConfig.defaultAvatar
                    }
                    $document.unbind('scroll')
                    angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
                    $mdDialog.show({
                            controller: DialogController,
                            templateUrl: '/view/component/dialog/driverSetDialog.html',
                            parent: angular.element(document.querySelector('.setting-wrap')),
                            targetEvent: ev,
                            locals: {
                                action: action,
                                row: angular.copy(row),
                                avatar: angular.copy(dialogavatar),
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
                    alertBox.errorAlert('90504_' + errorphp)
                } else {
                    alertBox.errorAlert(response.data.code)
                }
            });
        } else {
            $document.unbind('scroll')
            angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/view/component/dialog/driverSetDialog.html',
                    parent: angular.element(document.querySelector('.setting-wrap')),
                    targetEvent: ev,
                    locals: {
                        action: action,
                        row: angular.copy(row),
                        avatar: null,
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
    };

    $scope.$on('$destroy', function () {
        if(angular.element(document.body).hasClass('md-dialog-is-showing')){
            $mdDialog.cancel()
        }
        $document.unbind('scroll')
        angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
        angular.element($window).unbind('resize')
    })


    function DialogController($scope, $mdDialog, $window, action, row, avatar, formValidService, $filter, appConfig, user, departments, scroll, scrollx, regexConfig) {

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

        var defaultdepart = {
            id: user.ou_id,
            department: user.department
        }

        $scope.departments = departments

        if (row) {
            $scope.row = row
            $scope.row.avatar = avatar
            if (!$scope.row.department.department) {
                $scope.row.department = defaultdepart
            }
        } else {
            $scope.row = {
                name: "",
                driverCode: "",
                phoneHome: null,
                phoneMobile: null,
                phoneOffice: null,
                defaultdrv: "N",
                dobirth: null,
                avatar: appConfig.defaultAvatar,
                department: defaultdepart
            }
        }

        $scope.drivercoderegex = regexConfig.drivercoderegex

        var maxdatetmp = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss', user.timezone);
        $scope.maxDate = new Date(maxdatetmp)
        $scope.minDate = new Date('1900-01-01 00:00:00')

        $scope.dateOptions = {
            maxDate: $scope.maxDate,
            minDate: $scope.minDate,
            startingDay: 1,
            showWeeks: false
        };

        $scope.datepicker = {
            opened: false
        };

        $scope.dateOutrange = false

        if ($scope.action == 'edit') {
            var dataArr = ['driverId', 'name', 'driverCode', 'phoneHome', 'phoneMobile', 'phoneOffice', 'defaultdrv', 'dobirthIPG', 'departmentTAH']
            $timeout(function () {
                for (var i = 0; i < dataArr.length; i++) {
                    var validate = document.getElementsByName(dataArr[i])[0]
                    if (dataArr[i].indexOf('TAH') !== -1) {
                        formValidService.setValidTAH(validate)
                    } else if (dataArr[i].indexOf('IPG') !== -1) {
                        formValidService.setValidIPG(validate)
                    } else {
                        formValidService.setValid(validate)
                    }
                }
            })
        } else {
            var dataArr = ['name', 'driverCode', 'phoneHome', 'phoneMobile', 'phoneOffice', 'dobirthIPG', 'departmentTAH']
            $timeout(function () {
                var validate = document.getElementsByName('departmentTAH')[0]
                formValidService.setValidTAH(validate)
            })
        }

        $scope.openPicker = function () {
            $scope.datepicker.opened = true;
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.submit = function (answer) {
            var dob = null
            var avatar = null
            if (answer.dob !== null) {
                dob = $filter('date')(answer.dobirth, 'yyyy-MM-dd')
            }
            if (answer.avatar !== appConfig.defaultAvatar) {
                avatar = answer.avatar
            }
            if ($scope.action == 'add') {
                var postData = {
                    driver_code: answer.driverCode,
                    name: answer.name,
                    dob: dob,
                    ou_id: answer.department.id,
                    phone_home: answer.phoneHome,
                    phone_office: answer.phoneOffice,
                    phone_mobile: answer.phoneMobile,
                    photo: avatar
                }
                $http({
                    method: 'POST',
                    url: '/api/driverSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90502_01')
                    } else {
                        $mdDialog.hide('addSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90502_' + errorphp)
                    } else {
                        alertBox.errorAlert(response.data.code)
                    }
                });
            } else {
                var postData = {
                    driver_id: answer.driverId,
                    driver_code: answer.driverCode,
                    name: answer.name,
                    dob: dob,
                    ou_id: answer.department.id,
                    phone_home: answer.phoneHome,
                    phone_office: answer.phoneOffice,
                    phone_mobile: answer.phoneMobile,
                    version: answer.version,
                    photo: avatar
                }
                $http({
                    method: 'PATCH',
                    url: '/api/driverSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90503_01')
                    } else {
                        $mdDialog.hide('editSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90503_' + errorphp)
                    } else {
                        alertBox.errorAlert(response.data.code)
                    }
                });
            }
        };

        $scope.checkDate = function (formstr, model) {
            $timeout(function () {
                if ($scope.addEdit[formstr].$valid) {
                    var validate = document.getElementsByName(formstr)[0]
                    if (($scope.minDate < $scope.row[model]) && ($scope.row[model] < $scope.maxDate)) {
                        formValidService.setValidIPG(validate)
                        $scope.dateOutrange = false
                    } else {
                        formValidService.setInvalidIPG(validate)
                        $scope.dateOutrange = true
                    }
                }
            })
        }

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
                        formValidService[validFunc](validate)
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
                        formValidService.setValid(validate)
                    }
                }
            }
        }
    }

    DialogController.$inject = ["$scope", "$mdDialog", "$window", "action", "row", "avatar", "formValidService", "$filter", "appConfig", "user", "departments", "scroll", "scrollx", "regexConfig"];
}]);