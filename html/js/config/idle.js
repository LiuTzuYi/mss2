/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:09:42
*/

'use strict';
 /**
 * @memberof carSafety
 * @ngdoc Config
 * @name ng-idle
 * @requires ngIdle
 * @description
 *   Setup configuration for [Ng-Idle](https://hackedbychinese.github.io/ng-idle/) module.
 */
angular.module('carSafety').config(
	/**
	 * @memberof ng-idle
	 * @function config
	 * @param  {Provider} IdleProvider ngIdle module's idle service provider
	 * @param  {Provider} KeepaliveProvider ngIdle module's keepalive service provider
	 */
	function (IdleProvider, KeepaliveProvider) {
		// configure Idle settings
		IdleProvider.idle(900); // in seconds
		IdleProvider.timeout(900); // in seconds
		// Keepalive - backend session
		KeepaliveProvider.interval(800); // in seconds
		KeepaliveProvider.http('/api/heartbeat');
	}
)