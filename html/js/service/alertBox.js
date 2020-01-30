/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:34
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:30:26
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Service
 * @name alertBox
 * @description
 *   Service for alert box handling
 *
 * @example
 * alertBox.errorAlert('90001_01');
 */
angular.module('carSafety').service('alertBox', ['$translate', 'errorCodeConfig', function ($translate, errorCodeConfig) {
	this.errorAlert = function (errcode, func) {
		var title
		var text
		if (errorCodeConfig.InternalErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('internalErr_title')
			text = $translate.instant('internalErr_text')
		} else if (errorCodeConfig.ParameterErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('parameterErr_title')
			text = $translate.instant('parameterErr_text')
		} else if (errorCodeConfig.RequestErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('requestErr_title')
			text = $translate.instant('requestErr_text')
		} else if (errorCodeConfig.UpdateFailureCode.indexOf(errcode) !== -1) {
			title = $translate.instant('updateFailure_title')
			text = $translate.instant('updateFailure_text')
		} else if (errorCodeConfig.InvalidReqErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('invalidRequest_title')
			text = $translate.instant('invalidRequest_text')
		} else if (errorCodeConfig.DuplicateErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('duplicate_title')
			text = $translate.instant('duplicate_text')
		} else if (errorCodeConfig.DeleteInUseErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('deleteinuse_title')
			text = $translate.instant('deleteinuse_text')
		} else if (errorCodeConfig.ImportFailureCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importFailure_title')
			text = $translate.instant('importFailure_text')
		} else if (errorCodeConfig.ImportDuplicateErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('import_duplicate_title')
			text = $translate.instant('import_duplicate_text')
		} else if (errorCodeConfig.ImportEmptyCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importEmpty_title')
			text = $translate.instant('importEmpty_text')
		} else if (errorCodeConfig.ImportEncodeErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importEncodeErr_title')
			text = $translate.instant('importEncodeErr_text')
		} else if (errorCodeConfig.ImportNoEffectCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importNoEffect_title')
			text = $translate.instant('importNoEffect_text')
		} else {
			title = $translate.instant(errcode + '_title')
			text = $translate.instant(errcode + '_text')
		}
		if (func) {
			swal({
					title: title + ' (' + errcode + ')',
					text: text,
					type: 'error',
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: title + ' (' + errcode + ')',
				text: text,
				type: 'error',
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			});
		}
	}
	this.permissionAlert = function (func) {
		swal({
				title: $translate.instant('permission_title'),
				text: $translate.instant('permission_text'),
				type: 'warning',
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
			.then(func);
	}
	this.profileIndVisibilityAlert = function (profile) {
		swal({
			title: $translate.instant('visibility_title'),
			text: $translate.instant('visibility_text_' + profile),
			type: 'warning',
			target: document.getElementsByTagName('BODY')[0],
			confirmButtonText: $translate.instant('ok'),
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false
		})
	}
	this.idleAlert = function () {
		swal({
			title: $translate.instant('idle_title'),
			html: "<div><h6>" + $translate.instant('idle_text') + " ( <span></span> )</h6></div>",
			type: 'warning',
			target: document.getElementsByTagName('BODY')[0],
			showConfirmButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			onOpen: function () {
				var countdown = 900
				var date = new Date(null);
				date.setSeconds(countdown);
				var timestr = date.toISOString().substr(14, 5);
				swal.getContent().querySelector('span').textContent = timestr;
				countdown--;
				timerInterval = setInterval(function () {
					var date = new Date(null);
					date.setSeconds(countdown);
					timestr = date.toISOString().substr(14, 5);
					swal.getContent().querySelector('span').textContent = timestr;
					countdown--;
				}, 1000)
			}
		});
	}
	this.timeoutAlert = function (func) {
		swal({
				title: $translate.instant('timeout_title'),
				text: $translate.instant('timeout_text'),
				type: 'info',
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
			.then(func);
	}
	this.titleAlert = function (type, title, func) {
		if (func) {
			swal({
					title: $translate.instant(title),
					type: type,
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: $translate.instant(title),
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			});
		}
	}
	this.titleAlertDirect = function (type, title, func) {
		if (func) {
			swal({
					title: title,
					type: type,
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: title,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			});
		}
	}
	this.rosterAlert = function (title, html, type, func) {
		if (func) {
			swal({
					title: $translate.instant(title),
					html: html,
					type: type,
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: $translate.instant(title),
				html: html,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
		}
	}
	this.setImportAlert = function (title, html, type, errcode, func) {
		if (func) {
			swal({
					title: $translate.instant(title) + ' (' + errcode + ')',
					html: html,
					type: type,
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: $translate.instant(title) + ' (' + errcode + ')',
				html: html,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
		}
	}
	this.setImportErrAlert = function (title, html, type, func) {
		if (func) {
			swal({
					title: $translate.instant(title),
					html: html,
					type: type,
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: $translate.instant(title),
				html: html,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
		}
	}
	this.setImportSuccessAlert = function (type, title, func) {
		if (func) {
			swal({
					title: title,
					type: type,
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: title,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
		}
	}
	this.liveAlertFlag = false;
	this.liveAlert = function (errcode) {
		this.liveAlertFlag = false;
		var title
		var text
		if (errorCodeConfig.InternalErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('internalErr_title')
			text = $translate.instant('internalErr_text')
		} else if (errorCodeConfig.ParameterErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('parameterErr_title')
			text = $translate.instant('parameterErr_text')
		} else if (errorCodeConfig.RequestErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('requestErr_title')
			text = $translate.instant('requestErr_text')
		} else if (errorCodeConfig.UpdateFailureCode.indexOf(errcode) !== -1) {
			title = $translate.instant('updateFailure_title')
			text = $translate.instant('updateFailure_text')
		} else if (errorCodeConfig.InvalidReqErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('invalidRequest_title')
			text = $translate.instant('invalidRequest_text')
		} else if (errorCodeConfig.DuplicateErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('duplicate_title')
			text = $translate.instant('duplicate_text')
		} else if (errorCodeConfig.DeleteInUseErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('deleteinuse_title')
			text = $translate.instant('deleteinuse_text')
		} else if (errorCodeConfig.ImportFailureCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importFailure_title')
			text = $translate.instant('importFailure_text')
		} else if (errorCodeConfig.ImportDuplicateErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('import_duplicate_title')
			text = $translate.instant('import_duplicate_text')
		} else if (errorCodeConfig.ImportEmptyCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importEmpty_title')
			text = $translate.instant('importEmpty_text')
		} else if (errorCodeConfig.ImportImportEncodeErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importEncodeErr_title')
			text = $translate.instant('importEncodeErr_text')
		} else {
			title = $translate.instant(errcode + '_title')
			text = $translate.instant(errcode + '_text')
		}
		swal({
				title: title + ' (' + errcode + ')',
				text: text,
				type: 'error',
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
			.then(function () {
				this.liveAlertFlag = true;
			});
	}
	this.updatepwAlert = function (errcode) {
		var title
		var text
		if (errorCodeConfig.InternalErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('internalErr_title')
			text = $translate.instant('internalErr_text')
		} else if (errorCodeConfig.ParameterErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('parameterErr_title')
			text = $translate.instant('parameterErr_text')
		} else if (errorCodeConfig.RequestErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('requestErr_title')
			text = $translate.instant('requestErr_text')
		} else if (errorCodeConfig.UpdateFailureCode.indexOf(errcode) !== -1) {
			title = $translate.instant('updateFailure_title')
			text = $translate.instant('updateFailure_text')
		} else if (errorCodeConfig.InvalidReqErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('invalidRequest_title')
			text = $translate.instant('invalidRequest_text')
		} else if (errorCodeConfig.DuplicateErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('duplicate_title')
			text = $translate.instant('duplicate_text')
		} else if (errorCodeConfig.DeleteInUseErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('deleteinuse_title')
			text = $translate.instant('deleteinuse_text')
		} else if (errorCodeConfig.ImportFailureCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importFailure_title')
			text = $translate.instant('importFailure_text')
		} else if (errorCodeConfig.ImportDuplicateErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('import_duplicate_title')
			text = $translate.instant('import_duplicate_text')
		} else if (errorCodeConfig.ImportEmptyCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importEmpty_title')
			text = $translate.instant('importEmpty_text')
		} else if (errorCodeConfig.ImportImportEncodeErrCode.indexOf(errcode) !== -1) {
			title = $translate.instant('importEncodeErr_title')
			text = $translate.instant('importEncodeErr_text')
		} else {
			title = $translate.instant(errcode + '_title')
			text = $translate.instant(errcode + '_text')
		}
		swal({
			title: title + ' (' + errcode + ')',
			text: text,
			type: 'error',
			target: document.getElementsByTagName('BODY')[0],
			confirmButtonText: $translate.instant('ok'),
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			confirmButtonClass: 'updatepw-alert'
		})
	}
	this.bannerAlert = function (html) {
		swal({
			html: "<div class='alert-banner'><div>" + html + "</div></div>",
			target: document.getElementsByTagName('BODY')[0],
			confirmButtonText: $translate.instant('ok'),
			allowOutsideClick: true,
			allowEscapeKey: false,
			allowEnterKey: false,
			customClass: 'prelogin-banner'
		})
	}
	this.supportAlert = function (support) {
		swal({
			html: "<div class='alert-banner'><div><p>" + $translate.instant('techSupport') + ":</p><div class='contact1'><div><i class='fa fa-envelope-o' aria-hidden='true'></i>" + $translate.instant('email') + ":    </div><div><a href='mailto:"+support.email+"'>"+support.email+"</a></div></div><div class='contact2'><div><i class='fa fa-phone' aria-hidden='true'></i>" + $translate.instant('hotline') + ":    </div><div>"+support.tel+"</div><div>"+support.time+" (" + $translate.instant('supportDay') + ")</div></div></div></div>",
			type: 'info',
			target: document.getElementsByTagName('BODY')[0],
			confirmButtonText: $translate.instant('ok'),
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			customClass: 'support-alert'
		})
	}

	this.contentAlert = function (type, title, text, func) {
		if (func) {
			swal({
					title: $translate.instant(title),
					text: $translate.instant(text),
					type: type,
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func);
		} else {
			swal({
				title: $translate.instant(title),
				text: $translate.instant(text),
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
		}
	}
	this.asAtDateAlert = function (profile, distance, selected, recent, period, submit, tmp, func) {
		var profile = $translate.instant(profile)
		var selected = selected + ', ' + $translate.instant(period)
		var recent = recent + ', ' + $translate.instant(period)
		if (func) {
			swal({
				title: $translate.instant('asAtDateAlert_title'),
				text: $translate.instant('asAtDateAlert_text', {
					profile: profile,
					distance: distance,
					selected: selected,
					recent: recent
				}),
				type: 'info',
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
			.then(func(submit, tmp));
		} else {
			swal({
				title: $translate.instant('asAtDateAlert_title'),
				text: $translate.instant('asAtDateAlert_text', {
					profile: profile,
					distance: distance,
					selected: selected,
					recent: recent
				}),
				type: 'info',
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
		}
	}
	this.noProfileRecordAlert = function (profile, distance, start, end, period, submit, date, func) {
		var profile = $translate.instant(profile)
		var start = start + ', ' + $translate.instant(period)
		var end = end + ', ' + $translate.instant(period)
		if (func) {
			swal({
					title: $translate.instant('noProfileRecordAlert_title'),
					text: $translate.instant('noProfileRecordAlert_text', {
						profile: profile,
						distance: distance,
						start: start,
						end: end
					}),
					type: 'info',
					target: document.getElementsByTagName('BODY')[0],
					confirmButtonText: $translate.instant('ok'),
					allowOutsideClick: false,
					allowEscapeKey: false,
					allowEnterKey: false
				})
				.then(func(submit, date));
		} else {
			swal({
				title: $translate.instant('noProfileRecordAlert_title'),
				text: $translate.instant('noProfileRecordAlert_text', {
					profile: profile,
					distance: distance,
					start: start,
					end: end
				}),
				type: 'info',
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
		}
	}
	this.notranslationAlert = function(title,text,type,func){
		if (func) {
			swal({
				title: title,
				text: text,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
			.then(func);
		}
		else{
			swal({
				title: title,
				text: text,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			});
		}
	}
	this.notranslationAlertHTML = function(title,html,type,func){
		if (func) {
			swal({
				title: title,
				html: html,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			})
			.then(func);
		}
		else{
			swal({
				title: title,
				html: html,
				type: type,
				target: document.getElementsByTagName('BODY')[0],
				confirmButtonText: $translate.instant('ok'),
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false
			});
		}
	}
	this.GPSLocationAlert = function(link, text){
		swal({
		  html: "<div style='font-size:14px;'>"+text+"</div>",
		  target: document.getElementsByTagName('BODY')[0],
		  imageUrl: link,
		  imageWidth: 600,
		  imageHeight: 250,
		  imageAlt: 'GPS Location',
		  allowOutsideClick: false,
		  allowEscapeKey: false,
		  allowEnterKey: false,
		  showConfirmButton: false,
		  showCloseButton: true
		})
	}
}]);