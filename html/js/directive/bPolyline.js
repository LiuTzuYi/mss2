/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:01
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name bPolyline
 * @requires baiduMap
 * @restrict E
 * @description
 *   Baidu map polyline element wrapper
 *
 * @attr {Array[]} [path] List of GPS location [[lng,lat]]
 * @attr {String} [stroke-color] Polylinie stroke color
 * @attr {Number} [stroke-weight] Polylinie stroke weight
 * @attr {Number} [stroke-opacity] Polylinie stroke opacity
 *
 * @example
 * <div id="map" baidu-map="url">
 *     <b-polyline path="pathArray" stroke-color="'#ff1493'" stroke-opacity="1.0" stroke-weight="2"></b-polyline>
 * </div>
 */
angular.module('carSafety').directive('bPolyline', ['$document','$state', function($document, $state) {
	return {
        restrict: 'E',
        templateUrl: '',
        required: '?^baiduMap',
        replace: true,
        scope: {
        	path: '=?',
        	strokeColor: '=?',
        	strokeWeight: '=?',
        	strokeOpacity: '=?',
        },
        link: function(scope, element, attrs) {
        	scope.$watchGroup(['path', 'strokeColor', 'strokeWeight', 'strokeOpacity'], function(newValues, oldValues) {
        		scope.$parent.bMap.removeOverlay(scope.polyline);
	        	if(typeof scope.path == 'object'){
	        		if(scope.path.length>0){
	        			var bpoints = [];
	        			angular.forEach(scope.path,function(value){
	        				var tmppt = new BMap.Point(value[0],value[1])
	        				bpoints.push(tmppt)
	        			})
	        			var option = {}
	        			if(scope.strokeColor && typeof scope.strokeColor == 'string'){
	        				option.strokeColor = scope.strokeColor
	        			}
	        			if(scope.strokeWeight && typeof scope.strokeWeight == 'number'){
	        				option.strokeWeight = scope.strokeWeight
	        			}
	        			if(scope.strokeOpacity && typeof scope.strokeOpacity == 'number'){
	        				option.strokeOpacity = scope.strokeOpacity
	        			}
	        			scope.polyline = new BMap.Polyline(bpoints,option)
	        			scope.$parent.bMap.addOverlay(scope.polyline)
	        			scope.$parent.bMap.setViewport(bpoints)
	        			var zoom = scope.$parent.bMap.getZoom()
	        			scope.$parent.bMap.setZoom(zoom-1)
	        		}
	        	}
/*	        	else{
	        		console.error('<b-polyline> Wrong position value.')
	        	}*/
	        });

        	element.on('$destroy', function(){
		        scope.$parent.bMap.removeOverlay(scope.polyline);
		    })
        }
    }
}])