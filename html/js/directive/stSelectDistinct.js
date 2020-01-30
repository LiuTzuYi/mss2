/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:29:16
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name stSelectDistinct
 * @requires smart-table
 * @restrict E
 * @description
 *   Return filtered colletion data from table with selected option
 *
 * @example
 * <st-select-distinct collection="selectOptions" predicate="selectedField"></st-select-distinct>
 */
angular.module('carSafety').directive('stSelectDistinct', ['$translate',function($translate) {
  	return {
	    restrict: 'E',
	    require: '^stTable',
	    scope: {
	      collection: '=',
	      predicate: '@',
	      predicateExpression: '='
	    },
    	template: '<select ng-model="selectedOption" ng-change="optionChanged(selectedOption)"><option ng-repeat="opt in distinctItems" value="{{opt}}">{{opt|translate}}</option></select>',
    	link: function(scope, element, attr, table) {
      		var getPredicate = function() {
        		var predicate = scope.predicate;
        		if (!predicate && scope.predicateExpression) {
          			predicate = scope.predicateExpression;
        		}
        		return predicate;
      		}

      		scope.$watch('collection', function(newValue) {
        		var predicate = getPredicate();
        		if (newValue) {
          			var temp = [];
          			scope.distinctItems = ['all'];

          			angular.forEach(scope.collection, function(item) {
            			temp.push(item);
          			});
          			//temp.sort();
          			scope.distinctItems = scope.distinctItems.concat(temp);
          			scope.selectedOption = scope.distinctItems[0];
          			scope.optionChanged(scope.selectedOption);
        		}
      		}, true);

      		scope.optionChanged = function(selectedOption) {
        		var predicate = getPredicate();
        		var query = {};
        		query.distinct = selectedOption;
        		if (query.distinct === 'all') {
          			query.distinct = '';
        		}
        		table.search(query, predicate);
      		};
    	}
  	}
}])