/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:34
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:30:46
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Service
 * @name langService
 * @description
 *   Service for browser language checking
 *
 * @example
 * langService.checkLang();
 */
angular.module('carSafety').service('langService', function() {
	this.checkLang = function(){
		var userlang = navigator.language || navigator.userLanguage;
		var enlangpatt = new RegExp(/^en-\w+$/)
		if(enlangpatt.test(userlang)){
			return 'en'
		}
		else if(userlang=="zh-CN"){
			return 'zh-cn'
		}
		else if(userlang=="zh-HK"||userlang=="zh-TW"){
			return 'zh-tw'
		}
		else{
			return 'en'
		}
	}
});