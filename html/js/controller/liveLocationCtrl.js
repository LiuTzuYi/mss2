/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:30
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:23:35
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name liveLocationCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,NgMap,appConfig,$interval,$filter,user,Idle,Keepalive,responsiveCheck,httpSuccessCheck,alertBox,refetchMapService,$compile,mapConfig
 * @description
 *   Controller for live location page.
 */
angular.module('carSafety').controller("liveLocationCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "tmhDynamicLocale", "NgMap", "appConfig", "$interval", "$filter", "user", "Idle", "Keepalive", "responsiveCheck", "httpSuccessCheck", "alertBox", "refetchMapService", "$compile", "mapConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, tmhDynamicLocale, NgMap, appConfig, $interval, $filter, user, Idle, Keepalive, responsiveCheck, httpSuccessCheck, alertBox, refetchMapService, $compile, mapConfig) {
	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	blockUi.addClass('block-ui-active block-ui-visible')
	/*$scope.setTitle = function(){
		$timeout(function(){
			window.document.title = $translate.instant('liveLocation');
		}, 50);
	}*/

	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;
	/*$translate.use($scope.lang);
	$scope.setTitle();*/
	window.document.title = $translate.instant('liveLocation');
	var errorphpalert = false

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
		if (angular.isDefined(live)) {
			$interval.cancel(live);
			live = undefined;
		}
		alertBox.idleAlert()
	})

	$scope.$on('IdleEnd', function () {
		swal.close(function () {
			clearInterval(timerInterval)
		})
		if ($scope.mapchoosen == 'googleMap') {
			NgMap.getMap().then(function (ngmap) {
				live = $interval(googleDataRefresh, 60000)
			})
		} else {
			$scope.loadBMap().then(function () {
				live = $interval(baiduDataRefresh, 60000)
			})
		}
	})

	$scope.$on('IdleTimeout', function () {
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

	$scope.infoboxOpen = true

	$scope.toggleInfo = function ($event) {
		$event.stopPropagation();
		$scope.infoboxOpen = !$scope.infoboxOpen
		if ($scope.infoboxOpen) {
			var winwidth = window.innerWidth
			if (winwidth <= 745) {
				$scope.showList = false
				$scope.markinfoFullwidth = true
			}
		}
	}

	$scope.refreshList = function ($event) {
		$event.stopPropagation();
		$scope.reloading = true;
		$http({
			method: 'GET',
			url: '/api/liveLocation/' + $scope.mapchoosen
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.errorAlert('90101_01')
				delete $scope.reloading
			}
			else {
				$scope.locationdata = response.data.data
				$scope.statusCnt = response.data.dataCnt
				$scope.deviceCnt = response.data.deviceCnt
				var filtered = response.data.data
				for (var i = 0; i < $scope.deviceStatuss.length; i++) {
					if ($scope.deviceStatus.indexOf($scope.deviceStatuss[i]) == -1) {
						filtered = $scope.redrawMark(filtered, {
							'status': '!' + $scope.deviceStatuss[i]
						}, $scope.deviceStatuss[i], true)
					}
				}
				for (var i = 0; i < $scope.runStatuss.length; i++) {
					if ($scope.runStatus.indexOf($scope.runStatuss[i]) == -1) {
						filtered = $scope.redrawMark(filtered, {
							'runStatus': '!' + $scope.runStatuss[i]
						}, $scope.runStatuss[i], true)
					}
				}
				$scope.markersList = filtered
				$scope.markers = filtered.filter(function (x) {
					return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
				})
				$scope.setSelectedMarkShow($scope.markers)
				delete $scope.reloading
				blockUi.removeClass('block-ui-active block-ui-visible')
				if(response.data.code){
					alertBox.errorAlert(response.data.code)
				}
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('90101_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
			delete $scope.reloading
		});
	}

	$scope.updatemap = function (map) {
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

	$scope.mapchoosen = $scope.userInfo.map
	$scope.mapset = {
		map: angular.copy($scope.mapchoosen)
	}
	$scope.showList = true
	$scope.hideFilter = false
	$scope.hideFilterlist = false
	$scope.showRunAssist = false
	$scope.showSelectedMark = false
	$scope.markinfoFullscreen = false
	$scope.selectedMark = appConfig.defaultSelectedMark
	$scope.online = appConfig.online
	$scope.offline = appConfig.offline
	$scope.offlinegt = appConfig.offlinegt
	$scope.selectedMarkIcon = appConfig.selectedMarkIcon

	if ($scope.mapchoosen == 'baiduMap') {
		refetchMapService.deleteGoogle()
	}

	$scope.showListFunc = function () {
		var winwidth = window.innerWidth
		if ($scope.markerInfo) {
			if (winwidth > 745) {
				$scope.markinfoFullwidth = false
			} else {
				$scope.tempmarkerInfo = $scope.markerInfo
				delete $scope.markerInfo
				delete $scope.markinfoFullwidth
			}
		}
		$scope.showList = true
	}

	$scope.toggleFilter = function () {
		$scope.hideFilter = !$scope.hideFilter
		$timeout(function () {
			$scope.$broadcast('$md-resize')
			$scope.$apply()
		}, true)
	}

	$scope.hideListFunc = function () {
		var winwidth = window.innerWidth
		$scope.showList = false
		if ($scope.markerInfo) {
			$scope.markinfoFullwidth = true
		} else {
			if (winwidth <= 745 && $scope.tempmarkerInfo) {
				$scope.markerInfo = $scope.tempmarkerInfo
				$scope.markinfoFullwidth = true
			}
		}
	}

	$scope.mapLoading = true
	var live;

	function googleDataRefresh() {
		if (!$scope.reloading) {
			$http({
				method: 'GET',
				url: '/api/liveLocation/' + $scope.mapchoosen
			}).then(function successCallback(response) {
				var errorphp = httpSuccessCheck.checkHttp(response)
				if (errorphp) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					if (!errorphpalert) {
						alertBox.liveAlert('90101_01')
						if (alertBox.liveAlertFlag) {
							errorphpalert = true
						}
					}
				} else {
					$scope.locationdata = response.data.data
					$scope.statusCnt = response.data.dataCnt
					$scope.deviceCnt = response.data.deviceCnt
					var filtered = response.data.data
					for (var i = 0; i < $scope.deviceStatuss.length; i++) {
						if ($scope.deviceStatus.indexOf($scope.deviceStatuss[i]) == -1) {
							filtered = $scope.redrawMark(filtered, {
								'status': '!' + $scope.deviceStatuss[i]
							}, $scope.deviceStatuss[i], true)
						}
					}
					for (var i = 0; i < $scope.runStatuss.length; i++) {
						if ($scope.runStatus.indexOf($scope.runStatuss[i]) == -1) {
							filtered = $scope.redrawMark(filtered, {
								'runStatus': '!' + $scope.runStatuss[i]
							}, $scope.runStatuss[i], true)
						}
					}
					$scope.markersList = filtered
					$scope.markers = filtered.filter(function (x) {
						return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
					})
					$timeout(function () {
						$scope.setSelectedMarkShow($scope.markers)
					})
					$scope.$broadcast('$md-resize')
					blockUi.removeClass('block-ui-active block-ui-visible')
					if(response.data.code){
						alertBox.errorAlert(response.data.code)
					}
				}
			}, function errorCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkerrorHttp(response)
				if (!errorphpalert) {
					if (errorphp) {
						alertBox.liveAlert('90101_' + errorphp)
					} else {
						alertBox.liveAlert(response.data.code)
					}
					if (alertBox.liveAlertFlag) {
						errorphpalert = true
					}
				}
			});
		}
	}

	function baiduDataRefresh() {
		if (!$scope.reloading) {
			$http({
				method: 'GET',
				url: '/api/liveLocation/' + $scope.mapchoosen
			}).then(function successCallback(response) {
				var errorphp = httpSuccessCheck.checkHttp(response)
				if (errorphp) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					if (!errorphpalert) {
						alertBox.liveAlert('90101_01')
						if (alertBox.liveAlertFlag) {
							errorphpalert = true
						}
					}
				} else {
					$scope.locationdata = response.data.data
					$scope.statusCnt = response.data.dataCnt
					$scope.deviceCnt = response.data.deviceCnt
					var filtered = response.data.data
					for (var i = 0; i < $scope.deviceStatuss.length; i++) {
						if ($scope.deviceStatus.indexOf($scope.deviceStatuss[i]) == -1) {
							filtered = $scope.redrawMark(filtered, {
								'status': '!' + $scope.deviceStatuss[i]
							}, $scope.deviceStatuss[i], true)
						}
					}
					for (var i = 0; i < $scope.runStatuss.length; i++) {
						if ($scope.runStatus.indexOf($scope.runStatuss[i]) == -1) {
							filtered = $scope.redrawMark(filtered, {
								'runStatus': '!' + $scope.runStatuss[i]
							}, $scope.runStatuss[i], true)
						}
					}
					$scope.markersList = filtered
					$scope.markers = filtered.filter(function (x) {
						return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
					})
					$timeout(function () {
						$scope.setSelectedMarkShow($scope.markers)
					})
					$scope.$broadcast('$md-resize')
					blockUi.removeClass('block-ui-active block-ui-visible')
					if(response.data.code){
						alertBox.errorAlert(response.data.code)
					}
				}
			}, function errorCallback(response) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				var errorphp = httpSuccessCheck.checkerrorHttp(response)
				if (!errorphpalert) {
					if (errorphp) {
						alertBox.liveAlert('90101_' + errorphp)
					} else {
						alertBox.liveAlert(response.data.code)
					}
					if (alertBox.liveAlertFlag) {
						errorphpalert = true
					}
				}
			});
		}
	}

	$http({
		method: 'GET',
		url: '/api/liveLocation/' + $scope.mapchoosen
	}).then(function successCallback(response) {
		var errorphp = httpSuccessCheck.checkHttp(response)
		if (errorphp) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			alertBox.liveAlert('90101_01')
			if (alertBox.liveAlertFlag) {
				errorphpalert = true
			}
			$scope.locationdata = []
		} else {
			blockUi.addClass('block-ui-active block-ui-visible')
			$scope.locationdata = response.data.data
			$scope.statusCnt = response.data.dataCnt
			$scope.deviceCnt = response.data.deviceCnt
		}
		if ($scope.mapchoosen == 'googleMap') {
			var filtered = $scope.locationdata
			filtered = $scope.redrawMark(filtered, {
				'status': '!I'
			}, 'I', true)
			$scope.markersList = filtered;
			$scope.markers = filtered.filter(function (x) {
				return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
			});
			NgMap.getMap().then(function (ngmap) {
				NgMap.initMap('map')
				blockUi.addClass('block-ui-active block-ui-visible')
				//$scope.mapLoading=false
				live = $interval(googleDataRefresh, 60000)
				$scope.mapLoading = false
				blockUi.removeClass('block-ui-active block-ui-visible')
				if(response.data.code){
					alertBox.errorAlert(response.data.code)
				}
			})
		} else {
			blockUi.addClass('block-ui-active block-ui-visible')
			$scope.loadBMap().then(function () {
				var pointArr = []
				for (var i = 0; i < $scope.locationdata.length; i++) {
					if (($scope.locationdata[i].lng !== null && $scope.locationdata[i].lat !== null) && ($scope.locationdata[i].lng !== 0 && $scope.locationdata[i].lat !== 0))
						pointArr.push(new BMap.Point($scope.locationdata[i].lng, $scope.locationdata[i].lat))
				}
				$scope.ngBMap.setViewport(pointArr)
				if (!$scope.loadZoom && !$scope.loadCenter) {
					$scope.loadZoom = $scope.ngBMap.getZoom()
					$scope.loadCenter = $scope.ngBMap.getCenter()
				}
				var filtered = $scope.locationdata
				filtered = $scope.redrawMark(filtered, {
					'status': '!I'
				}, 'I', true)
				$scope.markersList = filtered;
				$scope.markers = filtered.filter(function (x) {
					return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
				});
				//$scope.mapLoading=false
				$scope.$apply();
				live = $interval(baiduDataRefresh, 60000)
				$timeout(function () {
					$scope.mapLoading = false
					blockUi.removeClass('block-ui-active block-ui-visible')
					if(response.data.code){
						alertBox.errorAlert(response.data.code)
					}
				})
			})
		}
	}, function errorCallback(response) {
		blockUi.removeClass('block-ui-active block-ui-visible')
		$scope.mapLoading = false
		var errorphp = httpSuccessCheck.checkerrorHttp(response)
		if (errorphp) {
			alertBox.liveAlert('90101_' + errorphp)
		} else {
			alertBox.liveAlert(response.data.code)
		}
		$scope.locationdata = []
		if ($scope.mapchoosen == 'googleMap') {
			$scope.markersList = $scope.locationdata;
			$scope.markers = $scope.locationdata.filter(function (x) {
				return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
			});
			NgMap.getMap().then(function (ngmap) {
				NgMap.initMap('map')
				$scope.mapLoading = false
				live = $interval(googleDataRefresh, 60000)
			})
		} else {
			blockUi.addClass('block-ui-active block-ui-visible')
			$scope.loadBMap().then(function () {
				var pointArr = []
				for (var i = 0; i < $scope.locationdata.length; i++) {
					if (($scope.locationdata[i].lng !== null && $scope.locationdata[i].lat !== null) && ($scope.locationdata[i].lng !== 0 && $scope.locationdata[i].lat !== 0))
						pointArr.push(new BMap.Point($scope.locationdata[i].lng, $scope.locationdata[i].lat))
				}
				$scope.ngBMap.setViewport(pointArr)
				if (!$scope.loadZoom && !$scope.loadCenter) {
					$scope.loadZoom = $scope.ngBMap.getZoom()
					$scope.loadCenter = $scope.ngBMap.getCenter()
				}
				$scope.markersList = $scope.locationdata;
				$scope.markers = $scope.locationdata.filter(function (x) {
					return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
				});
				$scope.mapLoading = false
				$scope.$apply();
				live = $interval(baiduDataRefresh, 60000)
				$timeout(function () {
					blockUi.removeClass('block-ui-active block-ui-visible')
				})
			})
		}
	});


	$scope.runStatuss = ['online', 'offline', 'offlinegt']

	$scope.runStatus = ['online', 'offline', 'offlinegt']

	$scope.deviceStatuss = ['A', 'I']

	$scope.deviceStatus = ['A']

	$scope.filterLic = {}

	$scope.showDatainFull = function () {
		$scope.markinfoFullscreen = true;
		window.scrollTo(0,0)
		document.getElementsByClassName("map-wrap")[0].style.height = '100vh'
		document.getElementsByClassName("map-wrap")[0].style.overflow = 'hidden'
	}

	$scope.showDatainNorm = function () {
		$scope.markinfoFullscreen = false;
		window.scrollTo(0,0)
		document.getElementsByClassName("map-wrap")[0].style.removeProperty('height');
		document.getElementsByClassName("map-wrap")[0].style.removeProperty('overflow');
	}

	$scope.dragResize = function (e) {
		var dragBorder = document.getElementsByClassName("marker-info-wrapper")[0]
		if (e.target == dragBorder) {
			e.preventDefault();
			$document.bind('mousemove', function (e) {
				var containervh = window.innerHeight
				var height = containervh - e.pageY
				if (height > 250 && height <= ((containervh - 48) / 2)) {
					dragBorder.style.height = height + 'px'
				} else {
					if (height <= 250) {
						dragBorder.style.height = 250 + 'px'
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

	$scope.isMobile = responsiveCheck.checkDevice();

	$scope.isListSelected = function (marker) {
		var selected = angular.equals($scope.selectedMark, marker)
		return selected
	}

	$scope.isListClickable = function (marker) {
		return ((marker.lat == null && marker.lng == null) || (marker.lat == 0 && marker.lng == 0))
	}

	$scope.checkSelectedMark = function () {
		var arr = $filter('filter')($scope.markersList, $scope.filterLic, false)
		$scope.setSelectedMarkShow(arr)
	}

	$scope.setSelectedMarkShow = function (list) {
		var selected = false
		for (var i = 0; i < list.length; i++) {
			var test = angular.equals($scope.selectedMark, list[i])
			if (test) {
				selected = true
				break
			}
		}
		if (selected) {
			$scope.showSelectedMark = true
		} else {
			$scope.showSelectedMark = false
			$scope.markinfoFullscreen = false
			document.getElementsByClassName("map-wrap")[0].style.removeProperty('height');
			document.getElementsByClassName("map-wrap")[0].style.removeProperty('overflow');
			$scope.selectedMark = appConfig.defaultSelectedMark
			delete $scope.markerInfo
			delete $scope.markinfoFullwidth
			delete $scope.tempmarkerInfo
		}
	}

	$scope.hoverMarkDataGMap = function (event, marker) {
		NgMap.getMap().then(function (ngmap) {
			$scope.hoverPopData = marker
			if ($scope.hoverPopData) {
				$timeout(function () {
					ngmap.showInfoWindow('live-point', marker.sn);
				}, true)
			}
		})
	}

	$scope.hoverMarkDataBMap = function (marker) {
		$scope.loadBMap().then(function () {
			$scope.hoverPopData = marker
			$scope.$apply()
			if ($scope.hoverPopData) {
				$timeout(function () {
					var element = angular.element(document.getElementById('b-live-point')).clone()
					var content = element.html()
					element.contents().remove()
					element.html(content)
					$compile(element.contents())($scope)
					var tmplng = marker.lng
					var tmplat = marker.lat
					var offset = new BMap.Size(0, -33);
					var ifwd = new BMap.InfoWindow(element[0].children[0], {
						width: 0,
						height: 0,
						offset: offset
					})
					ifwd.addEventListener('clickclose', $scope.hideHoverMark)
					$scope.ngBMap.openInfoWindow(ifwd, new BMap.Point(tmplng, tmplat))
					$timeout(function () {
						if (document.querySelector('.map-wrap .BMap_pop>img')) {
							if (document.querySelector('.map-wrap .BMap_pop>img').offsetLeft > 0) {
								var left = document.querySelector('.map-wrap .BMap_pop>img').offsetLeft - 7 + 15
								document.querySelector('.map-wrap .BMap_pop>img').style.left = left + 'px'
							}
						}
					}, true)
				})
			}
		})
	}

	//click close on info window
	$scope.hideHoverMark = function () {
		delete $scope.hoverPopData
	}

	//mouseout
	$scope.hideHoverMarkGMap = function () {
		NgMap.getMap().then(function (ngmap) {
			ngmap.hideInfoWindow('live-point');
			//delete $scope.hoverPopData
		})
	}

	//mouseout
	$scope.hideHoverMarkBMap = function () {
		$scope.loadBMap().then(function () {
			$scope.ngBMap.closeInfoWindow()
			delete $scope.hoverPopData
		})
	}

	$scope.closeDataBox = function () {
		if ($scope.markinfoFullscreen) {
			$scope.markinfoFullscreen = false;
		}
		$scope.selectedMark = appConfig.defaultSelectedMark
		$scope.showSelectedMark = false
		delete $scope.markerInfo
	}

	$scope.showMarkDataGMap = function (event, marker) {
		var winwidth = window.innerWidth
		if ($scope.showList) {
			if (winwidth <= 745) {
				$scope.showList = false
				$scope.markinfoFullwidth = true
			} else {
				$scope.markinfoFullwidth = false
			}
		} else {
			$scope.markinfoFullwidth = true
		}
		var that = this
		NgMap.getMap().then(function (ngmap) {
			if ($scope.selectedMark !== marker) {
				$scope.selectedMark = marker
				$scope.showSelectedMark = true
				ngmap.setCenter(that.getPosition());
				$scope.markerInfo = marker
				if ($scope.infoboxOpen) {
					angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
						var infobox = document.getElementsByClassName("marker-info-wrapper")
						var xheight = 0
						if (!$scope.markinfoFullwidth) {
							xheight = 270 / 2
						}
						var yheight = infobox[0].offsetHeight / 2
						ngmap.panBy(-xheight, yheight)
					})
				} else {
					var xheight = 0
					if (!$scope.markinfoFullwidth) {
						xheight = 270 / 2
					}
					ngmap.panBy(-xheight, 0)
				}
			}
		})
	}

	$scope.showMarkDataBMap = function (marker) {
		var winwidth = window.innerWidth
		if ($scope.showList) {
			if (winwidth <= 745) {
				$scope.showList = false
				$scope.markinfoFullwidth = true
			} else {
				$scope.markinfoFullwidth = false
			}
		} else {
			$scope.markinfoFullwidth = true
		}
		$scope.loadBMap().then(function () {
			if ($scope.selectedMark !== marker) {
				$scope.selectedMark = marker
				$scope.showSelectedMark = true
				$scope.ngBMap.setCenter(new BMap.Point(marker.lng, marker.lat));
				$scope.markerInfo = marker
				$scope.$apply();
				if ($scope.infoboxOpen) {
					angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
						var infobox = document.getElementsByClassName("marker-info-wrapper")
						var xheight = 0
						if (!$scope.markinfoFullwidth) {
							xheight = 270 / 2
						}
						var yheight = infobox[0].offsetHeight / 2
						$scope.ngBMap.panBy(xheight, -yheight)
					})
				} else {
					var xheight = 0
					if (!$scope.markinfoFullwidth) {
						xheight = 270 / 2
					}
					$scope.ngBMap.panBy(xheight, 0)
				}
			}
		})
	}

	$scope.showMarkDataByList = function (marker) {
		if ((marker.lat !== null && marker.lng !== null) && (marker.lat !== 0 && marker.lng !== 0)) {
			if (!angular.equals(marker, $scope.selectedMark)) {
				var winwidth = window.innerWidth
				if ($scope.showList) {
					if (winwidth <= 745) {
						if ($scope.tempmarkerInfo) {
							$scope.markerInfo = $scope.tempmarkerInfo
						}
						$scope.showList = false
						$scope.markinfoFullwidth = true
					} else {
						$scope.markinfoFullwidth = false
					}
				} else {
					$scope.markinfoFullwidth = true
				}
				if ($scope.mapchoosen == 'googleMap') {
					if ($scope.gloaded) {
						NgMap.getMap().then(function (ngmap) {
							var position = new google.maps.LatLng(marker.lat, marker.lng);
							if ($scope.selectedMark !== marker) {
								$scope.selectedMark = marker
								$scope.showSelectedMark = true
								ngmap.setCenter(position);
								$scope.markerInfo = marker
								if ($scope.infoboxOpen) {
									angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
										var infobox = document.getElementsByClassName("marker-info-wrapper")
										var xheight = 0
										if (!$scope.markinfoFullwidth) {
											xheight = 270 / 2
										}
										var yheight = infobox[0].offsetHeight / 2
										ngmap.panBy(-xheight, yheight)
									})
								} else {
									var xheight = 0
									if (!$scope.markinfoFullwidth) {
										xheight = 270 / 2
									}
									ngmap.panBy(-xheight, 0)
								}
							}
						})
					}
				} else {
					$scope.loadBMap().then(function () {
						var position = new BMap.Point(marker.lng, marker.lat)
						if ($scope.selectedMark !== marker) {
							$scope.selectedMark = marker
							$scope.showSelectedMark = true
							$scope.ngBMap.setCenter(position);
							$scope.markerInfo = marker
							$scope.$apply();
							if ($scope.infoboxOpen) {
								angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
									var infobox = document.getElementsByClassName("marker-info-wrapper")
									var xheight = 0
									if (!$scope.markinfoFullwidth) {
										xheight = 270 / 2
									}
									var yheight = infobox[0].offsetHeight / 2
									$scope.ngBMap.panBy(xheight, -yheight)
								})
							} else {
								var xheight = 0
								if (!$scope.markinfoFullwidth) {
									xheight = 270 / 2
								}
								$scope.ngBMap.panBy(xheight, 0)
							}
						}
					})
				}
			} else {
				$scope.selectedMark = appConfig.defaultSelectedMark
				$scope.showSelectedMark = false
				delete $scope.markerInfo
			}
		}
	}

	$scope.resetFilter = function () {
		blockUi.addClass('block-ui-active block-ui-visible')
		$scope.filterLic = {}
		$scope.runStatus = ['online', 'offline', 'offlinegt']
		$scope.deviceStatus = ['A']
		var filtered = $scope.locationdata
		filtered = $scope.redrawMark(filtered, {
			'status': '!I'
		}, 'I', true)
		$scope.markersList = filtered;
		$scope.markers = filtered.filter(function (x) {
			return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
		});
		if ($scope.mapchoosen == 'googleMap') {
			NgMap.getMap().then(function (ngmap) {
				if (!$scope.markerInfo) {
					ngmap.setCenter($scope.loadCenter)
				}
				ngmap.setZoom($scope.loadZoom)
			})
		} else {
			$scope.loadBMap().then(function () {
				if (!$scope.markerInfo) {
					$scope.ngBMap.setCenter($scope.loadCenter)
				}
				$scope.ngBMap.setZoom($scope.loadZoom)
			})
		}
		blockUi.removeClass('block-ui-active block-ui-visible')
	}

	$scope.redrawMark = function (list, func, item, flag) {
		var arr = $filter('filter')(list, func, flag)
		return arr
	}

	$scope.toggle = function (item, list, key) {
		blockUi.addClass('block-ui-active block-ui-visible')
		$scope.reloading = true;
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
			func = {}
			func[key] = '!' + item
			var filtered = $scope.redrawMark($scope.markersList, func, item, true)
			$scope.markersList = filtered
			$scope.markers = filtered.filter(function (x) {
				return ((x.lat !== null && x.lng !== null) && (x.lat !== 0 && x.lng !== 0))
			})
			$timeout(function () {
				$scope.setSelectedMarkShow($scope.markers)
				$scope.reloading = false;
				$scope.$broadcast('$md-resize')
				blockUi.removeClass('block-ui-active block-ui-visible')
			}, true)
		} else {
			list.push(item);
			func = {}
			func[key] = item
			var filtered = $scope.redrawMark($scope.locationdata, func, item, true)
			if (key == 'runStatus') {
				for (var i = 0; i < $scope.deviceStatuss.length; i++) {
					if ($scope.deviceStatus.indexOf($scope.deviceStatuss[i]) == -1) {
						filtered = $scope.redrawMark(filtered, {
							'status': '!' + $scope.deviceStatuss[i]
						}, $scope.deviceStatuss[i], true)
					}
				}
			} else {
				for (var i = 0; i < $scope.runStatuss.length; i++) {
					if ($scope.runStatus.indexOf($scope.runStatuss[i]) == -1) {
						filtered = $scope.redrawMark(filtered, {
							'runStatus': '!' + $scope.runStatuss[i]
						}, $scope.runStatuss[i], true)
					}
				}
			}
			for (var i = 0; i < filtered.length; i++) {
				$scope.markersList.push(filtered[i]);
				if ((filtered[i].lat !== null && filtered[i].lng !== null) && (filtered[i].lat !== 0 && filtered[i].lng !== 0)) {
					$scope.markers.push(filtered[i]);
				}
			}
			$timeout(function () {
				$scope.setSelectedMarkShow($scope.markers)
				$scope.reloading = false;
				$scope.$broadcast('$md-resize')
				blockUi.removeClass('block-ui-active block-ui-visible')
			}, true)
		}
	};

	$scope.exists = function (item, list) {
		return list.indexOf(item) > -1;
	};

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
		}
	*/
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
				if ($scope.infoboxOpen) {
					angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
						var infobox = document.getElementsByClassName("marker-info-wrapper")
						var panx = 0
						if ($scope.showList) {
							panx = -(270 / 2)
						}
						$scope.ngBMap.panBy(-panx, -(infobox[0].offsetHeight / 2))
					})
				} else {
					var panx = 0
					if ($scope.showList) {
						panx = -(270 / 2)
					}
					$scope.ngBMap.panBy(-panx, 0)
				}
			})
		}
	}

	$scope.checkZoomGMap = function () {
		if ($scope.markerInfo) {
			NgMap.getMap().then(function (ngmap) {
				var position = new google.maps.LatLng($scope.markerInfo.lat, $scope.markerInfo.lng);
				ngmap.setCenter(position);
				if ($scope.infoboxOpen) {
					angular.element(document.getElementsByClassName("marker-info-wrapper")).ready(function () {
						var infobox = document.getElementsByClassName("marker-info-wrapper")
						var panx = 0
						if ($scope.showList) {
							panx = -(270 / 2)
						}
						ngmap.panBy(panx, infobox[0].offsetHeight / 2)
					})
				} else {
					var panx = 0
					if ($scope.showList) {
						panx = -(270 / 2)
					}
					ngmap.panBy(panx, 0)
				}
			})
		}
	}

	angular.element($window).bind('resize', function () {
		var winwidth = window.innerWidth
		/*if(winwidth<=745){
			if($scope.tempmarkerInfo){
				$scope.markerInfo = $scope.tempmarkerInfo
			}
			if($scope.showList&&$scope.showSelectedMark){
				$scope.showList = false
				$scope.markinfoFullwidth = true
			}
		}*/
		if (winwidth <= 745) {
			if ($scope.showList && $scope.showSelectedMark && $scope.infoboxOpen) {
				$scope.showList = false
				$scope.markinfoFullwidth = true
			}
		} else {
			if ($scope.tempmarkerInfo) {
				$scope.markerInfo = $scope.tempmarkerInfo
			}
			if ($scope.showList && $scope.showSelectedMark && $scope.infoboxOpen) {
				$scope.showList = true
				$scope.markinfoFullwidth = false
			}
		}
		$scope.$apply()
	})

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

	$scope.loadGoogle = function (map) {
		$scope.gloaded = true;
		blockUi.removeClass('block-ui-active block-ui-visible')
	}

	$scope.$on('$destroy', function () {
		angular.element($window).unbind('resize')
		if (angular.isDefined(live)) {
			$interval.cancel(live);
			live = undefined;
		}
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

}]);