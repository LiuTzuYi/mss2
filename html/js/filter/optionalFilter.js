/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:29:44
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Filter
 * @name optionalFilter
 * @description
 *   Filter for multiple arguments
 *
 * @example
 * <li ng-repeat="group in optionList|optionalFilter: {groupName: grpText.search}:{[extraSettings.grpOptsubLabel]:{[extraSettings.subOptionLabel]: grpText.search}}:grpText.search">
 */
angular.module('carSafety').filter("optionalFilter",["$filter",function($filter){
	return function(items, firstArgument,secondArgument,thirdArgument){
        if(thirdArgument){
	        var filtered = [];
	        var filtered2 = []

	        var arr = $filter('filter')(items,firstArgument,false)
	        filtered = filtered.concat(arr)

	        var arr2 = $filter('filter')(items,secondArgument,false)
	        for(var i=0;i<arr2.length;i++){
		        var test = false
		        for(var j=0;j<filtered.length;j++){
		            if(angular.equals(arr2[i], filtered[j])){
		                test = true
		                break;
		            }
		        }
		        if(!test){
		          	filtered2.push(arr2[i])
		        }
        	}
        	filtered = filtered.concat(filtered2)
        	return filtered;
      	}
      	else{
        	return items
      	}
    }
}]);