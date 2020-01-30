/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:05:19
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Constant
 * @name mapConfig
 * @description
 *   Setup map constant variables and configurations.
 *
 * @property {String} googlemapKey Google map api key
 * @property {String} googlemapLibraries Google map required libraries
 * @property {String} googlemapCN Google map api URL for Simplified Chinese
 * @property {String} googlemapNormal Google map api URL
 * @property {String} googlestaticmap Google static map api URL
 *
 * @property {String} baidumapKey Baidu map api key
 * @property {String} baidumapVer Baidu map api version
 * @property {String} baidustaticmap Baidu static map api URL
 *
 * @property {Object} defaultSelectedMark Default marker position
 * @property {String} online Marker icon - online (live location page)
 * @property {String} offline Marker icon - offline (live location page)
 * @property {String} offlinegt Marker icon - offline > 24hrs (live location page)
 * @property {String} selectedMarkIcon Marker icon - selected (live location page)
 * @property {String[]} warnTripIcon Marker icon - trip start end (trip detail page)
 */
angular.module('carSafety').constant('mapConfig', {
    googlemapKey: "key=AIzaSyDIO2ZdyNN-FZ8SCr21_fqRGB6Wl-DdbgA",
    googlemapLibraries: "libraries=places,visualization,drawing,geometry",
    googlemapCN: "https://maps.google.cn/maps/api/js?v=3.37",
    googlemapNormal: "https://maps.googleapis.com/maps/api/js?v=3.37",
    googlestaticmap: "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=460x250&maptype=roadmap",
    baidumapKey: "ak=1vWVmeoL7SuxepyVNwNQMe4GBo7P1jGA",
    baidumapVer: "v=2.0",
    baidustaticmap: "https://api.map.baidu.com/staticimage/v2?zoom=16&width=460&height=250"
})