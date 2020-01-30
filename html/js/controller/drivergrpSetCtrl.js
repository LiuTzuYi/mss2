/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:29
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:22:47
 */

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name drivergrpSetCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user,$filter,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,exportConfig
 * @description
 *   Controller for driver group maintenance page.
 */
angular.module('carSafety').controller("drivergrpSetCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "tmhDynamicLocale", "user", "$filter", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "refetchMapService", "exportConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, tmhDynamicLocale, user, $filter, Idle, Keepalive, appConfig, httpSuccessCheck, alertBox, refetchMapService, exportConfig) {
    Idle.watch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
    blockUi.addClass('block-ui-active block-ui-visible')
    /*$scope.setTitle = function(){
		$timeout(function(){
			window.document.title = $translate.instant('drivergrpSet');
		}, 50);
	}*/
    $scope.permission = user.func_code;

    $scope.userInfo = user;

    $scope.lang = $scope.userInfo.lang;
    /*$translate.use($scope.lang);
    $scope.setTitle();*/
    window.document.title = $translate.instant('drivergrpSet');

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
            url: '/api/drivergrpSet'
        }).then(function successCallback(response) {
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.errorAlert('90401_01')
            } else {
                $scope.rowCollection = response.data.data
                $scope.realCollection = $scope.rowCollection.map(function (obj) {
                    var driverBelong = obj.driverBelong.length
                    return {
                        groupDesc: obj.groupDesc,
                        groupName: obj.groupName,
                        driverBelong: driverBelong,
                        drivergrpId: obj.drivergrpId,
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
                alertBox.errorAlert('90401_' + errorphp)
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
                        drv_grp_id: row.drivergrpId
                    }
                    $http({
                        method: 'DELETE',
                        url: '/api/drivergrpSet',
                        data: postData,
                        headers: {
                            'Content-type': 'application/json;charset=utf-8'
                        }
                    }).then(function successCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90405_01')
                        } else {
                            alertBox.titleAlert('success', 'deleteSuccess')
                            $scope.refreshList()
                        }
                    }, function errorCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkerrorHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90405_' + errorphp)
                        } else {
                            alertBox.errorAlert(response.data.code)
                        }
                    });
                }
            })
    }

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
                    url: '/api/drivergrpImport',
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
                            count: response.data.add_group_count + response.data.add_grpdriver_count
                        })
                        alertBox.setImportSuccessAlert('success', message);
                        $scope.refreshList();
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    element.value = ""
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90506_' + errorphp)
                    } else {
                        var error_with_row = ['10415', '10416', '10419', '10420', '10424', '10425', '10427', '10428'];
                        if (error_with_row.includes(response.data.code)) {
                            var title = response.data.code + '_title';
                            var htmltext = "<div class='alert-server-error'><h6 style='white-space: pre-wrap;'>" + $translate.instant(response.data.code + '_text') + ": </h6><h6>[" + response.data.data.join(", ") + "]</h6></div>";
                            alertBox.setImportAlert(title, htmltext, 'warning', response.data.code);
                        } else {
                            alertBox.errorAlert(response.data.code)
                        }
                    }
                });
            }
        }
    };

    $scope.excelOrder = exportConfig.drivergrpSetExcelOrder

    $scope.getcsvHeader = function () {
        var headerArr = []
        headerArr.push($translate.instant('drivergrpID'))
        headerArr.push($translate.instant('groupName'))
        headerArr.push($translate.instant('groupDesc'))
        headerArr.push($translate.instant('department'))
        headerArr.push($translate.instant('driver'))
        headerArr.push($translate.instant('lastUpdateBy'))
        return headerArr
    }

    $scope.getcsvData = function (data) {
        var tmp = angular.copy(data)
        var csvdata = []
        tmp.forEach(function (element) {
            var row = angular.copy(element)
            delete row.driverBelong
            var find = $scope.rowCollection.find(function (element2) {
                return row.drivergrpId == element2.drivergrpId
            });
            if (find.driverBelong.length > 0) {
                find.driverBelong.forEach(function (element3) {
                    row.driverBelong = element3.name
                    csvdata.push(angular.copy(row))
                })
            } else {
                row.driverBelong = null
                csvdata.push(angular.copy(row))
            }
        });
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
                return row.drivergrpId == element.drivergrpId;
            });
        }
        var dialogoptionlist
        $http({
            method: 'GET',
            url: '/api/drivergrpAddL'
        }).then(function successCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                alertBox.errorAlert('90404_01')
            } else {
                dialogoptionlist = angular.copy(response.data.data)
                $document.unbind('scroll')
                angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/view/component/dialog/drivergrpSetDialog.html',
                        parent: angular.element(document.querySelector('.setting-wrap')),
                        targetEvent: ev,
                        locals: {
                            action: action,
                            row: angular.copy(row),
                            optionList: angular.copy(dialogoptionlist),
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
                alertBox.errorAlert('90404_' + errorphp)
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

    function DialogController($scope, $mdDialog, $window, action, row, optionList, formValidService, $translate, $document, $filter, user, departments, scroll, scrollx) {

        var html = document.getElementsByTagName('HTML')[0]
        $timeout(function () {
            html.style.removeProperty('overflow-y')
        })

        var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

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
            if (!$scope.row.department.department) {
                $scope.row.department = defaultdepart
            }
        } else {
            $scope.row = {
                groupName: "",
                driverBelong: [],
                department: defaultdepart,
                groupDesc: ""
            }
        }

        $scope.selecting = {}
        $scope.removing = {}

        $scope.optionList = $filter('unique')(optionList.concat(angular.copy($scope.row.driverBelong)), 'id')

        $scope.defaultList = angular.copy($scope.row.driverBelong)

        if ($scope.action == 'edit') {
            var dataArr = ['drivergrpId', 'groupName', 'groupDesc', 'departmentTAH']
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
            var dataArr = ['groupName', 'groupDesc', 'departmentTAH']
            $timeout(function () {
                var validate = document.getElementsByName('departmentTAH')[0]
                formValidService.setValidTAH(validate)
            })
        }

        $scope.touchcatch = 0;
        $scope.mouseontouch = 0;

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

        $document.bind('touchstart', function () {
            var hoverelement = angular.element(document.querySelector('.dual-select-wrapper'))
            hoverelement.addClass('no-hover');
            $scope.touchcatch += 1;
        })

        $document.bind('mouseenter', function () {
            if ($scope.touchcatch !== 0) {
                $scope.mouseontouch += 1;
            }
            if ($scope.mouseontouch !== 1) {
                var hoverelement = angular.element(document.querySelector('.dual-select-wrapper'))
                hoverelement.removeClass('no-hover');
                $scope.touchcatch = 0;
                $scope.mouseontouch = 0;
                $scope.checkmousedownsed = false;
                $scope.checkmousedownnon = false;
                $scope.checkcountnon = 0;
                $scope.checkcountsed = 0;
            }
        })

        $scope.checkmousedownsed = false;
        $scope.checkmousedownnon = false;
        $scope.checkcountnon = 0;
        $scope.checkcountsed = 0;

        $document.bind('mouseup', function () {
            $scope.checkmousedownsed = false;
            $scope.checkmousedownnon = false;
            $scope.checkcountnon = 0;
            $scope.checkcountsed = 0;
        })

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.submit = function (answer) {
            if ($scope.action == 'add') {
                var postData = {
                    grp_alias: answer.groupName,
                    driverBelong: answer.driverBelong,
                    ou_id: answer.department.id,
                    grp_descpt: answer.groupDesc
                }
                $http({
                    method: 'POST',
                    url: '/api/drivergrpSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90402_01')
                    } else {
                        $mdDialog.hide('addSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90402_' + errorphp)
                    } else {
                        alertBox.errorAlert(response.data.code)
                    }
                });
            } else {
                var postData = {
                    drv_grp_id: answer.drivergrpId,
                    grp_alias: answer.groupName,
                    driverBelong: answer.driverBelong,
                    grp_descpt: answer.groupDesc,
                    ou_id: answer.department.id,
                    version: answer.version
                }
                $http({
                    method: 'PATCH',
                    url: '/api/drivergrpSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90403_01')
                    } else {
                        $mdDialog.hide('editSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90403_' + errorphp)
                    } else {
                        alertBox.errorAlert(response.data.code)
                    }
                });
            }
        };

        $scope.clearFilter = function () {
            delete $scope.listfilter
        }

        $scope.resetList = function () {
            $scope.row.driverBelong = angular.copy($scope.defaultList)
            delete $scope.listfilter
            $scope.selecting = {}
            $scope.removing = {}
        }

        $scope.checknon = function (id) {
            if ($scope.checkmousedownnon) {
                if ($scope.selecting[id] == true) {
                    $scope.selecting[id] = false;
                } else {
                    $scope.selecting[id] = true;
                }
                $scope.checkcountnon += 1;
            }
        }

        $scope.checkfirstdragnon = function (id) {
            if ($scope.checkmousedownnon && $scope.checkcountnon == 0) {
                $scope.checknon(id)
            }
        }

        $scope.checksed = function (id) {
            if ($scope.checkmousedownsed) {
                if ($scope.removing[id] == true) {
                    $scope.removing[id] = false;
                } else {
                    $scope.removing[id] = true;
                }
                $scope.checkcountsed += 1;
            }
        }

        $scope.checkfirstdragsed = function (id) {
            if ($scope.checkmousedownsed && $scope.checkcountsed == 0) {
                $scope.checksed(id)
            }
        }

        $scope.hasMatch = function (id) {
            var result = false
            for (var i = 0; i < $scope.row.driverBelong.length; i++) {
                if ($scope.row.driverBelong[i].id == id) {
                    result = true
                    break;
                }
            }
            return result;
        }

        $scope.selectAll = function () {
            var filterList = $filter('filter')($scope.optionList, $scope.listfilter)
            $scope.row.driverBelong = Object.values([].concat($scope.row.driverBelong, filterList).reduce(function (r, o) {
                r[o.id] = o;
                return r;
            }, {}));
            $scope.selecting = {}
            $scope.removing = {}
        }

        $scope.removeAll = function () {
            var temparr = angular.copy($scope.row.driverBelong)
            var filterList = $filter('filter')(temparr, $scope.listfilter)
            for (var i = 0; i < filterList.length; i++) {
                for (var j = 0; j < $scope.row.driverBelong.length; j++) {
                    if ($scope.row.driverBelong[j].id == filterList[i].id) {
                        $scope.row.driverBelong.splice(j, 1)
                        break;
                    }
                }
            }
            $scope.selecting = {}
            $scope.removing = {}
        }

        $scope.selectChecked = function () {
            angular.forEach($scope.selecting, function (value, key) {
                if (value == true) {
                    for (var i = 0; i < $scope.optionList.length; i++) {
                        if ($scope.optionList[i].id == key) {
                            $scope.row.driverBelong.push($scope.optionList[i]);
                            break;
                        }
                    }
                }
            });
            $scope.selecting = {}
            $scope.removing = {}
        }

        $scope.removeChecked = function () {
            angular.forEach($scope.removing, function (value, key) {
                if (value == true) {
                    for (var i = 0; i < $scope.row.driverBelong.length; i++) {
                        if ($scope.row.driverBelong[i].id == key) {
                            $scope.row.driverBelong.splice(i, 1);
                            break;
                        }
                    }
                }
            });
            $scope.selecting = {}
            $scope.removing = {}
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

        $scope.$on('$destroy', function () {
            $document.unbind('touchstart')
            $document.unbind('mouseenter')
            $document.unbind('mouseup')
        })
    }

    DialogController.$inject = ["$scope", "$mdDialog", "$window", "action", "row", "optionList", "formValidService", "$translate", "$document", "$filter", "user", "departments", "scroll", "scrollx"];
}]);