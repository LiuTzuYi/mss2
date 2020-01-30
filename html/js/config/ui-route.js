/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:17:28
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Config
 * @name ui-router
 * @requires blockUI
 * @requires ui.router
 * @description
 *   Setup configuration for [UI-Router](https://ui-router.github.io/ng1/) module.
 */
angular.module('carSafety').config(["blockUIConfig", "$stateProvider", "$urlRouterProvider", "$locationProvider",
  /**
   * @memberof ui-router
   * @function config
   * @param  {Object} blockUIConfig blockUI module configuration options
   * @param  {Provider} $stateProvider ui.router module's state provider
   * @param  {Provider} $urlRouterProvider ui.router module's URL watcher provider, which has the responsibility of watching $location
   * @param  {Provider} $locationProvider AngularJS provider that used to configure how the application deep linking paths are stored
   */
  function (blockUIConfig, $stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      // setup routing states
      .state('root', {
        abstract: true,
        url: "/{company_code:[A-z|0-9]+}",
        template: '<div ui-view=""></div>',
        resolve: {
          translateReady: ['$translate', function ($translate) {
            return $translate.onReady();
          }]
        }
      })
      .state('auth', {
        parent: 'root',
        abstract: true,
        resolve: {
          user: ['$http', '$stateParams', '$location', '$q', '$translate', 'httpSuccessCheck', 'alertBox', '$timeout', 'langService', '$transition$', function ($http, $stateParams, $location, $q, $translate, httpSuccessCheck, alertBox, $timeout, langService, $transition$) {
            var deferred = $q.defer();
            var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
            var func = function () {
              $timeout(function () {
                $location.path("/" + $stateParams.company_code + "/login");
                deferred.reject('Timeout');
              })
            }
            $http({
              method: 'GET',
              url: '/api/hasSession/' + $stateParams.company_code + '/' + $transition$.to().name
            }).then(function successCallback(response) {
              var errorphp = httpSuccessCheck.checkHttp(response)
              if (errorphp) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.errorAlert('90001_01')
                deferred.reject(response.data);
              } else {
                var langset
                if (response.data.data.lang) {
                  langset = response.data.data.lang
                } else {
                  langset = langService.checkLang();
                }
                $translate.use(langset)
                  .then(function () {
                    deferred.resolve(response.data.data);
                  });
              }
            }, function errorCallback(response) {
              blockUi.removeClass('block-ui-active block-ui-visible')
              var errorphp = httpSuccessCheck.checkerrorHttp(response)
              if (errorphp) {
                alertBox.errorAlert('90001_' + errorphp)
                deferred.reject(response.data);
              } else {
                alertBox.errorAlert(response.data.code, func)
              }
              deferred.reject(response.data);
            });
            return deferred.promise;
          }]
        }
      })
      .state("login", {
        parent: 'root',
        url: "/login",
        templateUrl: "view/login.html",
        controller: "loginCtrl",
        resolve: {
          bannerData: ['$http', '$stateParams', '$q', '$translate', 'httpSuccessCheck', 'alertBox', 'langService', function ($http, $stateParams, $q, $translate, httpSuccessCheck, alertBox, langService) {
            var deferred = $q.defer();
            var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);
            var lang = langService.checkLang()
            var resolveData = {
              lang: lang
            }
            $http({
              method: 'GET',
              url: '/api/loginbanner/' + $stateParams.company_code + '/' + lang
            }).then(function successCallback(response) {
              blockUi.removeClass('block-ui-active block-ui-visible')
              var errorphp = httpSuccessCheck.checkHttp(response)
              if (errorphp) {
                alertBox.errorAlert('90009_01')
                deferred.resolve(resolveData);
              } else {
                $translate.use(lang)
                  .then(function () {
                    if (response.data.data) {
                      alertBox.bannerAlert(response.data.data)
                    }
                    deferred.resolve(resolveData);
                  });
              }
            }, function errorCallback(response) {
              blockUi.removeClass('block-ui-active block-ui-visible')
              var errorphp = httpSuccessCheck.checkerrorHttp(response)
              if (errorphp) {
                alertBox.errorAlert('90009_' + errorphp)
              }
              deferred.resolve(resolveData);
            });
            return deferred.promise;
          }]
        }
      })
      .state("forgetPwd", {
        parent: 'root',
        url: "/forgetPwd",
        templateUrl: "view/forgetPwd.html",
        controller: "forgetPwdCtrl",
        params: {
          lang: null
        }
      })
      .state("updatePwd", {
        parent: 'auth',
        url: "/updatePwd",
        templateUrl: "view/updatePwd.html",
        controller: "updatePwdCtrl"
      })
      .state("resetPwd", {
        parent: 'auth',
        url: "/resetPwd",
        templateUrl: "view/resetPwd.html",
        controller: "resetPwdCtrl",
        resolve: {
          prepData: ['$stateParams', '$location', '$q', '$translate', 'alertBox', '$timeout', 'user', function ($stateParams, $location, $q, $translate, alertBox, $timeout, user) {
            var deferred = $q.defer();
            var func = function () {
              $timeout(function () {
                $location.path("/" + $stateParams.company_code + "/login");
                deferred.reject('Expired');
              })
            }
            if (user.error) {
              alertBox.errorAlert(user.error, func)
            } else {
              deferred.resolve(user);
            }
            return deferred.promise;
          }]
        }
      })
      .state("dash", {
        parent: 'auth',
        url: "/",
        templateUrl: "view/dash.html",
        controller: "dashCtrl"
      })
      .state("vehicleSet", {
        parent: 'auth',
        cache: false,
        url: "/vehicleSet",
        templateUrl: "view/vehicleSet.html",
        controller: "vehicleSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('VEHICLE_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('vehicleSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("driverSet", {
        parent: 'auth',
        url: "/driverSet",
        templateUrl: "view/driverSet.html",
        controller: "driverSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('DRIVER_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('driverSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("deviceSet", {
        parent: 'auth',
        cache: false,
        url: "/deviceSet",
        templateUrl: "view/deviceSet.html",
        controller: "deviceSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('DEVICE_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('deviceSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("userSet", {
        parent: 'auth',
        url: "/userSet",
        templateUrl: "view/userSet.html",
        controller: "userSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('USER_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('userSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("userroleSet", {
        parent: 'auth',
        url: "/userroleSet",
        templateUrl: "view/userroleSet.html",
        controller: "userroleSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('USER_ROLE_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('userroleSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("vehiclegrpSet", {
        parent: 'auth',
        url: "/vehiclegrpSet",
        templateUrl: "view/vehiclegrpSet.html",
        controller: "vehiclegrpSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('VEHICLE_GRP_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('vehiclegrpSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("drivergrpSet", {
        parent: 'auth',
        url: "/drivergrpSet",
        templateUrl: "view/drivergrpSet.html",
        controller: "drivergrpSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('DRIVER_GRP_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('drivergrpSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("orgchartSet", {
        parent: 'auth',
        url: "/orgchartSet",
        templateUrl: "view/orgchartSet.html",
        controller: "orgchartSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('ORG_CHART_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('orgchartSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("mailNotifySet", {
        parent: 'auth',
        url: "/mailNotifySet",
        templateUrl: "view/mailNotifySet.html",
        controller: "mailNotifySetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('MAIL_NOTIFY_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('mailNotifySet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("rosterSet", {
        parent: 'auth',
        url: "/rosterSet",
        templateUrl: "view/rosterSet.html",
        controller: "rosterSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('ROSTER_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('rosterSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("liveLocation", {
        parent: 'auth',
        url: "/liveLocation",
        templateUrl: "view/liveLocation.html",
        controller: "liveLocationCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('LIVE_LOCATION') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('liveLocation')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("liveMonitor", {
        parent: 'auth',
        url: "/liveMonitor",
        templateUrl: "view/liveMonitor.html",
        controller: "liveMonitorCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('LIVE_MONITOR') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('liveMonitor')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("tripDetail", {
        parent: 'auth',
        url: "/tripDetail",
        templateUrl: "view/tripDetail.html",
        controller: "tripDetailCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('TRIP_DETAIL') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('tripDetail')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("tripSet", {
        parent: 'auth',
        url: "/tripSet",
        templateUrl: "view/tripSet.html",
        controller: "tripSetCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('TRIP_MAINT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('tripSet')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("tripDrvImport", {
        parent: 'auth',
        url: "/tripDrvImport",
        templateUrl: "view/tripDrvImport.html",
        controller: "tripDrvImportCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('TRIP_DRV_IMPORT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('tripDrvImport')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("warnExport", {
        parent: 'auth',
        url: "/warnExport",
        templateUrl: "view/warnExport.html",
        controller: "warnExportCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('WARNING_EXPORT') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('warnExport')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("warnVideoDownload", {
        parent: 'auth',
        url: "/warnVideoDownload",
        templateUrl: "view/warnVideoDownload.html",
        controller: "warnVideoDownloadCtrl",
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('VIDEO_BATCH_DOWNLOAD') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('warnVideoDownload')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("companyProfile", {
        parent: 'auth',
        url: "/companyProfile",
        templateUrl: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "view/CLP-companyProfile.html";
          } else {
            return "view/companyProfile.html";
          }
        },
        controllerProvider: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "CLP-companyProfileCtrl";
          } else {
            return "companyProfileCtrl";
          }
        },
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('COMPANY_PROFILE') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('companyProfile')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        }
      })
      .state("vehiclegrpProfile", {
        parent: 'auth',
        url: "/vehiclegrpProfile",
        templateUrl: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "view/CLP-vehiclegrpProfile.html";
          } else {
            return "view/vehiclegrpProfile.html";
          }
        },
        controllerProvider: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "CLP-vehiclegrpProfileCtrl";
          } else {
            return "vehiclegrpProfileCtrl";
          }
        },
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('VEHICLE_GRP_PROFILE') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('vehiclegrpProfile')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        },
        params: {
          predistance: null,
          preselected: null,
          preview: null,
          predate: null
        }
      })
      .state("drivergrpProfile", {
        parent: 'auth',
        url: "/drivergrpProfile",
        templateUrl: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "view/CLP-drivergrpProfile.html";
          } else {
            return "view/drivergrpProfile.html";
          }
        },
        controllerProvider: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "CLP-drivergrpProfileCtrl";
          } else {
            return "drivergrpProfileCtrl";
          }
        },
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('DRIVER_GRP_PROFILE') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('drivergrpProfile')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        },
        params: {
          predistance: null,
          preselected: null,
          preview: null,
          predate: null
        }
      })
      .state("vehicleProfile", {
        parent: 'auth',
        url: "/vehicleProfile",
        templateUrl: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "view/CLP-vehicleProfile.html";
          } else {
            return "view/vehicleProfile.html";
          }
        },
        controllerProvider: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "CLP-vehicleProfileCtrl";
          } else {
            return "vehicleProfileCtrl";
          }
        },
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('VEHICLE_PROFILE') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('vehicleProfile')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        },
        params: {
          predistance: null,
          preselected: null,
          preview: null,
          predate: null
        }
      })
      .state("driverProfile", {
        parent: 'auth',
        url: "/driverProfile",
        templateUrl: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "view/CLP-driverProfile.html";
          } else {
            return "view/driverProfile.html";
          }
        },
        controllerProvider: function ($stateParams) {
          if ($stateParams.company_code.startsWith("clp")) {
            return "CLP-driverProfileCtrl";
          } else {
            return "driverProfileCtrl";
          }
        },
        resolve: {
          accessCtl: ['$q', '$stateParams', '$location', 'user', 'alertBox', '$timeout', function ($q, $stateParams, $location, user, alertBox, $timeout) {
            var deferred = $q.defer();
            if (user.func_code.indexOf('DRIVER_PROFILE') !== -1) {
              deferred.resolve('Allow');
            } else {
              var func = function () {
                $timeout(function () {
                  if (window.location.href.contains('driverProfile')) {
                    $location.path("/" + $stateParams.company_code + "/")
                  }
                  deferred.reject('Not Allow');
                })
              }
              alertBox.permissionAlert(func)
            }
            return deferred.promise;
          }]
        },
        params: {
          predistance: null,
          preselected: null,
          preview: null,
          predate: null
        }
      })
      .state("404", {
        url: "/404",
        templateUrl: "view/404.html",
        controller: "404Ctrl",
        resolve: {
          translateReady: ['$translate', function ($translate) {
            return $translate.onReady();
          }]
        }
      })
      .state("help", {
        parent: 'root',
        abstract: true,
        url: "/help"
      })
      .state("help.index", {
        url: "",
        templateUrl: "view/help/help-en.html",
        controller: "helpCtrl"
      })
      .state("help.en", {
        url: "-en",
        templateUrl: "view/help/help-en.html",
        controller: "helpCtrl"
      })
      .state("help.zh-cn", {
        url: "-zh-cn",
        templateUrl: "view/help/help-zh-cn.html",
        controller: "helpCtrl"
      })
      .state("help.zh-tw", {
        url: "-zh-tw",
        templateUrl: "view/help/help-zh-tw.html",
        controller: "helpCtrl"
      })
      .state("autologin", {
        url: "/tools/autologin/{company_code:[A-z|0-9]+}/:credential",
        templateUrl: "view/tools/autologin.html",
        controller: "autologinCtrl",
        resolve: {
          translateReady: ['$translate', function ($translate) {
            return $translate.onReady();
          }]
        }
      })
      .state("adminpanellogin", {
        url: "/tools/adminpanel/login",
        templateUrl: "view/tools/adminpanellogin.html",
        controller: "adminpanelloginCtrl"
      })
      .state("adminpanelnav", {
        url: "/tools/adminpanel/nav",
        templateUrl: "view/tools/adminpanelnav.html",
        controller: "adminpanelnavCtrl"
      })
      .state("apcompanylist", {
        url: "/tools/adminpanel/company/list",
        templateUrl: "view/tools/apcompanylist.html",
        controller: "apcompanylistCtrl",
        params: {
          token: null
        }
      })
      .state("apcompanyadd", {
        url: "/tools/adminpanel/company/add",
        templateUrl: "view/tools/apcompanyadd.html",
        controller: "apcompanyaddCtrl",
        params: {
          token: null
        }
      })
      .state("apcompanyedit", {
        url: "/tools/adminpanel/company/edit",
        templateUrl: "view/tools/apcompanyedit.html",
        controller: "apcompanyeditCtrl",
        params: {
          token: null,
          company: null
        }
      })
      .state("apdevicelist", {
        url: "/tools/adminpanel/device/list",
        templateUrl: "view/tools/apdevicelist.html",
        controller: "apdevicelistCtrl",
        params: {
          token: null
        }
      })
      .state("apdeviceadd", {
        url: "/tools/adminpanel/device/add",
        templateUrl: "view/tools/apdeviceadd.html",
        controller: "apdeviceaddCtrl",
        params: {
          token: null
        }
      })
      .state("apdeviceedit", {
        url: "/tools/adminpanel/device/edit",
        templateUrl: "view/tools/apdeviceedit.html",
        controller: "apdeviceeditCtrl",
        params: {
          token: null,
          device: null
        }
      })
      .state("apmailnotifylist", {
        url: "/tools/adminpanel/mailnotify/list",
        templateUrl: "view/tools/apmailnotifylist.html",
        controller: "apmailnotifylistCtrl",
        params: {
          token: null
        }
      })
      .state("apmailnotifyadd", {
        url: "/tools/adminpanel/mailnotify/add",
        templateUrl: "view/tools/apmailnotifyadd.html",
        controller: "apmailnotifyaddCtrl",
        params: {
          token: null
        }
      })
      .state("apmailnotifyedit", {
        url: "/tools/adminpanel/mailnotify/edit",
        templateUrl: "view/tools/apmailnotifyedit.html",
        controller: "apmailnotifyeditCtrl",
        params: {
          token: null,
          notify: null
        }
      })
      .state("apdrvcardlog", {
        url: "/tools/adminpanel/drvcard/log",
        templateUrl: "view/tools/apdrvcardlog.html",
        controller: "apdrvcardlogCtrl",
        params: {
          token: null
        }
      })
      .state("apdrvcardadd", {
        url: "/tools/adminpanel/drvcard/add",
        templateUrl: "view/tools/apdrvcardadd.html",
        controller: "apdrvcardaddCtrl",
        params: {
          token: null
        }
      });

    // enable html5 mode, remove # from URL
    $locationProvider.html5Mode(true);
    // when on document root
    $urlRouterProvider.when("", "/");
    // when no state matching
    $urlRouterProvider.otherwise('/404');
  }
]);