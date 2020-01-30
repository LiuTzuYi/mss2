/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:27:49
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name bMarker
 * @requires baiduMap.
 * @restrict E
 * @description
 *   Baidu map marker element wrapper
 *
 * @attr {Object} position GPS location
 * @attr {Number} position.lat Latitude
 * @attr {Number} position.lng Longitude
 * @attr {Object} [icon] Marker icon
 * @attr {String} [icon.url] Marker icon path
 * @attr {Number[]} [icon.scale] Marker icon scale [width,height]
 * @attr {Number} [z-index] Marker z-index
 * @attr {Number[]} [offset] Marker offset [width,height]
 * @attr {Boolean} [visible] Marker visibility
 * @attr {Function} [on-click] Marker on click event
 * @attr {Function} [on-mouseover] Marker on mouseover event
 * @attr {Function} [on-mouseout] Marker on mouseout event
 *
 * @example
 * <div id="map" baidu-map="url">
 *     <b-marker id="trip3" position="{lat: 22.13, lng: 144.23}" icon="{url:'/images/1234.png',scale:[25,25]}" z-index="4" offset="[0,-15]" visible="true" on-click="myfunc1()" on-mouseover="myfunc2()" on-mouseout="myfunc3()"></b-marker>
 * </div>
 */
angular.module('carSafety').directive('bMarker', ['$document','$state', function($document, $state) {
    return {
        restrict: 'E',
        templateUrl: '',
        required: '?^baiduMap',
        replace: true,
        scope: {
        	position: '=',
        	visible: '=?',
        	zIndex: '=?',
        	icon: '=?',
        	offset: '=?',
        	onClick: '&?',
        	onMouseover: '&?',
        	onMouseout: '&?'
        },
        link: function(scope, element, attrs) {

        	scope.$watch('zIndex',function(newValues, oldValues){
        		if(scope.marker){
        			scope.marker.setZIndex(scope.zIndex)
        		}
        	})

        	scope.$watch('visible',function(newValues, oldValues){
        		if(scope.marker){
        			if(scope.visible){
		    			scope.marker.show()
		    		}
		    		else{
		    			scope.marker.hide()
		    		}
        		}
        	})

        	scope.$watchGroup(['position', 'icon', 'offset', 'onClick', 'onMouseover', 'onMouseout'], function(newValues, oldValues) {
        		if(scope.marker){
        			scope.$parent.bMap.removeOverlay(scope.marker);
        		}
        		if(typeof scope.position == 'object' && typeof scope.position.lat == 'number' && typeof scope.position.lng == 'number'){
	        		var point = new BMap.Point(scope.position.lng,scope.position.lat)
	        		if(typeof scope.icon !== 'undefined'){
	        			if(typeof scope.icon == 'object' && typeof scope.icon.url =='string' && typeof scope.icon.scale=='object' && typeof scope.icon.scale[0] == 'number' && typeof scope.icon.scale[1] == 'number'){
	        				var iconCustom = new BMap.Icon(scope.icon.url,new BMap.Size(scope.icon.scale[0],scope.icon.scale[1]))
	        			}
	        		}
	        		if(point&&iconCustom){
	        			if(scope.offset){
	        				var pan = new BMap.Size(scope.offset[0],scope.offset[1])
	        				scope.marker = new BMap.Marker(point,{icon:iconCustom,offset:pan})
	        			}
	        			else{
	        				scope.marker = new BMap.Marker(point,{icon:iconCustom})
	        			}
	        		}
	        		else{
	        			scope.marker = new BMap.Marker(point)
	        		}
				    if(typeof scope.onClick !== 'undefined'){
				    	if(typeof scope.onClick == 'function'){
				    		scope.marker.addEventListener('click',function(){scope.onClick()})
				    	}
				    }
				    if(typeof scope.onMouseover !== 'undefined'){
				    	if(typeof scope.onMouseover == 'function'){
				    		scope.marker.addEventListener('mouseover',function(){scope.onMouseover()})
				    	}
				    }
				    if(typeof scope.onMouseout !== 'undefined'){
				    	if(typeof scope.onMouseout == 'function'){
				    		scope.marker.addEventListener('mouseout',function(){scope.onMouseout()})
				    	}
				    }
				    if(typeof scope.zIndex !== 'undefined'){
				    	if(typeof scope.zIndex == 'number'){
				    		scope.marker.setZIndex(scope.zIndex)
				    	}
				    }
				    if(typeof scope.visible !== 'undefined'){
				    	if(typeof scope.visible == 'boolean'){
				    		if(scope.visible){
				    			scope.marker.show()
				    		}
				    		else{
				    			scope.marker.hide()
				    		}
				    	}
				    }
				    scope.$parent.bMap.addOverlay(scope.marker)
	        	}
	        });

        	element.on('$destroy', function(){
		        scope.$parent.bMap.removeOverlay(scope.marker);
		    })

        }
    }
}])