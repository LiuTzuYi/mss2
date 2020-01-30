/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:27:17
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name warnExportCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user,Idle,Keepalive,httpSuccessCheck,alertBox,refetchMapService,$filter,appConfig,regexConfig
 * @description
 *   Controller for warning data export page.
 */
angular.module('carSafety').controller("warnExportCtrl", ["$scope", "$state", "$stateParams", "$http", "blockUI", "$timeout", "$translate", "langService", "$document", "$window", "$mdDialog", "formValidService", "tmhDynamicLocale", "user", "Idle", "Keepalive", "httpSuccessCheck", "alertBox", "refetchMapService", "$filter", "appConfig", "regexConfig", function ($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService, $document, $window, $mdDialog, formValidService, tmhDynamicLocale, user, Idle, Keepalive, httpSuccessCheck, alertBox, refetchMapService, $filter, appConfig, regexConfig) {

	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;

	window.document.title = $translate.instant('warnExport');

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

	$scope.showExplain = true;

	$scope.filenameregex = regexConfig.filenameregex;

	$scope.validate = function (formstr) {
		$timeout(function () {
			var validate = document.getElementsByName(formstr)[0]
			var invalidFunc = 'setInvalid'
			var validFunc = 'setValid'
			if ($scope.warnConfig[formstr].$invalid) {
				formValidService[invalidFunc](validate)
			} else {
				formValidService[validFunc](validate)
			}
		})
	}

	$scope.getListData = function () {
		blockUi.addClass('block-ui-active block-ui-visible')
		$http({
			method: 'GET',
			url: '/api/filterListData'
		}).then(function successCallback(response) {
			var errorphp = httpSuccessCheck.checkHttp(response)
			if (errorphp) {
				blockUi.removeClass('block-ui-active block-ui-visible')
				alertBox.errorAlert('92101_01')
			} else {
				//get list data here
				$scope.allList = angular.copy(response.data.data);
				$scope.filterList = angular.copy(response.data.data);
				blockUi.removeClass('block-ui-active block-ui-visible')
			}
		}, function errorCallback(response) {
			blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
			if (errorphp) {
				alertBox.errorAlert('92101_' + errorphp)
			} else {
				alertBox.errorAlert(response.data.code)
			}
		});
	}

	$scope.getListData()

	$scope.submit = function () {
		var maxRange = new Date($scope.beforeDate).setFullYear(new Date($scope.beforeDate).getFullYear() + 1)
		if ($scope.afterDate <= maxRange) {
			var filename
			if ($scope.dataFilename) {
				filename = $scope.dataFilename
			} else {
				filename = "WarningData_" + $filter('date')(new Date(), 'yyyyMMdd', $scope.userInfo.timezone)
			}
			//startDate,endDate,dataFilename
			//wt,driver,vehicle -- Array
			//duration,startSpd,endSpd,topSpd,hw,nearHW,runDistance -- Float
			//state -- String Combination(LRB)
			//video -- String Combination(APRDN)
			var postData = {
				dataFilename: filename,
				startDate: $filter('date')($scope.beforeDate, 'yyyy-MM-dd'),
				endDate: $filter('date')($scope.afterDate, 'yyyy-MM-dd'),
				lang: $scope.lang
			}
			//check and add data to postData object
			//
			var checking = true

			if ($scope.warningChecked && $scope.selectedValue.warningList.length !== $scope.allList.wtList.legnth - 2) {
				if ($scope.selectedValue.warningList.length != 0) {
					postData.wt = $scope.selectedValue.warningList
				} else {
					checking = false
				}
			}

			if ($scope.driverChecked) {
				if (!$scope.selectedValue.driverIncludeNull && $scope.selectedValue.driverList.length == 0) {
					checking = false
				} else {
					if ($scope.selectedValue.driverIncludeNull) {
						postData.driverTag = true
					}
					if ($scope.selectedValue.driverList.length == 0) {
						postData.driver = 'X'
					} else {
						postData.driver = $scope.selectedValue.driverList
					}
				}
			} else if ($scope.driverDeptChecked || $scope.driverGrpChecked) {
				var precheck = true
				if ($scope.driverDeptChecked) {
					if ($scope.selectedValue.driverDeptList.length == 0) {
						precheck = false
					}
				}
				if ($scope.driverGrpChecked) {
					if ($scope.selectedValue.driverGrpList.length == 0) {
						precheck = false
					}
				}
				if (precheck) {
					var drvSubmit = $scope.filterList.drvList.map(function (x) {
						return x.id;
					})
					if (drvSubmit.length == 0) {
						postData.driver = 'X'
					} else {
						postData.driver = drvSubmit
					}
				} else {
					checking = false
				}
			}

			if ($scope.vehicleChecked) {
				if ($scope.selectedValue.vehicleList.length == 0) {
					checking = false
				} else {
					postData.vehicle = $scope.selectedValue.vehicleList
				}
			} else if ($scope.vehicleDeptChecked || $scope.vehicleGrpChecked || $scope.vehicleBrandChecked || $scope.vehicleModelChecked || $scope.vehicleTypeChecked) {
				var precheck = true
				if ($scope.vehicleDeptChecked) {
					if ($scope.selectedValue.vehicleDeptList.length == 0) {
						precheck = false
					}
				}
				if ($scope.vehicleGrpChecked) {
					if ($scope.selectedValue.vehicleGrpList.length == 0) {
						precheck = false
					}
				}
				if ($scope.vehicleBrandChecked) {
					if ($scope.selectedValue.vehicleBrandList.length == 0) {
						precheck = false
					}
				}
				if ($scope.vehicleModelChecked) {
					if ($scope.selectedValue.vehicleModelList.length == 0) {
						precheck = false
					}
				}
				if ($scope.vehicleTypeChecked) {
					if ($scope.selectedValue.vehicleTypeList.length == 0) {
						precheck = false
					}
				}
				if (precheck) {
					var vehSubmit = $scope.filterList.vehList.map(function (x) {
						return x.id;
					})
					if (vehSubmit.length == 0) {
						postData.vehicle = 'X'
					} else {
						postData.vehicle = vehSubmit
					}
				} else {
					checking = false
				}
			}

			if ($scope.vehRunDistanceChecked) {
				if ($scope.vehRunDistance) {
					postData.runDistance = $scope.vehRunDistance;
				} else {
					checking = false
				}
			}

			if ($scope.vehRunDistanceRangeChecked) {
				if ($scope.vehRunDistanceRange) {
					postData.runDistanceRange = $scope.vehRunDistanceRange;
				} else {
					checking = false
				}
			}

			if ($scope.durationChecked) {
				if ($scope.duration) {
					postData.duration = $scope.duration
				} else {
					checking = false
				}
			}

			if ($scope.startspdChecked) {
				if ($scope.startspd) {
					postData.startSpd = $scope.startspd
				} else {
					checking = false
				}
			}

			if ($scope.endspdChecked) {
				if ($scope.endspd) {
					postData.endSpd = $scope.endspd
				} else {
					checking = false
				}
			}

			if ($scope.topspdChecked) {
				if ($scope.topspd) {
					postData.topSpd = $scope.topspd
				} else {
					checking = false
				}
			}

			if ($scope.hwChecked) {
				if ($scope.hw) {
					postData.hw = $scope.hw
				} else {
					checking = false
				}
			}

			if ($scope.nearhwChecked) {
				if ($scope.nearhw) {
					postData.nearHW = $scope.nearhw;
				} else {
					checking = false
				}
			}

			if ($scope.exportVideoChecked) {
				if ($scope.selectedValue.videoOptionList.length != 0) {
					var videoStr = "";
					if ($scope.selectedValue.videoOptionList.includes("P") && $scope.selectedValue.videoOptionList.includes("R")) {
						videoStr += "A"
					} else if ($scope.selectedValue.videoOptionList.includes("P")) {
						videoStr += "P"
					} else if ($scope.selectedValue.videoOptionList.includes("R")) {
						videoStr += "R"
					}

					if ($scope.selectedValue.videoOptionList.includes("N")) {
						videoStr += "N"
					}

					if ($scope.selectedValue.videoOptionList.includes("D")) {
						videoStr += "D"
					}
					if (videoStr !== 'AN') {
						postData.video = videoStr;
					}
				} else {
					checking = false
				}
			}

			if ($scope.driverActionChecked) {
				if ($scope.selectedValue.vehStatusList.length != 0) {
					var vehStatusStr = "";
					if ($scope.selectedValue.vehStatusList.includes("L")) {
						vehStatusStr += "L"
					}
					if ($scope.selectedValue.vehStatusList.includes("R")) {
						vehStatusStr += "R"
					}
					if ($scope.selectedValue.vehStatusList.includes("B")) {
						vehStatusStr += "B"
					}
					if ($scope.selectedValue.vehStatusList.includes("N")) {
						vehStatusStr += "N"
					}
					if ($scope.selectedValue.vehStatusIntersect) {
						postData.vehStatus = vehStatusStr;
						postData.vehStatusFlag = $scope.selectedValue.vehStatusIntersect
					}
					else {
						if (vehStatusStr.length !== 4) {
							postData.vehStatus = vehStatusStr;
							postData.vehStatusFlag = $scope.selectedValue.vehStatusIntersect
						}
					}
				}
				else {
					checking = false
				}
			}


			/*if ($scope.selectedValue.driverList.length != 0 && $scope.driverChecked) {
				if(($scope.selectedValue.driverList.length!==$scope.allList.drvList.length)||(!$scope.selectedValue.driverIncludeNull&&$scope.selectedValue.driverList.length==$scope.allList.drvList.length)){
					postData.driver = $scope.selectedValue.driverList
				}
			}
			else if($scope.driverDeptChecked||$scope.driverGrpChecked){
				var drvSubmit = $scope.filterList.drvList.map(function (x) {
					return x.id;
				})
				if((drvSubmit.length!==$scope.allList.vehList.length)||(!$scope.selectedValue.driverIncludeNull&&$scope.selectedValue.driverList.length==$scope.allList.drvList.length)){
					postData.driver = drvSubmit
				}
			}*/


			/*
			if ($scope.selectedValue.driverActionList.length != 0 && $scope.driverActionChecked) {
				var stateStr = "";
				if ($scope.selectedValue.driverActionList.includes("L")) {
					stateStr += "L"
				}
				if ($scope.selectedValue.driverActionList.includes("R")) {
					stateStr += "R"
				}
				if ($scope.selectedValue.driverActionList.includes("B")) {
					stateStr += "B"
				}
				if ($scope.selectedValue.driverActionList.includes("N")) {
					stateStr += "N"
				}
				postData.state = stateStr;
			}*/

			if (checking) {
				blockUi.addClass('block-ui-active block-ui-visible')
				$http({
						method: 'POST',
						url: '/api/warningRawData',
						data: postData,
						//responseType: "arraybuffer",
						/*transformResponse: function (data, headersGetter, status) {
							var type = headersGetter("Content-Type");
							if (!type.startsWith("application/json")) {
								return data;
							};
							var decoder = new TextDecoder("utf-8");
							var domString = decoder.decode(data);
							var json = JSON.parse(domString);
							return json;
						}*/
					})
					.then(function successCallback(response) {
						blockUi.removeClass('block-ui-active block-ui-visible')
						var errorphp = httpSuccessCheck.checkHttp(response)
						//var errorphp = httpSuccessCheck.checkDownloadHttp(response)
						if (errorphp) {
							alertBox.errorAlert('92102_01')
						} else {
							/*var contentDisposition = response.headers('Content-Disposition');
							var filename = contentDisposition.split(';')[1].split('filename="')[1].split('"')[0].trim();*/
							//var downloadpopup = document.createElement('a');
							/*var blob = new Blob([response.data], {
								type: "application/octet-stream'"
							});
							var url = window.URL.createObjectURL(blob);*/
							/*downloadpopup.setAttribute('href', response.data.url);
							downloadpopup.setAttribute("download", filename + '.csv');
							downloadpopup.click()
*/
							var iframe;
							iframe = document.getElementById("hiddenDownloader");
							if (iframe == null) {
								iframe = document.getElementById("hiddenDownloader");
								if (iframe == null) {
									iframe = document.createElement('iframe');
									iframe.id = "hiddenDownloader";
									iframe.style.display = 'none';
									iframe.addEventListener("load", function () {
										var fail = document.getElementById("hiddenDownloader").contentDocument.body.innerHTML.indexOf("Fail")
										if (fail !== -1) {
											errCode = document.getElementById("hiddenDownloader").contentDocument.body.innerHTML.substring(fail + 14, fail + 19)
											alertBox.errorAlert(errCode)
										}
									});
									document.body.appendChild(iframe);
								}
							}
							iframe.src = response.data.url;
						}
					}, function errorCallback(response) {
						blockUi.removeClass('block-ui-active block-ui-visible')
						var errorphp = httpSuccessCheck.checkerrorHttp(response)
						if (errorphp) {
							alertBox.errorAlert('92102_' + errorphp)
						} else {
							alertBox.errorAlert(response.data.code)
						}
					});
			} else {
				alertBox.contentAlert('warning', 'emptyFilter_title', 'emptyFilter_text')
			}
		} else {
			alertBox.contentAlert('warning', 'maxDateRange_title', 'maxDateRange_text')
		}
	}

	//form control

	angular.element(document.querySelector('head')).append("<style id='exportWarn-datepicker'></style>");

	$scope.beforeDate = new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 2)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0);
	$scope.afterDate = new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 1)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0);
	$scope.beforedate = {
		opened: false
	}
	$scope.afterdate = {
		opened: false
	}

	$scope.dateRange = {
		before: new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 2)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0),
		after: new Date($filter('date')(new Date(new Date().setDate(new Date().getDate() - 1)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone)).setHours(0, 0, 0, 0)
	};

	var maxdatetmp = $filter('date')(new Date(new Date().setDate(new Date().getDate() - 1)), 'MM/dd/yyyy HH:mm:ss', $scope.userInfo.timezone);
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
			$timeout(function () {
				var btnWidth = document.getElementsByClassName("warn-date-range-pick-btn after")[0].offsetWidth
				var datepickmenuafter = document.querySelector(".warn-export-input-box .warn-export-filter-item .warn-date-range-pick>.input-group.after .dropdown-menu");
				if (datepickmenuafter) {
					var element = angular.element(document.querySelector('head style#exportWarn-datepicker'));
					var left = datepickmenuafter.clientWidth - btnWidth
					element.html('.warn-export-input-box .warn-export-filter-item .warn-date-range-pick>.input-group.after .dropdown-menu{left: -' + left + 'px !important;}');
				}

			})
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

	$scope.checkEntry = function (event) {
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

	$timeout(function () {
		var table = document.getElementsByClassName('warn-export-input-box')[0]
		var headerHeight = document.getElementsByClassName('warn-export-content-header')[0].clientHeight
		table.style.minHeight = 'calc( 100vh - 48px - 12px - ' + headerHeight + 'px )'
	})

	angular.element($window).bind('resize', function () {
		var table = document.getElementsByClassName('warn-export-input-box')[0]
		var headerHeight = document.getElementsByClassName('warn-export-content-header')[0].clientHeight
		table.style.minHeight = 'calc( 100vh - 48px - 12px - ' + headerHeight + 'px )'
		var btnWidth = document.getElementsByClassName("warn-date-range-pick-btn after")[0].offsetWidth
		var datepickmenuafter = document.querySelector(".warn-export-input-box .warn-export-filter-item .warn-date-range-pick>.input-group.after .dropdown-menu");
		if (datepickmenuafter) {
			var element = angular.element(document.querySelector('head style#exportWarn-datepicker'));
			var left = datepickmenuafter.clientWidth - btnWidth
			element.html('.warn-export-input-box .warn-export-filter-item .warn-date-range-pick>.input-group.after .dropdown-menu{left: -' + left + 'px !important;}');
		}
	})

	$scope.$on('$destroy', function () {
		if(angular.element(document.body).hasClass('md-dialog-is-showing')){
            $mdDialog.cancel()
        }
		angular.element($window).unbind('resize')
		document.head.removeChild(document.querySelectorAll('head style#exportWarn-datepicker')[0])
	})


	//get each list data with $scope.getListData function
	$scope.selectedValue = {
		driverList: [],
		driverDeptList: [],
		driverIncludeNull: false,
		driverGrpList: [],
		vehicleList: [],
		vehicleDeptList: [],
		vehicleGrpList: [],
		vehicleBrandList: [],
		vehicleModelList: [],
		vehicleTypeList: [],
		videoOptionList: [],
		vehStatusList: [],
		vehStatusIntersect: false,
		warningList: []
	}
	$scope.selectPrompt = function (ev, action) {
		$mdDialog.show({
				controller: DialogController,
				templateUrl: '/view/component/dialog/warnExportDialog.html',
				parent: angular.element(document.querySelector('.warn-export-wrap')),
				targetEvent: ev,
				locals: {
					action: action,
					list: $scope.filterList,
					selectedValue: $scope.selectedValue,
					includeNull: $scope.selectedValue.driverIncludeNull,
					intersectVehStatus: $scope.selectedValue.vehStatusIntersect
				},
				clickOutsideToClose: false,
				escapeToClose: false,
				focusOnOpen: false,
				hasBackdrop: false,
				disableParentScroll: true,
				fullscreen: true // Only for -xs, -sm breakpoints.
			})
			.then(function (answer) {
				switch (answer.action) {
					case "driver":
						$scope.selectedValue.driverList = answer.list;
						$scope.selectedValue.driverIncludeNull = answer.drvtag;
						break;

					case "driverGrp":
						$scope.selectedValue.driverGrpList = answer.list;
						filterList('driver');
						break;

					case "driverDept":
						$scope.selectedValue.driverDeptList = answer.list;
						filterList('driver');
						break;

					case "driverAction":
						$scope.selectedValue.vehStatusList = answer.list;
						$scope.selectedValue.vehStatusIntersect = answer.vehstatustag
						break;

					case "vehicle":
						$scope.selectedValue.vehicleList = answer.list;
						break;

					case "vehicleGrp":
						$scope.selectedValue.vehicleGrpList = answer.list;
						filterList('vehicle');
						break;

					case "vehicleDept":
						$scope.selectedValue.vehicleDeptList = answer.list;
						filterList('vehicle');
						break;

					case "vehicleBrand":
						$scope.selectedValue.vehicleBrandList = answer.list;
						filterList('vehicle');
						break;

					case "vehicleModel":
						$scope.selectedValue.vehicleModelList = answer.list;
						filterList('vehicle');
						break;

					case "vehicleType":
						$scope.selectedValue.vehicleTypeList = answer.list;
						filterList('vehicle');
						break;

					case "video":
						$scope.selectedValue.videoOptionList = answer.list;
						break;

					case "warning":
						$scope.selectedValue.warningList = answer.list;
						break;
				}

			}, function () {})
	}

	$scope.filterboxCheck = function (filter) {
		switch (filter) {
			case "driver":
				if (!$scope.driverChecked) {
					$scope.selectedValue.driverList = [];
					$scope.selectedValue.driverIncludeNull = false;
				}
				break;

			case "driverGrp":
				if (!$scope.driverGrpChecked) {
					$scope.selectedValue.driverGrpList = [];
					filterList('driver');
				}
				break;

			case "driverDept":
				if (!$scope.driverDeptChecked) {
					$scope.selectedValue.driverDeptList = [];
					filterList('driver');
				}
				break;

			case "vehicle":
				if (!$scope.vehicleChecked) {
					$scope.selectedValue.vehicleList = [];
				}
				break;

			case "vehicleGrp":
				if (!$scope.vehicleGrpChecked) {
					$scope.selectedValue.vehicleGrpList = [];
					filterList('vehicle');
				}
				break;

			case "vehicleDept":
				if (!$scope.vehicleDeptChecked) {
					$scope.selectedValue.vehicleDeptList = [];
					filterList('vehicle');
				}
				break;

			case "vehicleBrand":
				if (!$scope.vehicleBrandChecked) {
					$scope.selectedValue.vehicleBrandList = [];
					filterList('vehicle');
				}
				break;

			case "vehicleModel":
				if (!$scope.vehicleModelChecked) {
					$scope.selectedValue.vehicleModelList = [];
					filterList('vehicle');
				}
				break;

			case "vehicleType":
				if (!$scope.vehicleTypeChecked) {
					$scope.selectedValue.vehicleTypeList = [];
					filterList('vehicle');
				}
				break;

			case "video":
				if (!$scope.exportVideoChecked) {
					$scope.selectedValue.videoOptionList = [];
				}
				break;

			case "warning":
				if (!$scope.warningChecked) {
					$scope.selectedValue.warningList = [];
				}
				break;

			case "driverAction":
				if (!$scope.driverActionChecked) {
					$scope.selectedValue.vehStatusList = [];
					$scope.selectedValue.vehStatusIntersect = false;
				}
				break;

			case "vehRunDistance":
				if (!$scope.vehRunDistanceChecked) {
					$scope.vehRunDistance = null;
				}
				break;

			case "vehRunDistanceRange":
				if (!$scope.vehRunDistanceRangeChecked) {
					$scope.vehRunDistanceRange = null;
				}
				break;

			case "duration":
				if (!$scope.durationChecked) {
					$scope.duration = null;
				}
				break;

			case "startspd":
				if (!$scope.startspdChecked) {
					$scope.startspd = null;
				}
				break;

			case "endspd":
				if (!$scope.endspdChecked) {
					$scope.endspd = null;
				}
				break;

			case "topspd":
				if (!$scope.topspdChecked) {
					$scope.topspd = null;
				}
				break;

			case "hw":
				if (!$scope.hwChecked) {
					$scope.hw = null;
				}
				break;

			case "nearhw":
				if (!$scope.nearhwChecked) {
					$scope.nearhw = null;
				}
				break;
		}
	}

	function filterVehCheck(item) {
		var flag = true;

		if ($scope.selectedValue.vehicleDeptList.length != 0 && $scope.selectedValue.vehicleDeptList.indexOf(item.ou_id) === -1) {
			flag = false;
		}
		if ($scope.selectedValue.vehicleGrpList.length != 0 && (item.grp_id == null || (item.grp_id && !item.grp_id.some(function (r) {
				return $scope.selectedValue.vehicleGrpList.indexOf(r) !== -1;
			})))) {
			flag = false;
		}
		if ($scope.selectedValue.vehicleBrandList.length != 0 && $scope.selectedValue.vehicleBrandList.indexOf(item.brand) === -1) {
			flag = false;
		}
		if ($scope.selectedValue.vehicleModelList.length != 0 && $scope.selectedValue.vehicleModelList.indexOf(item.model) === -1) {
			flag = false;
		}
		if ($scope.selectedValue.vehicleTypeList.length != 0 && $scope.selectedValue.vehicleTypeList.indexOf(item.type_id) === -1) {
			flag = false;
		}

		return flag;
	}

	function filterDrvCheck(item) {
		var flag = true;

		if ($scope.selectedValue.driverDeptList.length != 0 && $scope.selectedValue.driverDeptList.indexOf(item.ou_id) === -1) {
			flag = false;
		}

		if ($scope.selectedValue.driverGrpList.length != 0 && item.grp_id && !item.grp_id.some(function (x) {
				return $scope.selectedValue.driverGrpList.includes(item.grp_id)
			})) {
			flag = false;
		}

		return flag;
	}

	function filterList(action) {
		if (action == 'driver') {
			$scope.filterList.drvList = [];
			var fullList = angular.copy($scope.allList.drvList);
			var selectedDrv = angular.copy($scope.selectedValue.driverList);

			var temp = $filter('filter')(fullList, function (item) {
				return filterDrvCheck(item);
			});
			$scope.filterList.drvList = angular.copy(temp);

			selectedDrv = $filter('filter')(selectedDrv, function (item) {
				return $scope.filterList.drvList.find(function (i) {
					return i.id === item
				})
			})
			$scope.selectedValue.driverList = angular.copy(selectedDrv);

			$scope.filterList.drvList = $scope.filterList.drvList.map(function (x) {
				var tmp = {
					id: x.id,
					name: x.name
				}
				return tmp;
			})
		} else if (action == 'vehicle') {
			$scope.filterList.vehList = [];
			var fullList = angular.copy($scope.allList.vehList);
			var selectedVeh = angular.copy($scope.selectedValue.vehicleList);

			var temp = $filter('filter')(fullList, function (item) {
				return filterVehCheck(item)
			});
			$scope.filterList.vehList = angular.copy(temp);

			selectedVeh = $filter('filter')(selectedVeh, function (item) {
				return $scope.filterList.vehList.find(function (i) {
					return i.id === item
				})
			})
			$scope.selectedValue.vehicleList = angular.copy(selectedVeh);

			$scope.filterList.vehList = $scope.filterList.vehList.map(function (x) {
				var tmp = {
					id: x.id,
					name: x.name
				}
				return tmp;
			})
		}
	}

	function DialogController($scope, $mdDialog, $window, $translate, action, list, selectedValue, includeNull, intersectVehStatus) {
		var html = document.getElementsByTagName('HTML')[0]

		$scope.originalListArr = angular.copy(list);
		$scope.action = action;
		$scope.selectedValue = angular.copy(selectedValue);
		$scope.includeNull = includeNull;
		$scope.intersectVehStatus = intersectVehStatus;
		$scope.displayNullBox = true;
		var checkDialog

		$timeout(function () {
			html.style.removeProperty('overflow-y')
		})

		//set virtual repeater
		$scope.setRepeater = function () {
			var dialog = document.querySelector(".set-dialog-wrap")
			var container = document.querySelector("#vertical-container")
			if (window.innerWidth <= 959) {
				var height = dialog.clientHeight - 45 - 20 - 31 - 25 - 52
				if (action == 'driver') {
					height = height - 25
				}
				container.style.height = 'calc( ' + height + 'px - 1rem )';
			} else {
				var height = 45 + 20 + 31 + 25 + 52
				if (action == 'driver') {
					height = height + 25
				}
				container.style.height = 'calc( 60vh - ' + height + 'px - 1rem )';
			}
			$timeout(function () {
				$scope.$broadcast('$md-resize')
				$scope.$apply()
			}, true)
		}

		//get the selected list
		switch ($scope.action) {
			case "driver":
				if ($scope.selectedValue.driverList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.driverList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.drvList);
				checkDialog = setInterval(function () {
					if (document.querySelector(".set-dialog-wrap")) {
						if ($scope.items.length != 0) {
							var dialog = document.querySelector(".set-dialog-wrap")
							var container = document.querySelector("#vertical-container")
							if (window.innerWidth <= 959) {
								var height = dialog.clientHeight - 45 - 20 - 31 - 25 - 52 - 25
								container.style.height = 'calc( ' + height + 'px - 1rem )';
							} else {
								var height = 45 + 20 + 31 + 25 + 52 + 25
								container.style.height = 'calc( 60vh - ' + height + 'px - 1rem )';
							}
						}
						$timeout(function () {
							$scope.$broadcast('$md-resize')
							$scope.$apply()
						}, true)
						clearInterval(checkDialog);
					}
				}, 100);
				$scope.items = angular.copy($scope.originalList);
				break;

			case "driverDept":
				if ($scope.selectedValue.driverDeptList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.driverDeptList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.deptList);
				$scope.items = angular.copy($scope.originalList);
				break;

			case "driverGrp":
				if ($scope.selectedValue.driverGrpList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.driverGrpList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.drvGrp);
				$scope.items = angular.copy($scope.originalList);
				break;

			case "vehicle":
				if ($scope.selectedValue.vehicleList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.vehicleList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.vehList);
				checkDialog = setInterval(function () {
					if (document.querySelector(".set-dialog-wrap")) {
						if ($scope.items.length != 0) {
							var dialog = document.querySelector(".set-dialog-wrap")
							var container = document.querySelector("#vertical-container")
							if (window.innerWidth <= 959) {
								var height = dialog.clientHeight - 45 - 20 - 31 - 25 - 52
								container.style.height = 'calc( ' + height + 'px - 1rem )';
							} else {
								var height = 45 + 20 + 31 + 25 + 52
								container.style.height = 'calc( 60vh - ' + height + 'px - 1rem )';
							}
						}
						$timeout(function () {
							$scope.$broadcast('$md-resize')
							$scope.$apply()
						}, true)
						clearInterval(checkDialog);
					}
				}, 100);
				$scope.items = $scope.originalList;
				break;

			case "vehicleDept":
				if ($scope.selectedValue.vehicleDeptList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.vehicleDeptList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.deptList);
				$scope.items = $scope.originalList;
				break;

			case "vehicleGrp":
				if ($scope.selectedValue.vehicleGrpList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.vehicleGrpList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.vehGrp);
				$scope.items = angular.copy($scope.originalList);
				break;

			case "vehicleBrand":
				if ($scope.selectedValue.vehicleBrandList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.vehicleBrandList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.brandList);
				$scope.items = angular.copy($scope.originalList);
				break;

			case "vehicleModel":
				if ($scope.selectedValue.vehicleModelList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.vehicleModelList);
				}
				$scope.originalList = angular.copy($scope.originalListArr.modelList);
				$scope.items = angular.copy($scope.originalList);
				break;

			case "vehicleType":
				if ($scope.selectedValue.vehicleTypeList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.vehicleTypeList);
				}

				$scope.items = [];
				$scope.originalListArr.vehtypeList.forEach(function (object) {
					var tmp = {
						id: object.id,
						svgName: object.name,
						name: $translate.instant(object.name)
					}
					$scope.items.push(tmp);
				})
				$scope.originalList = angular.copy($scope.items);
				break;

			case "video":
				if ($scope.selectedValue.videoOptionList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.videoOptionList);
				}
				$scope.items = [{
						id: "N",
						name: $translate.instant("Vdo-N")
					},
					{
						id: "P",
						name: $translate.instant("Vdo-P")
					},
					{
						id: "R",
						name: $translate.instant("Vdo-R")
					},
					{
						id: "D",
						name: $translate.instant("warningVideo")
					}
				]
				$scope.originalList = angular.copy($scope.items);
				break;

			case "driverAction":
				if ($scope.selectedValue.vehStatusList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.vehStatusList);
				}
				$scope.items = [
					/*{
										id: "N",
										name: $translate.instant("DA-N")
									}, */
					{
						id: "L",
						name: $translate.instant("DA-L")
					}, {
						id: "R",
						name: $translate.instant("DA-R")
					}, {
						id: "B",
						name: $translate.instant("DA-B")
					}
				]
				$scope.originalList = angular.copy($scope.items);
				var pos = $scope.selectedValue.indexOf('N');
				if (pos > -1) {
					$scope.includeNull = true;
					$scope.selectedValue.splice(pos, 1);
				} else {
					$scope.includeNull = false;
				}
				break;

			case "warning":
				if ($scope.selectedValue.warningList.length == 0) {
					$scope.selectedValue = [];
				} else {
					$scope.selectedValue = angular.copy($scope.selectedValue.warningList);
				}

				$scope.items = [];
				$scope.originalListArr.wtList.forEach(function (object) {
					var tmp = {
						id: object.id,
						name: $translate.instant(object.name),
						parent: $translate.instant(object.parent)
					}
					$scope.items.push(tmp);
				})
				$scope.originalList = angular.copy($scope.items);
				break;

			default:
				$scope.items = []
		}

		if ($scope.action == 'driver' || $scope.action == 'vehicle') {
			angular.element($window).on('resize', $scope.setRepeater)
		}

		$scope.filterList = function (keyword) {
			if ($scope.action == 'driverDept' || $scope.action == 'vehicleDept') {
				var fullList = angular.copy($scope.originalList);
				$scope.items = fullList.filter(function f(o) {
					if (o.name.includes(keyword)) return true

					if (o.children) {
						return (o.children = o.children.filter(f)).length
					}
				})
			} else if ($scope.action == 'vehicleBrand') {
				$scope.items = $filter('filter')($scope.originalList, {
					brand: keyword
				});
			} else if ($scope.action == 'vehicleModel') {
				$scope.items = $filter('filter')($scope.originalList, {
					model: keyword
				});
			} else if ($scope.action == 'driver') {
				$scope.items = $filter('filter')($scope.originalList, {
					name: keyword
				});
				var empty = "EMPTY";
				if (empty.includes(keyword)) {
					$scope.displayNullBox = true;
				} else {
					$scope.displayNullBox = false;
				}

			} else if ($scope.action == 'driverAction') {
				$scope.items = $filter('filter')($scope.originalList, {
					name: keyword
				});
				var empty = $translate.instant("DA-N");
				if (empty.includes(keyword)) {
					$scope.displayNullBox = true;
				} else {
					$scope.displayNullBox = false;
				}
			} else {
				$scope.items = $filter('filter')($scope.originalList, {
					name: keyword
				});
			}

			if ($scope.action == 'driver' || $scope.action == 'vehicle') {
				if ($scope.items.length > 0) {
					$timeout(function () {
						$scope.setRepeater()
					}, true)
				}
			}
		}

		$scope.toggleNull = function () {
			$scope.includeNull = !$scope.includeNull;
		}

		$scope.toggleIntersect = function () {
			$scope.intersectVehStatus = !$scope.intersectVehStatus;
		}

		$scope.toggle = function (item) {
			if ($scope.action == 'vehicleBrand') {
				var idx = $scope.selectedValue.indexOf(item.brand);
				if (idx > -1) {
					$scope.selectedValue.splice(idx, 1);
				} else {
					$scope.selectedValue.push(item.brand);
				}
			} else if ($scope.action == 'vehicleModel') {
				var idx = $scope.selectedValue.indexOf(item.model);
				if (idx > -1) {
					$scope.selectedValue.splice(idx, 1);
				} else {
					$scope.selectedValue.push(item.model);
				}
			} else {
				var idx = $scope.selectedValue.indexOf(item.id);
				if (idx > -1) {
					$scope.selectedValue.splice(idx, 1);
				} else {
					$scope.selectedValue.push(item.id);
				}
			}
		};

		$scope.isParent = function (item) {
			if ($scope.action == "driverDept" || $scope.action == "vehicleDept") {
				return item.children;
			} else {
				var potentialChild = $filter('filter')($scope.items, {
					parent: item.name
				}, true)
				if (potentialChild.length !== 0) {
					return true
				} else {
					return false
				}
			}

		}

		function addChildren(parent) {
			if ($scope.selectedValue.indexOf(parent.id) == -1) {
				$scope.selectedValue.push(parent.id);
			}
			if (parent.children) {
				var children = parent.children;
				children.forEach(function (child) {
					if ($scope.selectedValue.indexOf(child.id) == -1) {
						$scope.selectedValue.push(child.id);
					}
					addChildren(child);
				});
			}
		}

		/* function removeChildren(parent) {
			var pos = $scope.selectedValue.indexOf(parent.id)
			if (pos > -1) {
				$scope.selectedValue.splice(pos, 1);
			}
			if (parent.children) {
				var children = parent.children;
				children.forEach(function (child) {
					pos = $scope.selectedValue.indexOf(parent.id)
					if (pos > -1) {
						$scope.selectedValue.splice(pos, 1);
					}
					removeChildren(child);
				});
			}
		} */

		function flat(obj) {
			var result = [];
			if (obj && obj.length > 0) {
				obj.forEach(function (a) {
					result.push(a);
					if (Array.isArray(a.children)) {
						result = result.concat(flat(a.children));
					}
				});
			}
			return result;
		}

		$scope.selectAllChild = function (item) {
			if ($scope.action == "driverDept" || $scope.action == "vehicleDept") {
				var pos = $scope.selectedValue.indexOf(item.id)
				if (pos !== -1) {
					//remove all children
					//removeChildren(item);
					$scope.selectedValue.splice(pos, 1);
				} else {
					addChildren(item);
				}
			} else {
				if ($scope.allChildrenSelected(item)) {
					var child = $filter('filter')($scope.items, {
						parent: item.name
					}, true).map(function (x) {
						return x.id;
					})
					child.forEach(function (kid) {
						$scope.selectedValue.splice($scope.selectedValue.indexOf(kid), 1);
					})
					var posMother = $scope.selectedValue.indexOf(item.id);
					if (posMother > -1) {
						$scope.selectedValue.splice(posMother, 1);
					}
				} else {
					var child = $filter('filter')($scope.items, {
						parent: item.name
					}, true).forEach(function (x) {
						if ($scope.selectedValue.indexOf(x.id) == -1) {
							$scope.selectedValue.push(x.id);
						}
					})
				}
			}
		}

		$scope.allChildrenSelected = function (item) {
			if ($scope.action == "driverDept" || $scope.action == "vehicleDept") {
				var child = flat(item.children).map(function (x) {
					return x.id;
				});
				child.push(item.id);
				var result = child.every(function (child) {
					if ($scope.selectedValue.indexOf(child) == -1) {
						return false;
					} else {
						return true;
					}
				})

				/*if (result) {
					if ($scope.selectedValue.indexOf(item.id) == -1) {
						$scope.selectedValue.push(item.id);
					}
				} else {
					var pos = $scope.selectedValue.indexOf(item.id);
					if (pos > -1) {
						$scope.selectedValue.splice(pos, 1);
					}
				}*/
				return result;
			} else {
				var child = $filter('filter')($scope.items, {
					parent: item.name
				}, true).map(function (x) {
					return x.id;
				})
				return child.every(function (child) {
					if ($scope.selectedValue.indexOf(child) == -1) {
						return false;
					} else {
						return true;
					}
				})
			}
		}

		$scope.isIndeterminateParent = function (item) {
			if ($scope.action == "driverDept" || $scope.action == "vehicleDept") {
				var child = flat(item.children).map(function (x) {
					return x.id;
				});
				child.push(item.id);
				return child.some(function (child) {
					if ($scope.selectedValue.indexOf(child) > -1) {
						return true;
					} else {
						return false;
					}
				}) && !$scope.allChildrenSelected(item);
			} else {
				var child = $filter('filter')($scope.items, {
					parent: item.name
				}, true).map(function (x) {
					return x.id;
				})
				return child.some(function (child) {
					if ($scope.selectedValue.indexOf(child) > -1) {
						return true;
					} else {
						return false;
					}
				}) && !$scope.allChildrenSelected(item);
			}
		}

		$scope.isIndeterminate = function () {
			return ($scope.selectedValue.length !== 0 &&
				$scope.selectedValue.length !== $scope.items.length);
		};

		$scope.isChecked = function () {
			return $scope.selectedValue.length === $scope.items.length;
		};

		$scope.exists = function (item) {
			if ($scope.action == 'vehicleBrand') {
				return $scope.selectedValue.indexOf(item.brand) > -1;
			} else if ($scope.action == 'vehicleModel') {
				return $scope.selectedValue.indexOf(item.model) > -1;
			} else {
				return $scope.selectedValue.indexOf(item.id) > -1;
			}
		};

		$scope.toggleAll = function () {
			if ($scope.action == "driverDept" || $scope.action == "vehicleDept") {
				var child = flat($scope.items[0].children);
				child.push($scope.items[0]);
				if (child.length === $scope.selectedValue.length) {
					$scope.selectedValue = [];
				} else if (child.length >= 0) {
					//$scope.selectedValue.push($scope.items[0].id);
					addChildren($scope.items[0]);
				}
			} else {
				if ($scope.selectedValue.length === $scope.items.length) {
					$scope.selectedValue = [];
				} else if ($scope.selectedValue.length === 0 || $scope.selectedValue.length > 0) {
					if ($scope.action == 'vehicleBrand') {
						var displayingID = $scope.items.map(function (x) {
							return x.brand
						});
						displayingID.forEach(function (item) {
							if (!$scope.selectedValue.includes(item)) {
								$scope.selectedValue.push(item);
							}
						})
					} else if ($scope.action == 'vehicleModel') {
						var displayingID = $scope.items.map(function (x) {
							return x.model
						});
						displayingID.forEach(function (item) {
							if (!$scope.selectedValue.includes(item)) {
								$scope.selectedValue.push(item);
							}
						})
					} else {
						var displayingID = $scope.items.map(function (x) {
							return x.id
						});
						displayingID.forEach(function (item) {
							if (!$scope.selectedValue.includes(item)) {
								$scope.selectedValue.push(item);
							}
						})
					}
				}
			}
		};

		$scope.cancel = function () {
			$mdDialog.cancel();
		};
		$scope.submit = function () {
			if ($scope.action == "driverAction" && $scope.includeNull) {
				$scope.selectedValue.push('N');
			}
			$mdDialog.hide({
				action: action,
				list: $scope.selectedValue,
				drvtag: $scope.includeNull,
				vehstatustag: $scope.intersectVehStatus
			});
		}

		$scope.$on('$destroy', function () {
			if ($scope.action == 'driver' || $scope.action == 'vehicle') {
				angular.element($window).off('resize')
			}
		})

	}

	DialogController.$inject = ["$scope", "$mdDialog", "$window", "$translate", "action", "list", "selectedValue", "includeNull", "intersectVehStatus"];
}]);