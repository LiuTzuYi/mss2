/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:29:23
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name showTooltipOnTextOverflow
 * @restrict A
 * @description
 *   Display tooltips when text-overflow
 *
 * @example
 * <div class="title" uib-tooltip="" show-tooltip-on-text-overflow tooltip-enable="false"></div>
 */
angular.module('carSafety').directive("showTooltipOnTextOverflow", ["$timeout", function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
	    var el = element[0];
	    scope.$watch(function(){
	       	//return el.scrollWidth;
	       	return el.offsetWidth < el.scrollWidth
	    }, function() {
	        if (el.offsetWidth < el.scrollWidth) {
	          	attrs.tooltipEnable = "true";
	        }
	        else{
	        	attrs.tooltipEnable = "false";
	        }
	    });
    }
  };
}]);