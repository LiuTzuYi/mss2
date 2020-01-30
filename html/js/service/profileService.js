/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:34
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:30:53
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Service
 * @name profileService
 * @description
 *   Service for constructing profile data into specific format (eg. for chart)
 *
 * @example
 * profileService.getExactDateRange(date, $scope.periodselected);
 */
angular.module('carSafety').service('profileService', ['$filter','chartConfig', function ($filter,chartConfig) {
	this.getscoreLabel = function (num) {
		var label
		switch (true) {
			case (num < 10):
				label = 'F'
				break;
			case (num < 20):
				label = 'E'
				break;
			case (num < 30):
				label = 'D'
				break;
			case (num < 40):
				label = 'C'
				break;
			case (num < 50):
				label = 'B-'
				break;
			case (num < 60):
				label = 'B'
				break;
			case (num < 70):
				label = 'B+'
				break;
			case (num < 80):
				label = 'A-'
				break;
			case (num < 90):
				label = 'AA'
				break;
			case (num <= 100):
				label = 'A+'
				break;
		}
		return label
	}
	this.getSpiderData = function (data) {
		var arr = []
		var fieldSet = chartConfig.spiderFieldSet
		var totalField = 0
		/*arr[0] = []
		arr[0].push(data.pcw_score);
		arr[0].push(data.fcw_score);
		arr[0].push(data.ufcw_h_score);
		arr[0].push(data.ufcw_l_score);
		arr[0] = arr[0].concat([0, 0, 0, 0, 0, 0, 0, 0])
		arr[1] = [0, 0, 0]
		arr[1].push(data.ufcw_l_score);
		arr[1].push(data.hmw_h_score);
		arr[1].push(data.hmw_m_score);
		arr[1].push(data.hmw_l_score);
		arr[1].push(data.lldw_score);
		arr[1].push(data.rldw_score);
		arr[1].push(data.spw_score);
		arr[1] = arr[1].concat([0, 0])
		arr[2] = []
		arr[2].push(data.pcw_score);
		arr[2] = arr[2].concat([0, 0, 0, 0, 0, 0, 0, 0])
		arr[2].push(data.spw_score);
		arr[2].push(data.aaw_score);
		arr[2].push(data.abw_score);*/
		for (var i = 0; i < fieldSet.length; i++){
			arr[i] = []
			if(i!==0){
				if(i==fieldSet.length-1){
					arr[i].push(arr[0][0])
					arr[i] = arr[i].concat(new Array(arr[i-1].length-2).fill(-5))
				}
				else{
					arr[i] = arr[i].concat(new Array(arr[i-1].length-1).fill(-5))
				}
				arr[i].push(arr[i-1][arr[i-1].length-1])
			}
			for (var j = 0; j < fieldSet[i].length; j++) {
			  	arr[i].push(data[fieldSet[i][j]+'_score']);
			  	totalField++;
			}
		}
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].length !== totalField){
				arr[i] = arr[i].concat(new Array(totalField-arr[i].length).fill(-5))
			}
		}
		/*angular.forEach(, function (value, index) {
		  arr[index] = []
		  for (var i = 0; i < value.length; i++) {
		  	arr[index].push(data[value[i]]);
		  }

		});*/
		return arr
	}
	this.CLP_getSpiderData = function (data) {
		var arr = []
		var fieldSet = chartConfig.CLP_spiderFieldSet
		var totalField = 0
		/*arr[0] = []
		arr[0].push(data.pcw_score);
		arr[0].push(data.fcw_score);
		arr[0].push(data.ufcw_h_score);
		arr[0].push(data.ufcw_l_score);
		arr[0] = arr[0].concat([0, 0, 0, 0, 0, 0, 0, 0])
		arr[1] = [0, 0, 0]
		arr[1].push(data.ufcw_l_score);
		arr[1].push(data.hmw_h_score);
		arr[1].push(data.hmw_m_score);
		arr[1].push(data.hmw_l_score);
		arr[1].push(data.lldw_score);
		arr[1].push(data.rldw_score);
		arr[1].push(data.spw_score);
		arr[1] = arr[1].concat([0, 0])
		arr[2] = []
		arr[2].push(data.pcw_score);
		arr[2] = arr[2].concat([0, 0, 0, 0, 0, 0, 0, 0])
		arr[2].push(data.spw_score);
		arr[2].push(data.aaw_score);
		arr[2].push(data.abw_score);*/
		for (var i = 0; i < fieldSet.length; i++){
			arr[i] = []
			if(i!==0){
				if(i==fieldSet.length-1){
					arr[i].push(arr[0][0])
					arr[i] = arr[i].concat(new Array(arr[i-1].length-2).fill(-5))
				}
				else{
					arr[i] = arr[i].concat(new Array(arr[i-1].length-1).fill(-5))
				}
				arr[i].push(arr[i-1][arr[i-1].length-1])
			}
			for (var j = 0; j < fieldSet[i].length; j++) {
			  	arr[i].push(data[fieldSet[i][j]+'_score']);
			  	totalField++;
			}
		}
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].length !== totalField){
				arr[i] = arr[i].concat(new Array(totalField-arr[i].length).fill(-5))
			}
		}
		/*angular.forEach(, function (value, index) {
		  arr[index] = []
		  for (var i = 0; i < value.length; i++) {
		  	arr[index].push(data[value[i]]);
		  }

		});*/
		return arr
	}
	this.getDataAsAt = function (date, period) {
		var datestr
		switch (period) {
			case 'd':
				datestr = $filter('date')(new Date(date), 'yyyy-MM-dd')
				break;
			case 'w':
				var dateaf = new Date(new Date(date).setDate(new Date(date).getDate() + 6)).setHours(0, 0, 0, 0)
				datestr = $filter('date')(new Date(date), 'yyyy-MM-dd') + ' ~ ' + $filter('date')(new Date(dateaf), 'yyyy-MM-dd')
				break;
			case 'm':
				datestr = $filter('date')(new Date(date), 'yyyy-MMM')
				break;
			case 'y':
				datestr = $filter('date')(new Date(date), 'yyyy')
		}
		return datestr
	}
	this.getExactDateRange = function (date, period) {
		var daterange = {}
		switch (period) {
			case 'd':
				daterange.datebf = $filter('date')(new Date(date), 'yyyy-MM-dd')
				daterange.dateaf = $filter('date')(new Date(date), 'yyyy-MM-dd')
				break;
			case 'w':
				var dateaf = new Date(new Date(date).setDate(new Date(date).getDate() + 6)).setHours(0, 0, 0, 0)
				daterange.datebf = $filter('date')(new Date(date), 'yyyy-MM-dd')
				daterange.dateaf = $filter('date')(new Date(dateaf), 'yyyy-MM-dd')
				break;
			case 'm':
				var month = new Date(date).getMonth()
				var datebf = new Date(new Date(date).setDate(1)).setHours(0, 0, 0, 0)
				var dateaf = new Date(new Date(new Date(date).setMonth(month + 1)).setDate(0)).setHours(0, 0, 0, 0)
				daterange.datebf = $filter('date')(new Date(datebf), 'yyyy-MM-dd')
				daterange.dateaf = $filter('date')(new Date(dateaf), 'yyyy-MM-dd')
				break;
			case 'y':
				var datebf = new Date(new Date(new Date(date).setMonth(0)).setDate(1)).setHours(0, 0, 0, 0)
				var dateaf = new Date(new Date(new Date(date).setMonth(12)).setDate(0)).setHours(0, 0, 0, 0)
				daterange.datebf = $filter('date')(new Date(datebf), 'yyyy-MM-dd')
				daterange.dateaf = $filter('date')(new Date(dateaf), 'yyyy-MM-dd')
		}
		return daterange
	}
	this.renderChartData = function (data, type, comData) {
		var arr = {}
		var fieldSet = chartConfig.dataFieldSet
		arr.total = []
		arr.total[0] = []
		arr.labels = []
		arr.total2 = []
		arr.dangerDrvBehavior = []
		arr.badDrvBehavior = []
		arr.comfortability = []
		for (var i = 0; i < fieldSet.length; i++){
			for (var j = 0; j < fieldSet[i].length; j++) {
			  	arr[fieldSet[i][j]] = [];
			  	arr[fieldSet[i][j]][0] = [];
			}
		}
/*

		arr.pcw = []
		arr.pcwl = []
		arr.fcw = []
		arr.ufcwh = []
		arr.ufcwl = []
		arr.hmwh = []
		arr.hmwm = []
		arr.hmwl = []
		arr.lldw = []
		arr.rldw = []
		arr.spw = []
		arr.aaw = []
		arr.abw = []
		arr.vb = []
		arr.total[0] = []
		arr.pcw[0] = []
		arr.pcwl[0] = []
		arr.fcw[0] = []
		arr.ufcwh[0] = []
		arr.ufcwl[0] = []
		arr.hmwh[0] = []
		arr.hmwm[0] = []
		arr.hmwl[0] = []
		arr.lldw[0] = []
		arr.rldw[0] = []
		arr.spw[0] = []
		arr.aaw[0] = []
		arr.abw[0] = []
		arr.vb[0] = []
		arr.labels = []
		arr.total2 = []
		arr.collision = []
		arr.badDrvBehavior = []
		arr.comfortability = []*/
		if(!comData){
			angular.forEach(data, function (value, key) {
				arr.total[0].push(value.total_score)
				for (var i = 0; i < fieldSet.length; i++){
					for (var j = 0; j < fieldSet[i].length; j++) {
					  	arr[fieldSet[i][j]][0].push(value[fieldSet[i][j]])
					}
				}
				/*arr.pcw[0].push(value.pcw)
				arr.pcwl[0].push(value.pcw_l)
				arr.fcw[0].push(value.fcw)
				arr.ufcwh[0].push(value.ufcw_h)
				arr.ufcwl[0].push(value.ufcw_l)
				arr.hmwh[0].push(value.hmw_h)
				arr.hmwm[0].push(value.hmw_m)
				arr.hmwl[0].push(value.hmw_l)
				arr.lldw[0].push(value.lldw)
				arr.rldw[0].push(value.rldw)
				arr.spw[0].push(value.spw)
				arr.aaw[0].push(value.aaw)
				arr.abw[0].push(value.abw)
				arr.vb[0].push(value.vb)*/
				var label
				switch (type) {
					case 'd':
						label = $filter('date')(value.acc_date, 'MM-dd')
						break;
					case 'w':
						label = $filter('date')(value.acc_date, 'MM-dd')
						break;
					case 'm':
						label = $filter('date')(value.acc_date, 'yyyy-MM')
						break;
					case 'y':
						label = $filter('date')(value.acc_date, 'yyyy')
						break;
				}
				arr.labels.push(label)
			});
			arr.total2.push(arr.total[0])
			arr.total2.push(new Array(data.length).fill(0))
			for (var j = 0; j < fieldSet[0].length; j++) {
			  	arr.dangerDrvBehavior.push(arr[fieldSet[0][j]][0])
			}
			for (var j = 0; j < fieldSet[1].length; j++) {
			  	arr.badDrvBehavior.push(arr[fieldSet[1][j]][0])
			}
			for (var j = 0; j < fieldSet[2].length; j++) {
			  	arr.comfortability.push(arr[fieldSet[2][j]][0])
			}
			/*arr.collision.push(arr.pcw[0])
			arr.collision.push(arr.pcwl[0])
			arr.collision.push(arr.fcw[0])
			arr.collision.push(arr.ufcwh[0])
			arr.collision.push(arr.ufcwl[0])*/
			/*arr.badDrvBehavior.push(arr.hmwh[0])
			arr.badDrvBehavior.push(arr.hmwm[0])
			arr.badDrvBehavior.push(arr.hmwl[0])
			arr.badDrvBehavior.push(arr.lldw[0])
			arr.badDrvBehavior.push(arr.rldw[0])
			arr.badDrvBehavior.push(arr.spw[0])
			arr.comfortability.push(arr.aaw[0])
			arr.comfortability.push(arr.abw[0])*/
		}
		else{
			if(comData.length == 0){
				arr.total[0].push(null)
				for (var i = 0; i < fieldSet.length; i++){
					for (var j = 0; j < fieldSet[i].length; j++) {
					  	arr[fieldSet[i][j]][0].push(null)
					}
				}
				/*arr.pcw[0].push(null)
				arr.pcwl[0].push(null)
				arr.fcw[0].push(null)
				arr.ufcwh[0].push(null)
				arr.ufcwl[0].push(null)
				arr.hmwh[0].push(null)
				arr.hmwm[0].push(null)
				arr.hmwl[0].push(null)
				arr.lldw[0].push(null)
				arr.rldw[0].push(null)
				arr.spw[0].push(null)
				arr.aaw[0].push(null)
				arr.abw[0].push(null)
				arr.vb[0].push(null)*/
			}
			else if (comData.length == data.length) {
				angular.forEach(comData, function (value, key) {
					arr.total[0].push(value.total_score)
					for (var i = 0; i < fieldSet.length; i++){
						for (var j = 0; j < fieldSet[i].length; j++) {
						  	arr[fieldSet[i][j]][0].push(value[fieldSet[i][j]])
						}
					}
					/*arr.pcw[0].push(value.pcw)
					arr.pcwl[0].push(value.pcw_l)
					arr.fcw[0].push(value.fcw)
					arr.ufcwh[0].push(value.ufcw_h)
					arr.ufcwl[0].push(value.ufcw_l)
					arr.hmwh[0].push(value.hmw_h)
					arr.hmwm[0].push(value.hmw_m)
					arr.hmwl[0].push(value.hmw_l)
					arr.lldw[0].push(value.lldw)
					arr.rldw[0].push(value.rldw)
					arr.spw[0].push(value.spw)
					arr.aaw[0].push(value.aaw)
					arr.abw[0].push(value.abw)
					arr.vb[0].push(value.vb)*/
				})
			}
			else {
				angular.forEach(comData, function (value, key) {
					angular.forEach(data, function (value2, key2) {
						if (value.acc_date == value2.acc_date) {
							arr.total[0].push(value.total_score)
							for (var i = 0; i < fieldSet.length; i++){
								for (var j = 0; j < fieldSet[i].length; j++) {
								  	arr[fieldSet[i][j]][0].push(value[fieldSet[i][j]])
								}
							}
							/*arr.pcw[0].push(value.pcw)
							arr.pcwl[0].push(value.pcw_l)
							arr.fcw[0].push(value.fcw)
							arr.ufcwh[0].push(value.ufcw_h)
							arr.ufcwl[0].push(value.ufcw_l)
							arr.hmwh[0].push(value.hmw_h)
							arr.hmwm[0].push(value.hmw_m)
							arr.hmwl[0].push(value.hmw_l)
							arr.lldw[0].push(value.lldw)
							arr.rldw[0].push(value.rldw)
							arr.spw[0].push(value.spw)
							arr.aaw[0].push(value.aaw)
							arr.abw[0].push(value.abw)
							arr.vb[0].push(value.vb)*/
						}
					})
				})
			}
			arr.total[1] = []
			for (var i = 0; i < fieldSet.length; i++){
				for (var j = 0; j < fieldSet[i].length; j++) {
				  	arr[fieldSet[i][j]][1] = [];
				}
			}
			/*arr.pcw[1] = []
			arr.pcwl[1] = []
			arr.fcw[1] = []
			arr.ufcwh[1] = []
			arr.ufcwl[1] = []
			arr.hmwh[1] = []
			arr.hmwm[1] = []
			arr.hmwl[1] = []
			arr.lldw[1] = []
			arr.rldw[1] = []
			arr.spw[1] = []
			arr.aaw[1] = []
			arr.abw[1] = []
			arr.vb[1] = []*/
			angular.forEach(data, function (value, key) {
				arr.total[1].push(value.total_score)
				for (var i = 0; i < fieldSet.length; i++){
					for (var j = 0; j < fieldSet[i].length; j++) {
					  	arr[fieldSet[i][j]][1].push(value[fieldSet[i][j]])
					}
				}
				/*arr.pcw[1].push(value.pcw)
				arr.pcwl[1].push(value.pcw_l)
				arr.fcw[1].push(value.fcw)
				arr.ufcwh[1].push(value.ufcw_h)
				arr.ufcwl[1].push(value.ufcw_l)
				arr.hmwh[1].push(value.hmw_h)
				arr.hmwm[1].push(value.hmw_m)
				arr.hmwl[1].push(value.hmw_l)
				arr.lldw[1].push(value.lldw)
				arr.rldw[1].push(value.rldw)
				arr.spw[1].push(value.spw)
				arr.aaw[1].push(value.aaw)
				arr.abw[1].push(value.abw)
				arr.vb[1].push(value.vb)*/
				var label
				switch (type) {
					case 'd':
						label = $filter('date')(value.acc_date, 'MM-dd')
						break;
					case 'w':
						label = $filter('date')(value.acc_date, 'MM-dd')
						break;
					case 'm':
						label = $filter('date')(value.acc_date, 'yyyy-MM')
						break;
					case 'y':
						label = $filter('date')(value.acc_date, 'yyyy')
						break;
				}
				arr.labels.push(label)
			});
			arr.total2.push(arr.total[1])
			arr.total2.push(new Array(data.length).fill(0))
			for (var j = 0; j < fieldSet[0].length; j++) {
			  	arr.dangerDrvBehavior.push(arr[fieldSet[0][j]][1])
			}
			for (var j = 0; j < fieldSet[1].length; j++) {
			  	arr.badDrvBehavior.push(arr[fieldSet[1][j]][1])
			}
			for (var j = 0; j < fieldSet[2].length; j++) {
			  	arr.comfortability.push(arr[fieldSet[2][j]][1])
			}
			/*arr.collision.push(arr.pcw[1])
			arr.collision.push(arr.pcwl[1])
			arr.collision.push(arr.fcw[1])
			arr.collision.push(arr.ufcwh[1])
			arr.collision.push(arr.ufcwl[1])
			arr.badDrvBehavior.push(arr.hmwh[1])
			arr.badDrvBehavior.push(arr.hmwm[1])
			arr.badDrvBehavior.push(arr.hmwl[1])
			arr.badDrvBehavior.push(arr.lldw[1])
			arr.badDrvBehavior.push(arr.rldw[1])
			arr.badDrvBehavior.push(arr.spw[1])
			arr.comfortability.push(arr.aaw[1])
			arr.comfortability.push(arr.abw[1])*/
		}
		return arr
	}
	this.renderEmptySpider = function () {
		var arr = []
		arr[0] = [null]
		arr[1] = [null]
		arr[2] = [null]
		return arr
	}
	this.CLP_renderEmptySpider = function () {
		var arr = []
		arr[0] = [null]
		arr[1] = [null]
		arr[2] = [null]
		return arr
	}
	this.renderEmptyChart = function (type, comData) {
		var arr = {}
		var fieldSet = chartConfig.dataFieldSet
		arr.total = []
		arr.total[0] = []
		arr.labels = []
		arr.total2 = []
		arr.dangerDrvBehavior = []
		arr.badDrvBehavior = []
		arr.comfortability = []
		for (var i = 0; i < fieldSet.length; i++){
			for (var j = 0; j < fieldSet[i].length; j++) {
			  	arr[fieldSet[i][j]] = [];
			}
		}
		/*arr.pcw = []
		arr.pcwl = []
		arr.fcw = []
		arr.ufcwh = []
		arr.ufcwl = []
		arr.hmwh = []
		arr.hmwm = []
		arr.hmwl = []
		arr.lldw = []
		arr.rldw = []
		arr.spw = []
		arr.aaw = []
		arr.abw = []
		arr.vb = []*/
/*		arr.collision = []
		arr.badDrvBehavior = []
		arr.comfortability = []
		arr.labels = []
		arr.total2 = []*/
		if(!comData){
			arr.total[0] = [null]
			for (var i = 0; i < fieldSet.length; i++){
				for (var j = 0; j < fieldSet[i].length; j++) {
				  	arr[fieldSet[i][j]][0] = [null];
				}
			}
			/*arr.pcw[0] = [null]
			arr.pcwl[0] = [null]
			arr.fcw[0] = [null]
			arr.ufcwh[0] = [null]
			arr.ufcwl[0] = [null]
			arr.hmwh[0] = [null]
			arr.hmwm[0] = [null]
			arr.hmwl[0] = [null]
			arr.lldw[0] = [null]
			arr.rldw[0] = [null]
			arr.spw[0] = [null]
			arr.aaw[0] = [null]
			arr.abw[0] = [null]
			arr.vb[0] = [null]*/
			arr.total2.push(arr.total[0])
			arr.total2.push([null])
			for (var j = 0; j < fieldSet[0].length; j++) {
			  	arr.dangerDrvBehavior.push(arr[fieldSet[0][j]][0])
			}
			for (var j = 0; j < fieldSet[1].length; j++) {
			  	arr.badDrvBehavior.push(arr[fieldSet[1][j]][0])
			}
			for (var j = 0; j < fieldSet[2].length; j++) {
			  	arr.comfortability.push(arr[fieldSet[2][j]][0])
			}
			/*arr.collision.push(arr.pcw[0])
			arr.collision.push(arr.pcwl[0])
			arr.collision.push(arr.fcw[0])
			arr.collision.push(arr.ufcwh[0])
			arr.collision.push(arr.ufcwl[0])
			arr.badDrvBehavior.push(arr.hmwh[0])
			arr.badDrvBehavior.push(arr.hmwm[0])
			arr.badDrvBehavior.push(arr.hmwl[0])
			arr.badDrvBehavior.push(arr.lldw[0])
			arr.badDrvBehavior.push(arr.rldw[0])
			arr.badDrvBehavior.push(arr.spw[0])
			arr.comfortability.push(arr.aaw[0])
			arr.comfortability.push(arr.abw[0])*/
		}
		else{
			if(comData.length == 0){
				arr.total[0] = [null]
				for (var i = 0; i < fieldSet.length; i++){
					for (var j = 0; j < fieldSet[i].length; j++) {
					  	arr[fieldSet[i][j]][0] = [null];
					}
				}
				/*arr.pcw[0] = [null]
				arr.pcwl[0] = [null]
				arr.fcw[0] = [null]
				arr.ufcwh[0] = [null]
				arr.ufcwl[0] = [null]
				arr.hmwh[0] = [null]
				arr.hmwm[0] = [null]
				arr.hmwl[0] = [null]
				arr.lldw[0] = [null]
				arr.rldw[0] = [null]
				arr.spw[0] = [null]
				arr.aaw[0] = [null]
				arr.abw[0] = [null]
				arr.vb[0] = [null]*/
			}
			else{
				arr.total[0] = []
				for (var i = 0; i < fieldSet.length; i++){
					for (var j = 0; j < fieldSet[i].length; j++) {
					  	arr[fieldSet[i][j]][0] = [];
					}
				}
				/*arr.pcw[0] = []
				arr.pcwl[0] = []
				arr.fcw[0] = []
				arr.ufcwh[0] = []
				arr.ufcwl[0] = []
				arr.hmwh[0] = []
				arr.hmwm[0] = []
				arr.hmwl[0] = []
				arr.lldw[0] = []
				arr.rldw[0] = []
				arr.spw[0] = []
				arr.aaw[0] = []
				arr.abw[0] = []
				arr.vb[0] = []*/
				angular.forEach(comData, function (value, key) {
					arr.total[0].push(value.total_score)
					for (var i = 0; i < fieldSet.length; i++){
						for (var j = 0; j < fieldSet[i].length; j++) {
						  	arr[fieldSet[i][j]][0].push(value[fieldSet[i][j]])
						}
					}

					/*arr.pcw[0].push(value.pcw)
					arr.pcwl[0].push(value.pcw_l)
					arr.fcw[0].push(value.fcw)
					arr.ufcwh[0].push(value.ufcw_h)
					arr.ufcwl[0].push(value.ufcw_l)
					arr.hmwh[0].push(value.hmw_h)
					arr.hmwm[0].push(value.hmw_m)
					arr.hmwl[0].push(value.hmw_l)
					arr.lldw[0].push(value.lldw)
					arr.rldw[0].push(value.rldw)
					arr.spw[0].push(value.spw)
					arr.aaw[0].push(value.aaw)
					arr.abw[0].push(value.abw)
					arr.vb[0].push(value.vb)*/
					var label
					switch (type) {
						case 'd':
							label = $filter('date')(value.acc_date, 'MM-dd')
							break;
						case 'w':
							label = $filter('date')(value.acc_date, 'MM-dd')
							break;
						case 'm':
							label = $filter('date')(value.acc_date, 'yyyy-MM')
							break;
						case 'y':
							label = $filter('date')(value.acc_date, 'yyyy')
							break;
					}
					arr.labels.push(label)
				})
			}
			arr.total[1] = []
			for (var i = 0; i < fieldSet.length; i++){
				for (var j = 0; j < fieldSet[i].length; j++) {
				  	arr[fieldSet[i][j]][1] = [];
				}
			}
			/*arr.pcw[1] = []
			arr.pcwl[1] = []
			arr.fcw[1] = []
			arr.ufcwh[1] = []
			arr.ufcwl[1] = []
			arr.hmwh[1] = []
			arr.hmwm[1] = []
			arr.hmwl[1] = []
			arr.lldw[1] = []
			arr.rldw[1] = []
			arr.spw[1] = []
			arr.aaw[1] = []
			arr.abw[1] = []
			arr.vb[1] = []*/
			arr.total2.push(arr.total[1])
			arr.total2.push([null])
			for (var j = 0; j < fieldSet[0].length; j++) {
			  	arr.dangerDrvBehavior.push(arr[fieldSet[0][j]][1])
			}
			for (var j = 0; j < fieldSet[1].length; j++) {
			  	arr.badDrvBehavior.push(arr[fieldSet[1][j]][1])
			}
			for (var j = 0; j < fieldSet[2].length; j++) {
			  	arr.comfortability.push(arr[fieldSet[2][j]][1])
			}
			/*arr.collision.push(arr.pcw[1])
			arr.collision.push(arr.pcwl[1])
			arr.collision.push(arr.fcw[1])
			arr.collision.push(arr.ufcwh[1])
			arr.collision.push(arr.ufcwl[1])
			arr.badDrvBehavior.push(arr.hmwh[1])
			arr.badDrvBehavior.push(arr.hmwm[1])
			arr.badDrvBehavior.push(arr.hmwl[1])
			arr.badDrvBehavior.push(arr.lldw[1])
			arr.badDrvBehavior.push(arr.rldw[1])
			arr.badDrvBehavior.push(arr.spw[1])
			arr.comfortability.push(arr.aaw[1])
			arr.comfortability.push(arr.abw[1])*/
		}
		return arr
	}
	this.renderChartFullscreen = function (chart, dataSet, isMix) {
		var data
		if (isMix) {
			if(chart=='safetyScore'){
				data = angular.copy(dataSet.total)
			}
			else{
				data = angular.copy(dataSet[chart])
			}
			/*switch (chart) {
				case 'safetyScore':
					data = angular.copy(dataSet.total)
					break;
				case 'PCW':
					data = angular.copy(dataSet.pcw)
					break;
				case 'PCW_L':
					data = angular.copy(dataSet.pcwl)
					break;
				case 'FCW':
					data = angular.copy(dataSet.fcw)
					break;
				case 'UFCW_H':
					data = angular.copy(dataSet.ufcwh)
					break;
				case 'UFCW_L':
					data = angular.copy(dataSet.ufcwl)
					break;
				case 'HMW_H':
					data = angular.copy(dataSet.hmwh)
					break;
				case 'HMW_M':
					data = angular.copy(dataSet.hmwm)
					break;
				case 'HMW_L':
					data = angular.copy(dataSet.hmwl)
					break;
				case 'LLDW':
					data = angular.copy(dataSet.lldw)
					break;
				case 'RLDW':
					data = angular.copy(dataSet.rldw)
					break;
				case 'SPW':
					data = angular.copy(dataSet.spw)
					break;
				case 'AAW':
					data = angular.copy(dataSet.aaw)
					break;
				case 'ABW':
					data = angular.copy(dataSet.abw)
					break;
			}*/
		}
		else {
			if(chart=='safetyScore'){
				data = angular.copy(dataSet.total);
				data.push(new Array(dataSet.total[0].length).fill(null))
			}
			else{
				data = angular.copy(dataSet[chart])
				data.push(new Array(dataSet[chart][0].length).fill(null))
			}
			/*switch (chart) {
				case 'safetyScore':
					data = angular.copy(dataSet.total);
					data.push(new Array(dataSet.total[0].length).fill(null))
					break;
				case 'PCW':
					data = angular.copy(dataSet.pcw);
					data.push(new Array(dataSet.pcw[0].length).fill(null))
					break;
				case 'PCW_L':
					data = angular.copy(dataSet.pcwl);
					data.push(new Array(dataSet.pcwl[0].length).fill(null))
					break;
				case 'FCW':
					data = angular.copy(dataSet.fcw);
					data.push(new Array(dataSet.fcw[0].length).fill(null))
					break;
				case 'UFCW_H':
					data = angular.copy(dataSet.ufcwh);
					data.push(new Array(dataSet.ufcwh[0].length).fill(null))
					break;
				case 'UFCW_L':
					data = angular.copy(dataSet.ufcwl);
					data.push(new Array(dataSet.ufcwl[0].length).fill(null))
					break;
				case 'HMW_H':
					data = angular.copy(dataSet.hmwh);
					data.push(new Array(dataSet.hmwh[0].length).fill(null))
					break;
				case 'HMW_M':
					data = angular.copy(dataSet.hmwm);
					data.push(new Array(dataSet.hmwm[0].length).fill(null))
					break;
				case 'HMW_L':
					data = angular.copy(dataSet.hmwl);
					data.push(new Array(dataSet.hmwl[0].length).fill(null))
					break;
				case 'LLDW':
					data = angular.copy(dataSet.lldw);
					data.push(new Array(dataSet.lldw[0].length).fill(null))
					break;
				case 'RLDW':
					data = angular.copy(dataSet.rldw);
					data.push(new Array(dataSet.rldw[0].length).fill(null))
					break;
				case 'SPW':
					data = angular.copy(dataSet.spw);
					data.push(new Array(dataSet.spw[0].length).fill(null))
					break;
				case 'AAW':
					data = angular.copy(dataSet.aaw);
					data.push(new Array(dataSet.aaw[0].length).fill(null))
					break;
				case 'ABW':
					data = angular.copy(dataSet.abw);
					data.push(new Array(dataSet.abw[0].length).fill(null))
					break;
			}*/
		}
		return data;
	}
	this.CLP_renderChartFullscreen = function (chart, dataSet, isMix) {
		var data
		if (isMix) {
			if(chart=='safetyScore'){
				data = angular.copy(dataSet.total)
			}
			else{
				data = angular.copy(dataSet[chart])
			}
			/*switch (chart) {
				case 'safetyScore':
					data = angular.copy(dataSet.total)
					break;
				case 'PCW':
					data = angular.copy(dataSet.pcw)
					break;
				case 'PCW_L':
					data = angular.copy(dataSet.pcwl)
					break;
				case 'FCW':
					data = angular.copy(dataSet.fcw)
					break;
				case 'UFCW_H':
					data = angular.copy(dataSet.ufcwh)
					break;
				case 'UFCW_L':
					data = angular.copy(dataSet.ufcwl)
					break;
				case 'HMW_H':
					data = angular.copy(dataSet.hmwh)
					break;
				case 'HMW_M':
					data = angular.copy(dataSet.hmwm)
					break;
				case 'HMW_L':
					data = angular.copy(dataSet.hmwl)
					break;
				case 'LLDW':
					data = angular.copy(dataSet.lldw)
					break;
				case 'RLDW':
					data = angular.copy(dataSet.rldw)
					break;
				case 'SPW':
					data = angular.copy(dataSet.spw)
					break;
				case 'AAW':
					data = angular.copy(dataSet.aaw)
					break;
				case 'ABW':
					data = angular.copy(dataSet.abw)
					break;
			}*/
		}
		else {
			if(chart=='safetyScore'){
				data = angular.copy(dataSet.total);
				data.push(new Array(dataSet.total[0].length).fill(null))
			}
			else{
				data = angular.copy(dataSet[chart])
				data.push(new Array(dataSet[chart][0].length).fill(null))
			}
			/*switch (chart) {
				case 'safetyScore':
					data = angular.copy(dataSet.total);
					data.push(new Array(dataSet.total[0].length).fill(null))
					break;
				case 'PCW':
					data = angular.copy(dataSet.pcw);
					data.push(new Array(dataSet.pcw[0].length).fill(null))
					break;
				case 'PCW_L':
					data = angular.copy(dataSet.pcwl);
					data.push(new Array(dataSet.pcwl[0].length).fill(null))
					break;
				case 'FCW':
					data = angular.copy(dataSet.fcw);
					data.push(new Array(dataSet.fcw[0].length).fill(null))
					break;
				case 'UFCW_H':
					data = angular.copy(dataSet.ufcwh);
					data.push(new Array(dataSet.ufcwh[0].length).fill(null))
					break;
				case 'UFCW_L':
					data = angular.copy(dataSet.ufcwl);
					data.push(new Array(dataSet.ufcwl[0].length).fill(null))
					break;
				case 'HMW_H':
					data = angular.copy(dataSet.hmwh);
					data.push(new Array(dataSet.hmwh[0].length).fill(null))
					break;
				case 'HMW_M':
					data = angular.copy(dataSet.hmwm);
					data.push(new Array(dataSet.hmwm[0].length).fill(null))
					break;
				case 'HMW_L':
					data = angular.copy(dataSet.hmwl);
					data.push(new Array(dataSet.hmwl[0].length).fill(null))
					break;
				case 'LLDW':
					data = angular.copy(dataSet.lldw);
					data.push(new Array(dataSet.lldw[0].length).fill(null))
					break;
				case 'RLDW':
					data = angular.copy(dataSet.rldw);
					data.push(new Array(dataSet.rldw[0].length).fill(null))
					break;
				case 'SPW':
					data = angular.copy(dataSet.spw);
					data.push(new Array(dataSet.spw[0].length).fill(null))
					break;
				case 'AAW':
					data = angular.copy(dataSet.aaw);
					data.push(new Array(dataSet.aaw[0].length).fill(null))
					break;
				case 'ABW':
					data = angular.copy(dataSet.abw);
					data.push(new Array(dataSet.abw[0].length).fill(null))
					break;
			}*/
		}
		return data;
	}
}])