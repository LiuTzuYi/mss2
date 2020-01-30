/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:29:05
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name stFiltered
 * @requires smart-table
 * @restrict A
 * @description
 *   Return filtered colletion data from table with search filter
 *
 * @example
 * <div st-table="collectionDisplay" st-safe-src="actCollection" st-filtered="actCollectionFiltered">
 */
angular.module('carSafety').directive('stFiltered', function () {
  	return {
      restrict: 'A',
      require: '^stTable',
      scope: {
        stFiltered: '='
      },
      controller: 'stTableController',
      link: function (scope, element, attr, ctrl) {

        scope.$watch(function () {
          return ctrl.getFilteredCollection();
        }, function (newValue, oldValue) {
          scope.stFiltered = ctrl.getFilteredCollection();
        });
      }
    };
});