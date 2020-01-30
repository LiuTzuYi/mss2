/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:09:35
*/

'use strict';
 /**
 * @memberof carSafety
 * @ngdoc Config
 * @name angular-dynamic-locale
 * @requires tmh.dynamicLocale
 * @description
 *   Setup configuration for [Angular Dynamic Locale](http://lgalfaso.github.io/angular-dynamic-locale/) module.
 */
angular.module('carSafety').config(['tmhDynamicLocaleProvider',
	/**
	 * @memberof angular-dynamic-locale
	 * @function config
	 * @param  {Provider} tmhDynamicLocaleProvider tmh.dynamicLocale module provider
	 */
	function (tmhDynamicLocaleProvider) {
		// Locale file path
    	tmhDynamicLocaleProvider.localeLocationPattern('/../../scripts/angular-i18n/angular-locale_{{locale}}.js');
    	// Change default locale
    	tmhDynamicLocaleProvider.defaultLocale('en');
}]);