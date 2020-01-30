/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:29:37
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Filter
 * @name fixNum
 * @description
 *   Filter to formats a number using fixed-point notation
 *
 * @example
 * <div>{{recentRecord.pcw | fixNum: 1}}</div>
 */
angular.module('carSafety').filter('fixNum', function ($filter) {
    return function (number, pre) {
    	if(number||number==0){
    		return number.toFixed(pre);
    	}
    	else{
    		return
    	}
    };
});