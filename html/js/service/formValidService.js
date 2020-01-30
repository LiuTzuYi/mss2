/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:34
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:30:34
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Service
 * @name formValidService
 * @description
 *   Service for form validation
 *
 * @example
 * formValidService.setValid(element);
 */
angular.module('carSafety').service('formValidService', function() {
	this.setInvalid = function(ele){
		ele.parentElement.classList.remove('was-validated')
		ele.classList.add('is-invalid')
	}
	this.setValid = function(ele){
		ele.classList.remove('is-invalid')
		ele.parentElement.classList.add('was-validated')
	}
	this.setValidTAH = function(ele){
		ele.classList.remove('is-invalid')
		ele.parentElement.parentElement.classList.add('was-validated')
	}
	this.setInvalidTAH = function(ele){
		ele.parentElement.parentElement.classList.remove('was-validated')
		ele.classList.add('is-invalid')
	}
	this.setValidIPG = function(ele){
		ele.parentElement.classList.remove('is-invalid-custom')
		ele.parentElement.classList.add('was-validated-custom')
	}
	this.setInvalidIPG = function(ele){
		ele.parentElement.classList.remove('was-validated-custom')
		ele.parentElement.classList.add('is-invalid-custom')
	}
});