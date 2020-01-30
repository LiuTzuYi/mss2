/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:14:36
*/

'use strict';
 /**
 * @memberof carSafety
 * @ngdoc Config
 * @name angularjs
 * @description
 *   Setup configuration for [AngularJS](https://docs.angularjs.org/guide) application.
 */
angular.module('carSafety').config(['$compileProvider','$logProvider',
	/**
	 * @memberof angularjs
	 * @function config
	 * @param  {Provider} $compileProvider AngularJS's compile provider
	 * @param  {Provider} $logProvider AngularJS's log provider
	 */
	function ($compileProvider,$logProvider) {
		// Production debug setting
  		$compileProvider.debugInfoEnabled(false);
  		$logProvider.debugEnabled(false);
	}
]);