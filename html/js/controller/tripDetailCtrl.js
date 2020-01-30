/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:31
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:25:31
 */

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name tripDetailCtrl
 * @requires $scope,$state,$stateParams,$http,$compile,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,NgMap,appConfig,$interval,$filter,user,Idle,Keepalive,responsiveCheck,httpSuccessCheck,alertBox,refetchMapService,exportConfig,mapConfig
 * @description
 *   Controller for trip detail page.
 */
angular.module('carSafety').controller("tripDetailCtrl", ["$scope", "$state", "$stateParams", "$http", "$compile", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "tmhDynamicLocale", "NgMap", "appConfig", "$interval", "$filter", "user", "Idle", "Keepalive", "responsiveCheck", "httpSuccessCheck", "alertBox", "refetchMapService", "exportConfig", "mapConfig", function ($scope, $state, $stateParams, $http, $compile, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, tmhDynamicLocale, NgMap, appConfig, $interval, $filter, user, Idle, Keepalive, responsiveCheck, httpSuccessCheck, alertBox, refetchMapService, exportConfig, mapConfig) {
	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	blockUi.addClass('block-ui-active block-ui-visible')
	sessionStorage.removeItem('warnTable0');
	sessionStorage.removeItem('warnTable1');
	sessionStorage.removeItem('warnTable2');
	sessionStorage.removeItem('warnTable3');
	/*$scope.setTitle = function(){
		$timeout(function(){
			window.document.title = $translate.instant('warning');
		}, 50);
	}*/
	var checkTableExist;
	var checkTableExist2;
	var checkInfoClose;

	$scope.multicheckText = {
		searchText: 'search',
		checkAllText: 'checkAll',
		uncheckAllText: 'uncheckAll'
	}

	$scope.warnExcelOrder = exportConfig.warnExcelOrder

	$scope.getcsvHeader = function () {
		var headerArr = []
		headerArr.push($translate.instant('video') + ' ID')
		headerArr.push($translate.instant('lat') + ' (WGS84)')
		headerArr.push($translate.instant('lng') + ' (WGS84)')
		headerArr.push($translate.instant('warnType'))
		headerArr.push($translate.instant('startTime'))
		headerArr.push($translate.instant('vehicle'))
		headerArr.push($translate.instant('vehDept'))
		headerArr.push($translate.instant('driver'))
		headerArr.push($translate.instant('drvDept'))
		headerArr.push($translate.instant('duration') + ' (s)')
		headerArr.push($translate.instant('startSpeed') + ' (kph)')
		headerArr.push($translate.instant('endSpeed') + ' (kph)')
		headerArr.push($translate.instant('topSpeed') + ' (kph)')
		headerArr.push($translate.instant('HW') + ' (s)')
		headerArr.push($translate.instant('nearHW') + ' (s)')
		return headerArr
	}

	$scope.getcsvData = function (data) {
		var csvdata = angular.copy(data)
		angular.forEach(csvdata, function (value, key) {
			if (value.videoReady !== 'Y') {
				value.video = null
			}
			if($scope.verifyGPS(value.rawgps)){
				value.lat = value.rawgps[0]
				value.lng = value.rawgps[1]
			}
			else{
				value.lat = null
				value.lng = null
			}
			if(value.hw===null){
				value.hw = $translate.instant('NA')
			}
			if(value.near_hw===null){
				value.near_hw = $translate.instant('NA')
			}
			value.warningType = $translate.instant(value.warningType)
			var trip = $scope.tripList.find(function (element) {
				return $scope.activeTrip == element.trip_id;
			});
			value.driver = trip.drv_name
			value.drvDepart = trip.drv_name_ou
			value.vehicle = trip.licence
			value.vehDepart = trip.licence_ou
		})
		return csvdata
	}

	$scope.isNull = function(data){
	    return data===null;
	}

	$scope.verifyGPS = function(gps){
    	if(!gps.includes(0)&&!gps.includes(null)){
    		return true
    	}
    	else{
    		return false
    	}
    }

	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;
	/*$translate.use($scope.lang);
	$scope.setTitle();*/
	window.document.title = $translate.instant('tripDetail');
	tmhDynamicLocale.set($scope.lang);

	$scope.showList = true
	$scope.hideFilter = false
	$scope.hideFilterlist = true
	$scope.tripinfoFullscreen = false
	$scope.warnTable = undefined
	$scope.isMobile = responsiveCheck.checkDevice();

	$scope.warnTripIcon = appConfig.warnTripIcon

	$scope.toggleFilter = function () {
		$scope.hideFilter = !$scope.hideFilter
		$timeout(function () {
			$scope.$broadcast('$md-resize')
			$scope.$apply()
		}, true)
	}

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
				if ($scope.mapchoosen == 'googleMap') {
					angular.element(document.querySelector("#map")).remove();
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

	$scope.updatemap = function (map) {
		if (map !== $scope.userInfo.map) {
			var postData = {
				map: map
			}
			$http({
				method: 'POST',
				url: '/api/updateMap',
				data: postData
			}).then(function successCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkHttp(response)
				if (errorphp) {
					alertBox.errorAlert('90007_01')
					$scope.mapchoosen = $scope.userInfo.map
					$scope.mapset = {
						map: angular.copy($scope.mapchoosen)
					}
				} else {
					$state.reload()
				}
			}, function errorCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkerrorHttp(response)
				if (errorphp) {
					alertBox.errorAlert('90007_' + errorphp)
				} else {
					alertBox.errorAlert(response.data.code)
				}
				$scope.mapchoosen = $scope.userInfo.map
				$scope.mapset = {
					map: angular.copy($scope.mapchoosen)
				}
			});
		}
	}

	if ($scope.lang == "zh-cn") {
		$scope.googleBase = mapConfig.googlemapCN
		$scope.region = "cn"
	} else {
		$scope.googleBase = mapConfig.googlemapNormal
	}

	$scope.gmapUrl = $scope.googleBase + "&" + mapConfig.googlemapKey + "&" + mapConfig.googlemapLibraries + "&language=" + $scope.lang
	if ($scope.region) {
		$scope.gmapUrl += "&region=" + $scope.region
	}

	$scope.bmapUrl = mapConfig.baidumapVer + "&" + mapConfig.baidumapKey

	$scope.mapchoosen = $scope.userInfo.map
	$scope.mapset = {
		map: angular.copy($scope.mapchoosen)
	}

	if ($scope.mapchoosen == 'baiduMap') {
		refetchMapService.deleteGoogle()
	}

	$scope.bmapOption = {
		minZoom: 3,
		maxZoom: 18,
		enableMapClick: false
	}

	$scope.bmapReady = function (map) {
		map.addControl(new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_RIGHT,
			offset: new BMap.Size(0, 40)
		}));
		map.addControl(new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
			offset: new BMap.Size(0, 5)
		}));
		map.addControl(new BMap.MapTypeControl({
			mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
		}));
		map.enableKeyboard()
		map.enableScrollWheelZoom()
		map.addEventListener("moveend", function (e) {
			$scope.checkBoundsBMap(e)
		});
		map.addEventListener("zoomend", function () {
			$scope.checkZoomBMap()
		})
		var point = new BMap.Point(114.1, 22.4);
		map.centerAndZoom(point, 15);
		$scope.ngBMap = map
	};

	$scope.typeList = [{
			type: 'vehicle'
		},
		{
			type: 'vehicleGrp'
		},
		{
			type: 'driver'
		},
		{
			type: 'driverGrp'
		}
	]

	$scope.tripBy = [{
		type: 'vehicle'
	}]

	$http({
		method: 'GET',
		url: '/api/warnFilter/' + $scope.tripBy[0].type
	}).then(function successCallback(response) {
		blockUi.removeClass('block-ui-active block-ui-visible')
		var errorphp = httpSuccessCheck.checkHttp(response)
		if (errorphp) {
			alertBox.errorAlert('90201_01')
			$scope.setPick()
			$scope.changeSetmulti()
			$scope.optionsByGrp = []
		} else {
			$scope.setPick()
			$scope.changeSetmulti()
			$scope.optionsByGrp = response.data.data
		}
	}, function errorCallback(response) {
		blockUi.removeClass('block-ui-active block-ui-visible')
		var errorphp = httpSuccessCheck.checkerrorHttp(response)
		if (errorphp) {
			alertBox.errorAlert('90201_' + errorphp)
		} else {
			alertBox.errorAlert(response.data.code)
		}
		$scope.setPick()
		$scope.changeSetmulti()
		$scope.optionsByGrp = []
	});

	$scope.setPick = function () {
		switch ($scope.tripBy[0].type) {
			case 'driver':
				$scope.pickList = []
				break;
			case 'vehicle':
				$scope.pickList = []
				break;
			case 'driverGrp':
				$scope.pickList = {}
				break;
			case 'vehicleGrp':
				$scope.pickList = {}
		}
	}

	$scope.infoboxOpen = true
	$scope.selectedTrip = new Array(4)
	$scope.tripWarning = new Array(4)
	$scope.tabSetting = new Array(4)

	$scope.toggleInfo = function ($event) {
		$event.stopPropagation();
		if($scope.submitType){
			if ($scope.infoboxOpen) {
				unwatcher();
				if (!$scope.tripinfoFullscreen) {
					angular.element(document.querySelector('.warn-table')).unbind('scroll')
					scrollvflag = false
				} else {
					angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
					scrollvflagfull = false
				}
				var tablewrap
				var table
				var scrollY
				if (!$scope.tripinfoFullscreen) {
					tablewrap = document.getElementsByClassName('warn-table')[0]
				} else {
					tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
				}
				if (tablewrap) {
					table = tablewrap.getElementsByTagName('table')[0]
					scrollY = tablewrap.scrollTop
				}
				if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
					var firstRow = table.children[1].children[0]
					if (firstRow.children.length > 1) {
						var trh = table.children[0].children[0]
						var th = table.children[0]
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
						table.children[0].style.removeProperty('top')
						table.children[0].style.removeProperty('position')
						table.children[0].style.removeProperty('overflow')
						table.children[0].style.removeProperty('width')
						if (!$scope.tripinfoFullscreen) {
							angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
						} else {
							angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
						}
					}
				}
			}
			$scope.infoboxOpen = !$scope.infoboxOpen
			var preselect = $scope.rowCollection.filter(function (x) {
				return x.isSelected
			})
			var preselectidx
			if (preselect.length !== 0) {
				preselectidx = $scope.rowCollection.findIndex(function (x, i) {
					return x.isSelected
				})
				$scope.preSelectedRow = preselectidx
			}
			if ($scope.infoboxOpen) {
				var winwidth = window.innerWidth
				if (winwidth <= 745) {
					$scope.showList = false
					$scope.tripinfoFullwidth = true
				}
				checkTableExist2 = setInterval(function () {
					if (angular.element(document.querySelector('.warn-table'))) {
						var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
						var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
						if (funcBar) {
							tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
						}
						angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
						unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
						clearInterval(checkTableExist2);
					}
				}, 100);
			}
		}
		else{
			$scope.infoboxOpen = !$scope.infoboxOpen
		}
	}

	$scope.closeTag = function (id, $event) {
		$event.stopPropagation();
		var idx = $scope.selectedTrip.indexOf(id)
		delete $scope.selectedTrip[idx]
		delete $scope.tripWarning[idx]
		delete $scope.tabSetting[idx]
		delete $scope.warningPath[idx]
		delete $scope.warningPoint[idx]
		delete $scope.warningPointDisplay[idx]
		sessionStorage.removeItem('warnTable' + String(idx));
		$scope.tripInfo = $scope.tripWarning.filter(function (x) {
			return x
		})
		$scope.tripTags = $scope.selectedTrip.filter(function (x) {
			return x
		})
		if ($scope.tripInfo.length == 0) {
			unwatcher();
			if (!$scope.tripinfoFullscreen) {
				angular.element(document.querySelector('.warn-table')).unbind('scroll')
				scrollvflag = false
			} else {
				angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
				scrollvflagfull = false
			}
			document.getElementsByClassName("map-wrap")[0].style.removeProperty('height');
			document.getElementsByClassName("map-wrap")[0].style.removeProperty('overflow');

			$scope.tripinfoFullscreen = false
			delete $scope.tripInfo
			delete $scope.temptripInfo
			delete $scope.tripTags
			delete $scope.activeTrip
		} else {
			if ($scope.activeTrip == id) {
				unwatcher();
				if (!$scope.tripinfoFullscreen) {
					angular.element(document.querySelector('.warn-table')).unbind('scroll')
					scrollvflag = false
					$scope.regenTable = true
				} else {
					angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
					scrollvflagfull = false
					$scope.regenTableFull = true
				}

				$scope.activeTrip = $scope.tripTags[0]
				var newidx = $scope.selectedTrip.indexOf($scope.activeTrip)
				$scope.warnTable = 'warnTable' + String(newidx)
				$scope.rowCollection = angular.copy($scope.tripInfo[0])

				$timeout(function () {
					if ($scope.infoboxOpen && $scope.tripInfo) {
						if (!$scope.tripinfoFullscreen) {
							delete $scope.regenTable
							checkTableExist2 = setInterval(function () {
								if (angular.element(document.querySelector('.warn-table'))) {
									var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
									var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
									if (funcBar) {
										tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
									}
									angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
									unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
									clearInterval(checkTableExist2);
								}
							}, 100);
						} else {
							delete $scope.regenTableFull
							checkTableExist2 = setInterval(function () {
								if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
									var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
									var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
									if (funcBar) {
										tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
									}
									angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
									unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
									clearInterval(checkTableExist2);
								}
							}, 100);
						}
					}
				}, true)
			}
		}
	}

	$scope.checkTag = function (id) {
		var idx = $scope.selectedTrip.indexOf(id)
		switch (idx) {
			case 0:
				return 'trip-0'
				break;
			case 1:
				return 'trip-1'
				break;
			case 2:
				return 'trip-2'
				break;
			case 3:
				return 'trip-3'
		}
	}

	$scope.checkMarkerTag = function (num) {
		switch (num) {
			case 0:
				return 'trip-0'
				break;
			case 1:
				return 'trip-1'
				break;
			case 2:
				return 'trip-2'
				break;
			case 3:
				return 'trip-3'
		}
	}

	Array.prototype.diff = function (a) {
		return this.filter(function (i) {
			return a.indexOf(i) === -1;
		});
	};

	$scope.itemsByPage = 25;
	$scope.displayPage = 5;

	$scope.selectTag = function (id) {
		unwatcher();
		if (!$scope.tripinfoFullscreen) {
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
			$scope.regenTable = true
		} else {
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflagfull = false
			$scope.regenTableFull = true
		}
		var preidx = $scope.selectedTrip.indexOf($scope.activeTrip)
		$scope.tabSetting[preidx] = {
			warnFilter: $scope.warnFilter,
			switchAllWarn: $scope.switchAllWarn,
			showWarn: $scope.showWarn,
			expert: $scope.expert,
			switchVideo: $scope.switchVideo
		}
		var preselect = $scope.rowCollection.filter(function (x) {
			return x.isSelected
		})
		if (preselect.length !== 0) {
			$scope.tabSetting[preidx].preSelectedRow = $scope.rowCollection.findIndex(function (x, i) {
				return x.isSelected
			})
		}

		$scope.activeTrip = id
		var idx = $scope.selectedTrip.indexOf(id)
		$scope.warnCount = $scope.tripWarnCount[idx]
		$scope.warnTable = 'warnTable' + String(idx)
		var tmp = angular.copy($scope.tripWarning[idx])
		if ($scope.tabSetting[idx]) {
			$scope.switchAllWarn = $scope.tabSetting[idx].switchAllWarn
			$scope.showWarn = $scope.tabSetting[idx].showWarn
			$scope.expert = $scope.tabSetting[idx].expert
			$scope.switchVideo = $scope.tabSetting[idx].switchVideo
			$scope.warnFilter = angular.copy($scope.tabSetting[idx].warnFilter)
		}
		var nowarn = $scope.warnType.diff($scope.warnFilter)
		for (var i = 0; i < nowarn.length; i++) {
			var filtered = $scope.filterWarn(tmp, {
				'warningType': '!' + nowarn[i]
			}, nowarn[i], true)
			tmp = filtered
		}
		if ($scope.switchVideo) {
			var filtered = $scope.filterVideo(tmp, {
				'video': '!null',
				'videoReady': 'Y'
			}, true)
			tmp = filtered
		}
		var ordered = $scope.orderWarn(tmp, '+start_time_utc')
		if ($scope.tabSetting[idx].preSelectedRow !== undefined) {
			ordered[$scope.tabSetting[idx].preSelectedRow].isSelected = true
			$scope.preSelectedRow = $scope.tabSetting[idx].preSelectedRow
		} else {
			delete $scope.preSelectedRow
		}
		$scope.rowCollection = angular.copy(ordered)

		$timeout(function () {
			if ($scope.infoboxOpen && $scope.tripInfo) {
				if (!$scope.tripinfoFullscreen) {
					delete $scope.regenTable
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				} else {
					delete $scope.regenTableFull
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
			}
		}, true)

	}

	$scope.genPostID = function (trip) {
		var id
		switch ($scope.submitType) {
			case 'driver':
			case 'driverGrp':
				id = trip.driver_id
				break;
			case 'vehicle':
			case 'vehicleGrp':
				id = trip.vrm_id
		}
		return id;
	}

	$scope.tripWarnCount = []

	$scope.calcTripWarnCount = function (data, idx) {
		$scope.tripWarnCount[idx] = {
			all: data.length,
			video: 0
		}
		for (var i = 0; i < $scope.warnType.length; i++) {
			$scope.tripWarnCount[idx][$scope.warnType[i]] = 0
		}
		for (var i = 0; i < data.length; i++) {
			$scope.tripWarnCount[idx][data[i].warningType] += 1
			if (data[i].video && data[i].videoReady == 'Y') {
				$scope.tripWarnCount[idx].video += 1
			}
		}
	}

	$scope.getTripWarning = function (trip, i) {
		if ($scope.activeTrip && $scope.infoboxOpen) {
			unwatcher();
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
			$scope.regenTable = true
		}
		var postData = {
            id: $scope.genPostID(trip),
            start: $filter('date')(trip.startDate,'yyyy-MM-dd HH:mm:ss'),
            end: $filter('date')(trip.endDate,'yyyy-MM-dd HH:mm:ss')
        }
		/*var postData = {
			id: $scope.genPostID(trip),
			trip_id: parseInt(trip.trip_id)
		}*/
		$http({
			method: 'POST',
			url: '/api/warnTripData/' + $scope.mapchoosen + '/' + $scope.submitType,
			data: postData
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.errorAlert('90203_01')
			} else {
				if (response.data.code) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					alertBox.errorAlert(response.data.code)
				}
				if ($scope.activeTrip) {
					var preidx = $scope.selectedTrip.indexOf($scope.activeTrip)
					$scope.tabSetting[preidx] = {
						warnFilter: $scope.warnFilter,
						switchAllWarn: $scope.switchAllWarn,
						showWarn: $scope.showWarn,
						expert: $scope.expert,
						switchVideo: $scope.switchVideo
					}
					var preselect = $scope.rowCollection.filter(function (x) {
						return x.isSelected
					})
					if (preselect.length !== 0) {
						$scope.tabSetting[preidx].preSelectedRow = $scope.rowCollection.findIndex(function (x, i) {
							return x.isSelected
						})
					}
					delete $scope.preSelectedRow
					$scope.switchAllWarn = true
					$scope.showWarn = {
						switch: true
					}
					$scope.expert = false
					$scope.switchVideo = false
					$scope.warnFilter = angular.copy($scope.warnType)
				}
				$scope.calcTripWarnCount(response.data.data, i)
				$scope.tripWarning[i] = response.data.data
				$scope.warningPoint[i] = response.data.dataPoint
				$scope.warningPointDisplay[i] = response.data.dataPoint
				$scope.selectedTrip[i] = trip.trip_id
				$scope.warnCount = $scope.tripWarnCount[i]
				$scope.warnTable = 'warnTable' + String(i)
				$scope.tripInfo = $scope.tripWarning.filter(function (x) {
					return x
				})
				$scope.rowCollection = angular.copy($scope.tripWarning[i])
				$scope.tripTags = $scope.selectedTrip.filter(function (x) {
					return x
				})
				$scope.activeTrip = trip.trip_id
				var winwidth = window.innerWidth
				if (winwidth <= 745) {
					$scope.showList = false
					$scope.tripinfoFullwidth = true
				}
				$scope.getTripPath(trip.trip_id, i)
			}
			delete $scope.regenTable
			if ($scope.infoboxOpen && $scope.tripInfo) {
				checkTableExist2 = setInterval(function () {
					if (angular.element(document.querySelector('.warn-table'))) {
						var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
						var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
						if (funcBar) {
							tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
						}
						angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
						unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
						clearInterval(checkTableExist2);
					}
				}, 100);
			}
		}, function errorCallback(response) {
			delete $scope.regenTable
			if ($scope.infoboxOpen && $scope.tripInfo) {
				checkTableExist2 = setInterval(function () {
					if (angular.element(document.querySelector('.warn-table'))) {
						var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
						var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
						if (funcBar) {
							tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
						}
						angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
						unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
						clearInterval(checkTableExist2);
					}
				}, 100);
			}
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('90203_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.getTripPath = function (trip, i) {
		$http({
			method: 'GET',
			url: '/api/getWarningPath/' + $scope.mapchoosen + '/' + trip
		}).then(function successCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				alertBox.errorAlert('90204_01')
			} else {
				$scope.warningPath[i] = response.data.data
				$timeout(function () {
					if ($scope.mapchoosen == "googleMap") {
						NgMap.getMap().then(function (ngmap) {
							if ($scope.warningPath[i].length > 0) {
								var bounds = new google.maps.LatLngBounds();
								var minLat = response.data.data[0][0]
								var maxLat = response.data.data[0][0]
								var minLng = response.data.data[0][1]
								var maxLng = response.data.data[0][1]
								response.data.data.forEach(function (point) {
									if (point[0] < minLat) {
										minLat = point[0]
									} else if (point[0] > maxLat) {
										maxLat = point[0]
									}
									if (point[1] < minLng) {
										minLng = point[1]
									} else if (point[1] > maxLng) {
										maxLng = point[1]
									}
								})
								var loc1 = new google.maps.LatLng(minLat, minLng)
								var loc2 = new google.maps.LatLng(maxLat, maxLng)
								bounds.extend(loc1)
								bounds.extend(loc2)
								ngmap.fitBounds(bounds)
								ngmap.panToBounds(bounds)
								if ($scope.infoboxOpen) {
									checkTableExist = setInterval(function () {
										if (angular.element(document.querySelector('.marker-info-wrapper'))) {
											var infobox = document.getElementsByClassName("marker-info-wrapper")
											var panx = 0
											if ($scope.showList) {
												panx = -(270 / 2)
											}
											if (infobox[0]) {
												ngmap.panBy(panx, infobox[0].offsetHeight / 2)
											}
											clearInterval(checkTableExist);
										}
									}, 100);
								} else {
									panx = -(270 / 2)
									ngmap.panBy(panx, 0)
								}
							}
						})
					}
				})
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('90204_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
			$scope.warningPath[i] = []
		});
	}

	$scope.reloadWarn = function () {
		unwatcher();
		if (!$scope.tripinfoFullscreen) {
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
		} else {
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflagfull = false
		}
		var tablewrap
		var table
		var scrollY
		if (!$scope.tripinfoFullscreen) {
			tablewrap = document.getElementsByClassName('warn-table')[0]
		} else {
			tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		}
		if (tablewrap) {
			table = tablewrap.getElementsByTagName('table')[0]
			scrollY = tablewrap.scrollTop
		}
		if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
			var firstRow = table.children[1].children[0]
			if (firstRow.children.length > 1) {
				var trh = table.children[0].children[0]
				var th = table.children[0]
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
				table.children[0].style.removeProperty('top')
				table.children[0].style.removeProperty('position')
				table.children[0].style.removeProperty('overflow')
				table.children[0].style.removeProperty('width')
				if (!$scope.tripinfoFullscreen) {
					angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
				} else {
					angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
				}
			}
		}

		blockUi.addClass('block-ui-active block-ui-visible')
		var warn = $scope.tripList.filter(function (x) {
			return x.trip_id == $scope.activeTrip
		})
		var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
		var postData = {
			id: $scope.genPostID(warn[0]),
			start: $filter('date')(warn[0].startDate, 'yyyy-MM-dd HH:mm:ss'),
			end: $filter('date')(warn[0].endDate, 'yyyy-MM-dd HH:mm:ss')
		}
		$http({
			method: 'POST',
			url: '/api/warnTripData/' + $scope.mapchoosen + '/' + $scope.submitType,
			data: postData
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				alertBox.errorAlert('90203_01')
			} else {
				if (response.data.code) {
					alertBox.errorAlert(response.data.code)
				}
				$scope.calcTripWarnCount(response.data.data,idx)
				$scope.tripWarning[idx] = response.data.data
				$scope.warningPoint[idx] = response.data.dataPoint
				$scope.warnCount = $scope.tripWarnCount[idx]
				if ($scope.infoPopData && $scope.infoPopData.trip == idx) {
					if ($scope.mapchoosen == 'googleMap') {
						NgMap.getMap().then(function (ngmap) {
							ngmap.hideInfoWindow('warn-point')
						})
					} else {
						$scope.loadBMap().then(function () {
							$scope.ngBMap.closeInfoWindow()
						})
					}
				}
				delete $scope.preSelectedRow
				var tmp = angular.copy($scope.tripWarning[idx])
				var tmppt = angular.copy($scope.warningPoint[idx])
				var nowarn = $scope.warnType.diff($scope.warnFilter)
				for (var i = 0; i < nowarn.length; i++) {
					var filtered = $scope.filterWarn(tmp, {
						'warningType': '!' + nowarn[i]
					}, nowarn[i], true)
					var tmp = $scope.orderWarn(filtered, '+start_time')
					var filteredpt = $scope.filterWarn(tmppt, {
						'warn': '!' + nowarn[i]
					}, nowarn[i], true)
					var tmppt = $scope.orderWarn(filteredpt, '+time_utc')
				}
				$scope.rowCollection = angular.copy(tmp)
				$scope.warningPointDisplay[idx] = angular.copy(tmppt)
				$scope.videoFilterFunc()
			}
			if ($scope.infoboxOpen && $scope.tripInfo) {
				if (!$scope.tripinfoFullscreen) {
					//delete $scope.regenTable
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				} else {
					//delete $scope.regenTableFull
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
			}
		}, function errorCallback(response) {
			if ($scope.infoboxOpen && $scope.tripInfo) {
				if (!$scope.tripinfoFullscreen) {
					//delete $scope.regenTable
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				} else {
					//delete $scope.regenTableFull
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
			}
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('90203_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
		blockUi.removeClass('block-ui-active block-ui-visible')
	}

	$scope.showDatainNorm = function () {
		unwatcher();
		angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
		scrollvflagfull = false
		var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		var table = tablewrap.getElementsByTagName('table')[0]
		var scrollY = tablewrap.scrollTop
		if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
			var firstRow = table.children[1].children[0]
			if (firstRow.children.length > 1) {
				var trh = table.children[0].children[0]
				var th = table.children[0]
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
				table.children[0].style.removeProperty('top')
				table.children[0].style.removeProperty('position')
				table.children[0].style.removeProperty('overflow')
				table.children[0].style.removeProperty('width')
				angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
			}
		}
		var temp = angular.copy($scope.rowCollection)
		var preselect = temp.filter(function (x) {
			return x.isSelected
		})
		if (preselect.length !== 0) {
			$scope.preSelectedRow = temp.findIndex(function (x, i) {
				return x.isSelected
			})
		}
		checkTableExist2 = setInterval(function () {
			if (angular.element(document.querySelector('.warn-table'))) {
				var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
				var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
				if (funcBar) {
					tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
				}
				angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
				unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
				clearInterval(checkTableExist2);
			}
		}, 100);
		document.getElementsByClassName("map-wrap")[0].style.removeProperty('height');
		document.getElementsByClassName("map-wrap")[0].style.removeProperty('overflow');
		$scope.warnTable = $scope.warnTable.split('_full')[0]
		$scope.tripinfoFullscreen = false;
		window.scrollTo(0,0)
		//$scope.regenTableFull = true
	}

	$scope.showDatainFull = function () {
		unwatcher();
		angular.element(document.querySelector('.warn-table')).unbind('scroll')
		scrollvflag = false
		var tablewrap = document.getElementsByClassName('warn-table')[0]
		var table = tablewrap.getElementsByTagName('table')[0]
		var scrollY = tablewrap.scrollTop
		if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
			var firstRow = table.children[1].children[0]
			if (firstRow.children.length > 1) {
				var trh = table.children[0].children[0]
				var th = table.children[0]
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
				table.children[0].style.removeProperty('top')
				table.children[0].style.removeProperty('position')
				table.children[0].style.removeProperty('overflow')
				table.children[0].style.removeProperty('width')
				angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
			}
		}
		var temp = angular.copy($scope.rowCollection)
		var preselect = temp.filter(function (x) {
			return x.isSelected
		})
		if (preselect.length !== 0) {
			$scope.preSelectedRow = temp.findIndex(function (x, i) {
				return x.isSelected
			})
		}
		document.getElementsByClassName("map-wrap")[0].style.height = '100vh'
		document.getElementsByClassName("map-wrap")[0].style.overflow = 'hidden'
		$scope.warnTable = $scope.warnTable + '_full'
		$scope.tripinfoFullscreen = true;
		window.scrollTo(0,0)
		checkTableExist2 = setInterval(function () {
			if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
				var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
				var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
				if (funcBar) {
					tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
				}
				angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
				unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);

				clearInterval(checkTableExist2);
			}
		}, 100);

	}

    $scope.verifyGPS = function(gps){
    	if(!gps.includes(0)&&!gps.includes(null)){
    		return true
    	}
    	else{
    		return false
    	}
    }

	$scope.selectRow = function (row) {
		if (row.isSelected) {
			if ($scope.preSelectedRow !== undefined && row !== $scope.rowCollection[$scope.preSelectedRow]) {
				delete $scope.rowCollection[$scope.preSelectedRow].isSelected;
				delete $scope.preSelectedRow;
			}
			for (var i = 0; i < $scope.tabSetting.length; i++) {
				if ($scope.tabSetting[i]) {
					delete $scope.tabSetting[i].preSelectedRow
				}
			}
			if ($scope.mapchoosen == 'googleMap') {
				NgMap.getMap().then(function (ngmap) {
					ngmap.hideInfoWindow('warn-point');
					var selectedidx = $scope.rowCollection.indexOf(row)
					var tripnum = $scope.selectedTrip.indexOf($scope.activeTrip)
					var str = 'trip' + tripnum + '-' + selectedidx
					var gps = $scope.warningPointDisplay[tripnum][selectedidx].mark
					$scope.infoPopData = angular.copy(row)
					$scope.infoPopData.trip = tripnum
					if($scope.showWarn.switch){
		    			if(!gps.includes(0)&&!gps.includes(null)){
		    				ngmap.showInfoWindow('warn-point',str);
		    			}
		    			else{
		    				alertBox.titleAlert('warning','withoutGPS')
		    			}
		    		}
				})
			} else {
				$scope.loadBMap().then(function () {
					$scope.ngBMap.closeInfoWindow()
					var selectedidx = $scope.rowCollection.indexOf(row)
					var tripnum = $scope.selectedTrip.indexOf($scope.activeTrip)
					var str = 'trip' + tripnum + '-' + selectedidx
					var gps = $scope.warningPointDisplay[tripnum][selectedidx].mark
					$scope.infoPopData = angular.copy(row)
					$scope.infoPopData.trip = tripnum
					if ($scope.showWarn.switch) {
						if(!gps.includes(0)&&!gps.includes(null)){
							$timeout(function () {
								var element = angular.element(document.getElementById('b-warn-point')).clone()
								var content = element.html()
								element.contents().remove()
								element.html(content)
								$compile(element.contents())($scope)
								var tmplng = $scope.warningPointDisplay[tripnum][selectedidx].mark[0]
								var tmplat = $scope.warningPointDisplay[tripnum][selectedidx].mark[1]
								var offset = new BMap.Size(0, -25);
								var ifwd = new BMap.InfoWindow(element[0].children[0], {
									width: 0,
									height: 0,
									offset: offset
								})
								ifwd.addEventListener('clickclose', $scope.hideMarkDetail)
								$scope.ngBMap.openInfoWindow(ifwd, new BMap.Point(tmplng, tmplat))
								$timeout(function () {
									if (document.querySelector('.map-wrap .BMap_pop>img')) {
										if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
											var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
											document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
										} else {
											checkInfoClose = setInterval(function () {
												if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
													var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
													document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
													clearInterval(checkInfoClose);
												}
											}, 100);
										}
									}
								}, true)
							})
						}
			    		else{
			    			alertBox.titleAlert('warning','withoutGPS')
			    		}
					}
				})
			}
		} else {
			if ($scope.mapchoosen == 'googleMap') {
				NgMap.getMap().then(function (ngmap) {
					ngmap.hideInfoWindow('warn-point')
				})
			} else {
				$scope.loadBMap().then(function () {
					$scope.ngBMap.closeInfoWindow()
				})
			}
		}
	}

	$scope.checkState = function (state, num) {
		return (state & Math.pow(2,num)) == Math.pow(2,num)
	}

	$scope.checkDateoverflow = function (start, end) {
		var start_day = $filter('date')(start, 'dd')
		var end_day = $filter('date')(end, 'dd')
		if (start_day !== end_day) {
			return true;
		} else {
			return false;
		}
	}

	$scope.warningPath = new Array(4);
	$scope.warningPoint = new Array(4);
	$scope.warningPointDisplay = new Array(4);

	$scope.selectTrips = function (trip) {
		blockUi.addClass('block-ui-active block-ui-visible')
		var idx = $scope.selectedTrip.indexOf(trip.trip_id)
		if (idx !== -1) {
			unwatcher();
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflag = false
			$scope.regenTable = true

			if ($scope.mapchoosen == 'googleMap') {
				NgMap.getMap().then(function (ngmap) {
					ngmap.hideInfoWindow('warn-point')
				})
			} else {
				$scope.loadBMap().then(function () {
					$scope.ngBMap.closeInfoWindow()
				})
			}
			delete $scope.selectedTrip[idx]
			delete $scope.tripWarning[idx]
			delete $scope.tabSetting[idx]
			delete $scope.warningPath[idx]
			delete $scope.warningPoint[idx]
			delete $scope.warningPointDisplay[idx]
			sessionStorage.removeItem('warnTable' + String(idx));
			$scope.tripInfo = $scope.tripWarning.filter(function (x) {
				return x
			})
			$scope.tripTags = $scope.selectedTrip.filter(function (x) {
				return x
			})
			if ($scope.tripInfo.length == 0) {
				delete $scope.tripInfo
				delete $scope.temptripInfo
				delete $scope.tripTags
				delete $scope.regenTable
			} else {
				if ($scope.activeTrip == trip.trip_id) {
					//$scope.regenTable = true
					$scope.activeTrip = $scope.tripTags[0]
					var newidx = $scope.selectedTrip.indexOf($scope.activeTrip)
					$scope.warnTable = 'warnTable' + String(newidx)
					var tmp = angular.copy($scope.tripInfo[0])
					if ($scope.tabSetting[newidx]) {
						$scope.switchAllWarn = $scope.tabSetting[newidx].switchAllWarn
						$scope.showWarn = $scope.tabSetting[newidx].showWarn
						$scope.expert = $scope.tabSetting[newidx].expert
						$scope.switchVideo = $scope.tabSetting[newidx].switchVideo
						$scope.warnFilter = angular.copy($scope.tabSetting[newidx].warnFilter)
					}
					var nowarn = $scope.warnType.diff($scope.warnFilter)
					for (var i = 0; i < nowarn.length; i++) {
						var filtered = $scope.filterWarn(tmp, {
							'warningType': '!' + nowarn[i]
						}, nowarn[i], true)
						tmp = filtered
					}
					var ordered = $scope.orderWarn(tmp, '+start_time_utc')
					if ($scope.tabSetting[newidx].preSelectedRow !== undefined) {
						ordered[$scope.tabSetting[newidx].preSelectedRow].isSelected = true
						$scope.preSelectedRow = $scope.tabSetting[newidx].preSelectedRow
					} else {
						delete $scope.preSelectedRow
					}
					$scope.rowCollection = angular.copy(ordered)
				}
				var winwidth = window.innerWidth
				if (winwidth <= 745) {
					$scope.showList = false
					$scope.tripinfoFullwidth = true
				}
				if ($scope.infoboxOpen) {
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
				$timeout(function () {
					delete $scope.regenTable
				})
			}
			blockUi.removeClass('block-ui-active block-ui-visible')
		} else {
			if ($scope.selectedTrip.includes(undefined)) {
				for (var i = 0; i < $scope.selectedTrip.length; i++) {
					if ($scope.selectedTrip[i] == undefined) {
						$scope.getTripWarning(trip, i)
						break;
					}
				}
			} else {
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.titleAlert('warning', 'maxTripSelected')
			}
		}
	}

	$scope.isNextSelected = function (idx) {
		var tmp = $scope.tripList[idx + 1]
		if (tmp && $scope.selectedTrip.indexOf(tmp.trip_id) !== -1) {
			return true
		} else {
			return false
		}
	}

	$scope.isListSelected = function (trip, idx) {
		var tmp = $scope.tripList[idx - 1]
		var next = ''
		if (tmp && $scope.selectedTrip.indexOf(tmp.trip_id) !== -1) {
			next = ' hasNext'
		}
		var selected = $scope.selectedTrip.indexOf(trip.trip_id)
		if (selected > -1) {
			switch (selected) {
				case 0:
					return 'selected-list trip-0' + next
					break;
				case 1:
					return 'selected-list trip-1' + next
					break;
				case 2:
					return 'selected-list trip-2' + next
					break;
				case 3:
					return 'selected-list trip-3' + next
			}
		} else {
			return ''
		}
	}

	$scope.refreshList = function ($event) {
		$event.stopPropagation();
		if($scope.submitType){
			blockUi.addClass('block-ui-active block-ui-visible')
			if ($scope.infoboxOpen && $scope.tripInfo) {
				unwatcher();
				angular.element(document.querySelector('.warn-table')).unbind('scroll')
				scrollvflag = false
				var tablewrap = document.getElementsByClassName('warn-table')[0]
				var table = tablewrap.getElementsByTagName('table')[0]
				var scrollY = tablewrap.scrollTop
				if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
					var firstRow = table.children[1].children[0]
					if (firstRow.children.length > 1) {
						var trh = table.children[0].children[0]
						var th = table.children[0]
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
						table.children[0].style.removeProperty('top')
						table.children[0].style.removeProperty('position')
						table.children[0].style.removeProperty('overflow')
						table.children[0].style.removeProperty('width')
						angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
					}
				}
			}
			$scope.warningPath = new Array(4);
			$scope.warningPoint = new Array(4);
			$scope.warningPointDisplay = new Array(4);
			$scope.selectedTrip = new Array(4)
			$scope.tripWarning = new Array(4)
			$scope.tabSetting = new Array(4)
			delete $scope.tripInfo
			delete $scope.temptripInfo
			delete $scope.tripTags
			delete $scope.activeTrip
			delete $scope.rowCollection
			sessionStorage.removeItem('warnTable0');
			sessionStorage.removeItem('warnTable1');
			sessionStorage.removeItem('warnTable2');
			sessionStorage.removeItem('warnTable3');
			$scope.switchAllWarn = true
			$scope.showWarn = {
				switch: true
			}
			$scope.expert = false
			$scope.switchVideo = false
			$scope.warnFilter = angular.copy($scope.warnType)
			if ($scope.mapchoosen == 'googleMap') {
				NgMap.getMap().then(function (ngmap) {
					ngmap.hideInfoWindow('warn-point')
				})
			} else {
				$scope.loadBMap().then(function () {
					$scope.ngBMap.closeInfoWindow()
				})
			}
			/*var postData = {
	            arrayData: $scope.submitData,
	            start: $filter('date')($scope.dateRange.before,'yyyy-MM-dd'),
	            end: $filter('date')(new Date($scope.dateRange.after),'yyyy-MM-dd')
	        }*/
			$http({
				method: 'POST',
				url: '/api/warnTrip/' + $scope.submitType,
				data: $scope.submitData
			}).then(function successCallback(response) {
				var errorphp = httpSuccessCheck.checkHttp(response)
				if (errorphp) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					alertBox.errorAlert('90202_01')
					$scope.tripList = []
					$scope.hideFilterlist = false
					$timeout(function () {
						$scope.$broadcast('$md-resize')
					}, true)
				} else {
					for (var i = 0; i < response.data.data.length; i++) {
						if (response.data.data[i].startDate) {
							var part = response.data.data[i].startDate.split(" ")
							var subpart1 = part[0].split("-")
							response.data.data[i].startDate = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " " + part[1])
						}
						if (response.data.data[i].endDate) {
							var part = response.data.data[i].endDate.split(" ")
							var subpart1 = part[0].split("-")
							response.data.data[i].endDate = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " " + part[1])
						}
					}
					$scope.tripList = response.data.data
					$scope.hideFilterlist = false
					$scope.hideFilter = true
					$timeout(function () {
						$scope.$broadcast('$md-resize')
						blockUi.removeClass('block-ui-active block-ui-visible')
					}, true)
				}
			}, function errorCallback(response) {
				var errorphp = httpSuccessCheck.checkerrorHttp(response)
				if (errorphp) {
					alertBox.errorAlert('90202_' + errorphp)
				} else {
					alertBox.errorAlert(response.data.code)
				}
				$scope.tripList = []
				$scope.hideFilterlist = false
				$timeout(function () {
					$scope.$broadcast('$md-resize')
					blockUi.removeClass('block-ui-active block-ui-visible')
				}, true)
			});
		}
	}

	$scope.changeSetmulti = function () {
		switch ($scope.tripBy[0].type) {
			case 'driver':
				$scope.multicheckSet = {
					itemLabel: 'name',
					itemId: 'driverId'
				}
				break;
			case 'vehicle':
				$scope.multicheckSet = {
					itemLabel: 'licence',
					itemId: 'licenceId'
				}
				break;
			case 'driverGrp':
				$scope.multicheckSet = {
					hasGroup: true,
					grpOptionLabel: 'groupName',
					subOptionLabel: 'name',
					grpOptionId: 'drivergrpId',
					subOptionId: 'id',
					grpOptsubLabel: 'driverBelong'
				}
				break;
			case 'vehicleGrp':
				$scope.multicheckSet = {
					hasGroup: true,
					grpOptionLabel: 'groupName',
					subOptionLabel: 'licence',
					grpOptionId: 'vehiclegrpId',
					subOptionId: 'id',
					grpOptsubLabel: 'vehicleBelong'
				}
		}
	}

	$scope.loadDi = function () {
		return new Promise(function (resolve, reject) {
			(function checkDi() {
				var check = document.querySelector(".all-check .fa-times")
				if (check !== null) {
					return resolve();
				}
				$timeout(checkDi, 30)
			})()
		})
	}

	$scope.typeSelect = {
		template: '{{option.type|translate}}',
		smartButtonTextConverter: function (itemText, originalItem) {
			return $translate.instant(itemText);
		},
		keyboardControls: false,
		scrollableHeight: 'auto',
		scrollable: true,
		enableSearch: false,
		showCheckAll: false,
		showUncheckAll: false,
		selectionLimit: 1,
		closeOnSelect: true,
		smartButtonMaxItems: 1,
		closeOnDeselect: true,
		idProperty: 'type',
		displayProp: 'type',
		buttonClasses: 'btn btn-default map-dv-grp-multi'
	}

	$scope.typeEvent = {
		onItemSelect: function (item) {
			blockUi.addClass('block-ui-active block-ui-visible')
			var selectItem = angular.copy($scope.tripBy[0])
			$http({
				method: 'GET',
				url: '/api/warnFilter/' + $scope.tripBy[0].type
			}).then(function successCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkHttp(response)
				if (errorphp) {
					alertBox.errorAlert('90201_01')
					if ($scope.submitType) {
						$scope.tripBy = [{
							type: $scope.submitType
						}]
					} else {
						$scope.tripBy = [{
							type: 'vehicle'
						}]
					}
					$scope.setPick()
					$scope.changeSetmulti()
				} else {
					$scope.setPick()
					$scope.changeSetmulti()
					if ($scope.infoboxOpen && $scope.tripInfo) {
						unwatcher();
						angular.element(document.querySelector('.warn-table')).unbind('scroll')
						scrollvflag = false
						var tablewrap = document.getElementsByClassName('warn-table')[0]
						var table = tablewrap.getElementsByTagName('table')[0]
						var scrollY = tablewrap.scrollTop
						if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
							var firstRow = table.children[1].children[0]
							if (firstRow.children.length > 1) {
								var trh = table.children[0].children[0]
								var th = table.children[0]
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
								table.children[0].style.removeProperty('top')
								table.children[0].style.removeProperty('position')
								table.children[0].style.removeProperty('overflow')
								table.children[0].style.removeProperty('width')
								angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
							}
						}
					}
					$scope.optionsByGrp = response.data.data
					$scope.hideFilterlist = true
					$scope.tripList = []
					$scope.submitType = angular.copy($scope.tripBy[0].type)
					$scope.warningPath = new Array(4);
					$scope.warningPoint = new Array(4);
					$scope.warningPointDisplay = new Array(4);
					$scope.selectedTrip = new Array(4)
					$scope.tripWarning = new Array(4)
					$scope.tabSetting = new Array(4)
					delete $scope.tripInfo
					delete $scope.temptripInfo
					delete $scope.tripTags
					delete $scope.activeTrip
					delete $scope.rowCollection
					sessionStorage.removeItem('warnTable0');
					sessionStorage.removeItem('warnTable1');
					sessionStorage.removeItem('warnTable2');
					sessionStorage.removeItem('warnTable3');
					$scope.switchAllWarn = true
					$scope.showWarn = {
						switch: true
					}
					$scope.expert = false
					$scope.switchVideo = false
					$scope.warnFilter = angular.copy($scope.warnType)
					var postData = {
						arrayData: $scope.genPostData(),
						start: $filter('date')($scope.dateRange.before, 'yyyy-MM-dd'),
						end: $filter('date')(new Date($scope.dateRange.after), 'yyyy-MM-dd')
					}
					$scope.submitData = angular.copy(postData)
					var datepicker = document.querySelector(".map-wrap .warn-date-range-pick")
					datepicker.style.position = 'relative'
					$timeout(function () {
						datepicker.style.removeProperty('position');
						blockUi.removeClass('block-ui-active block-ui-visible')
					}, 50);
				}
			}, function errorCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkerrorHttp(response)
				if (errorphp) {
					alertBox.errorAlert('90201_' + errorphp)
				} else {
					alertBox.errorAlert(response.data.code)
				}
				if ($scope.submitType) {
					$scope.tripBy = [{
						type: $scope.submitType
					}]
				} else {
					$scope.tripBy = [{
						type: 'vehicle'
					}]
				}
				$scope.setPick()
				$scope.changeSetmulti()
			});
		},
		onItemDeselect: function (item) {
			$scope.tripBy[0] = angular.copy(item)
		}
	}

	$scope.warnType = appConfig.mapwarnType
	$scope.beforeDate = new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 6)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0);
	$scope.afterDate = new Date($filter('date')(new Date(), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0);
	$scope.beforedate = {
		opened: false
	}
	$scope.afterdate = {
		opened: false
	}

	$scope.dateRange = {
		before: new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 6)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0),
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

	$scope.genPostData = function () {
		var arrayData = []
		switch ($scope.submitType) {
			case 'driver':
				for (var i = 0; i < $scope.pickList.length; i++) {
					arrayData.push($scope.pickList[i].driverId)
				}
				break;
			case 'vehicle':
				for (var i = 0; i < $scope.pickList.length; i++) {
					arrayData.push($scope.pickList[i].licenceId)
				}
				break;
			case 'driverGrp':
				angular.forEach($scope.pickList, function (value, key) {
					for (var i = 0; i < value.length; i++) {
						if (arrayData.indexOf(value[i].id) == -1) {
							arrayData.push(value[i].id)
						}
					}
				});
				break;
			case 'vehicleGrp':
				angular.forEach($scope.pickList, function (value, key) {
					for (var i = 0; i < value.length; i++) {
						if (arrayData.indexOf(value[i].id) == -1) {
							arrayData.push(value[i].id)
						}
					}
				});
		}
		return arrayData;
	}

	$scope.submitQuery = function () {
		var maxRange = new Date($scope.beforeDate).setFullYear(new Date($scope.beforeDate).getFullYear() + 1)
		if ($scope.afterDate <= maxRange) {
			blockUi.addClass('block-ui-active block-ui-visible')
			if ($scope.infoboxOpen && $scope.tripInfo) {
				unwatcher();
				angular.element(document.querySelector('.warn-table')).unbind('scroll')
				scrollvflag = false
				var tablewrap = document.getElementsByClassName('warn-table')[0]
				var table = tablewrap.getElementsByTagName('table')[0]
				var scrollY = tablewrap.scrollTop
				if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
					var firstRow = table.children[1].children[0]
					if (firstRow.children.length > 1) {
						var trh = table.children[0].children[0]
						var th = table.children[0]
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
						table.children[0].style.removeProperty('top')
						table.children[0].style.removeProperty('position')
						table.children[0].style.removeProperty('overflow')
						table.children[0].style.removeProperty('width')
						angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
					}
				}
			}
			$scope.submitType = angular.copy($scope.tripBy[0].type)
			$scope.warningPath = new Array(4);
			$scope.warningPoint = new Array(4);
			$scope.warningPointDisplay = new Array(4);
			$scope.selectedTrip = new Array(4)
			$scope.tripWarning = new Array(4)
			$scope.tabSetting = new Array(4)
			delete $scope.tripInfo
			delete $scope.temptripInfo
			delete $scope.tripTags
			delete $scope.activeTrip
			delete $scope.rowCollection
			sessionStorage.removeItem('warnTable0');
			sessionStorage.removeItem('warnTable1');
			sessionStorage.removeItem('warnTable2');
			sessionStorage.removeItem('warnTable3');
			$scope.switchAllWarn = true
			$scope.showWarn = {
				switch: true
			}
			$scope.expert = false
			$scope.switchVideo = false
			$scope.warnFilter = angular.copy($scope.warnType)
			if ($scope.mapchoosen == 'googleMap') {
				NgMap.getMap().then(function (ngmap) {
					ngmap.hideInfoWindow('warn-point')
				})
			} else {
				$scope.loadBMap().then(function () {
					$scope.ngBMap.closeInfoWindow()
				})
			}
			//$scope.submitData = $scope.genPostData()
			var postData = {
				arrayData: $scope.genPostData(),
				start: $filter('date')($scope.dateRange.before, 'yyyy-MM-dd'),
				end: $filter('date')(new Date($scope.dateRange.after), 'yyyy-MM-dd')
			}
			if ($scope.tripMileage && $scope.tripMileage !== null && $scope.tripMileage !== "") {
				postData.mileage = Number($scope.tripMileage)
			}
			$scope.submitData = angular.copy(postData)
			$http({
				method: 'POST',
				url: '/api/warnTrip/' + $scope.submitType,
				data: postData
			}).then(function successCallback(response) {
				var errorphp = httpSuccessCheck.checkHttp(response)
				if (errorphp) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					alertBox.errorAlert('90202_01')
					$scope.tripList = []
					$scope.hideFilterlist = false
					$timeout(function () {
						$scope.$broadcast('$md-resize')
					}, true)
				} else {
					for (var i = 0; i < response.data.data.length; i++) {
						if (response.data.data[i].startDate) {
							var part = response.data.data[i].startDate.split(" ")
							var subpart1 = part[0].split("-")
							response.data.data[i].startDate = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " " + part[1])
						}
						if (response.data.data[i].endDate) {
							var part = response.data.data[i].endDate.split(" ")
							var subpart1 = part[0].split("-")
							response.data.data[i].endDate = new Date(subpart1[1] + "/" + subpart1[2] + "/" + subpart1[0] + " " + part[1])
						}
					}
					$scope.tripList = response.data.data
					$scope.hideFilterlist = false
					$scope.hideFilter = true
					$timeout(function () {
						$scope.$broadcast('$md-resize')
						blockUi.removeClass('block-ui-active block-ui-visible')
					}, true)
				}
			}, function errorCallback(response) {
				var errorphp = httpSuccessCheck.checkerrorHttp(response)
				if (errorphp) {
					alertBox.errorAlert('90202_' + errorphp)
				} else {
					alertBox.errorAlert(response.data.code)
				}
				$scope.tripList = []
				$scope.hideFilterlist = false
				$timeout(function () {
					$scope.$broadcast('$md-resize')
					blockUi.removeClass('block-ui-active block-ui-visible')
				}, true)
			});
		} else {
			alertBox.contentAlert('warning', 'maxDateRange_title', 'maxDateRange_text')
		}
	}

	$scope.switchAllWarn = true
	$scope.showWarn = {
		switch: true
	}
	$scope.expert = false
	$scope.switchVideo = false
	$scope.warnFilter = angular.copy($scope.warnType)

	$scope.changeMode = function () {
		$scope.expert = !$scope.expert
		var tablewrap
		var table
		var funcBar
		if (!$scope.tripinfoFullscreen) {
			tablewrap = document.getElementsByClassName('warn-table')[0]
			funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
		} else {
			tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
			funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
		}
		if (tablewrap) {
			table = tablewrap.getElementsByTagName('table')[0]
			scrollY = tablewrap.scrollTop
		}
		if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
			var firstRow = table.children[1].children[0]
			if (firstRow.children.length > 1) {
				var trh = table.children[0].children[0]
				var th = table.children[0]
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
				table.children[0].style.removeProperty('top')
				table.children[0].style.removeProperty('position')
				table.children[0].style.removeProperty('overflow')
				table.children[0].style.removeProperty('width')
				tablewrap.style.overflow = 'hidden'
				//$scope.$apply()
				$timeout(function () {
					tablewrap.style.removeProperty('overflow')
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
					table.children[0].style.top = 'calc( 1.5rem + 13px + ' + funcBar.clientHeight + 'px )'
					table.children[0].style.position = 'absolute'
					table.children[0].style.overflow = 'hidden'
					var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
					table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
				}, true)
			}
		}
	}

	$scope.checkWarn = function (warn) {
		var idx = $scope.warnFilter.indexOf(warn)
		if (idx !== -1) {
			return true
		} else {
			return false
		}
	}

	$scope.videoFilterFunc = function () {
		if ($scope.switchVideo) {
			var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
			var tmp = angular.copy($scope.rowCollection)
			var filtered = $scope.filterVideo(tmp, {
				'video': '!null',
				'videoReady': 'Y'
			}, true)
			var ordered = $scope.orderWarn(filtered, '+start_time_utc')
			var preselect = $scope.rowCollection.filter(function (x) {
				return x.isSelected
			})
			var preselectidx
			var selectidx
			var tmprow
			if (preselect.length !== 0) {
				preselectidx = $scope.rowCollection.findIndex(function (x, i) {
					return x.isSelected
				})
			}
			if (preselectidx !== undefined) {
				tmprow = angular.copy($scope.rowCollection[preselectidx])
				selectidx = ordered.findIndex(function (x, i) {
					return angular.equals(x, tmprow)
				})
				$scope.preSelectedRow = selectidx
			}
			if (preselect[0]) {
				if (preselect[0].video && preselect[0].videoReady == 'Y') {
					if ($scope.showWarn.switch) {
						if ($scope.mapchoosen == 'googleMap') {
							NgMap.getMap().then(function (ngmap) {
								var trip = $scope.selectedTrip.indexOf($scope.activeTrip)
								var str = 'trip' + trip + '-' + preselectidx
								ngmap.showInfoWindow('warn-point', str);
							})
						}
					}
				} else {
					delete $scope.preSelectedRow
					if ($scope.mapchoosen == 'googleMap') {
						NgMap.getMap().then(function (ngmap) {
							ngmap.hideInfoWindow('warn-point')
						})
					} else {
						$scope.loadBMap().then(function () {
							$scope.ngBMap.closeInfoWindow()
						})
					}
				}
			}
			var tmppt = angular.copy($scope.warningPointDisplay[idx])
			var filteredpt = $scope.filterVideo(tmppt, {
				'video': '!null',
				'videoReady': 'Y'
			}, true)
			var orderedpt = $scope.orderWarn(filteredpt, '+time_utc')
			$scope.rowCollection = angular.copy(ordered)
			$scope.warningPointDisplay[idx] = angular.copy(orderedpt)
		} else {
			var tmp = new Array()
			var tmppt = new Array()
			var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
			var tmprow
			var preselectidx
			var selectidx
			for (var i = 0; i < $scope.warnFilter.length; i++) {
				var filtered = $scope.filterWarn($scope.tripWarning[idx], {
					'warningType': $scope.warnFilter[i]
				}, $scope.warnFilter[i], true)
				var filteredpt = $scope.filterWarn($scope.warningPoint[idx], {
					'warn': $scope.warnFilter[i]
				}, $scope.warnFilter[i], true)
				tmp = angular.copy(tmp.concat(filtered))
				tmppt = angular.copy(tmppt.concat(filteredpt))
			}
			ordered = $scope.orderWarn(tmp, '+start_time_utc')
			if ($scope.rowCollection.length > 0) {
				var preselect = $scope.rowCollection.filter(function (x) {
					return x.isSelected
				})
				if (preselect.length !== 0) {
					preselectidx = $scope.rowCollection.findIndex(function (x, i) {
						return x.isSelected
					})
				}
				if (preselectidx !== undefined) {
					tmprow = angular.copy($scope.rowCollection[preselectidx])
					delete tmprow.isSelected
					selectidx = ordered.findIndex(function (x, i) {
						return angular.equals(x, tmprow)
					})
					ordered[selectidx].isSelected = true
					$scope.preSelectedRow = selectidx
				}
			}
			var orderedpt = $scope.orderWarn(tmppt, '+time_utc')
			$scope.rowCollection = angular.copy(ordered)
			$scope.warningPointDisplay[idx] = angular.copy(orderedpt)
			if (preselectidx !== undefined && $scope.showWarn.switch) {
				if ($scope.mapchoosen == 'googleMap') {
					NgMap.getMap().then(function (ngmap) {
						var trip = $scope.selectedTrip.indexOf($scope.activeTrip)
						var str = 'trip' + trip + '-' + preselectidx
						ngmap.showInfoWindow('warn-point', str);
					})
				} else {
					$scope.loadBMap().then(function () {
						$timeout(function () {
							var trip = $scope.selectedTrip.indexOf($scope.activeTrip)
							var element = angular.element(document.getElementById('b-warn-point')).clone()
							var content = element.html()
							element.contents().remove()
							element.html(content)
							$compile(element.contents())($scope)
							var tmplng = $scope.warningPointDisplay[trip][selectidx].mark[0]
							var tmplat = $scope.warningPointDisplay[trip][selectidx].mark[1]
							var offset = new BMap.Size(0, -25);
							var ifwd = new BMap.InfoWindow(element[0].children[0], {
								width: 0,
								height: 0,
								offset: offset
							})
							ifwd.addEventListener('clickclose', $scope.hideMarkDetail)
							$scope.ngBMap.openInfoWindow(ifwd, new BMap.Point(tmplng, tmplat))
							$timeout(function () {
								if (document.querySelector('.map-wrap .BMap_pop>img')) {
									if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
										var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
										document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
									} else {
										checkInfoClose = setInterval(function () {
											if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
												var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
												document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
												clearInterval(checkInfoClose);
											}
										}, 100);
									}
								}
							}, true)
						})
					})
				}
			}
		}
		var tableWrap = angular.element(document.querySelector('.ng-table-content'))[0]
		tableWrap.scrollTop = 0;
	}

	$scope.toggleVideoFilter = function () {
		unwatcher()
		if (!$scope.tripinfoFullscreen) {
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
			$scope.regenTable = true
		} else {
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflagfull = false
			$scope.regenTableFull = true
		}
		$scope.switchVideo = !$scope.switchVideo
		/*var tablewrap
		var table
		var scrollY
        if(!$scope.tripinfoFullscreen){
            tablewrap = document.getElementsByClassName('warn-table')[0]
        }
        else{
            tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
        }
        if(tablewrap){
            table = tablewrap.getElementsByTagName('table')[0]
            scrollY = tablewrap.scrollTop
        }
        if(scrollY&&scrollY>0){
        	var firstRow = table.children[1].children[0]
            var trh = table.children[0].children[0]
            var th = table.children[0]
			for(var j=0; j<trh.children.length;j++){
                firstRow.children[j].removeAttribute("style")
                trh.children[j].removeAttribute("style")
            }
            table.children[0].classList.remove('table-stickyheader')
            table.children[0].style.removeProperty('top')
        	table.children[0].style.removeProperty('position')
        	table.children[0].style.removeProperty('overflow')
        	table.children[0].style.removeProperty('width')
        }
        if($scope.tripinfoFullscreen){
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
			scrollvflagfull = false
		}
		else{
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
			scrollvflag = false
		}*/
		$scope.videoFilterFunc()
		$timeout(function () {
			if ($scope.infoboxOpen && $scope.tripInfo) {
				if (!$scope.tripinfoFullscreen) {
					delete $scope.regenTable
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				} else {
					delete $scope.regenTableFull
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
			}
		}, true)
	}

	$scope.filterVideo = function (list, func, flag) {
		var arr = $filter('filter')(list, func, flag)
		return arr
	}

	$scope.toggleAllWarn = function () {
		unwatcher()
		if (!$scope.tripinfoFullscreen) {
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
			$scope.regenTable = true
		} else {
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflagfull = false
			$scope.regenTableFull = true
		}
		var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
		/*var tablewrap
		var table
		var scrollY
        if(!$scope.tripinfoFullscreen){
            tablewrap = document.getElementsByClassName('warn-table')[0]
        }
        else{
            tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
        }
        if(tablewrap){
            table = tablewrap.getElementsByTagName('table')[0]
            scrollY = tablewrap.scrollTop
        }
        if(scrollY&&scrollY>0){
        	var firstRow = table.children[1].children[0]
            var trh = table.children[0].children[0]
            var th = table.children[0]
			for(var j=0; j<trh.children.length;j++){
                firstRow.children[j].removeAttribute("style")
                trh.children[j].removeAttribute("style")
            }
            table.children[0].classList.remove('table-stickyheader')
            table.children[0].style.removeProperty('top')
        	table.children[0].style.removeProperty('position')
        	table.children[0].style.removeProperty('overflow')
        	table.children[0].style.removeProperty('width')
        }
        if($scope.tripinfoFullscreen){
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
			scrollvflagfull = false
		}
		else{
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
			scrollvflag = false
		}*/
		if ($scope.switchAllWarn) {
			$scope.switchAllWarn = false
			var preselect = $scope.rowCollection.filter(function (x) {
				return x.isSelected
			})
			if (preselect[0]) {
				if ($scope.mapchoosen == 'googleMap') {
					NgMap.getMap().then(function (ngmap) {
						ngmap.hideInfoWindow('warn-point')
					})
				} else {
					$scope.loadBMap().then(function () {
						$scope.ngBMap.closeInfoWindow()
					})
				}
			}
			$scope.warnFilter = []
			$scope.rowCollection = []
			delete $scope.warningPointDisplay[idx]
		}
		else {
			$scope.switchAllWarn = true
			if ($scope.warnFilter.length > 0) {
				$scope.warningPointDisplay[idx] = angular.copy($scope.warningPoint[idx])
				var preselect = $scope.rowCollection.filter(function (x) {
					return x.isSelected
				})
				$scope.rowCollection = angular.copy($scope.tripWarning[idx])
				if (preselect[0]) {
					delete preselect[0].isSelected
					var tmp = angular.copy($scope.tripWarning[idx])
					var selectidx = tmp.findIndex(function (x, i) {
						var y = angular.copy(preselect[0])
						return angular.equals(x, y)
					})
					$scope.rowCollection[selectidx].isSelected = true
					$scope.preSelectedRow = selectidx

					var str = 'trip' + idx + '-' + selectidx
					$timeout(function () {
						if ($scope.mapchoosen == 'googleMap') {
							NgMap.getMap().then(function (ngmap) {
								ngmap.showInfoWindow('warn-point', str);
							})
						} else {
							$scope.loadBMap().then(function () {
								$timeout(function () {
									var element = angular.element(document.getElementById('b-warn-point')).clone()
									var content = element.html()
									element.contents().remove()
									element.html(content)
									$compile(element.contents())($scope)
									var tmplng = $scope.warningPointDisplay[idx][selectidx].mark[0]
									var tmplat = $scope.warningPointDisplay[idx][selectidx].mark[1]
									var offset = new BMap.Size(0, -25);
									var ifwd = new BMap.InfoWindow(element[0].children[0], {
										width: 0,
										height: 0,
										offset: offset
									})
									ifwd.addEventListener('clickclose', $scope.hideMarkDetail)
									$scope.ngBMap.openInfoWindow(ifwd, new BMap.Point(tmplng, tmplat))
									$timeout(function () {
										if (document.querySelector('.map-wrap .BMap_pop>img')) {
											if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
												var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
												document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
											} else {
												checkInfoClose = setInterval(function () {
													if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
														var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
														document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
														clearInterval(checkInfoClose);
													}
												}, 100);
											}
										}
									}, true)
								})
								/*var content = angular.element(document.getElementById('b-warn-point')).clone()
				    			var tmplng = $scope.warningPointDisplay[idx][selectidx].mark[0]
				    			var tmplat = $scope.warningPointDisplay[idx][selectidx].mark[1]
				    			var ifwd = new BMap.InfoWindow(content[0].children[0],{width:0})
				    			ifwd.addEventListener('clickclose',$scope.hideMarkDetail)
				    			$scope.ngBMap.openInfoWindow(ifwd,new BMap.Point(tmplng,tmplat))*/
							})
						}
					})
				}
			} else {
				$scope.rowCollection = angular.copy($scope.tripWarning[idx])
				$scope.warningPointDisplay[idx] = angular.copy($scope.warningPoint[idx])
			}
			$scope.warnFilter = angular.copy($scope.warnType)
			$scope.videoFilterFunc()
		}
		$timeout(function () {
			if ($scope.infoboxOpen && $scope.tripInfo) {
				if (!$scope.tripinfoFullscreen) {
					delete $scope.regenTable
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				} else {
					delete $scope.regenTableFull
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
			}
		}, true)
	}

	$scope.toggleWarnMark = function () {
		if ($scope.showWarn.switch) {
			//$scope.showWarn.switch=false
			if ($scope.mapchoosen == 'googleMap') {
				NgMap.getMap().then(function (ngmap) {
					var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
					var preselect = $scope.rowCollection.filter(function (x) {
						return x.isSelected
					})
					if (preselect.length !== 0) {
						var selected = $scope.rowCollection.findIndex(function (x, i) {
							return x.isSelected
						})
						var str = 'trip' + idx + '-' + selected
						$scope.infoPopData = angular.copy($scope.rowCollection[selected])
						$scope.infoPopData.trip = idx
						ngmap.showInfoWindow('warn-point', str);
					}
				})
			} else {
				$scope.loadBMap().then(function () {
					var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
					var preselect = $scope.rowCollection.filter(function (x) {
						return x.isSelected
					})
					if (preselect.length !== 0) {
						var selected = $scope.rowCollection.findIndex(function (x, i) {
							return x.isSelected
						})
						var str = 'trip' + idx + '-' + selected
						$scope.infoPopData = angular.copy($scope.rowCollection[selected])
						$scope.infoPopData.trip = idx
						$timeout(function () {
							var element = angular.element(document.getElementById('b-warn-point')).clone()
							var content = element.html()
							element.contents().remove()
							element.html(content)
							$compile(element.contents())($scope)
							var tmplng = $scope.warningPointDisplay[idx][selected].mark[0]
							var tmplat = $scope.warningPointDisplay[idx][selected].mark[1]
							var offset = new BMap.Size(0, -25);
							var ifwd = new BMap.InfoWindow(element[0].children[0], {
								width: 0,
								height: 0,
								offset: offset
							})
							ifwd.addEventListener('clickclose', $scope.hideMarkDetail)
							$scope.ngBMap.openInfoWindow(ifwd, new BMap.Point(tmplng, tmplat))
							$timeout(function () {
								if (document.querySelector('.map-wrap .BMap_pop>img')) {
									if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
										var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
										document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
									} else {
										checkInfoClose = setInterval(function () {
											if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
												var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
												document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
												clearInterval(checkInfoClose);
											}
										}, 100);
									}
								}
							}, true)
							/*		    				var content = angular.element(document.getElementById('b-warn-point')).clone()
										    			var tmplng = $scope.warningPointDisplay[idx][selected].mark[0]
										    			var tmplat = $scope.warningPointDisplay[idx][selected].mark[1]
										    			var ifwd = new BMap.InfoWindow(content[0].children[0],{width:0})
										    			ifwd.addEventListener('clickclose',$scope.hideMarkDetail)
										    			$scope.ngBMap.openInfoWindow(ifwd,new BMap.Point(tmplng,tmplat))*/
						})
					}
				})
			}
		} else {
			//$scope.showWarn.switch=true
			var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
			var preselect = $scope.rowCollection.filter(function (x) {
				return x.isSelected
			})
			if (preselect.length !== 0) {
				if ($scope.mapchoosen == 'googleMap') {
					NgMap.getMap().then(function (ngmap) {
						ngmap.hideInfoWindow('warn-point')
					})
				} else {
					$scope.loadBMap().then(function () {
						$scope.ngBMap.closeInfoWindow()
					})
				}
			}
		}
	}

	$scope.hideMarkDetail = function (e, tripnum) {
		var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
		var preselect = $scope.rowCollection.filter(function (x) {
			return x.isSelected
		})
		if (preselect.length !== 0) {
			var selected = $scope.rowCollection.findIndex(function (x, i) {
				return x.isSelected
			})
			delete $scope.rowCollection[selected].isSelected
			$scope.$apply()
		}
		for (var i = 0; i < $scope.tabSetting.length; i++) {
			if ($scope.tabSetting[i]) {
				delete $scope.tabSetting[i].preSelectedRow
			}
		}
	}

	$scope.showMarkDetail = function (e, tripnum, indexnum) {
		var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
		var preselect = $scope.rowCollection.filter(function (x) {
			return x.isSelected
		})
		if (preselect.length !== 0) {
			var selected = $scope.rowCollection.findIndex(function (x, i) {
				return x.isSelected
			})
			delete $scope.rowCollection[selected].isSelected
		}
		if (idx == tripnum) {
			$scope.infoPopData = angular.copy($scope.rowCollection[indexnum])
			$scope.infoPopData.trip = tripnum
			$scope.rowCollection[indexnum].isSelected = true
			$scope.preSelectedRow = indexnum
		} else {
			var tmp = angular.copy($scope.tripWarning[tripnum])
			var warnFiltering
			if ($scope.tabSetting[tripnum]) {
				warnFiltering = angular.copy($scope.tabSetting[tripnum].warnFilter)
			}
			var nowarn = $scope.warnType.diff(warnFiltering)
			for (var i = 0; i < nowarn.length; i++) {
				var filtered = $scope.filterWarn(tmp, {
					'warningType': '!' + nowarn[i]
				}, nowarn[i], true)
				tmp = filtered
			}
			var ordered = $scope.orderWarn(tmp, '+start_time_utc')
			$scope.tabSetting[tripnum].preSelectedRow = indexnum
			for (var i = 0; i < $scope.tabSetting.length; i++) {
				if (i !== tripnum && $scope.tabSetting[i]) {
					delete $scope.tabSetting[i].preSelectedRow
				}
			}
			$scope.infoPopData = angular.copy(ordered[indexnum])
			$scope.infoPopData.trip = tripnum
		}
		var str = 'trip' + tripnum + '-' + indexnum
		if ($scope.mapchoosen == 'googleMap') {
			NgMap.getMap().then(function (ngmap) {
				ngmap.showInfoWindow('warn-point', str);
			})
		} else {
			$scope.loadBMap().then(function () {
				$timeout(function () {
					var element = angular.element(document.getElementById('b-warn-point')).clone()
					var content = element.html()
					element.contents().remove()
					element.html(content)
					$compile(element.contents())($scope)
					var tmplng = $scope.warningPointDisplay[tripnum][indexnum].mark[0]
					var tmplat = $scope.warningPointDisplay[tripnum][indexnum].mark[1]
					var offset = new BMap.Size(0, -25);
					var ifwd = new BMap.InfoWindow(element[0].children[0], {
						width: 0,
						height: 0,
						offset: offset
					})
					ifwd.addEventListener('clickclose', $scope.hideMarkDetail)
					$scope.ngBMap.openInfoWindow(ifwd, new BMap.Point(tmplng, tmplat))
					$timeout(function () {
						if (document.querySelector('.map-wrap .BMap_pop>img')) {
							if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
								var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
								document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
							} else {
								checkInfoClose = setInterval(function () {
									if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
										var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
										document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
										clearInterval(checkInfoClose);
									}
								}, 100);
							}
						}
					}, true)
					/*var content = angular.element(document.getElementById('b-warn-point')).clone()
					var html = $compile(content)($scope)
	    			var tmplng = $scope.warningPointDisplay[tripnum][indexnum].mark[0]
	    			var tmplat = $scope.warningPointDisplay[tripnum][indexnum].mark[1]
	    			var ifwd = new BMap.InfoWindow(content[0].children[0],{width:0})
	    			ifwd.addEventListener('clickclose',$scope.hideMarkDetail)
	    			$scope.ngBMap.openInfoWindow(ifwd,new BMap.Point(tmplng,tmplat))*/
				})
			})
		}
	}

	$scope.checkWarnShow = function (num) {
		var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
		if (num == idx && $scope.showWarn.switch) {
			return true
		} else if (num !== idx && $scope.tabSetting[num].showWarn.switch) {
			return true
		} else {
			return false
		}
	}

	$scope.filterWarn = function (list, func, item, flag) {
		var arr = $filter('filter')(list, func, flag)
		return arr
	}

	$scope.orderWarn = function (list, func, item) {
		var arr = $filter('orderBy')(list, func)
		return arr
	}

	$scope.toggleWarn = function (warn) {
		unwatcher()
		if (!$scope.tripinfoFullscreen) {
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
			$scope.regenTable = true
		} else {
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflagfull = false
			$scope.regenTableFull = true
		}
		var idxw = $scope.warnFilter.indexOf(warn)
		/*var tablewrap
		var table
		var scrollY
        if(!$scope.tripinfoFullscreen){
            tablewrap = document.getElementsByClassName('warn-table')[0]
        }
        else{
            tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
        }
        if(tablewrap){
            table = tablewrap.getElementsByTagName('table')[0]
            scrollY = tablewrap.scrollTop
        }
        if(scrollY&&scrollY>0){
        	var firstRow = table.children[1].children[0]
            var trh = table.children[0].children[0]
            var th = table.children[0]
			for(var j=0; j<trh.children.length;j++){
                firstRow.children[j].removeAttribute("style")
                trh.children[j].removeAttribute("style")
            }
            table.children[0].classList.remove('table-stickyheader')
            table.children[0].style.removeProperty('top')
        	table.children[0].style.removeProperty('position')
        	table.children[0].style.removeProperty('overflow')
        	table.children[0].style.removeProperty('width')
        }
        if($scope.tripinfoFullscreen){
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
			scrollvflagfull = false
		}
		else{
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
			scrollvflag = false
		}*/
		if (idxw !== -1) {
			$scope.warnFilter.splice(idxw, 1)
			var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
			var tmp = angular.copy($scope.rowCollection)
			var filtered = $scope.filterWarn(tmp, {
				'warningType': '!' + warn
			}, warn, true)
			var ordered = $scope.orderWarn(filtered, '+start_time_utc')
			var preselect = $scope.rowCollection.filter(function (x) {
				return x.isSelected
			})
			var preselectidx
			var selectidx
			var tmprow
			if (preselect.length !== 0) {
				preselectidx = $scope.rowCollection.findIndex(function (x, i) {
					return x.isSelected
				})
			}
			if (preselectidx !== undefined) {
				tmprow = angular.copy($scope.rowCollection[preselectidx])
				selectidx = ordered.findIndex(function (x, i) {
					return angular.equals(x, tmprow)
				})
				$scope.preSelectedRow = selectidx
			}
			if (preselect[0]) {
				if (preselect[0].warningType == warn) {
					delete $scope.preSelectedRow
					if ($scope.mapchoosen == 'googleMap') {
						NgMap.getMap().then(function (ngmap) {
							ngmap.hideInfoWindow('warn-point')
						})
					} else {
						$scope.loadBMap().then(function () {
							$scope.ngBMap.closeInfoWindow()
						})
					}
				} else {
					if ($scope.showWarn.switch) {
						if ($scope.mapchoosen == 'googleMap') {
							NgMap.getMap().then(function (ngmap) {
								var trip = $scope.selectedTrip.indexOf($scope.activeTrip)
								var str = 'trip' + trip + '-' + preselectidx
								ngmap.showInfoWindow('warn-point', str);
							})
						}
						/*else{
							$scope.loadBMap().then(function(){
								var trip = $scope.selectedTrip.indexOf($scope.activeTrip)
								var content = angular.element(document.getElementById('b-warn-point')).clone()
				    			var tmplng = $scope.warningPointDisplay[trip][preselectidx].mark[0]
				    			var tmplat = $scope.warningPointDisplay[trip][preselectidx].mark[1]
				    			var ifwd = new BMap.InfoWindow(content[0].children[0],{width:0})
				    			ifwd.addEventListener('clickclose',$scope.hideMarkDetail)
				    			$scope.ngBMap.openInfoWindow(ifwd,new BMap.Point(tmplng,tmplat))
							})
						}*/
					}
				}
			}
			var tmppt = angular.copy($scope.warningPointDisplay[idx])
			var filteredpt = $scope.filterWarn(tmppt, {
				'warn': '!' + warn
			}, warn, true)
			var orderedpt = $scope.orderWarn(filteredpt, '+time_utc')
			$scope.rowCollection = angular.copy(ordered)
			$scope.warningPointDisplay[idx] = angular.copy(orderedpt)
		}
		else {
			$scope.warnFilter.push(warn)
			var idx = $scope.selectedTrip.indexOf($scope.activeTrip)
			var filtered = $scope.filterWarn($scope.tripWarning[idx], {
				'warningType': warn
			}, warn, true)
			var filteredpt = $scope.filterWarn($scope.warningPoint[idx], {
				'warn': warn
			}, warn, true)
			var tmp
			var ordered
			var tmprow
			var preselectidx
			var selectidx
			var tmppt
			if ($scope.rowCollection.length > 0) {
				tmp = angular.copy($scope.rowCollection)
				for (var i = 0; i < filtered.length; i++) {
					tmp.push(filtered[i]);
				}
				ordered = $scope.orderWarn(tmp, '+start_time_utc')
				var preselect = $scope.rowCollection.filter(function (x) {
					return x.isSelected
				})
				if (preselect.length !== 0) {
					preselectidx = $scope.rowCollection.findIndex(function (x, i) {
						return x.isSelected
					})
				}
				if (preselectidx !== undefined) {
					tmprow = angular.copy($scope.rowCollection[preselectidx])
					selectidx = ordered.findIndex(function (x, i) {
						return angular.equals(x, tmprow)
					})
					$scope.preSelectedRow = selectidx
				}
				tmppt = angular.copy($scope.warningPointDisplay[idx])
			} else {
				tmp = new Array()
				for (var i = 0; i < filtered.length; i++) {
					tmp.push(filtered[i]);
				}
				ordered = $scope.orderWarn(tmp, '+start_time_utc')
				if ($scope.preSelectedRow) {
					delete $scope.preSelectedRow
				}
				tmppt = new Array()
			}
			for (var i = 0; i < filteredpt.length; i++) {
				tmppt.push(filteredpt[i]);
			}
			var orderedpt = $scope.orderWarn(tmppt, '+time_utc')
			$scope.rowCollection = angular.copy(ordered)
			$scope.warningPointDisplay[idx] = angular.copy(orderedpt)
			$scope.videoFilterFunc()
			if (preselectidx !== undefined && $scope.showWarn.switch) {
				if ($scope.mapchoosen == 'googleMap') {
					NgMap.getMap().then(function (ngmap) {
						var trip = $scope.selectedTrip.indexOf($scope.activeTrip)
						var str = 'trip' + trip + '-' + preselectidx
						ngmap.showInfoWindow('warn-point', str);
					})
				} else {
					$scope.loadBMap().then(function () {
						var trip = $scope.selectedTrip.indexOf($scope.activeTrip)
						$timeout(function () {
							var element = angular.element(document.getElementById('b-warn-point')).clone()
							var content = element.html()
							element.contents().remove()
							element.html(content)
							$compile(element.contents())($scope)
							var tmplng = $scope.warningPointDisplay[trip][selectidx].mark[0]
							var tmplat = $scope.warningPointDisplay[trip][selectidx].mark[1]
							var offset = new BMap.Size(0, -25);
							var ifwd = new BMap.InfoWindow(element[0].children[0], {
								width: 0,
								height: 0,
								offset: offset
							})
							ifwd.addEventListener('clickclose', $scope.hideMarkDetail)
							$scope.ngBMap.openInfoWindow(ifwd, new BMap.Point(tmplng, tmplat))
							$timeout(function () {
								if (document.querySelector('.map-wrap .BMap_pop>img')) {
									if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
										var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
										document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
									} else {
										checkInfoClose = setInterval(function () {
											if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
												var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
												document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
												clearInterval(checkInfoClose);
											}
										}, 100);
									}
								}
							}, true)
							/*var content = angular.element(document.getElementById('b-warn-point')).clone()
							var html = $compile(content)($scope)
			    			var tmplng = $scope.warningPointDisplay[tripnum][indexnum].mark[0]
			    			var tmplat = $scope.warningPointDisplay[tripnum][indexnum].mark[1]
			    			var ifwd = new BMap.InfoWindow(content[0].children[0],{width:0})
			    			ifwd.addEventListener('clickclose',$scope.hideMarkDetail)
			    			$scope.ngBMap.openInfoWindow(ifwd,new BMap.Point(tmplng,tmplat))*/
						})
						/*
												var content = angular.element(document.getElementById('b-warn-point')).clone()
								    			var tmplng = $scope.warningPointDisplay[trip][preselectidx].mark[0]
								    			var tmplat = $scope.warningPointDisplay[trip][preselectidx].mark[1]
								    			var ifwd = new BMap.InfoWindow(content[0].children[0],{width:0})
								    			ifwd.addEventListener('clickclose',$scope.hideMarkDetail)
								    			$scope.ngBMap.openInfoWindow(ifwd,new BMap.Point(tmplng,tmplat))*/
					})
				}
			}
		}
		if ($scope.warnFilter.length == $scope.warnType.length) {
			$scope.switchAllWarn = true
		} else {
			$scope.switchAllWarn = false
		}
		/*var tableWrap = angular.element(document.querySelector('.ng-table-content'))[0]
		tableWrap.scrollTop = 0;*/
		$timeout(function () {
			if ($scope.infoboxOpen && $scope.tripInfo) {
				if (!$scope.tripinfoFullscreen) {
					delete $scope.regenTable
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				} else {
					delete $scope.regenTableFull
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
			}
		}, true)
	}

	/*$scope.tripList = [{
	startDate: 1473638433,
	endDate: 1511810232,
	duration: "00:05",
	distance: "45KM",
	drv_name: "gdgdgf",
	vrm_id: 25,
	trip_id: 45524554
},
{
	startDate: 1473638433,
	endDate: 1511810232,
	duration: "00:05",
	distance: "45KM",
	drv_name: "gdgdgf",
	vrm_id: 25,
	trip_id: 45524554
},
{
	startDate: 1473638433,
	endDate: 1511810232,
	duration: "00:05",
	distance: "45KM",
	drv_name: "gdgdgf",
	vrm_id: 25,
	trip_id: 45524554
}]
*/
	$scope.setItemPer = function (num) {
		$scope.itemsByPage = num
		unwatcher()
		if (!$scope.tripinfoFullscreen) {
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
		} else {
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflagfull = false
		}
		var tablewrap
		var table
		var scrollY
		if (!$scope.tripinfoFullscreen) {
			tablewrap = document.getElementsByClassName('warn-table')[0]
		} else {
			tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		}
		if (tablewrap) {
			table = tablewrap.getElementsByTagName('table')[0]
			scrollY = tablewrap.scrollTop
		}
		if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
			var firstRow = table.children[1].children[0]
			if (firstRow.children.length > 1) {
				var trh = table.children[0].children[0]
				var th = table.children[0]
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
				table.children[0].style.removeProperty('top')
				table.children[0].style.removeProperty('position')
				table.children[0].style.removeProperty('overflow')
				table.children[0].style.removeProperty('width')
				if (!$scope.tripinfoFullscreen) {
					angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
				} else {
					angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
				}
			}
		}
		$timeout(function () {
			if ($scope.infoboxOpen && $scope.tripInfo) {
				if (!$scope.tripinfoFullscreen) {
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				} else {
					checkTableExist2 = setInterval(function () {
						if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
							var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
							var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
							if (funcBar) {
								tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
							}
							angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
							unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
							clearInterval(checkTableExist2);
						}
					}, 100);
				}
			}
		}, true)
	}


	$scope.changePage = function (p) {
		/*unwatcher()
		if (!$scope.tripinfoFullscreen) {
			angular.element(document.querySelector('.warn-table')).unbind('scroll')
			scrollvflag = false
		} else {
			angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
			scrollvflagfull = false
		}*/
		var tablewrap
		var table
		var scrollY
		if (!$scope.tripinfoFullscreen) {
			tablewrap = document.getElementsByClassName('warn-table')[0]
		} else {
			tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		}
		if (tablewrap) {
			table = tablewrap.getElementsByTagName('table')[0]
			scrollY = tablewrap.scrollTop
		}
		if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
			unwatcher()
			if (!$scope.tripinfoFullscreen) {
				angular.element(document.querySelector('.warn-table')).unbind('scroll')
				scrollvflag = false
			} else {
				angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
				scrollvflagfull = false
			}
			var firstRow = table.children[1].children[0]
			if (firstRow&&firstRow.children.length > 1) {
				var trh = table.children[0].children[0]
				var th = table.children[0]
				var colength = firstRow.children.length<=trh.children.length?firstRow.children.length:trh.children.length
				for (var j = 0; j < colength; j++) {
					firstRow.children[j].removeAttribute("style")
					trh.children[j].removeAttribute("style")
				}
				table.children[0].classList.remove('table-stickyheader')
				table.children[0].style.removeProperty('top')
				table.children[0].style.removeProperty('position')
				table.children[0].style.removeProperty('overflow')
				table.children[0].style.removeProperty('width')
				if (!$scope.tripinfoFullscreen) {
					angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
				} else {
					angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
				}
				$timeout(function () {
					if ($scope.infoboxOpen && $scope.tripInfo) {
						if (!$scope.tripinfoFullscreen) {
							checkTableExist2 = setInterval(function () {
								if (angular.element(document.querySelector('.warn-table'))) {
									var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
									var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
									if (funcBar) {
										tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
									}
									angular.element(document.querySelector('.warn-table')).bind('scroll', tablescroll)
									unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
									clearInterval(checkTableExist2);
								}
							}, 100);
						} else {
							checkTableExist2 = setInterval(function () {
								if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
									var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
									var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
									if (funcBar) {
										tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
									}
									angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
									unwatcher = $scope.$watch('displayedCollection', displayedColWatcherFunc, true);
									clearInterval(checkTableExist2);
								}
							}, 100);
						}
					}
				}, true)
			}
		}
		/*if($scope.tripinfoFullscreen){
				angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
				angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
				scrollvflagfull = false
				angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll',tablescroll)
			}
			else{
				angular.element(document.querySelector('.warn-table')).unbind('scroll')
				angular.element(document.querySelector('.warn-table'))[0].scrollTop = 0
				scrollvflag = false
				angular.element(document.querySelector('.warn-table')).bind('scroll',tablescroll)
			}
		},true)*/
		/*var tableWrap = angular.element(document.querySelector('.ng-table-content'))[0]
		tableWrap.scrollTop = 0;*/
	}

	$scope.showListFunc = function () {
		var winwidth = window.innerWidth
		if ($scope.tripInfo) {
			if (winwidth > 745) {
				$scope.tripinfoFullwidth = false
			} else {
				$scope.temptripInfo = $scope.tripInfo
				delete $scope.tripInfo
				delete $scope.tripinfoFullwidth
			}
		}
		$scope.showList = true
		if ($scope.infoboxOpen && $scope.tripInfo) {
			var tablewrap
			var table
			var scrollY
			var funcBar
			if (!$scope.tripinfoFullscreen) {
				tablewrap = document.getElementsByClassName('warn-table')[0]
				funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
			} else {
				tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
				funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
			}
			if (tablewrap) {
				table = tablewrap.getElementsByTagName('table')[0]
				scrollY = tablewrap.scrollTop
			}
			if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
				var firstRow = table.children[1].children[0]
				if (firstRow.children.length > 1) {
					var trh = table.children[0].children[0]
					var th = table.children[0]
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
					table.children[0].style.removeProperty('top')
					table.children[0].style.removeProperty('position')
					table.children[0].style.removeProperty('overflow')
					table.children[0].style.removeProperty('width')
					tablewrap.style.overflow = 'hidden'
					$timeout(function () {
						tablewrap.style.removeProperty('overflow')
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
						table.children[0].style.top = 'calc( 1.5rem + 13px + ' + funcBar.clientHeight + 'px )'
						table.children[0].style.position = 'absolute'
						table.children[0].style.overflow = 'hidden'
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
					}, true)
				}
			}
			checkTableExist2 = setInterval(function () {
				if (angular.element(document.querySelector('.warn-table'))) {
					var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
					var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
					if (funcBar) {
						tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
					}
					clearInterval(checkTableExist2);
				}
			}, 100);
		}
	}

	$scope.hideListFunc = function () {
		var winwidth = window.innerWidth
		$scope.showList = false
		if ($scope.tripInfo) {
			$scope.tripinfoFullwidth = true
		} else {
			if (winwidth <= 745 && $scope.temptripInfo) {
				$scope.tripInfo = $scope.temptripInfo
				$scope.tripinfoFullwidth = true
			}
		}
		if ($scope.infoboxOpen && $scope.tripInfo) {
			var tablewrap
			var table
			var scrollY
			var funcBar
			if (!$scope.tripinfoFullscreen) {
				tablewrap = document.getElementsByClassName('warn-table')[0]
				funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
			} else {
				tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
				funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
			}
			if (tablewrap) {
				table = tablewrap.getElementsByTagName('table')[0]
				scrollY = tablewrap.scrollTop
			}
			if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
				var firstRow = table.children[1].children[0]
				if (firstRow.children.length > 1) {
					var trh = table.children[0].children[0]
					var th = table.children[0]
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
					table.children[0].style.removeProperty('top')
					table.children[0].style.removeProperty('position')
					table.children[0].style.removeProperty('overflow')
					table.children[0].style.removeProperty('width')
					tablewrap.style.overflow = 'hidden'
					$timeout(function () {
						tablewrap.style.removeProperty('overflow')
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
						table.children[0].style.top = 'calc( 1.5rem + 13px + ' + funcBar.clientHeight + 'px )'
						table.children[0].style.position = 'absolute'
						table.children[0].style.overflow = 'hidden'
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
					}, true)
				}
			}
			checkTableExist2 = setInterval(function () {
				if (angular.element(document.querySelector('.warn-table'))) {
					var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
					var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
					if (funcBar) {
						tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
					}
					clearInterval(checkTableExist2);
				}
			}, 100);
		}
	}

	var scrollvflag = false;
	var scrollvflagfull = false;

	var tablescroll = function () {
		var tablewrap
		var table
		var tablefull
		var funcBar
		if (!$scope.tripinfoFullscreen) {
			tablewrap = document.getElementsByClassName('warn-table')[0]
			tablefull = false
			funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
		} else {
			tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
			tablefull = true
			funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
		}
		if (tablewrap) {
			table = tablewrap.getElementsByTagName('table')[0]
		}
		if (table) {
			var firstRow = table.children[1].children[0]
			if (firstRow.children.length > 1) {
				var trh = table.children[0].children[0]
				var th = table.children[0]
				var cellwidth = []
				if (tablewrap.scrollTop > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
					for (var i = 0; i < trh.children.length; i++) {
						var cellbody = firstRow.children[i]
						var cell = trh.children[i]
						var setWidth = cell.clientWidth > cellbody.clientWidth ? cell.clientWidth : cellbody.clientWidth
						cellwidth.push(setWidth)
					}
					if ((tablewrap.scrollHeight - tablewrap.clientHeight > table.children[0].children[0].clientHeight) && ((tablefull == false && scrollvflag == false) || (tablefull == true && scrollvflagfull == false))) {
						for (var i = 0; i < cellwidth.length; i++) {
							firstRow.children[i].style.width = cellwidth[i] + 'px'
							trh.children[i].style.width = cellwidth[i] + 'px'
							firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
							trh.children[i].style.minWidth = cellwidth[i] + 'px'
						}
						table.children[0].classList.add('table-stickyheader')
						table.children[0].style.top = 'calc( 1.5rem + 13px + ' + funcBar.clientHeight + 'px )'
						table.children[0].style.position = 'absolute'
						table.children[0].style.overflow = 'hidden'
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
						if (tablefull == true) {
							scrollvflagfull = true
						} else {
							scrollvflag = true
						}
					}
					if (tablewrap.scrollLeft > 0) {
						table.children[0].scrollLeft = tablewrap.scrollLeft
					} else {
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].scrollLeft = '-' + scrollbarWidth + 'px'
					}
				} else {
					if (tablefull == true) {
						scrollvflagfull = false
					} else {
						scrollvflag = false
					}
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
					table.children[0].style.removeProperty('top')
					table.children[0].style.removeProperty('position')
					table.children[0].style.removeProperty('overflow')
					table.children[0].style.removeProperty('width')
				}
			}
		}
	}

	/*angular.element($window).bind('resize', function () {
		clearInterval(checkTableExist2);
		var winwidth = window.innerWidth
		if (winwidth <= 745) {
			if ($scope.showList && $scope.tripInfo && $scope.infoboxOpen) {
				$scope.showList = false
				$scope.tripinfoFullwidth = true
			}
		} else {
			if ($scope.temptripInfo) {
				$scope.tripInfo = $scope.temptripInfo
			}
			if ($scope.showList && $scope.tripInfo && $scope.infoboxOpen) {
				$scope.showList = true
				$scope.tripinfoFullwidth = false
			}
		}
		if ($scope.infoboxOpen && $scope.tripInfo) {
			var tablewrap
			var table
			var scrollY
			var funcBar
			if (!$scope.tripinfoFullscreen) {
				tablewrap = document.getElementsByClassName('warn-table')[0]
				funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
			} else {
				tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
				funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
			}
			if (tablewrap) {
				table = tablewrap.getElementsByTagName('table')[0]
				scrollY = tablewrap.scrollTop
			}
			if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
				var firstRow = table.children[1].children[0]
				if (firstRow.children.length > 1) {
					var trh = table.children[0].children[0]
					var th = table.children[0]
					for (var j = 0; j < trh.children.length; j++) {
						firstRow.children[j].removeAttribute("style")
						trh.children[j].removeAttribute("style")
					}
					table.children[0].classList.remove('table-stickyheader')
					table.children[0].style.removeProperty('top')
					table.children[0].style.removeProperty('position')
					table.children[0].style.removeProperty('overflow')
					table.children[0].style.removeProperty('width')
					tablewrap.style.overflow = 'hidden'
					$scope.$apply()
					$timeout(function () {
						tablewrap.style.removeProperty('overflow')
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
						table.children[0].style.top = 'calc( 1.5rem + 13px + ' + funcBar.clientHeight + 'px )'
						table.children[0].style.position = 'absolute'
						table.children[0].style.overflow = 'hidden'
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
					}, true)
				}
			}
			if (!$scope.tripinfoFullscreen) {
				checkTableExist2 = setInterval(function () {
					if (angular.element(document.querySelector('.warn-table'))) {
						var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
						var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
						if (funcBar) {
							tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
						}
						clearInterval(checkTableExist2);
					}
				}, 100);
				$scope.$apply()
			} else {
				checkTableExist2 = setInterval(function () {
					if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
						var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
						var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
						if (funcBar) {
							tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
						}
						clearInterval(checkTableExist2);
					}
				}, 100);
				$scope.$apply()
			}
		}
		$scope.$apply()
	})*/

	angular.element($window).bind('resize', function () {
		clearInterval(checkTableExist2);
		var winwidth = window.innerWidth
		if(winwidth<=745){
			if($scope.showList&&$scope.tripInfo&&$scope.infoboxOpen){
				$scope.showList = false
				$scope.tripinfoFullwidth = true
			}
		}
		else{
			if($scope.temptripInfo){
				$scope.tripInfo = $scope.temptripInfo
			}
			if($scope.showList&&$scope.tripInfo&&$scope.infoboxOpen){
				$scope.showList = true
				$scope.tripinfoFullwidth = false
			}
		}
		if($scope.infoboxOpen&&$scope.tripInfo){
			var tablewrap
	        var table
	        var scrollY
	        var funcBar
	        if(!$scope.tripinfoFullscreen){
	            tablewrap = document.getElementsByClassName('warn-table')[0]
	            funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
	        }
	        else{
	            tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
	            funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
	        }
	        if(tablewrap){
	            table = tablewrap.getElementsByTagName('table')[0]
	            scrollY = tablewrap.scrollTop
	        }
	        if(scrollY&&scrollY>0&&tablewrap.scrollTop<=table.children[1].clientHeight){
	        	var firstRow = table.children[1].children[0]
	        	if(firstRow&&firstRow.children.length>1){
		            var trh = table.children[0].children[0]
		            var th = table.children[0]
		            var colength = firstRow.children.length<=trh.children.length?firstRow.children.length:trh.children.length
					for (var j = 0; j < colength; j++) {
						firstRow.children[j].removeAttribute("style")
						trh.children[j].removeAttribute("style")
					}
					/*for(var j=0; j<trh.children.length;j++){
		                firstRow.children[j].removeAttribute("style")
		                trh.children[j].removeAttribute("style")
		            }*/
		            table.children[0].classList.remove('table-stickyheader')
		            table.children[0].style.removeProperty('top')
		        	table.children[0].style.removeProperty('position')
		        	table.children[0].style.removeProperty('overflow')
		        	table.children[0].style.removeProperty('width')
		        	tablewrap.style.overflow = 'hidden'
		        	$scope.$apply()
		        	$timeout(function(){
			        	tablewrap.style.removeProperty('overflow')
			        	var cellwidth = []
			            for(var i=0;i<trh.children.length;i++){
			                var cellbody = firstRow.children[i]
			                var cell = trh.children[i]
			                var setWidth = cell.clientWidth>cellbody.clientWidth?cell.clientWidth:cellbody.clientWidth
			                cellwidth.push(setWidth)
			            }
			        	for(var i =0; i<cellwidth.length;i++){
			                firstRow.children[i].style.width = cellwidth[i]+'px'
			                trh.children[i].style.width = cellwidth[i]+'px'
			                firstRow.children[i].style.minWidth = cellwidth[i]+'px'
			                trh.children[i].style.minWidth = cellwidth[i]+'px'
			            }
			            table.children[0].classList.add('table-stickyheader')
			            table.children[0].style.top = 'calc( 1.5rem + 13px + '+funcBar.clientHeight+'px )'
			        	table.children[0].style.position = 'absolute'
			        	table.children[0].style.overflow = 'hidden'
			        	var scrollbarWidth = tablewrap.offsetWidth-tablewrap.clientWidth
		            	table.children[0].style.width = 'calc( 100% - '+scrollbarWidth+'px )'
		        	},true)
		        }
	        }
	        if(!$scope.tripinfoFullscreen){
	        	checkTableExist2 = setInterval(function() {
				   	if (angular.element(document.querySelector('.warn-table'))) {
				   		var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
				   		var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
				   		if(funcBar){
				   			tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - '+funcBar.clientHeight+'px )'
				   		}
				      	clearInterval(checkTableExist2);
				   	}
				}, 100);
				$scope.$apply()
	        }
	        else{
	        	checkTableExist2 = setInterval(function() {
			   	if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
			   		var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
			   		var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
			   		if(funcBar){
			   			tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - '+funcBar.clientHeight+'px )'
			   		}
			      	clearInterval(checkTableExist2);
				   }
				}, 100);
				$scope.$apply()
	        }
		}
		$scope.$apply()
	})

	var unwatcher

	var displayedColWatcherFunc = function (newValue, oldValue) {
		if (newValue && oldValue) {
			var tmp = angular.copy(newValue)
			var tmp2 = angular.copy(oldValue)
			var newselected = tmp.filter(function (item) {
				return item.hasOwnProperty("isSelected");
			})
			var oldselected = tmp2.filter(function (item) {
				return item.hasOwnProperty("isSelected");
			})
			for (var i = 0; i < newselected.length; i++) {
				var index = tmp.indexOf(newselected[i]);
				delete tmp[index].isSelected
			}
			for (var i = 0; i < oldselected.length; i++) {
				var index = tmp2.indexOf(oldselected[i]);
				delete tmp2[index].isSelected
			}
			if (!angular.equals(tmp, tmp2)) {
				if ($scope.infoboxOpen && $scope.tripInfo) {
					$timeout(function () {
						var tablewrap
						var table
						var scrollY
						var funcBar
						if (!$scope.tripinfoFullscreen) {
							tablewrap = document.getElementsByClassName('warn-table')[0]
							funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
						} else {
							tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
							funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
						}
						if (tablewrap) {
							table = tablewrap.getElementsByTagName('table')[0]
							scrollY = tablewrap.scrollTop
						}
						if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
							var firstRow = table.children[1].children[0]
							if (firstRow.children.length > 1) {
								var trh = table.children[0].children[0]
								var th = table.children[0]
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
								table.children[0].style.removeProperty('top')
								table.children[0].style.removeProperty('position')
								table.children[0].style.removeProperty('overflow')
								table.children[0].style.removeProperty('width')
								tablewrap.style.overflow = 'hidden'
								$scope.$apply()
								$timeout(function () {
									tablewrap.style.removeProperty('overflow')
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
									table.children[0].style.top = 'calc( 1.5rem + 13px + ' + funcBar.clientHeight + 'px )'
									table.children[0].style.position = 'absolute'
									table.children[0].style.overflow = 'hidden'
									var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
									table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
									if (scrollX > 0) {
										table.children[0].scrollLeft = tablewrap.scrollLeft
									} else {
										var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
										table.children[0].scrollLeft = '-' + scrollbarWidth + 'px'
									}
								}, true)
							}
						}
					})
				}
			}
		}
	}

	/*	$scope.deleteGoogle = function(){
			angular.element(document.querySelector("#map")).remove();
			var scriptEl = document.querySelector('script[src="' + $scope.gmapUrl + '&callback=lazyLoadCallback"]')
			if (scriptEl) {
	          document.body.removeChild(scriptEl);
	          var scriptHead = document.head.querySelectorAll('script[src^="https://maps.google"]')
	          for(var i=0;i<scriptHead.length;i++){
	          	document.head.removeChild(scriptHead[i])
	          }
	        }
	        delete window.google
		}

		$scope.deleteBaidu = function(){
			angular.element(document.querySelector("#map")).remove();
			var scriptEl = document.querySelectorAll('script[src^="http://api.map.baidu.com/"]')
			if (scriptEl) {
	          for(var i=0;i<scriptEl.length;i++){
	          	document.body.removeChild(scriptEl[i])
	          }
	          var stylesheetBMap = document.head.querySelectorAll('style')
	          for(var j=0; j<stylesheetBMap;j++){
	          	if(stylesheetBMap[j].textContent.indexOf('BMap')!==-1){
	          		document.head.removeChild(stylesheetBMap[j])
	          	}
	          }
	        }
	        delete window.baiduMapLoaded
		}*/

	$scope.checkBoundsGMap = function () {
		NgMap.getMap().then(function (ngmap) {
			if (!$scope.loadZoom && !$scope.loadCenter) {
				$scope.loadZoom = ngmap.getZoom()
				$scope.loadCenter = ngmap.getCenter()
			}
			var latNorth = ngmap.getBounds().getNorthEast().lat();
			var latSouth = ngmap.getBounds().getSouthWest().lat();
			var newLat;
			if (latNorth < 85 && latSouth > -85) /* in both side -> it's ok */
				return;
			else {
				if (latNorth > 85 && latSouth < -85) /* out both side -> it's ok */
					return;
				else {
					if (latNorth > 85)
						newLat = ngmap.getCenter().lat() - (latNorth - 85); /* too north, centering */
					if (latSouth < -85)
						newLat = ngmap.getCenter().lat() - (latSouth + 85); /* too south, centering */
				}
			}
			if (newLat) {
				var newCenter = new google.maps.LatLng(newLat, ngmap.getCenter().lng());
				ngmap.setCenter(newCenter);
			}
		});
	}

	$scope.checkBoundsBMap = function () {
		$scope.loadBMap().then(function () {
			var latNorth = $scope.ngBMap.getBounds().getNorthEast().lat;
			var latSouth = $scope.ngBMap.getBounds().getSouthWest().lat;
			var newLat;
			if (latNorth < 85 && latSouth > -81) /* in both side -> it's ok */
				return;
			else {
				if (latNorth > 85 && latSouth < -81) /* out both side -> it's ok */
					return;
				else {
					if (latNorth > 85)
						newLat = $scope.ngBMap.getCenter().lat - (latNorth - 74 + 10); /* too north, centering */
					if (latSouth < -81)
						newLat = $scope.ngBMap.getCenter().lat - (latSouth + 74 - 6); /* too south, centering */
				}
			}
			if (newLat) {
				var newCenter = new BMap.Point($scope.ngBMap.getCenter().lng, newLat);
				$scope.ngBMap.setCenter(newCenter);
			}
		})
	}

	$scope.checkZoomBMap = function () {
		if ($scope.markerInfo) {
			$scope.loadBMap().then(function () {
				var position = new BMap.Point($scope.markerInfo.lng, $scope.markerInfo.lat)
				$scope.ngBMap.setCenter(position);
				angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
					var infobox = document.getElementsByClassName("marker-info-wrapper")
					var panx = 0
					if ($scope.showList) {
						panx = -(270 / 2)
					}
					$scope.ngBMap.panBy(-panx, -(infobox[0].offsetHeight / 2))
				})
			})
		}
	}

	$scope.checkZoomGMap = function () {
		if ($scope.markerInfo) {
			NgMap.getMap().then(function (ngmap) {
				var position = new google.maps.LatLng($scope.markerInfo.lat, $scope.markerInfo.lng);
				ngmap.setCenter(position);
				angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
					var infobox = document.getElementsByClassName("marker-info-wrapper")
					var panx = 0
					if ($scope.showList) {
						panx = -(270 / 2)
					}
					ngmap.panBy(panx, infobox[0].offsetHeight / 2)
				})
			})
		}
	}

	$scope.loadBMap = function () {
		return new Promise(function (resolve, reject) {
			(function checkBMap() {
				if ($scope.ngBMap) {
					return resolve();
				}
				$timeout(checkBMap, 30)
			})()
		})
	}

	$scope.$on('$destroy', function () {
		if(angular.element(document.body).hasClass('md-dialog-is-showing')){
			$mdDialog.cancel()
		}
		angular.element($window).unbind('resize')
		clearInterval(checkTableExist);
		clearInterval(checkTableExist2);
		clearInterval(checkInfoClose);
		checkTableExist = undefined
		checkTableExist2 = undefined
		/*if($scope.mapchoosen=='googleMap'){
			$scope.deleteGoogle()
		}
		else{
			$scope.deleteBaidu()
		}*/
		angular.element(document.querySelector("#map")).remove();
		if ($scope.mapchoosen == 'baiduMap') {
			refetchMapService.deleteBaidu()
		}
	})

	$scope.dragResize = function (e) {
		var dragBorder = document.getElementsByClassName("marker-info-wrapper")[0]
		if (e.target == dragBorder) {
			e.preventDefault();
			$document.bind('mousemove', function (e) {
				var containervh = window.innerHeight
				var height = containervh - e.pageY
				if (height > 280 && height <= ((containervh - 48) / 2)) {
					dragBorder.style.height = height + 'px'
				} else {
					if (height <= 280) {
						dragBorder.style.height = 280 + 'px'
					} else {
						dragBorder.style.height = ((containervh - 48) / 2) + 'px'
					}
				}
			})
			$document.bind('mouseup', function (e) {
				$document.unbind('mousemove')
				$document.unbind('mouseup')
			})
		}
	}

	$scope.playVideo = function ($event, tripId, id, idx) {
		if (idx !== undefined && $scope.rowCollection[idx].isSelected) {
			$event.stopPropagation();
		}
		var trip = $scope.tripList.find(function (element) {
			return element.trip_id == tripId;
		});
		var licence = trip.licence;
		$mdDialog.show({
				controller: DialogController,
				templateUrl: '/view/component/dialog/warnVideoDialog.html',
				parent: angular.element(document.querySelector('.map-wrap')),
				targetEvent: $event,
				locals: {
					videoLink: appConfig.video + licence + '/' + id,
					lang: $scope.lang
				},
				clickOutsideToClose: false,
				escapeToClose: false,
				focusOnOpen: false,
				//hasBackdrop:true,
				disableParentScroll: true,
				fullscreen: true // Only for -xs, -sm breakpoints.
			})
			.then(function (answer) {

			}, function () {
				//angular.element($window).unbind('resize')
				angular.element($window).bind('resize', function () {
					clearInterval(checkTableExist2);
					var winwidth = window.innerWidth
					if (winwidth <= 745) {
						if ($scope.showList && $scope.tripInfo) {
							$scope.showList = false
							$scope.tripinfoFullwidth = true
						}
					} else {
						if ($scope.temptripInfo) {
							$scope.tripInfo = $scope.temptripInfo
						}
						if ($scope.showList && $scope.tripInfo) {
							$scope.showList = true
							$scope.tripinfoFullwidth = false
						}
					}
					/*if(winwidth<=745){
						if($scope.temptripInfo){
							$scope.tripInfo = $scope.temptripInfo
						}
						if($scope.showList&&$scope.tripInfo){
							$scope.showList = false
							$scope.tripinfoFullwidth = true
						}
					}*/
					if ($scope.infoboxOpen && $scope.tripInfo && !$scope.tripinfoFullscreen) {
						checkTableExist2 = setInterval(function () {
							if (angular.element(document.querySelector('.warn-table'))) {
								var tableWrap = angular.element(document.querySelector('.warn-table'))[0]
								var funcBar = angular.element(document.querySelector('.marker-info-content .custom-btn-wrap'))[0]
								if (funcBar) {
									tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
								}
								clearInterval(checkTableExist2);
							}
						}, 100);
						$scope.$apply()
					}
					if ($scope.infoboxOpen && $scope.tripInfo && $scope.tripinfoFullscreen) {
						checkTableExist2 = setInterval(function () {
							if (angular.element(document.querySelector('.warn-table-fullscreen'))) {
								var tableWrap = angular.element(document.querySelector('.warn-table-fullscreen'))[0]
								var funcBar = angular.element(document.querySelector('.marker-info-content-fullscreen .custom-btn-wrap'))[0]
								if (funcBar) {
									tableWrap.style.height = 'calc( 100% - 1.5rem - 13px - ' + funcBar.clientHeight + 'px )'
								}
								clearInterval(checkTableExist2);
							}
						}, 100);
						$scope.$apply()
					}
					$scope.$apply()
				})
			});
	}

	$scope.checkMileage = function (event) {
		var keyCode = ('which' in event) ? event.which : event.keyCode;

		var isNumeric = (keyCode >= 48 /* KeyboardEvent.DOM_VK_0 */ && keyCode <= 57 /* KeyboardEvent.DOM_VK_9 */ ) || (keyCode >= 96 /* KeyboardEvent.DOM_VK_NUMPAD0 */ && keyCode <= 105 /* KeyboardEvent.DOM_VK_NUMPAD9 */ );

		var modifiers = (event.altKey || event.ctrlKey || event.shiftKey || keyCode == 8);

		var decimals = (keyCode == 110 || keyCode == 190);

		var inputvalue = event.target.value
		var decimalpos = inputvalue.indexOf(".");
		var result
		if (decimalpos !== -1) {
			if (inputvalue.length - 1 == decimalpos) {
				result = isNumeric || modifiers;
			} else {
				result = false || modifiers;
			}
		} else {
			result = isNumeric || modifiers || decimals;
		}
		if (!result) {
			event.preventDefault()
		}
	}

	function DialogController($scope, $mdDialog, videoLink, lang, $window, httpSuccessCheck, appConfig, $translate) {
		angular.element($window).unbind('resize')
		var html = document.getElementsByTagName('HTML')[0]
		html.style.msOverflowStyle = 'none';
		$timeout(function () {
			html.style.removeProperty('overflow-y')
		})
		$scope.posterLink = appConfig.videoLoad
		$scope.videoLink = videoLink
		$scope.cancel = function () {
			$mdDialog.cancel();
		};
		/*$scope.setVideo = function () {
			var element = angular.element(document.querySelector('.warn-dialog'))
			if (element[0].children[0].clientHeight == $window.innerHeight) {
				element[0].children[0].style.marginLeft = 'calc( ( 100vw - 177.78vh ) / 2 )'
				element[0].children[1].style.marginRight = 'calc( ( 100vw - 177.78vh ) / 2 )'
			} else {
				element[0].children[0].style.removeProperty('margin-left')
				element[0].children[1].style.removeProperty('margin-right')
			}
			if (element[0].children[0].clientWidth == $window.innerWidth) {
				element[0].children[0].style.marginTop = 'calc( ( 100vh - 56.25vw ) / 2 )'
				element[0].children[1].style.marginTop = 'calc( ( 100vh - 56.25vw ) / 2 )'
			} else {
				element[0].children[0].style.removeProperty('margin-top')
				element[0].children[1].style.removeProperty('margin-top')
			}
		}
		angular.element($window).on('resize', $scope.setVideo)
		$scope.$watch([$window.innerHeight, $window.innerWidth], function (newValue, oldValue) {
			$scope.setVideo();
		})

		$scope.handleError = function () {
			$scope.posterLink = appConfig.videoError
		}*/

		$scope.setVideo = function () {
			var element = angular.element(document.querySelector('.warn-dialog'))
			if (element[0].children[0].clientHeight == $window.innerHeight) {
				element[0].children[0].style.marginLeft = 'calc( ( 100vw - 177.78vh ) / 2 )'
			} else {
				element[0].children[0].style.removeProperty('margin-left')
			}
			if (element[0].children[0].clientWidth == $window.innerWidth) {
				element[0].children[0].style.marginTop = 'calc( ( 100vh - 56.25vw ) / 2 )'
			} else {
				element[0].children[0].style.removeProperty('margin-top')
			}
		}

		var options = appConfig.videoOptions
		options.language = lang
		var player

		angular.element(document).ready(function () {
	        player = videojs('warn-video',options);
	        player.poster($scope.posterLink);
			player.src({type: 'video/mp4', src: $scope.videoLink});
		    player.on("click", function(event){
				if(event.target.title=="Close"||event.target.title==$translate.instant("close")||event.target.parentElement.title=="Close"||event.target.parentElement.title==$translate.instant("close")){
					event.preventDefault();
					player.dispose()
					player = null
					$scope.cancel()
				}
		    });
		    player.on("error", function(event){
		    	player.loadingSpinner.hide()
		        $scope.posterLink = appConfig.videoError
		        player.poster($scope.posterLink);
		    });
		    angular.element($window).on('resize', $scope.setVideo)
			$scope.$watch([$window.innerHeight, $window.innerWidth], function (newValue, oldValue) {
				$scope.setVideo();
			})

	    });

		$scope.$on('$destroy', function () {
			if(player){
				player.dispose()
			}
			html.style.removeProperty('-ms-overflow-style')
			angular.element($window).off('resize')
			angular.element(document.body)[0].style.removeProperty('position');
		})
	}

	DialogController.$inject = ["$scope", "$mdDialog", "videoLink", "lang", "$window", "httpSuccessCheck", "appConfig", "$translate"];
}]);