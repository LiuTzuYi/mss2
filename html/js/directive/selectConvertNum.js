/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:57
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name convertToNumber
 * @requires ngModel
 * @restrict A
 * @description
 *   Convert selected value to number
 *
 * @example
 * <select convert-to-number>
 */
angular.module('carSafety').directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return val != null ? parseInt(val, 10) : null;
      });
      ngModel.$formatters.push(function(val) {
        return val != null ? '' + val : null;
      });
    }
  };
});