/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:34
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:31:00
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Service
 * @name refetchMapService
 * @description
 *   Service for remove the map script
 *
 * @example
 * refetchMapService.deleteGoogle();
 */
angular.module('carSafety').service('refetchMapService', function() {
	this.deleteGoogle = function(){
		var scriptEl = document.body.querySelector('script[src^="https://maps.google"]')
		if (scriptEl) {
          document.body.removeChild(scriptEl);
          var scriptHead = document.head.querySelectorAll('script[src^="https://maps.google"]')
          for(var i=0;i<scriptHead.length;i++){
          	document.head.removeChild(scriptHead[i])
          }
        }
        delete window.google
	}
	this.deleteBaidu = function(){
		var scriptEl = document.querySelectorAll('script[src^="https://api.map.baidu.com/"]')
		if (scriptEl) {
          for(var i=0;i<scriptEl.length;i++){
          	document.body.removeChild(scriptEl[i])
          }
          var stylesheetBMap = document.head.querySelectorAll('style')
          for(var j=0; j<stylesheetBMap;j++){
          	if(stylesheetBMap[j].textContent.indexOf('BMap')!==-1){
          		document.head.removeChild(stylesheetBMap[j])
          	}
          }
        }
        delete window.baiduMapLoaded
	}
});