/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:09:47
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Config
 * @name block-ui
 * @requires blockUI
 * @description
 *   Setup configuration for [blockUI](https://github.com/McNull/angular-block-ui) module.
 */
angular.module('carSafety').config(
	/**
	 * @memberof block-ui
	 * @function config
	 * @param  {Object} blockUIConfig blockUI module configuration options
	 */
	function (blockUIConfig) {
  		// Change the default delay to 100ms before the blocking is visible
  		blockUIConfig.delay = 100;
  		// Change the default overlay message
		// blockUIConfig.message = '';
		// with URL
  		blockUIConfig.templateUrl = '../../view/component/blockTemp.html';
	}
);