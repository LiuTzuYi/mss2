/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:10
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name bTrafficLayer
 * @requires baiduMap
 * @restrict E
 * @description
 *   Baidu map traffic layer element wrapper
 *
 * @example
 * <div id="map" baidu-map="url">
 *     <b-traffic-layer></b-traffic-layer>
 * </div>
 */
angular.module('carSafety').directive('bTrafficLayer', ['$document','$state', function($document, $state) {
	return {
        restrict: 'E',
        required: '?^baiduMap',
        link: function(scope, element, attrs) {
            scope.trafficCtrl = new BMap.TrafficLayer();
            scope.$parent.ngBMap.addTileLayer(scope.trafficCtrl);

        	element.on('$destroy', function(){
		        scope.$parent.ngBMap.removeTileLayer(scope.trafficCtrl);
		    })
        }
    }
}])