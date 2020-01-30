/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:29
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:04:31
 */

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Constant
 * @name appConfig
 * @description
 *   Setup application constant variables and configurations.
 *
 * @property {String} devEnv Developing environment URL
 * @property {String} prdEnv Production environment URL
 * @property {String} version Application setting (auto generated)
 * @property {String} vyear Application setting (auto generated)
 * @property {String} defaultAvatar Default driver avatars path
 * @property {String} video Video player URL
 * @property {String} videoLoad Video player poster path
 * @property {String} videoError Video player poster path on error
 * @property {String[]} mapwarnType Enabled warning type
 * @property {String[]} videotypeSelect Dangerous video filter type (profile page)
 * @property {Object} support Support information
 * @property {String} support.form Support request form
 * @property {String} support.email Email
 * @property {String} support.tel Tel. no.
 * @property {String} support.tel Avaliable time
 * @property {String[]} userFunc Enabled user function
 * @property {Object[]} navigateMenu Navigation menu
 * @property {String} text Translation code
 * @property {String} access Function code of the state
 * @property {String} path State name in [ui-router](carSafety.ui-router.html)
 * @property {String[]} [childaccess] Child state with grouping
 * @property {Boolean} [show] Display state grouping
 * @property {Object[]} [child] Navigation menu with grouping
 * @property {Object} videoOptions Video Player Setting, [any VideoJS options](https://docs.videojs.com/tutorial-options.html)
 *
 * @property {String[]} KMB_videotypeSelect Dangerous video filter type for KMB (profile page)
 */
angular.module('carSafety').constant('appConfig', {
    devEnv: "http://10.33.22.17",
    prdEnv: "http://61.244.223.228",
    version: "5.0.1-27",
    vyear: "2019",
    online: "/images/online.png",
    offline: "/images/offline.png",
    offlinegt: "/images/offlinegt.png",
    selectedMarkIcon: "/images/selectedMarkIcon.png",
    defaultSelectedMark: {
        lat: 22.4,
        lng: 114.1
    },
    warningVideoURL: "/api/video/",
    mapwarnType: ['FCW_L2','LDW_L2','HMW_L2','AAW_L2','ABW_L2','ATW_L2','FDW_L2','CLW_L2','DTW_L2','NDW','YW_L2'],
    defaultAvatar: "../images/avatar.png",
    warnTripIcon: ['/images/markerA_deeppink.png', '/images/markerB_deeppink.png', '/images/markerA_dodgerblue.png', '/images/markerB_dodgerblue.png', '/images/markerA_darkviolet.png', '/images/markerB_darkviolet.png', '/images/markerA_forestgreen.png', '/images/markerB_forestgreen.png'],
    video: "/api/getWarnVideo/",
    videoLoad: '../../../images/lazyload.gif',
    videoError: '../../../images/lazyerror.png',
    userFunc: ['LIVE_LOCATION', 'LIVE_MONITOR', 'TRIP_DETAIL', 'TRIP_MAINT', 'TRIP_DRV_IMPORT', 'WARNING_EXPORT', 'VIDEO_BATCH_DOWNLOAD', 'COMPANY_PROFILE', 'VEHICLE_GRP_PROFILE', 'VEHICLE_PROFILE', 'DRIVER_GRP_PROFILE', 'DRIVER_PROFILE', 'VEHICLE_GRP_MAINT', 'VEHICLE_MAINT', 'DRIVER_MAINT', 'DRIVER_GRP_MAINT', 'DEVICE_MAINT', 'USER_MAINT', 'USER_ROLE_MAINT', 'ORG_CHART_MAINT', 'MAIL_NOTIFY_MAINT', 'ROSTER_MAINT'],
    // Support
    support: {
        email: 'support@greensafety.com.hk',
        tel: '(852) 2662 6460',
        time: '10:00 - 18:00'
    },
    navigateMenu: [
        {
            text: 'liveInfo',
            childaccess: ['LIVE_LOCATION', 'LIVE_MONITOR'],
            show: false,
            child: [{
                    text: 'liveLocation',
                    access: 'LIVE_LOCATION',
                    path: 'liveLocation'
                },
                {
                    text: 'liveMonitor',
                    access: 'LIVE_MONITOR',
                    path: 'liveMonitor'
                }
            ]
        },
        {
            text: 'warning',
            childaccess: ['TRIP_DETAIL', 'TRIP_MAINT', 'TRIP_DRV_IMPORT', 'WARNING_EXPORT', 'VIDEO_BATCH_DOWNLOAD'],
            show: false,
            child: [{
                    text: 'tripDetail',
                    access: 'TRIP_DETAIL',
                    path: 'tripDetail'
                },
                {
                    text: 'tripSet',
                    access: 'TRIP_MAINT',
                    path: 'tripSet'
                },
                {
                    text: 'tripDrvImport',
                    access: 'TRIP_DRV_IMPORT',
                    path: 'tripDrvImport'
                },
                {
                    text: 'warnExport',
                    access: 'WARNING_EXPORT',
                    path: 'warnExport'
                },
                {
                    text: 'warnVideoDownload',
                    access: 'VIDEO_BATCH_DOWNLOAD',
                    path: 'warnVideoDownload'
                }
            ]
        },
        {
            text: 'profile',
            childaccess: ['COMPANY_PROFILE', 'VEHICLE_PROFILE', 'VEHICLE_GRP_PROFILE', 'DRIVER_PROFILE', 'DRIVER_GRP_PROFILE'],
            show: false,
            child: [{
                    text: 'comProfile',
                    access: 'COMPANY_PROFILE',
                    path: 'companyProfile'
                },
                {
                    text: 'vehicleProfile',
                    access: 'VEHICLE_PROFILE',
                    path: 'vehicleProfile'
                },
                {
                    text: 'vehicleGrpProfile',
                    access: 'VEHICLE_GRP_PROFILE',
                    path: 'vehiclegrpProfile'
                },
                {
                    text: 'driverProfile',
                    access: 'DRIVER_PROFILE',
                    path: 'driverProfile'
                },
                {
                    text: 'driverGrpProfile',
                    access: 'DRIVER_GRP_PROFILE',
                    path: 'drivergrpProfile'
                }
            ]
        },
        {
            text: 'setting',
            childaccess: ['VEHICLE_GRP_MAINT', 'VEHICLE_MAINT', 'DRIVER_MAINT', 'DRIVER_GRP_MAINT', 'DEVICE_MAINT', 'USER_MAINT', 'USER_ROLE_MAINT', 'ROSTER_MAINT'],
            show: false,
            child: [{
                    text: 'vehicle',
                    access: 'VEHICLE_MAINT',
                    path: 'vehicleSet'
                },
                {
                    text: 'vehicleGrp',
                    access: 'VEHICLE_GRP_MAINT',
                    path: 'vehiclegrpSet'
                },
                {
                    text: 'driver',
                    access: 'DRIVER_MAINT',
                    path: 'driverSet'
                },
                {
                    text: 'driverGrp',
                    access: 'DRIVER_GRP_MAINT',
                    path: 'drivergrpSet'
                },
                {
                    text: 'device',
                    access: 'DEVICE_MAINT',
                    path: 'deviceSet'
                },
                {
                    text: 'user',
                    access: 'USER_MAINT',
                    path: 'userSet'
                },
                {
                    text: 'userRole',
                    access: 'USER_ROLE_MAINT',
                    path: 'userroleSet'
                },
                {
                    text: 'orgChart',
                    access: 'ORG_CHART_MAINT',
                    path: 'orgchartSet'
                },
                {
                    text: 'mailNotify',
                    access: 'MAIL_NOTIFY_MAINT',
                    path: 'mailNotifySet'
                },
                {
                    text: 'roster',
                    access: 'ROSTER_MAINT',
                    path: 'rosterSet'
                }
            ]
        }
    ],
    videoOptions: {
        autoplay: 'muted',
        muted: true,
        controls: true,
        preload: 'auto',
        aspectRatio: '16:9',
        fluid: true,
        closeButton: true,
        errorDisplay: false,
        controlBar: {
            volumePanel: {
                inline: false
            },
            pictureInPictureToggle: false
        }
    }
})