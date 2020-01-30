/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:29:29
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name virtualResize
 * @requires ngMaterial
 * @restrict A
 * @description
 *   Resize the height of the virtual box component
 *
 * @example
 * <md-virtual-repeat-container id="vertical-container" md-auto-shrink virtual-resize>
 */
angular.module('carSafety').directive('virtualResize', ['$timeout', function($timeout) {
	return {
        restrict: 'A',
        require: '^mdVirtualRepeatContainer',
        link: function(scope, element, attributes, mdVirtualRepeatContainer) {
        	var parentNode = angular.element(document.querySelector('.list-filterlist'))
          	angular.element(element).css('height', parentNode[0].clientHeight + 'px');

          	scope.$watch(function() {
          		return parentNode[0].clientHeight;
          	}, function(value) {
            	angular.element(element).css('height', value + 'px');
            	mdVirtualRepeatContainer.setSize_(value);
            	$timeout(function(){
                scope.$broadcast('$md-resize')
              })
          	});
        }
    };
}]);