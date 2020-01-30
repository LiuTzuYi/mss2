/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:48
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name pageSelect
 * @requires smart-table
 * @restrict E
 * @description
 *   Page select input component for smart table
 *
 * @example
 * <page-select></page-select>
 */
angular.module('carSafety').directive('pageSelect', function() {
  return {
    restrict: 'E',
    template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)" autocomplete="off">',
    link: function(scope, element, attrs) {
      scope.$watch('currentPage', function(c) {
        scope.inputPage = c;
      });
    }
  }
});