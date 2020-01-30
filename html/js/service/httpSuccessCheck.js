/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:34
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:30:40
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Service
 * @name httpSuccessCheck
 * @description
 *   Service for http request response checking
 *
 * @example
 * httpSuccessCheck.checkHttp(response);
 */
angular.module('carSafety').service('httpSuccessCheck', function() {
	this.checkHttp = function(response){
		if(response.headers('Content-Type').split(";")[0]!=='application/json'){
			return true;
		}
		else{
			return false;
		}
	};
	this.checkVideoHttp = function(response){
		if(response.headers('Content-Type').split(";")[0]!=='video/mp4'){
			return true;
		}
		else{
			return false;
		}
	};
	this.checkerrorHttp = function(response){
		if(response.status==-1){
			return '03';
		}
		else if(response.data&&(response.data.code||response.data.link)){
			return null;
		}
		else{
			return '02';
		}
	}
});