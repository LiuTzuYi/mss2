/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:27:36
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name bInfoWindow
 * @requires baiduMap
 * @restrict E
 * @description
 *   Baidu map info-window element wrapper
 *
 * @example
 * <div id="map" baidu-map="url">
 *     <b-info-window id="b-warn-point">
 *         <div>
 *             Chicago, IL<br/>
 *             LatLng: , , <br/>
 *             World Coordinate: , , <br/>
 *         </div>
 *     </b-info-window>
 * </div>
 */
angular.module('carSafety').directive('bInfoWindow', ['$document','$state','$compile', function($document, $state, $compile) {
    return {
        restrict: 'E',
        required: '?^baiduMap',
        link: function(scope, element, attrs) {
            element[0].style.display = "none"
            $compile(element.contents())(scope);
        }
    }
}])