/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:31
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:26:13
 */

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name tripSetCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,user,Idle,Keepalive,appConfig,httpSuccessCheck,alertBox,$filter,refetchMapService,exportConfig
 * @description
 *   Controller for vehicle trip maintenance page.
 */
angular.module('carSafety').controller("tripSetCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "user", "Idle", "Keepalive", "appConfig", "httpSuccessCheck", "alertBox", "$filter", "refetchMapService", "exportConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, user, Idle, Keepalive, appConfig, httpSuccessCheck, alertBox, $filter, refetchMapService, exportConfig) {
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
    window.document.title = $translate.instant('tripSet');

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

    $scope.itemsByPage = 10;
    $scope.displayPage = 5;

    $scope.excelOrder = exportConfig.vehtripSetExcelOrder

    $scope.getcsvHeader = function () {
        var headerArr = []
        headerArr.push($translate.instant('tripID'))
        headerArr.push($translate.instant('startTime'))
        headerArr.push($translate.instant('endTime'))
        headerArr.push($translate.instant('vehicle'))
        headerArr.push($translate.instant('vehDept'))
        headerArr.push($translate.instant('driver'))
        headerArr.push($translate.instant('driverCode'))
        headerArr.push($translate.instant('drvDept'))
        headerArr.push($translate.instant('mileage')+" ("+$translate.instant('km')+")")
        headerArr.push($translate.instant('avgspeed')+' (kph)')
        headerArr.push($translate.instant('lastUpdateBy'))
        return headerArr
    }

    $scope.getcsvData = function (data) {
        var displaydata = angular.copy(data);
        var originalData = angular.copy($scope.rowCollection);
        var csvdata = []
        displaydata.forEach(function(element){
            var tmp = angular.copy(originalData.find(function(x){
                return element.tripId == x.tripId
            }))
            csvdata.push(tmp);
        });
        return csvdata
    }

    $scope.showExplain = false

    var scrollvflag = false;

    var docscroll = function () {
        var table = angular.element(document.querySelector('table.table.table-striped'))[0]
        if (table) {
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
                            firstRow.children[i].style.width = cellwidth[i] + 'px'
                            trh.children[i].style.width = cellwidth[i] + 'px'
                            firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                            trh.children[i].style.minWidth = cellwidth[i] + 'px'
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
    }

    $document.bind('scroll', docscroll)

    var tablescroll = function () {
        var scroll = angular.element(document.querySelector('.ng-table-content'))[0]
        var table = document.getElementsByTagName('table')[0]
        if (table) {
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
    }

    angular.element(document.querySelector('.ng-table-content')).bind('scroll', tablescroll)

    angular.element($window).bind('resize', function () {
        var table = angular.element(document.querySelector('table.table.table-striped'))[0]
        if (table) {
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
                        firstRow.children[i].style.width = cellwidth[i] + 'px'
                        trh.children[i].style.width = cellwidth[i] + 'px'
                        firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                        trh.children[i].style.minWidth = cellwidth[i] + 'px'
                    }
                    table.children[0].classList.add('table-stickyheader')
                }
            }
        }

        var datebutton = angular.element(document.querySelector('.warn-date-range-pick-btn'))[0]
        var datepicker = angular.element(document.querySelector('.warn-date-range-pick .input-group .uib-datepicker-popup.dropdown-menu'))[0]
        if (datepicker) {
            var element = angular.element(document.querySelector('head style#vehTrip-datepicker'));
            if (datebutton.offsetWidth < 248.5) {
                left = -248.5 + datebutton.offsetWidth - 3
                element.html('.query-wrap .warn-date-range-pick .input-group .dropdown-menu{left: ' + left + 'px !important;}');
            } else {
                element.html('.query-wrap .warn-date-range-pick .input-group .dropdown-menu{left: unset;}');
            }
        }

        $scope.checkColWidth = document.querySelector('.query-wrap .row.no-margin>label').clientWidth
        $scope.$apply();
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

    $scope.checkColWidth = document.querySelector('.query-wrap .row.no-margin>label').clientWidth

    angular.element(document.querySelector('head')).append("<style id='vehTrip-datepicker'></style>");

    $scope.beforeDate = new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 1)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0);
    $scope.afterDate = new Date($filter('date')(new Date(), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0);
    $scope.beforedate = {
        opened: false
    }
    $scope.afterdate = {
        opened: false
    }

    $scope.dateRange = {
        before: new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 1)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0),
        after: new Date($filter('date')(new Date(), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0)
    };

    var maxdatetmp = $filter('date')(new Date(), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone);
    $scope.maxDate = new Date(maxdatetmp)
    $scope.minDate = new Date('01/01/1990 00:00:00')

    $scope.bfdateOptions = {
        customClass: getSelectedRange,
        maxDate: $scope.maxDate,
        minDate: $scope.minDate,
        startingDay: 1,
        showWeeks: false,
        formatMonth: 'MMM',
        yearColumns: 3
    };

    $scope.afdateOptions = {
        customClass: getSelectedRange,
        maxDate: $scope.maxDate,
        minDate: $scope.minDate,
        startingDay: 1,
        showWeeks: false,
        formatMonth: 'MMM',
        yearColumns: 3
    };

    $scope.changeRange = function (str, date) {
        var addDate = date.getTime()
        var checkday = new Date(addDate).setHours(0, 0, 0, 0)
        if (str == 'before') {
            $scope.dateRange.before = checkday
            $scope.afdateOptions.minDate = new Date(checkday)
            if (checkday > $scope.dateRange.after) {
                $scope.afterDate = checkday;
                $scope.dateRange.after = checkday
            }
        } else {
            $scope.dateRange.after = checkday
            if (checkday < $scope.dateRange.before) {
                $scope.beforeDate = checkday;
                $scope.dateRange.before = checkday
            }
        }
    }

    $scope.openPicker = function (str) {
        if (str == 'before') {
            $scope.beforedate.opened = true
        } else {
            $scope.afterdate.opened = true
        }
        $timeout(function () {
            var datebutton = angular.element(document.querySelector('.warn-date-range-pick-btn'))[0]
            var datepicker = angular.element(document.querySelector('.warn-date-range-pick .input-group .uib-datepicker-popup.dropdown-menu'))[0]
            if (datepicker) {
                var element = angular.element(document.querySelector('head style#vehTrip-datepicker'));
                if (datebutton.offsetWidth < 248.5) {
                    left = -248.5 + datebutton.offsetWidth - 3
                    element.html('.query-wrap .warn-date-range-pick .input-group .dropdown-menu{left: ' + left + 'px !important;}');
                } else {
                    element.html('.query-wrap .warn-date-range-pick .input-group .dropdown-menu{left: unset;}');
                }
            }
        })
    }

    function getSelectedRange(data) {
        var date = data.date
        var mode = data.mode
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
            var bfDate = new Date($scope.dateRange.before).setHours(0, 0, 0, 0)
            var afDate = new Date($scope.dateRange.after).setHours(0, 0, 0, 0)
            if (dayToCheck == bfDate && dayToCheck == afDate) {
                return 'selected-range-one'
            } else if (dayToCheck == bfDate) {
                return 'selected-range-before'
            } else if (dayToCheck == afDate) {
                return 'selected-range-after'
            } else if (dayToCheck > bfDate && dayToCheck < afDate) {
                return 'selected-range'
            }
        }
        return '';
    }

    $scope.dataSelectedDrv = [{
        name: "N/A",
        id: "NA"
    }]
    $scope.dataSelectedVeh = [{
        name: "N/A",
        id: "NA"
    }]
    $scope.dataSelectedDept = [{
        name: "N/A",
        id: "NA"
    }]
    $scope.listDataSelect = {
        template: '{{option.name}}',
        smartButtonTextConverter: function (skip, option) {
            return option.name;
        },
        keyboardControls: false,
        scrollableHeight: 'auto',
        scrollable: true,
        searchField: 'name',
        enableSearch: true,
        showCheckAll: false,
        showUncheckAll: false,
        selectionLimit: 1,
        closeOnSelect: true,
        smartButtonMaxItems: 1,
        closeOnDeselect: true,
        idProperty: 'id',
        displayProp: 'name',
        buttonClasses: 'query-list-select'
    }

    $scope.listDataSelectTextsDrv = {
        buttonDefaultText: $translate.instant('selectDriver'),
        searchPlaceholder: $translate.instant('search'),
    }

    $scope.listDataSelectTextsVeh = {
        buttonDefaultText: $translate.instant('selectVehicle'),
        searchPlaceholder: $translate.instant('search'),
    }

    $scope.listDataSelectTextsDept = {
        buttonDefaultText: $translate.instant('selectDepartment'),
        searchPlaceholder: $translate.instant('search'),
    }

    $scope.listDataSelectEventVeh = {
        onItemDeselect: function (item) {
            $scope.dataSelectedVeh[0] = angular.copy(item)
        }
    }

    $scope.listDataSelectEventDrv = {
        onItemDeselect: function (item) {
            $scope.dataSelectedDrv[0] = angular.copy(item)
        }
    }

    $scope.listDataSelectEventDept = {
        onItemDeselect: function (item) {
            $scope.dataSelectedDept[0] = angular.copy(item);
        },
        onItemSelect: function (item) {
            if (item.id !== 'NA') {
                var filtered = $filter('filter')($scope.fulldataLabelsVeh, {
                    ou_id: item.id
                }, true)
                $scope.dataLabelsVeh = [{
                    name: "N/A",
                    ou_id: null,
                    id: "NA"
                }];
                $scope.dataLabelsVeh = $scope.dataLabelsVeh.concat(filtered)
                var isSelected = $scope.dataLabelsVeh.find(function (element) {
                    return angular.equals(element, $scope.dataSelectedVeh[0])
                })
                if (!isSelected) {
                    $scope.dataSelectedVeh[0] = {
                        name: "N/A",
                        ou_id: null,
                        id: "NA"
                    }
                }
            } else {
                $scope.dataLabelsVeh = [{
                    name: "N/A",
                    ou_id: null,
                    id: "NA"
                }];
                $scope.dataLabelsVeh = $scope.dataLabelsVeh.concat($scope.fulldataLabelsVeh)
            }
        }
    }

    $scope.dataLabelsDrv = [{
        name: "N/A",
        id: "NA"
    }, {
        name: "EMPTY",
        id: null
    }];
    $scope.dataLabelsVeh = [{
        name: "N/A",
        ou_id: null,
        id: "NA"
    }];
    $scope.dataLabelsDept = [{
        name: "N/A",
        id: "NA"
    }];

    $http({
        method: 'GET',
        url: '/api/vehtripFilterList'
    }).then(function successCallback(response) {
        var errorphp = httpSuccessCheck.checkHttp(response)
        if (errorphp) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            alertBox.errorAlert('91801_01')
        } else {
            $scope.dataLabelsDrv = $scope.dataLabelsDrv.concat(response.data.data.drvList)
            $scope.fulldataLabelsVeh = response.data.data.vehList
            $scope.dataLabelsVeh = $scope.dataLabelsVeh.concat($scope.fulldataLabelsVeh)
            $scope.dataLabelsDept = $scope.dataLabelsDept.concat(response.data.data.deptList)
            blockUi.removeClass('block-ui-active block-ui-visible')
        }
    }, function errorCallback(response) {
        blockUi.removeClass('block-ui-active block-ui-visible')
        var errorphp = httpSuccessCheck.checkerrorHttp(response)
        if (errorphp) {
            alertBox.errorAlert('91801_' + errorphp)
        } else {
            alertBox.errorAlert(response.data.code)
        }
    });

    $scope.loading = false;

    $scope.submitQuery = function () {
        var maxRange = new Date($scope.beforeDate).setFullYear(new Date($scope.beforeDate).getFullYear() + 1)
        if ($scope.afterDate <= maxRange) {
            $scope.loading = true;
            $scope.postData = {
                start: $filter('date')($scope.dateRange.before, 'yyyy-MM-dd'),
                end: $filter('date')(new Date($scope.dateRange.after), 'yyyy-MM-dd'),
                drvid: $scope.dataSelectedDrv[0].id,
                vehid: $scope.dataSelectedVeh[0].id,
                vehdept: $scope.dataSelectedDept[0].id
            }
            $http({
                method: 'POST',
                url: '/api/queryVehTrip',
                data: $scope.postData
            }).then(function successCallback(response) {
                $scope.loading = false;
                var errorphp = httpSuccessCheck.checkHttp(response)
                if (errorphp) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    alertBox.errorAlert('91802_01')
                } else {
                    $scope.rowCollection = response.data.data
                    $scope.realCollection = $scope.rowCollection.map(function (obj) {
                        return {
                            tripId: obj.tripId,
                            start_time: obj.start_time,
                            end_time: obj.end_time,
                            vehicle: obj.vehicle,
                            driver: obj.driver,
                            drvDepart: obj.drvDepart,
                            vehDepart: obj.vehDepart,
                            distance: obj.distance,
                            avgspeed: obj.avgspeed,
                            updateBy: obj.updated_by
                        }
                    })
                    var y = window.pageYOffset
                    window.scrollBy(0, -y)
                    blockUi.removeClass('block-ui-active block-ui-visible')
                }
            }, function errorCallback(response) {
                $scope.loading = false;
                blockUi.removeClass('block-ui-active block-ui-visible')
                var errorphp = httpSuccessCheck.checkerrorHttp(response)
                if (errorphp) {
                    alertBox.errorAlert('91802_' + errorphp)
                } else {
                    alertBox.errorAlert(response.data.code)
                }
            });
        } else {
            alertBox.contentAlert('warning', 'maxDateRange_title', 'maxDateRange_text')
        }
    }

    $scope.submitQuery()

    $scope.refreshList = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: '/api/queryVehTrip',
            data: $scope.postData
        }).then(function successCallback(response) {
            $scope.loading = false;
            var errorphp = httpSuccessCheck.checkHttp(response)
            if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.errorAlert('91802_01')
            } else {
                $scope.rowCollection = response.data.data
                $scope.realCollection = $scope.rowCollection.map(function (obj) {
                    return {
                        tripId: obj.tripId,
                        start_time: obj.start_time,
                        end_time: obj.end_time,
                        vehicle: obj.vehicle,
                        driver: obj.driver,
                        drvDepart: obj.drvDepart,
                        vehDepart: obj.vehDepart,
                        updateBy: obj.updated_by
                    }
                })
                var y = window.pageYOffset
                window.scrollBy(0, -y)
                blockUi.removeClass('block-ui-active block-ui-visible')
            }
        }, function errorCallback(response) {
            $scope.loading = false;
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if (errorphp) {
                alertBox.errorAlert('91802_' + errorphp)
            } else {
                alertBox.errorAlert(response.data.code)
            }
        });
    }

    $scope.editDriver = function (ev, tripid) {
        var row = $scope.rowCollection.find(function (element) {
            return element.tripId == tripid;
        });
        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/view/component/dialog/vehtripSetDialog.html',
                parent: angular.element(document.querySelector('.query-setting-wrap')),
                targetEvent: ev,
                locals: {
                    row: angular.copy(row),
                    drivers: angular.copy($scope.dataLabelsDrv),
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
                            firstRow.children[i].style.width = cellwidth[i] + 'px'
                            trh.children[i].style.width = cellwidth[i] + 'px'
                            firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                            trh.children[i].style.minWidth = cellwidth[i] + 'px'
                        }
                        table.children[0].classList.add('table-stickyheader')
                        window.scrollBy(0, 42);
                    }
                }
                $document.bind('scroll', docscroll)
                angular.element(document.querySelector('.ng-table-content')).bind('scroll', tablescroll)
            });
    }

    $scope.$on('$destroy', function () {
        if(angular.element(document.body).hasClass('md-dialog-is-showing')){
            $mdDialog.cancel()
        }
        $document.unbind('scroll')
        angular.element(document.querySelector('.ng-table-content')).unbind('scroll')
        angular.element($window).unbind('resize')
        document.head.removeChild(document.querySelectorAll('head style#vehTrip-datepicker')[0])
    })

    function DialogController($scope, $mdDialog, $window, row, drivers, formValidService, scroll, scrollx) {

        var html = document.getElementsByTagName('HTML')[0]
        var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

        $timeout(function () {
            html.style.removeProperty('overflow-y')
        })

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
                        firstRow.children[i].style.width = cellwidth[i] + 'px'
                        trh.children[i].style.width = cellwidth[i] + 'px'
                        firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
                        trh.children[i].style.minWidth = cellwidth[i] + 'px'
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

        drivers.splice(0, 2);
        $scope.drivers = drivers;

        $scope.row = row
        if (!$scope.row.drvId) {
            $scope.row.driverPick = undefined
        } else {
            $scope.row.driverpick = {
                name: $scope.row.driver,
                id: $scope.row.drvId
            }
        }

        var dataArr = ['driverpickTAH']
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

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.submit = function (answer) {
            var driverId
            if (answer.driverpick) {
                driverId = answer.driverpick.id
            } else {
                driverId = null
            }
            var postData = {
                tripId: answer.tripId,
                driverId: driverId,
                version: answer.version
            }
            $http({
                method: 'PATCH',
                url: '/api/tripDrvUpdate',
                data: postData
            }).then(function successCallback(response) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                var errorphp = httpSuccessCheck.checkHttp(response)
                if (errorphp) {
                    alertBox.errorAlert('91803_01')
                } else {
                    $mdDialog.hide('editSuccess');
                }
            }, function errorCallback(response) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                var errorphp = httpSuccessCheck.checkerrorHttp(response)
                if (errorphp) {
                    alertBox.errorAlert('91803_' + errorphp)
                } else {
                    alertBox.errorAlert(response.data.code)
                }
            });
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
                        if ($scope.tripEdit[formstr].$invalid) {
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
                    } else if ($scope.tripEdit[formstr].$invalid) {
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
                if (!$scope.tripEdit[dataArr[i]].$touched) {
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

    DialogController.$inject = ["$scope", "$mdDialog", "$window", "row", "drivers", "formValidService", "scroll", "scrollx"];

}]);