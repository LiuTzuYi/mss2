/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:14:33
*/

'use strict';
 /**
 * @memberof carSafety
 * @ngdoc Config
 * @name state-transition
 * @requires ui.router
 * @description
 *   Setup extend function for [UI-Router](https://ui-router.github.io/ng1/) module.
 */
angular.module('carSafety').config(['$provide',
	/**
	 * @memberof state-transition
	 * @function config
	 * @param  {Service} $provide AngularJS service that has a number of methods for registering components with the $injector
	 */
	function ($provide) {
	    $provide.decorator('$state', ['$delegate', '$window',
	    function ($delegate, $window) {
	      var extended = {
	          goNewTab: function (stateName, params) {
	          	// store parameters for load in new tab
	            localStorage.setItem('goNewTab',JSON.stringify(params))
	            var url = $delegate.href(stateName)
	            window.open(url,'_blank');
	          }
	      };
	      angular.extend($delegate, extended);
	      return $delegate;
	    }]);
	}
]);

/**
 * @memberof carSafety
 * @ngdoc Run
 * @name state-transition-init
 * @requires ui.router
 * @requires ngMaterial
 * @description
 *   Setup state change run block.
 */
angular.module('carSafety').run(['$transitions', '$http', '$q', '$mdDialog', '$location',
	/**
	 * @memberof state-transition-init
	 * @function config
	 * @param  {Service} $transitions ui.router module's service that used for state transition
	 * @param  {Service} $http AngularJS service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP
	 * @param  {Service} $q AngularJS service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.
	 * @param  {Service} $mdDialog ngMaterial module's service that opens a dialog over the app to inform users about critical information or require them to make decisions
	 * @param  {Service} $location AngularJS service that parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application.
	 */
	function ($transitions, $http, $q, $mdDialog, $location) {
		// The state change transition is about to start, exec before transition start
		$transitions.onBefore({}, function (transition) {
			// check if exist dialog
			if(document.getElementsByClassName('md-dialog-is-showing')[0]){
				// abort transition
				transition.abort();
				// close dialog
				$mdDialog.cancel();
				// reinitialize transition
				var previousURL = transition.router.stateService.href(transition.from().name, transition.params("from"));
				$location.path(previousURL)
			}

			if (transition.from().name !== '') {
				var deferred = $q.defer();
				// Check if in maintenance session
				$http({
					method: 'GET',
					url: '/islive'
				}).then(function successCallback(response) {
					deferred.resolve('Normal');
				}, function errorCallback(response) {
					deferred.reject('Maintenance');
				});
				deferred.promise.then(function () {}, function () {
					transition.abort();
					window.location.href = "/503";
				});
			}

			// check if open state in new tab
			if(localStorage.goNewTab){
				// get stored parameters
				var goNewTab = JSON.parse(localStorage.goNewTab);
				localStorage.removeItem("goNewTab");
				// assign parameters
				const paramsCopy = Object.assign({}, transition.params());
				const stateService = transition.router.stateService;
				for (var key in goNewTab) {
					paramsCopy[key] = goNewTab[key]
				}
			   	return stateService.target(transition.to(), paramsCopy);
			}
		});
	}
]);