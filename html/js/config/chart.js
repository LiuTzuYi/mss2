/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:09:51
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Config
 * @name angular-chart-js
 * @requires chart.js
 * @description
 *   Setup configuration for [Angular Chart](https://jtblin.github.io/angular-chart.js/) module.
 */
angular.module('carSafety').config(['ChartJsProvider',
	/**
	 * @memberof angular-chart-js
	 * @function config
	 * @param  {Provider} ChartJsProvider chart.js module provider
	 */
	function (ChartJsProvider) {
		ChartJsProvider.setOptions({
			// Change the default chart color
			global: {
				colors: ['#46BFBD', '#FDB454', '#F7464A', '#1462CC', '#9267DC', '#4D5360', '#949FB1']
			}
		});
	}
]);