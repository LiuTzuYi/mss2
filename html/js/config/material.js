/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:10:34
*/
'use strict';
 /**
 * @memberof carSafety
 * @ngdoc Config
 * @name angularjs-material
 * @requires ngMaterial
 * @description
 *   Setup configuration for [AngularJS Material](https://material.angularjs.org/latest/) module.
 */
angular.module('carSafety').config(
	/**
	 * @memberof angularjs-material
	 * @function config
	 * @param  {Provider} $mdThemingProvider ngMaterial module's theme provider
	 */
	function ($mdThemingProvider) {
		// Disabled theming
    	$mdThemingProvider.disableTheming();
	}
)