/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:18
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name customOnChange
 * @restrict A
 * @description
 *   Custom function on change when select file input
 *
 * @attr {Function} custom-on-change Selected file on change function
 *
 * @example
 * <input type="file" custom-on-change="func">
 */
angular.module('carSafety').directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange,{ data:element });
      element.bind('change', onChangeFunc);
      element.on('$destroy', function() {
        element.off();
      });
    }
  };
});