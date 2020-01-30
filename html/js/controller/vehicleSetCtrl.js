/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:30
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:27:07
 */

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name vehicleSetCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,user,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,refetchMapService,exportConfig
 * @description
 *   Controller for vehicle maintenance page.
 */
angular.module('carSafety').controller("vehicleSetCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "user", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "refetchMapService", "exportConfig", "$filter", "regexConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, user, Idle, Keepalive, appConfig, httpSuccessCheck, alertBox, refetchMapService, exportConfig, $filter, regexConfig) {
    Idle.watch();
    var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
    blockUi.addClass('block-ui-active block-ui-visible')
    /*$scope.setTitle = function(){
        $timeout(function(){
            window.document.title = $translate.instant('vehicleSet');
        }, 50);
    }*/
    $scope.permission = user.func_code;

    $scope.userInfo = user;

    $scope.lang = $scope.userInfo.lang;
    /*$translate.use($scope.lang);
    $scope.setTitle();*/
    window.document.title = $translate.instant('vehicleSet');

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
            url: '/api/vehicleSet'
        }).then(function successCallback(response) {
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.errorAlert('90801_01')
            } else {
                for (var i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].year) {
                        var subpart1 = response.data.data[i].year.split("-")
                        response.data.data[i].year = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " 00:00:00")
                    }
                }
                $scope.rowCollection = response.data.data
                $scope.realCollection = $scope.rowCollection.map(function (obj) {
                    var year = null
                    if (obj.year) {
                        year = $filter('date')(obj.year, 'yyyy')
                    }
                    var status = $translate.instant(obj.status)
                    var typetrans = $translate.instant(obj.type)
                    return {
                        licence: obj.licence,
                        vehicleId: obj.vehicleId,
                        status: status,
                        vin: obj.vin,
                        brand: obj.brand,
                        model: obj.model,
                        type: typetrans,
                        year: year,
                        runDistance: obj.runDistance,
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
                alertBox.errorAlert('90801_' + errorphp)
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
                        vrm_id: row.vehicleId
                    }
                    $http({
                        method: 'DELETE',
                        url: '/api/vehicleSet',
                        data: postData,
                        headers: {
                            'Content-type': 'application/json;charset=utf-8'
                        }
                    }).then(function successCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90805_01')
                        } else {
                            alertBox.titleAlert('success', 'deleteSuccess')
                            $scope.refreshList()
                        }
                    }, function errorCallback(response) {
                        blockUi.removeClass('block-ui-active block-ui-visible')
                        var errorphp = httpSuccessCheck.checkerrorHttp(response)
                        if (errorphp) {
                            alertBox.errorAlert('90805_' + errorphp)
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
                    url: '/api/vehicleImport',
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
                        var error_with_row = ['10814', '10815', '10816', '10822', '10823'];
                        if (error_with_row.includes(response.data.code)) {
                            var title = response.data.code + '_title'
                            var htmltext = "<div class='alert-server-error'><h6 style='white-space: pre-wrap;'>" + $translate.instant(response.data.code + '_text') + ": </h6><h6>[" + response.data.data.join(", ") + "]</h6></div>"
                            alertBox.setImportAlert(title, htmltext, 'warning', response.data.code)
                        } else {
                            alertBox.errorAlert(response.data.code)
                        }
                    }
                });
            }
        }
    };

    $scope.excelOrder = exportConfig.vehicleSetExcelOrder

    $scope.getcsvHeader = function () {
        var headerArr = []
        headerArr.push($translate.instant('vehicleID'))
        headerArr.push($translate.instant('licence'))
        headerArr.push($translate.instant('vin'))
        headerArr.push($translate.instant('brand'))
        headerArr.push($translate.instant('model'))
        headerArr.push($translate.instant('type'))
        headerArr.push($translate.instant('year'))
        headerArr.push($translate.instant('department'))
        headerArr.push($translate.instant('runDistance'))
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
                return row.vehicleId == element.vehicleId;
            });
        }
        var dialogvehiclelist
        $http({
            method: 'GET',
            url: '/api/vehicleAddL'
        }).then(function successCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                alertBox.errorAlert('90804_01')
            } else {
                typelist = angular.copy(response.data.data)
                angular.forEach(typelist, function (value, key) {
                    value.veh_type = $translate.instant(value.veh_type)
                    value.path = '../images/veh_type/' + value.veh_type + '.svg#' + value.veh_type;
                })
                $document.unbind('scroll')
                angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/view/component/dialog/vehicleSetDialog.html',
                        parent: angular.element(document.querySelector('.setting-wrap')),
                        targetEvent: ev,
                        locals: {
                            action: action,
                            row: angular.copy(row),
                            types: angular.copy(typelist),
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
                alertBox.errorAlert('90804_' + errorphp)
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

    function DialogController($scope, $mdDialog, $window, $filter, action, row, types, formValidService, user, departments, scroll, scrollx, regexConfig) {

        var html = document.getElementsByTagName('HTML')[0]
        var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

        $timeout(function () {
            html.style.removeProperty('overflow-y')
        })

        $scope.action = action;
        $scope.types = angular.copy(types);

        var maxdatetmp = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss', user.timezone);
        $scope.maxDate = new Date(maxdatetmp)
        $scope.minDate = new Date('1900-01-01 00:00:00')

        $scope.dateOptions = {
            formatYear: 'yyyy',
            maxDate: $scope.maxDate,
            minDate: $scope.minDate,
            startingDay: 1,
            minMode: 'year',
            showWeeks: false
        };

        $scope.datepicker = {
            opened: false
        };

        $scope.dateOutrange = false

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
            $scope.row = angular.copy(row)
            if (!$scope.row.type) {
                $scope.row.type = undefined
            } else {
                $scope.row.type = {
                    id: row.type_code,
                    veh_type: $translate.instant(row.type),
                    path: '../images/veh_type/' + $translate.instant(row.type) + '.svg'
                }
            }
            if (!$scope.row.department.department) {
                $scope.row.department = defaultdepart
            }
            if (!$scope.row.status) {
                $scope.row.status = "A"
            }
        } else {
            $scope.row = {
                licence: "",
                status: "A",
                model: "",
                brand: "",
                type: undefined,
                year: "",
                department: defaultdepart
            }
        }

        $scope.licenceplateregex = regexConfig.licenceplateregex

        if ($scope.action == 'edit') {
            var dataArr = ['licence', 'vin', 'brand', 'model', 'typeTAH', 'yearIPG', 'status', 'departmentTAH']
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
            var dataArr = ['licence', 'vin', 'brand', 'model', 'typeTAH', 'yearIPG', 'status', 'departmentTAH']
            $timeout(function () {
                var validate = document.getElementsByName('departmentTAH')[0]
                formValidService.setValidTAH(validate)
            })
        }

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.submit = function (answer) {
            console.log(answer);
            if ($scope.action == 'add') {
                var postData = {
                    vrm_mark_code: answer.licence,
                    vin: answer.vin,
                    brand: answer.brand,
                    model: answer.model,
                    type: answer.type.id,
                    year: $filter('date')(answer.year, 'yyyy-MM-dd'),
                    ou_id: answer.department.id,
                    status: answer.status,
                    version: answer.version
                }
                $http({
                    method: 'POST',
                    url: '/api/vehicleSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90802_01')
                    } else {
                        $mdDialog.hide('addSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90802_' + errorphp)
                    } else {
                        alertBox.errorAlert(response.data.code)
                    }
                });
            } else {
                var postData = {
                    vrm_id: answer.vehicleId,
                    brand: answer.brand,
                    model: answer.model,
                    type: answer.type.id,
                    year: $filter('date')(answer.year, 'yyyy-MM-dd'),
                    ou_id: answer.department.id,
                    status: answer.status,
                    version: answer.version
                }
                $http({
                    method: 'PATCH',
                    url: '/api/vehicleSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90803_01')
                    } else {
                        $mdDialog.hide('editSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if (errorphp) {
                        alertBox.errorAlert('90803_' + errorphp)
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

        $scope.openPicker = function () {
            $scope.datepicker.opened = true;
        };

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
                        formValidService.setInvalidIPG(validate)
                    } else {
                        formValidService.setValid(validate)
                    }
                }
            }
        }
    }

    DialogController.$inject = ["$scope", "$mdDialog", "$window", "$filter", "action", "row", "types", "formValidService", "user", "departments", "scroll", "scrollx", "regexConfig"];
}]);