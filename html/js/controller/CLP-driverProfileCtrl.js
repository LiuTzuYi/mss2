/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:29
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:22:56
 */

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name CLP-driverProfileCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,user,Idle,Keepalive,httpSuccessCheck,alertBox,$window,$filter,appConfig,profileService,$mdDialog,tmhDynamicLocale,refetchMapService,exportConfig,chartConfig,mapConfig
 * @description
 *   Controller for driver profile page.
 */
angular.module('carSafety').controller("CLP-driverProfileCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "user", "Idle", "Keepalive", "httpSuccessCheck", "alertBox", "$window", "$filter", "appConfig", "profileService", "$mdDialog", "tmhDynamicLocale", "refetchMapService", "exportConfig", "chartConfig", "mapConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, user, Idle, Keepalive, httpSuccessCheck, alertBox, $window, $filter, appConfig, profileService, $mdDialog, tmhDynamicLocale, refetchMapService, exportConfig, chartConfig, mapConfig) {
	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
	blockUi.addClass('block-ui-active block-ui-visible')
	/*$scope.setTitle = function(){
		window.setTimeout(function(){
			window.document.title = $translate.instant('driverProfile');
		}, 50);
	}*/

	/*$rootScope.$on('$translateChangeSuccess', function() {
       	tmhDynamicLocale.set($scope.lang);
        window.document.title = $translate.instant('driverGrpProfile');
 	});*/

	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;
	/*$translate.use($scope.lang);
	$scope.setTitle();*/
	window.document.title = $translate.instant('driverProfile');
	tmhDynamicLocale.set($scope.lang);

	$scope.itemsByPage = 10;
	$scope.itemsByPageFull = 25;
	$scope.displayPage = 5;

	$scope.drvDistance = 20
	$scope.distanceselected = 20

	$scope.gaugeColor = chartConfig.gaugeColor
	$scope.scoreTagFieldList = chartConfig.CLP_scoreTagFieldSet
	$scope.dataFieldSet = chartConfig.dataFieldSet
	$scope.warnFieldArr = []
	$scope.spiderLabelRaw = []
	$scope.spiderLabel = []
	$scope.scoreChartSeriesDDB = []
	$scope.scoreChartSeriesBDB = []
	$scope.scoreChartSeriesComfort = []
	$scope.scoreChartSeriesFullDrv = []

	$scope.chartSetOverride = chartConfig.chartSetOverride
	$scope.chartSetOverrideFull = chartConfig.chartSetOverrideFull

	for (var i = 0; i < chartConfig.CLP_spiderFieldSet.length; i++) {
		for (var j = 0; j < chartConfig.CLP_spiderFieldSet[i].length; j++) {
			$scope.spiderLabelRaw.push(chartConfig.CLP_spiderFieldSet[i][j]);
		}
	}

	for (var i = 0; i < $scope.dataFieldSet.length; i++) {
		for (var j = 0; j < $scope.dataFieldSet[i].length; j++) {
			$scope.warnFieldArr.push($scope.dataFieldSet[i][j])
		}
	}

	//window.setTimeout(function(){
	$translate($scope.spiderLabelRaw).then(function (translations) {
		angular.forEach(translations, function (value, key) {
			$scope.spiderLabel.push(value);
		});
	}, function (translationIds) {
		angular.forEach(translations, function (value, key) {
			$scope.spiderLabel.push(value);
		});
	});
	$translate($scope.dataFieldSet[0]).then(function (translations) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesDDB.push(value);
		});
	}, function (translationIds) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesDDB.push(value);
		});
	});
	$translate($scope.dataFieldSet[1]).then(function (translations) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesBDB.push(value);
		});
	}, function (translationIds) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesBDB.push(value);
		});
	});
	$translate($scope.dataFieldSet[2]).then(function (translations) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesComfort.push(value);
		});
	}, function (translationIds) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesComfort.push(value);
		});
	});
	$translate(chartConfig.scoreChartSeriesFullDrv).then(function (translations) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesFullDrv.push(value);
		});
	}, function (translationIds) {
		angular.forEach(translations, function (value, key) {
			$scope.scoreChartSeriesFullDrv.push(value);
		});
	});
	//}, 100);

	$scope.profileExcelOrderDate = exportConfig.profileExcelOrderDate.concat($scope.warnFieldArr)
	$scope.profileExcelOrderDateAct = exportConfig.profileExcelOrderDateAct.concat($scope.warnFieldArr)
	$scope.profileExcelOrderDateScore = exportConfig.profileExcelOrderDateScore.concat($scope.warnFieldArr)
	$scope.profileExcelOrderRank = exportConfig.profileExcelOrderDateRank.concat($scope.warnFieldArr)
	$scope.profileExcelOrderVideoDep = exportConfig.profileExcelOrderVideoDep
	$scope.warnSpecExcelOrder = exportConfig.warnSpecExcelOrder

	$scope.getcsvHeader = function (table) {
		var headerArr = []
		if (table !== 'video' && table !== 'warnSpec') {
			headerArr.push($translate.instant('startDate'))
			if(table !== 'rank'){
				headerArr.push($translate.instant('totalScore'))
			}
			else{
				headerArr.push($translate.instant('totalRank'))
			}
			headerArr.push($translate.instant('distance') + '(' + $translate.instant('km') + ')')
			for (var i = 0; i < $scope.warnFieldArr.length; i++) {
				headerArr.push($translate.instant($scope.warnFieldArr[i]))
			}
		}
		else if (table == 'video') {
			headerArr.push($translate.instant('video') + ' ID')
			headerArr.push($translate.instant('lat') + ' (WGS84)')
			headerArr.push($translate.instant('lng') + ' (WGS84)')
			headerArr.push($translate.instant('warnType'))
			headerArr.push($translate.instant('startTime'))
			headerArr.push($translate.instant('vehicle'))
			headerArr.push($translate.instant('vehDept'))
			headerArr.push($translate.instant('driver'))
			headerArr.push($translate.instant('drvDept'))
			headerArr.push($translate.instant('roc'))
			headerArr.push($translate.instant('duration') + ' (s)')
			headerArr.push($translate.instant('startSpeed') + ' (kph)')
			headerArr.push($translate.instant('endSpeed') + ' (kph)')
			headerArr.push($translate.instant('topSpeed') + ' (kph)')
			headerArr.push($translate.instant('HW') + ' (s)')
			headerArr.push($translate.instant('nearHW') + ' (s)')
		}
		else {
			headerArr.push($translate.instant('video') + ' ID')
			headerArr.push($translate.instant('lat') + ' (WGS84)')
			headerArr.push($translate.instant('lng') + ' (WGS84)')
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
		}
		return headerArr
	}

	$scope.getcsvData = function (data, table) {
		var csvdata = angular.copy(data)
		/*if(table=='driver'||table=='rank'){
	    	angular.forEach(csvdata, function(value, key) {
			  	value.start_date = $filter('date')(value.start_date, 'yyyy-MM-dd')
			})
	    }
	    else */
		if (table == 'warnSpec') {
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
			})
		} else if (table == 'video') {
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
			})
		}
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

    $scope.checkWarnLocation = function(row,warnType){
    	var staticmap
    	var icon
    	if(window.location.href.split(window.location.pathname)[0]==appConfig.devEnv){
    		icon = appConfig.prdEnv
    	}
    	else{
    		icon = window.location.href.split(window.location.pathname)[0]
    	}
    	icon += "/images/"+warnType+".png"
    	if($scope.userInfo.map=='googleMap'){
    		staticmap = mapConfig.googlestaticmap+"&markers=icon:"+icon+"|"+row.gps[0]+","+row.gps[1]+"&"+mapConfig.googlemapKey
    	}
    	else{
    		//staticmap = mapConfig.baidustaticmap+"&markers="+row.gps[0]+","+row.gps[1]+"&markerStyles=-1,"+icon+",-1&"+mapConfig.baidumapKey
    		staticmap = mapConfig.baidustaticmap+"&markers="+row.gps[0]+","+row.gps[1]+"&"+mapConfig.baidumapKey
    	}
    	var text = $translate.instant('lat')+":"+row.rawgps[0]+", "+$translate.instant('lng')+":"+row.rawgps[1]
    	alertBox.GPSLocationAlert(staticmap, text);
    }

	$scope.checkDistance = function (event) {
		//var keyCode = ('which' in event) ? event.which : event.keyCode;

		//var isNumeric = (keyCode >= 48 /* KeyboardEvent.DOM_VK_0 */ && keyCode <= 57 /* KeyboardEvent.DOM_VK_9 */ ) || (keyCode >= 96 /* KeyboardEvent.DOM_VK_NUMPAD0 */ && keyCode <= 105 /* KeyboardEvent.DOM_VK_NUMPAD9 */ );

		/*var modifiers = (event.altKey || event.ctrlKey || event.shiftKey || keyCode == 8);*/

		//var decimals = (keyCode == 110 || keyCode == 190);

		/*var inputvalue = event.target.value*/
		//var decimalpos = inputvalue.indexOf(".");
		/*var result*/
		/*if (decimalpos !== -1) {
			if (inputvalue.length - 1 == decimalpos) {
				result = isNumeric || modifiers;
			} else {
				result = false || modifiers;
			}
		} else {
			result = isNumeric || modifiers || decimals;
		}*/
		/*result = isNumeric || modifiers;
		if (!result) {
			event.preventDefault()
		}*/

		var keyCode = ('which' in event) ? event.which : event.keyCode;

		var isNumeric = (keyCode >= 48 /* KeyboardEvent.DOM_VK_0 */ && keyCode <= 57 /* KeyboardEvent.DOM_VK_9 */) || (keyCode >= 96 /* KeyboardEvent.DOM_VK_NUMPAD0 */ && keyCode <= 105 /* KeyboardEvent.DOM_VK_NUMPAD9 */);

        var modifiers = (event.altKey || event.ctrlKey || event.shiftKey || keyCode==8);

        var decimals = (keyCode==110 || keyCode==190);

        var inputvalue = event.target.value
        var decimalpos = inputvalue.indexOf(".");
        var result
        if (decimalpos !== -1) {
            if(inputvalue.length-1 == decimalpos){
            	result = isNumeric || modifiers;
            }
           	else{
          		result = false || modifiers;
          	}
        }
        else{
        	result = isNumeric || modifiers || decimals;
        }
        if (!result){
        	event.preventDefault()
        }
	}

	$scope.changeDistance = function (distance){
		$scope.drvDistance = distance
	}

	/*$scope.spiderOption = {
		scale: {
			ticks: {
				beginAtZero: true,
				min: 0,
				max: 100,
				userCallback: function (value, index, values) {
					return chartConfig.spiderAsix[value];
				}
			}
		},
		tooltips: {
			mode: 'single',
			callbacks: {
				title: function (tooltipItem, data) {
					if (tooltipItem[0].yLabel == 0) {
						return "0";
					} else if (tooltipItem[0].datasetIndex == 0 && tooltipItem[0].yLabel == 0 && tooltipItem[0].index == chartConfig.spiderFieldSet[0].length) {
						return "0";
					} else if (tooltipItem[0].datasetIndex == 0 && isNaN(tooltipItem[0].yLabel) && tooltipItem[0].index == 0) {
						return "0";
					} else {
						return data.labels[tooltipItem[0].index];
					}
				},
				label: function (tooltipItem, data) {
					if (tooltipItem.datasetIndex == 0 && (tooltipItem.index >= 0 && tooltipItem.index <= chartConfig.spiderFieldSet[0].length - 1)) {
						return tooltipItem.yLabel;
					} else if (tooltipItem.datasetIndex == 1 && (tooltipItem.index >= chartConfig.spiderFieldSet[0].length && tooltipItem.index <= chartConfig.spiderFieldSet[0].length + chartConfig.spiderFieldSet[1].length - 1)) {
						return tooltipItem.yLabel;
					} else if (tooltipItem.datasetIndex == 2 && (tooltipItem.index >= chartConfig.spiderFieldSet[0].length + chartConfig.spiderFieldSet[1].length && tooltipItem.index <= chartConfig.spiderFieldSet[0].length + chartConfig.spiderFieldSet[1].length + chartConfig.spiderFieldSet[2].length - 1)) {
						return tooltipItem.yLabel;
					}
				}
			}
		}
	}

	$scope.spiderHover = function (points, evt, item) {
		if (points.length !== 0 && !(item._datasetIndex == 0 && item._index == chartConfig.spiderFieldSet[0].length) && !(item._datasetIndex == 0 && ($scope.recentRecord.spiderset[0][item._index] == 0 || $scope.recentRecord.spiderset[0][item._index] == null))) {
			angular.element(evt.target)[0].style.cursor = "pointer";
		} else {
			angular.element(evt.target)[0].style.removeProperty('cursor');
		}
	}*/

	$scope.spiderOption = {
		scale: {
			ticks: {
				beginAtZero: false,
				min: -5,
				max: 100,
				stepSize: 10,
				userCallback: function (value, index, values) {
					return chartConfig.spiderAsix[value];
				}
			}
		},
		tooltips: {
			mode: 'single',
			callbacks: {
				title: function (tooltipItem, data) {
					var titleval
					if (tooltipItem[0].yLabel == -5) {
						titleval = undefined
					} else if (tooltipItem[0].datasetIndex == 0 && tooltipItem[0].yLabel == -5 && tooltipItem[0].index == chartConfig.spiderFieldSet[0].length) {
						titleval = undefined
					} else if (tooltipItem[0].datasetIndex == 0 && isNaN(tooltipItem[0].yLabel) && tooltipItem[0].index == 0) {
						titleval = undefined
					} else {
						titleval = data.labels[tooltipItem[0].index];
					}
					return titleval
				},
				label: function (tooltipItem, data) {
					var labelval
					if (tooltipItem.datasetIndex == 0 && (tooltipItem.index >= 0 && tooltipItem.index <= chartConfig.spiderFieldSet[0].length-1)) {
						labelval = tooltipItem.yLabel;
					} else if (tooltipItem.datasetIndex == 1 && (tooltipItem.index >= chartConfig.spiderFieldSet[0].length && tooltipItem.index <= chartConfig.spiderFieldSet[0].length+chartConfig.spiderFieldSet[1].length-1)) {
						labelval = tooltipItem.yLabel;
					} else if (tooltipItem.datasetIndex == 2 && (tooltipItem.index >= chartConfig.spiderFieldSet[0].length+chartConfig.spiderFieldSet[1].length && tooltipItem.index <= chartConfig.spiderFieldSet[0].length+chartConfig.spiderFieldSet[1].length+chartConfig.spiderFieldSet[2].length-1)) {
						labelval = tooltipItem.yLabel;
					}
					else{
						labelval = undefined
					}
					if(labelval==0){
						return '0';
					}
					else{
						return labelval;
					}
				}
			}
		}
	}

	$scope.getSpiderPoint = function(){
		var radius = []
		if($scope.recentRecord&&$scope.recentRecord.spiderset){
			for (var i = 0; i < $scope.recentRecord.spiderset.length; i++) {
				var arr = []
				var arr2 = []
				var arr3 = []
				for(var j = 0; j<  $scope.recentRecord.spiderset[i].length; j++){
					if($scope.recentRecord.spiderset[i][j]==-5){
						arr.push(0)
						arr2.push(0)
						arr3.push(0)
					}
					else{
						arr.push(3)
						arr2.push(4)
						arr3.push(1)
					}
				}
				var override = {
					pointRadius: arr,
					pointHoverRadius: arr2,
					pointHitRadius: arr3,
					pointBorderWidth: arr3,
					pointHoverBorderWidth: arr3

				}
				radius.push(override)
			}
		}
		else{
			radius = undefined
		}
		return radius
	}

	$scope.spiderHover = function (points, evt, item) {
		if (points.length !== 0 && !(item._datasetIndex == 0 && item._index == chartConfig.spiderFieldSet[0].length) && !(item._datasetIndex == 0 && ($scope.recentRecord.spiderset[0][item._index] == -5 || $scope.recentRecord.spiderset[0][item._index] == null))) {
			angular.element(evt.target)[0].style.cursor = "pointer";
		}else {
			angular.element(evt.target)[0].style.removeProperty('cursor');
		}
		$scope.spiderPoint = $scope.getSpiderPoint();
		$scope.$apply();
	}

	$scope.spiderChartFullScreen = false;

	var displayColWatcherFunc = function (newValue, oldValue) {
		$timeout(function () {
			var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
			if(tablewrap){
				var table = tablewrap.getElementsByTagName('table')[0]
				if(table){
					var scrollY = tablewrap.scrollTop
					var scrollX = tablewrap.scrollLeft
					if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
						var firstRow = table.children[1].children[0]
						if (firstRow && firstRow.children.length > 1) {
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
								table.children[0].style.top = '36px'
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
				}
			}
		})
	}

	$scope.toggleWarnspecVideo = function () {
		unwatcher();
		angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
		scrollvflag = false
		$scope.warnspecVideoFilter = !$scope.warnspecVideoFilter
		/*if ($scope.warnspecVideoFilter) {
			$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, {
				'video': '!null',
				'videoReady': 'Y'
			}, true)
		} else {
			$scope.spiderChartData = $scope.spiderChartDataOri
		}*/
		if ($scope.warnspecVideoFilter) {
			if ($scope.warnspecLocationFilter) {
				$scope.spiderChartData = $filter('filter')($scope.spiderChartData, {
					'video': '!null',
					'videoReady': 'Y'
				}, true)
			}
			else{
				$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, {
					'video': '!null',
					'videoReady': 'Y'
				}, true)
			}
		}
		else {
			if ($scope.warnspecLocationFilter) {
				$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, function (i) {
					return $scope.verifyGPS(i.gps)
				}, true)
			}
			else{
				$scope.spiderChartData = $scope.spiderChartDataOri
			}
		}
		var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		var table = tablewrap.getElementsByTagName('table')[0]
		var scrollY = tablewrap.scrollTop
		if (scrollY && scrollY > 0) {
			var firstRow = table.children[1].children[0]
			if (firstRow && firstRow.children.length > 1) {
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
			}
		}
		angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
		angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
		unwatcher = $scope.$watch('displayedCollection', displayColWatcherFunc, true);
	}

	$scope.toggleWarnspecLocation = function () {
		unwatcher();
		angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
		scrollvflag = false
		$scope.warnspecLocationFilter = !$scope.warnspecLocationFilter
		if ($scope.warnspecLocationFilter) {
			if($scope.warnspecVideoFilter){
				$scope.spiderChartData = $filter('filter')($scope.spiderChartData, function (i) {
					return $scope.verifyGPS(i.gps)
				}, true)
			}
			else{
				$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, function (i) {
					return $scope.verifyGPS(i.gps)
				}, true)
			}
		}
		else{
			if($scope.warnspecVideoFilter){
				$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, {
					'video': '!null',
					'videoReady': 'Y'
				}, true)
			}
			else{
				$scope.spiderChartData = $scope.spiderChartDataOri
			}
		}
		var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		var table = tablewrap.getElementsByTagName('table')[0]
		var scrollY = tablewrap.scrollTop
		if (scrollY && scrollY > 0) {
			var firstRow = table.children[1].children[0]
			if(firstRow&&firstRow.children.length>1){
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
			}
		}
		angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
		angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
		unwatcher = $scope.$watch('displayedCollection', displayColWatcherFunc, true);
	}

	$scope.getWarnSpec = function (warn) {
		unwatcher();
		angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
		scrollvflag = false
		$scope.loadingdata.warnspec = true;
		var range = profileService.getExactDateRange($scope.recentRecord.acc_date, $scope.periodselected)
		var tmp1 = new Date(range.datebf).setHours(0, 0, 0, 0)
		var tmp2 = new Date(range.dateaf).setHours(23, 59, 59, 59)
		var datebf = $filter('date')(tmp1, 'yyyy-MM-dd')
		var dateaf = $filter('date')(tmp2, 'yyyy-MM-dd')
		$http({
			method: 'GET',
			url: '/api/profileQuerySpecWarn/di/' + datebf + '/' + dateaf + '/' + warn + '/' + $scope.labelselected.id
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.errorAlert('91408_01')
			} else {
				var data = response.data.data;
				$scope.spiderChartDataOri = data.map(function (obj) {
					return {
						video: obj.video,
						start_time: obj.start_time,
						vehicle: obj.vehicle,
						vehDepart: obj.vehDepartment,
						driver: obj.driver,
						drvDepart: obj.drvDepartment,
						duration: obj.duration,
						start_spd: obj.start_spd,
						end_spd: obj.end_spd,
						top_spd: obj.top_spd,
						hw: obj.hw,
						near_hw: obj.near_hw,
						vehStatus: obj.vehStatus,
						videoReady: obj.videoReady,
						gps: obj.gps,
						rawgps: obj.rawgps,
						warn_type: obj.warn_type
					}
				})
				/*if ($scope.warnspecVideoFilter) {
					$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, {
						'video': '!null',
						'videoReady': 'Y'
					}, true)
				} else {
					$scope.spiderChartData = $scope.spiderChartDataOri
				}*/
				if ($scope.warnspecVideoFilter&&$scope.warnspecLocationFilter) {
					var dataarr = $filter('filter')($scope.spiderChartDataOri, {
						'video': '!null',
						'videoReady': 'Y'
					}, true)
					dataarr = $filter('filter')(dataarr, function (i) {
						return $scope.verifyGPS(i.gps)
					}, true)
					$scope.spiderChartData = dataarr
				}
				else if($scope.warnspecVideoFilter){
					$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, {
						'video': '!null',
						'videoReady': 'Y'
					}, true)
				}
				else if($scope.warnspecLocationFilter){
					$scope.spiderChartData = $filter('filter')($scope.spiderChartDataOri, function (i) {
						return $scope.verifyGPS(i.gps)
					}, true)
				}
				else {
					$scope.spiderChartData = $scope.spiderChartDataOri
				}
				blockUi.removeClass('block-ui-active block-ui-visible')
			}
			$scope.loadingdata.warnspec = false;
			$timeout(function () {
				angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
				unwatcher = $scope.$watch('displayedCollection', displayColWatcherFunc, true);
			})
		}, function errorCallback(response) {
			$scope.loadingdata.warnspec = false;
			$timeout(function () {
				angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
				unwatcher = $scope.$watch('displayedCollection', displayColWatcherFunc, true);
			})
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91408_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.preFullScrollX = 0;
	$scope.preFullScrollY = 0;

	$scope.spiderClick = function (points, evt, item) {
		if (points.length !== 0) {
			if (!(item._datasetIndex == 0 && item._index == chartConfig.spiderFieldSet[0].length) && !(item._datasetIndex == 0 && ($scope.recentRecord.spiderset[0][item._index] == -5 || $scope.recentRecord.spiderset[0][item._index] == null))) {
				blockUi.addClass('block-ui-active block-ui-visible')
				var index = points[0]._index;
				var warn = $scope.spiderLabelRaw[index];
				var range = profileService.getExactDateRange($scope.recentRecord.acc_date, $scope.periodselected)
				var tmp1 = new Date(range.datebf).setHours(0, 0, 0, 0)
				var tmp2 = new Date(range.dateaf).setHours(23, 59, 59, 59)
				var datebf = $filter('date')(tmp1, 'yyyy-MM-dd')
				var dateaf = $filter('date')(tmp2, 'yyyy-MM-dd')
				$http({
					method: 'GET',
					url: '/api/profileQuerySpecWarn/di/' + datebf + '/' + dateaf + '/' + warn + '/' + $scope.labelselected.id
				}).then(function successCallback(response) {
					var errorphp = httpSuccessCheck.checkHttp(response)
					if (errorphp) {
						blockUi.removeClass('block-ui-active block-ui-visible')
						alertBox.errorAlert('91408_01')
					} else {
						$scope.preFullScrollX = window.pageXOffset;
						$scope.preFullScrollY = window.pageYOffset;
						$scope.spiderChartFullScreen = true;
						$scope.spiderChartTitle = warn;
						document.getElementsByClassName("pro-wrap")[0].style.height = '100vh';
						document.getElementsByClassName("pro-wrap")[0].style.overflow = 'hidden';
						var data = response.data.data;
						$scope.spiderChartDataOri = data.map(function (obj) {
							return {
								video: obj.video,
								start_time: obj.start_time,
								vehicle: obj.vehicle,
								vehDepart: obj.vehDepartment,
								driver: obj.driver,
								drvDepart: obj.drvDepartment,
								duration: obj.duration,
								start_spd: obj.start_spd,
								end_spd: obj.end_spd,
								top_spd: obj.top_spd,
								hw: obj.hw,
								near_hw: obj.near_hw,
								vehStatus: obj.vehStatus,
								videoReady: obj.videoReady,
								gps: obj.gps,
								rawgps: obj.rawgps,
								warn_type: obj.warn_type
							}
						})
						$scope.warnspecVideoFilter = false;
						$scope.warnspecLocationFilter = false;
						$scope.spiderChartData = $scope.spiderChartDataOri
						angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
						unwatcher = $scope.$watch('displayedCollection', displayColWatcherFunc, true);
						window.scrollTo(0,0)
						blockUi.removeClass('block-ui-active block-ui-visible')
					}
				}, function errorCallback(response) {
					blockUi.removeClass('block-ui-active block-ui-visible')
					var errorphp = httpSuccessCheck.checkerrorHttp(response)
					if (errorphp) {
						alertBox.errorAlert('91408_' + errorphp)
					} else {
						alertBox.errorAlert(response.data.code)
					}
				});
			}
		}
	}

	var scrollvflag = false
	var unwatcher

	var tablescroll = function () {
		var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		var table = tablewrap.getElementsByTagName('table')[0]
		if (table) {
			var firstRow = table.children[1].children[0]
			if (firstRow && firstRow.children.length > 1) {
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
					if ((tablewrap.scrollHeight - tablewrap.clientHeight > table.children[0].children[0].clientHeight) && scrollvflag == false) {
						for (var i = 0; i < cellwidth.length; i++) {
							firstRow.children[i].style.width = cellwidth[i] + 'px'
							trh.children[i].style.width = cellwidth[i] + 'px'
							firstRow.children[i].style.minWidth = cellwidth[i] + 'px'
							trh.children[i].style.minWidth = cellwidth[i] + 'px'
						}
						table.children[0].classList.add('table-stickyheader')
						table.children[0].style.top = '36px'
						table.children[0].style.position = 'absolute'
						table.children[0].style.overflow = 'hidden'
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
						scrollvflag = true
					}
					if (tablewrap.scrollLeft > 0) {
						table.children[0].scrollLeft = tablewrap.scrollLeft
					} else {
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].scrollLeft = '-' + scrollbarWidth + 'px'
					}
				} else {
					scrollvflag = false
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

	$scope.changePage = function (p) {
		unwatcher();
		angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
		scrollvflag = false
		var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		var table = tablewrap.getElementsByTagName('table')[0]
		var scrollY = tablewrap.scrollTop
		if (scrollY && scrollY > 0) {
			var firstRow = table.children[1].children[0]
			if (firstRow && firstRow.children.length > 1) {
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
			}
		}
		angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
		angular.element(document.querySelector('.warn-table-fullscreen')).bind('scroll', tablescroll)
		unwatcher = $scope.$watch('displayedCollection', displayColWatcherFunc, true);
		/*var tableWrap = angular.element(document.querySelector('.ng-table-content'))[0]
		tableWrap.scrollTop = 0;*/
	}

	$scope.setItemPer = function (num) {
		$scope.itemsByPageFull = num
	}

	$scope.closeSpider = function () {
		unwatcher();
		angular.element(document.querySelector('.warn-table-fullscreen')).unbind('scroll')
		scrollvflag = false
		var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
		var table = tablewrap.getElementsByTagName('table')[0]
		var scrollY = tablewrap.scrollTop
		if (scrollY && scrollY > 0) {
			var firstRow = table.children[1].children[0]
			if (firstRow && firstRow.children.length > 1) {
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
			}
		}
		angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollTop = 0
		angular.element(document.querySelector('.warn-table-fullscreen'))[0].scrollLeft = 0
		$scope.spiderChartFullScreen = false;
		document.getElementsByClassName("pro-wrap")[0].style.removeProperty('height');
		document.getElementsByClassName("pro-wrap")[0].style.removeProperty('overflow');
		window.scrollTo($scope.preFullScrollX, $scope.preFullScrollY)
		$scope.preFullScrollX = 0;
		$scope.preFullScrollY = 0;
	}

	$scope.spiderColor = chartConfig.spiderColor

	$scope.scoreTagOpts = chartConfig.scoreTagOpts2
	$scope.scoreTagOptsTotal = chartConfig.scoreTagOptsTotal2
	$scope.scoreTagColor = chartConfig.scoreTagColorMix
	$scope.scoreTagColorTotal = chartConfig.scoreTagColorTotalMix
	$scope.scoreChartOpts = chartConfig.scoreChartOpts
	$scope.scoreChartOptsTotal = chartConfig.scoreChartOptsTotal
	$scope.scoreChartTotalFix = chartConfig.scoreChartTotalFix
	$scope.videotypeSelect = chartConfig.videotypeSelect
	$scope.scoreTagOptsFullMix = chartConfig.scoreTagOptsFullMix
	$scope.scoreTagOptsTotalFullMix = chartConfig.scoreTagOptsTotalFullMix

	$scope.chartFullScreen = false;

	$scope.enlargeChart = function (chart) {
		$scope.preFullScrollX = window.pageXOffset;
		$scope.preFullScrollY = window.pageYOffset;
		$scope.chartFullScreen = true;
		if (chart == "safetyScore") {
			$scope.tagChartHeaderFullscreen = $translate.instant(chart)
			$scope.tagChartFullColor = $scope.scoreTagColorTotal;
			$scope.tagChartFullOpt = $scope.scoreTagOptsTotalFullMix;
		}
		else {
			$scope.tagChartHeaderFullscreen = $translate.instant(chart)+" "+$translate.instant('countRange');
			$scope.tagChartFullColor = $scope.scoreTagColor;
			$scope.tagChartFullOpt = $scope.scoreTagOptsFullMix;
		}
		document.getElementsByClassName("pro-wrap")[0].style.height = '100vh';
		document.getElementsByClassName("pro-wrap")[0].style.overflow = 'hidden';
		$scope.chartDataFullscreen = profileService.renderChartFullscreen(chart, $scope.chartSet, true);
	}

	$scope.closeChart = function (chart) {
		$scope.chartFullScreen = false;
		document.getElementsByClassName("pro-wrap")[0].style.removeProperty('height');
		document.getElementsByClassName("pro-wrap")[0].style.removeProperty('overflow');
		window.scrollTo($scope.preFullScrollX, $scope.preFullScrollY)
		$scope.preFullScrollX = 0;
		$scope.preFullScrollY = 0;
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

	$scope.optionList = true

	$scope.showOption = function () {
		if ($scope.labelselected) {
			$scope.optionList = !$scope.optionList
			if (!$scope.optionList) {
				$scope.dataSelected[0] = angular.copy($scope.labelselected)
				$scope.period = $scope.periodselected
				$scope.drvDistance = $scope.distanceselected
				$scope.changeDateOption($scope.periodselected)
				$scope.dateselected = $scope.dateRange.after
				$scope.dateselectedafter = new Date(new Date($scope.dateselected).setDate(new Date($scope.dateselected).getDate() + 6)).setHours(0, 0, 0, 0)
			}
		}
	}

	/*$scope.periodselected = 'd'
	$scope.period = 'd'*/
	$scope.periodselected = 'm'
	$scope.period = 'm'
	$scope.dateSelected = {
		opened: false
	}
	var newdatetmp = $filter('date')(new Date(new Date().setDate(new Date().getDate() - 1)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone);
	$scope.maxDate = new Date(newdatetmp)
	$scope.minDate = new Date('01/01/1990 00:00:00')
	/*$scope.dateselected = new Date(new Date(newdatetmp).setHours(0, 0, 0, 0));
	$scope.dateSelectOptions = {
		maxDate: $scope.maxDate,
		minDate: $scope.minDate,
		startingDay: 1,
		showWeeks: false,
		formatMonth: 'MMM',
		yearColumns: 3
	};

	$scope.dateRange = {
		before: new Date(new Date(new Date(newdatetmp).setMonth(new Date(new Date().setDate(new Date().getDate() - 1)).getMonth() - 1)).setHours(0, 0, 0, 0)),
		after: new Date(new Date(newdatetmp).setHours(0, 0, 0, 0))
	};*/

	$scope.dateselected = new Date(new Date(new Date(newdatetmp).setDate(1)).setHours(0, 0, 0, 0))
	$scope.dateSelectOptions = {
		maxDate: $scope.maxDate,
		minDate: $scope.minDate,
		minMode: 'month',
		startingDay: 1,
		showWeeks: false,
		formatMonth: 'MMM',
		yearColumns: 3
	};

	$scope.dateRange = {
		before: new Date(new Date(new Date(new Date(newdatetmp).setFullYear(new Date(newdatetmp).getFullYear() - 1)).setDate(1)).setHours(0, 0, 0, 0)),
		after: new Date(new Date(new Date(newdatetmp).setDate(1)).setHours(0, 0, 0, 0))
	};

	$scope.openPicker = function () {
		$scope.dateSelected.opened = !$scope.dateSelected.opened
		$timeout(function () {
			var datebutton = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick-btn-wrap .pro-date-pick-btn'))[0]
			var datepicker = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu'))[0]
			if (datepicker) {
				var element = angular.element(document.querySelector('head style#profile-datepicker'));
				if (datebutton.offsetWidth < 248.5) {
					left = -248.5 + datebutton.offsetWidth + 1
					element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: ' + left + 'px !important;}');
				} else {
					element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: unset;}');
				}
			}
		})
	}

	$scope.changeRange = function (date) {
		var addDate = date.setHours(0, 0, 0, 0)
		$scope.dateselected = addDate
		if ($scope.period == 'w') {
			$scope.dateselectedafter = new Date(new Date($scope.dateselected).setDate(new Date($scope.dateselected).getDate() + 6)).setHours(0, 0, 0, 0)
		}
	}

	function disabledDate(data) {
		var date = data.date
		var mode = data.mode
		return (mode === 'day' && date.getDay() !== 1);
	}

	$scope.changeDateOption = function (period) {
		switch (period) {
			case 'd':
				$scope.dateSelectOptions = {
					maxDate: $scope.maxDate,
					minDate: $scope.minDate,
					startingDay: 1,
					showWeeks: false,
					formatMonth: 'MMM',
					yearColumns: 3
				};
				$scope.dateselected = new Date(new Date(newdatetmp).setHours(0, 0, 0, 0));
				break;
			case 'w':
				$scope.dateSelectOptions = {
					maxDate: $scope.maxDate,
					minDate: $scope.minDate,
					startingDay: 1,
					showWeeks: false,
					formatMonth: 'MMM',
					yearColumns: 3,
					dateDisabled: disabledDate
				};
				$scope.dateselected = new Date(new Date(newdatetmp).setHours(0, 0, 0, 0));
				var date = new Date($scope.dateselected).getDay()
				if (date !== 0) {
					var modifydate = new Date($scope.dateselected).setDate(new Date($scope.dateselected).getDate() - date + 1)
					$scope.dateselected = new Date(modifydate).setHours(0, 0, 0, 0)
				} else {
					var modifydate = new Date($scope.dateselected).setDate(new Date($scope.dateselected).getDate() - 6)
					$scope.dateselected = new Date(modifydate).setHours(0, 0, 0, 0)
				}
				$scope.dateselectedafter = new Date(new Date($scope.dateselected).setDate(new Date($scope.dateselected).getDate() + 6)).setHours(0, 0, 0, 0)
				break;
			case 'm':
				$scope.dateSelectOptions = {
					maxDate: $scope.maxDate,
					minDate: $scope.minDate,
					minMode: 'month',
					startingDay: 1,
					showWeeks: false,
					formatMonth: 'MMM',
					yearColumns: 3
				};
				$scope.dateselected = new Date(new Date(newdatetmp).setHours(0, 0, 0, 0));
				var modifydate = new Date($scope.dateselected).setDate(1)
				$scope.dateselected = new Date(modifydate).setHours(0, 0, 0, 0)
				break;
			case 'y':
				$scope.dateSelectOptions = {
					maxDate: $scope.maxDate,
					minDate: $scope.minDate,
					minMode: 'year',
					startingDay: 1,
					showWeeks: false,
					yearColumns: 3
				};
				$scope.dateselected = new Date(new Date(newdatetmp).setHours(0, 0, 0, 0));
				var modifydate = new Date($scope.dateselected).setMonth(0, 1)
				$scope.dateselected = new Date(modifydate).setHours(0, 0, 0, 0)
		}
		$scope.period = period
	}

	angular.element(document.querySelector('head')).append("<style id='profile-datepicker'></style>");

	angular.element($window).bind('resize', function () {
		if (window.innerWidth >= 992) {
			if ($scope.accordion.scorechartOpened || $scope.accordion.ddbchartOpened) {
				$scope.accordion.scorechartOpened = true
				$scope.accordion.ddbchartOpened = true
			}
			if ($scope.accordion.comfortchartOpened || $scope.accordion.bdbchartOpened) {
				$scope.accordion.comfortchartOpened = true
				$scope.accordion.bdbchartOpened = true
			}
			$scope.$apply()
		}
		if ($scope.spiderChartFullScreen) {
			var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
			var table = tablewrap.getElementsByTagName('table')[0]
			var scrollY = tablewrap.scrollTop
			if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
				var firstRow = table.children[1].children[0]
				if (firstRow && firstRow.children.length > 1) {
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
						table.children[0].style.top = '36px'
						table.children[0].style.position = 'absolute'
						table.children[0].style.overflow = 'hidden'
						var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
						table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
					}, true)
				}
			}
		}
		var datebutton = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick-btn-wrap .pro-date-pick-btn'))[0]
		var datepicker = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu'))[0]
		if (datepicker) {
			var element = angular.element(document.querySelector('head style#profile-datepicker'));
			if (datebutton.offsetWidth < 248.5) {
				left = -248.5 + datebutton.offsetWidth + 1
				element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: ' + left + 'px !important;}');
			} else {
				element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: unset;}');
			}
		}
	})

	$scope.dataSelected = []
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
		buttonClasses: 'profile-list-select'
	}
	//window.setTimeout(function(){
	$scope.listDataSelectTexts = {
		buttonDefaultText: $translate.instant('selectDriver'),
		searchPlaceholder: $translate.instant('search'),
	}
	//},50)
	$scope.listDataSelectEvent = {
		onItemDeselect: function (item) {
			$scope.dataSelected[0] = angular.copy(item)
		}
	}

	$scope.submitOption = function ($event) {
		if ($event) {
			$event.stopPropagation();
			$event.preventDefault();
		}
		if ($scope.dataSelected.length !== 0) {
			$scope.labelselected = angular.copy($scope.dataSelected[0]);
			$scope.periodselected = $scope.period
			$scope.distanceselected = $scope.drvDistance
			$scope.dateRangeafter = $scope.dateselectedafter
			switch ($scope.periodselected) {
				case 'd':
					$scope.dateRange.before = new Date(new Date($scope.dateselected).setMonth(new Date($scope.dateselected).getMonth() - 1)).setHours(0, 0, 0, 0)
					$scope.dateRange.after = new Date($scope.dateselected).setHours(0, 0, 0, 0)
					break;
				case 'w':
					$scope.dateRange.before = new Date(new Date($scope.dateselected).setDate(new Date($scope.dateselected).getDate() - 7 * 14)).setHours(0, 0, 0, 0)
					$scope.dateRange.after = new Date($scope.dateselected).setHours(0, 0, 0, 0)
					break;
				case 'm':
					$scope.dateRange.before = new Date(new Date($scope.dateselected).setFullYear(new Date($scope.dateselected).getFullYear() - 1)).setHours(0, 0, 0, 0)
					//var afdate = new Date($scope.dateselected).setMonth(new Date($scope.dateselected).getMonth()+1)
					$scope.dateRange.after = new Date($scope.dateselected).setHours(0, 0, 0, 0)
					break;
				case 'y':
					$scope.dateRange.before = new Date(new Date($scope.dateselected).setFullYear(new Date($scope.dateselected).getFullYear() - 7)).setHours(0, 0, 0, 0)
					//var afdate = new Date($scope.dateselected).setFullYear(new Date($scope.dateselected).getFullYear()+1)
					$scope.dateRange.after = new Date($scope.dateselected).setHours(0, 0, 0, 0)
			}
			$scope.getBaseInfo()
			$scope.getCompScore(true)
			$scope.getRank()
			$scope.optionList = false
		}
	}

	$scope.getWarnVideo = function (date) {
		$scope.loadingdata.video = true;
		var range = profileService.getExactDateRange(date, $scope.periodselected)
		var tmp1 = new Date(range.datebf).setHours(0, 0, 0, 0)
		var tmp2 = new Date(range.dateaf).setHours(23, 59, 59, 59)
		var datebf = $filter('date')(tmp1, 'yyyy-MM-dd')
		var dateaf = $filter('date')(tmp2, 'yyyy-MM-dd')
		$http({
			method: 'GET',
			url: '/api/profileVideo/di/' + datebf + '/' + dateaf + '/' + $scope.labelselected.id
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				$scope.loadingdata.video = false;
				alertBox.errorAlert('91401_01')
			} else {
				var data = response.data.data
				$scope.warnvideoCollection = data.map(function (obj) {
					return {
						duration: obj.duration,
						end_spd: obj.end_spd,
						hw: obj.hw,
						near_hw: obj.near_hw,
						roc: obj.roc,
						start_spd: obj.start_spd,
						start_time: obj.start_time,
						vehicle: obj.vehicle,
						vehDepart: obj.vehDepartment,
						driver: obj.driver,
						drvDepart: obj.drvDepartment,
						vehStatus: obj.vehStatus,
						top_spd: obj.top_spd,
						video: obj.video,
						videoReady: obj.videoReady,
						warningType: obj.warningType,
						gps: obj.gps,
						rawgps: obj.rawgps
					}
				})
				$scope.loadingdata.video = false;
			}
		}, function errorCallback(response) {
			$scope.loadingdata.video = false;
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91401_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.getUserAvatar = function () {
		$http({
			method: 'GET',
			url: '/api/drvAvatar/' + $scope.labelselected.id
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91402_01')
				$scope.baseInfo.avatar = appConfig.defaultAvatar
			} else {
				if (response.data.data) {
					$scope.baseInfo.avatar = response.data.data
				} else {
					$scope.baseInfo.avatar = appConfig.defaultAvatar
				}
			}
		}, function errorCallback(response) {
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91402_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
			$scope.baseInfo.avatar = appConfig.defaultAvatar
		});
	}

	$scope.getCompScore = function (submit) {
		var datebf = $filter('date')($scope.dateRange.before, 'yyyy-MM-dd')
		var dateaf = $filter('date')($scope.dateRange.after, 'yyyy-MM-dd')
		$http({
			method: 'GET',
			url: '/api/companyScore_CLP/' + $scope.periodselected.toUpperCase() + '/' + ($scope.distanceselected*10*100000)/10 + '/' + datebf + '/' + dateaf
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91403_01')
			} else {
				$scope.companyCollection = response.data.data
			}
			$scope.getDriverScore(submit)
		}, function errorCallback(response) {
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91403_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
			$scope.getDriverScore(submit)
		});
	}

	$scope.getDriverScore = function (submit) {
		$scope.loadingdata.drv = true;
		var datebf = $filter('date')($scope.dateRange.before, 'yyyy-MM-dd')
		var dateaf = $filter('date')($scope.dateRange.after, 'yyyy-MM-dd')
		$http({
			method: 'GET',
			url: '/api/driverScore_CLP/' + $scope.periodselected.toUpperCase() + '/' + ($scope.distanceselected*10*100000)/10 + '/' + datebf + '/' + dateaf + '/i/' + $scope.labelselected.id
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				$scope.loadingdata.veh = false;
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.errorAlert('91404_01')
				if (submit) {
					$scope.getWarnVideo($scope.dateRange.after)
				}
			} else {
				$scope.drvCollection = response.data.data
				$scope.drvActCollection = response.data.dataActCnt
				if ($scope.drvCollection.length > 0) {
					var tmp = angular.copy($scope.drvCollection[$scope.drvCollection.length - 1])
					//tmp.label = profileService.getscoreLabel(parseInt(tmp.total_score))
					tmp.spiderset = profileService.getSpiderData(tmp)
					tmp.dataAsAt = profileService.getDataAsAt(tmp.acc_date, $scope.periodselected)
					if ($scope.companyCollection && $scope.companyCollection.length > 0) {
						var set = $scope.companyCollection.find(function (element) {
							return element.acc_date == tmp.acc_date;
						});
						tmp.total_score_avg = set.total_score;
						tmp.grade_avg = set.grade;
						//tmp.label_avg = profileService.getscoreLabel(tmp.total_score_avg)
						$scope.chartSet = profileService.renderChartData(angular.copy($scope.drvCollection), $scope.periodselected, angular.copy($scope.companyCollection))
					} else {
						tmp.total_score_avg = 0
						tmp.grade_avg = 'N/A'
						$scope.chartSet = profileService.renderChartData(angular.copy($scope.drvCollection), $scope.periodselected, new Array())
					}
					$scope.recentRecord = angular.copy(tmp)
					var func = function (submit, tmp) {
						if (submit) {
							$scope.getWarnVideo(tmp.acc_date)
						}
					}
					if (dateaf !== tmp.acc_date) {
						var selectedRecordPeriod = profileService.getDataAsAt(dateaf, $scope.periodselected)
						alertBox.asAtDateAlert('driver', $scope.distanceselected, selectedRecordPeriod, tmp.dataAsAt, $scope.periodselected, submit, tmp, func)
					} else {
						func(submit, tmp)
					}
				} else {
					$scope.recentRecord = {
						total_score: 0,
						grade: 'N/A'
					}
					$scope.recentRecord.spiderset = profileService.renderEmptySpider()
					if ($scope.companyCollection && $scope.companyCollection.length > 0) {
						$scope.recentRecord.total_score_avg = $scope.companyCollection[$scope.companyCollection.length - 1].total_score;
						$scope.recentRecord.grade_avg = $scope.companyCollection[$scope.companyCollection.length - 1].grade;
						//$scope.recentRecord.label_avg = profileService.getscoreLabel($scope.recentRecord.total_score_avg)
						$scope.chartSet = profileService.renderEmptyChart($scope.periodselected, angular.copy($scope.companyCollection))
					} else {
						$scope.recentRecord.total_score_avg = 0
						$scope.recentRecord.grade_avg = 'N/A'
						$scope.chartSet = profileService.renderEmptyChart($scope.periodselected, new Array())
					}
					var func = function (submit, date) {
						if (submit) {
							$scope.getWarnVideo(date)
						}
					}
					var start = profileService.getDataAsAt(datebf, $scope.periodselected)
					var end = profileService.getDataAsAt(dateaf, $scope.periodselected)
					alertBox.noProfileRecordAlert('driver', $scope.distanceselected, start, end, $scope.periodselected, submit, $scope.dateRange.after, func)
				}
				$timeout(function(){
					$scope.spiderPoint = $scope.getSpiderPoint();
					$scope.$apply()
				},true)
				$scope.loadingdata.drv = false;
				blockUi.removeClass('block-ui-active block-ui-visible')
			}
		}, function errorCallback(response) {
			$scope.loadingdata.drv = false;
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91404_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
			if (submit) {
				$scope.getWarnVideo($scope.dateRange.after)
			}
		});
	}

	$scope.getRank = function () {
		$scope.loadingdata.rank = true;
		var datebf = $filter('date')($scope.dateRange.before, 'yyyy-MM-dd')
		var dateaf = $filter('date')($scope.dateRange.after, 'yyyy-MM-dd')
		$http({
			method: 'GET',
			url: '/api/warningRank_CLP/' + $scope.periodselected.toUpperCase() + '/' + ($scope.distanceselected*10*100000)/10 + '/' + datebf + '/' + dateaf + '/di/' + $scope.labelselected.id
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				$scope.loadingdata.rank = false;
				alertBox.errorAlert('91405_01')
			} else {
				$scope.rankCollection = response.data.data
				$scope.loadingdata.rank = false;
			}
		}, function errorCallback(response) {
			$scope.loadingdata.rank = false;
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91405_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.checkState = function (state, num) {
		return (state & Math.pow(2,num)) == Math.pow(2,num)
	}

	$scope.baseInfo = {}

	$scope.getBaseInfo = function () {
		$http({
			method: 'GET',
			url: '/api/profileBase/di/' + $scope.labelselected.id
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91406_01')
			} else {
				if (response.data.data.length > 0) {
					$scope.baseInfo = response.data.data[0]
				} else {
					$scope.baseInfo = []
				}
			}
			$scope.getUserAvatar()
		}, function errorCallback(response) {
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91406_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
			$scope.getUserAvatar()
		});
	}

	$scope.getList = function () {
		$http({
			method: 'GET',
			url: '/api/profileList/di'
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.errorAlert('91407_01')
			} else {
				$scope.dataLabels = response.data.data
				if ($state.params.preselected && $state.params.preview && $state.params.predate) {
					$scope.labelselected = angular.copy($scope.dataLabels.find(function (element) {
						return element.id == $state.params.preselected.id;
					}))
					if ($scope.labelselected) {
						$scope.optionList = false
						blockUi.addClass('block-ui-active block-ui-visible')
						$scope.dataSelected[0] = angular.copy($scope.labelselected)
						$scope.distanceselected = $state.params.predistance
						$scope.drvDistance = $scope.distanceselected
						$scope.periodselected = $state.params.preview
						$scope.period = $scope.periodselected
						$scope.changeDateOption($scope.periodselected)
						$scope.dateRange = $state.params.predate
						$scope.dateselected = $scope.dateRange.after
						$scope.dateselectedafter = new Date(new Date($scope.dateselected).setDate(new Date($scope.dateselected).getDate() + 6)).setHours(0, 0, 0, 0)
						$scope.dateRangeafter = $scope.dateselectedafter
						$scope.getBaseInfo()
						$scope.getCompScore(true)
						$scope.getRank()
					} else {
						blockUi.removeClass('block-ui-active block-ui-visible')
						alertBox.profileIndVisibilityAlert('driver')
					}
					$state.params.preselected = null
					$state.params.predistance = null
					$state.params.preview = null
					$state.params.predate = null
				}
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('91407_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.loadingdata = {
		drv: false,
		rank: false,
		video: false,
		warnspec: false
	}

	$scope.getList()

	$scope.refreshData = function (table) {
		blockUi.addClass('block-ui-active block-ui-visible')
		switch (table) {
			case 'video':
				if ($scope.recentRecord.acc_date) {
					$scope.getWarnVideo($scope.recentRecord.acc_date)
				} else {
					$scope.getWarnVideo($scope.dateRange.after)
				}
				break;
			case 'driver':
				$scope.getCompScore()
				break;
			case 'rank':
				$scope.getRank()
				break;
		}
		blockUi.removeClass('block-ui-active block-ui-visible')
	}

	$scope.playVideo = function ($event, id, licence) {
		$mdDialog.show({
				controller: DialogController,
				templateUrl: '/view/component/dialog/warnVideoDialog.html',
				parent: angular.element(document.querySelector('.pro-wrap')),
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
				angular.element($window).unbind('resize')
				if (window.innerWidth >= 992) {
					if ($scope.accordion.scorechartOpened || $scope.accordion.ddbchartOpened) {
						$scope.accordion.scorechartOpened = true
						$scope.accordion.ddbchartOpened = true
					}
					if ($scope.accordion.comfortchartOpened || $scope.accordion.bdbchartOpened) {
						$scope.accordion.comfortchartOpened = true
						$scope.accordion.bdbchartOpened = true
					}
				}
				var datebutton = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick-btn-wrap .pro-date-pick-btn'))[0]
				var datepicker = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu'))[0]
				if (datepicker) {
					var element = angular.element(document.querySelector('head style#profile-datepicker'));
					if (datebutton.offsetWidth < 248.5) {
						left = -248.5 + datebutton.offsetWidth + 1
						element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: ' + left + 'px !important;}');
					} else {
						element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: unset;}');
					}
				}
				angular.element($window).bind('resize', function () {
					if (window.innerWidth >= 992) {
						if ($scope.accordion.scorechartOpened || $scope.accordion.ddbchartOpened) {
							$scope.accordion.scorechartOpened = true
							$scope.accordion.ddbchartOpened = true
						}
						if ($scope.accordion.comfortchartOpened || $scope.accordion.bdbchartOpened) {
							$scope.accordion.comfortchartOpened = true
							$scope.accordion.bdbchartOpened = true
						}
						$scope.$apply()
					}
					if ($scope.spiderChartFullScreen) {
						var tablewrap = document.getElementsByClassName('warn-table-fullscreen')[0]
						var table = tablewrap.getElementsByTagName('table')[0]
						var scrollY = tablewrap.scrollTop
						if (scrollY && scrollY > 0 && tablewrap.scrollTop <= table.children[1].clientHeight) {
							var firstRow = table.children[1].children[0]
							if (firstRow && firstRow.children.length > 1) {
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
									table.children[0].style.top = '36px'
									table.children[0].style.position = 'absolute'
									table.children[0].style.overflow = 'hidden'
									var scrollbarWidth = tablewrap.offsetWidth - tablewrap.clientWidth
									table.children[0].style.width = 'calc( 100% - ' + scrollbarWidth + 'px )'
								}, true)
							}
						}
					}
					var datebutton = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick-btn-wrap .pro-date-pick-btn'))[0]
					var datepicker = angular.element(document.querySelector('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu'))[0]
					if (datepicker) {
						var element = angular.element(document.querySelector('head style#profile-datepicker'));
						if (datebutton.offsetWidth < 248.5) {
							left = -248.5 + datebutton.offsetWidth + 1
							element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: ' + left + 'px !important;}');
						} else {
							element.html('.pro-wrap .profile-header2 .pro-date-pick .dropdown-menu{left: unset;}');
						}
					}
				})
			});
	}

	$scope.accordion = {
		warnvideotableOpened: false,
		drvwarnacttableOpened: false,
		drvwarntableOpened: false,
		drvscoretableOpened: false,
		ranktableOpened: false,
		scorechartOpened: false,
		ddbchartOpened: false,
		bdbchartOpened: false,
		comfortchartOpened: false
	}

	$scope.showRecommendation = function () {
		var result = false;
		if (!$scope.recentRecord) {
			return result;
		}
		else {
			for (var i = 0; i < $scope.dataFieldSet.length; i++) {
				for (var j = 0; j < $scope.dataFieldSet[i].length; j++) {
					if ($scope.recentRecord[$scope.dataFieldSet[i][j]+'_score'] < 30) {
						result = true;
					}
				}
			}
			/*if ($scope.recentRecord.pcw_score < 30) {
				result = true;
			} else if ($scope.recentRecord.fcw_score < 30) {
				result = true;
			} else if ($scope.recentRecord.ufcw_l_score < 30 || $scope.recentRecord.ufcw_h_score < 30) {
				result = true;
			} else if ($scope.recentRecord.spw_score < 30) {
				result = true;
			} else if ($scope.recentRecord.hmw_h_score < 30 || $scope.recentRecord.hmw_m_score < 30 || $scope.recentRecord.hmw_l_score < 30) {
				result = true;
			} else if ($scope.recentRecord.lldw_score < 30 || $scope.recentRecord.rldw_score < 30) {
				result = true;
			} else if ($scope.recentRecord.abw_score < 30) {
				result = true;
			} else if ($scope.recentRecord.aaw_score < 30) {
				result = true;
			}*/
			return result;
		}
	}

	$scope.$watch('accordion.scorechartOpened', function (newValues, oldValues) {
		if (window.innerWidth >= 992) {
			$scope.accordion.ddbchartOpened = newValues
		}
	})

	$scope.$watch('accordion.ddbchartOpened', function (newValues, oldValues) {
		if (window.innerWidth >= 992) {
			$scope.accordion.scorechartOpened = newValues
		}
	})
	$scope.$watch('accordion.bdbchartOpened', function (newValues, oldValues) {
		if (window.innerWidth >= 992) {
			$scope.accordion.comfortchartOpened = newValues
		}
	})
	$scope.$watch('accordion.comfortchartOpened', function (newValues, oldValues) {
		if (window.innerWidth >= 992) {
			$scope.accordion.bdbchartOpened = newValues
		}
	})

	$scope.$on('$destroy', function () {
		if(angular.element(document.body).hasClass('md-dialog-is-showing')){
			$mdDialog.cancel()
		}
		angular.element($window).unbind('resize');
		document.head.removeChild(document.querySelectorAll('head style#profile-datepicker')[0])
	})

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