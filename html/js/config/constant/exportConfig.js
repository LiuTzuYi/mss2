/*
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:29
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-10-08 11:05:05
 */

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Constant
 * @name exportConfig
 * @description
 *   Setup table export to csv constant variables and configurations.
 *
 * @property {String[]} warnExcelOrder Warning data (trip detail page)
 *
 * @property {String[]} profileExcelOrderDate Warning count data by date (profile page)
 * @property {String[]} profileExcelOrderName Warning count data by name/licence (profile page)
 * @property {String[]} profileExcelOrderDateAct Actual warning count data by date (profile page)
 * @property {String[]} profileExcelOrderNameAct Actual warning count data by name/licence (profile page)
 * @property {String[]} profileExcelOrderDateScore Warning score data by date (profile page)
 * @property {String[]} profileExcelOrderNameScore Warning score data by name/licence (profile page)
 * @property {String[]} profileExcelOrderDateRank Warning rank data by date (profile page)
 * @property {String[]} profileExcelOrderNameRank Warning rank data by name/licence (profile page)
 * @property {String[]} profileExcelOrderVideoDep Dangerous video data (profile page)
 * @property {String[]} warnSpecExcelOrder Warning data of specific warning type (profile page)
 *
 * @property {String[]} vehicleSetExcelOrder Vehicle data (vehicle maintenance page)
 * @property {String[]} vehicledtlSetExcelOrder Vehicle detail data (vehicle detail maintenance page)
 * @property {String[]} driverSetExcelOrder Driver data (driver maintenance page)
 * @property {String[]} deviceSetExcelOrder Device data (device maintenance page)
 * @property {String[]} userSetExcelOrder User data (user maintenance page)
 * @property {String[]} userroleSetExcelOrder User role data (user role maintenance page)
 * @property {String[]} vehiclegrpSetExcelOrder Vehicle group data (vehicle group maintenance page)
 * @property {String[]} drivergrpSetExcelOrder Driver group data (driver group maintenance page)
 * @property {String[]} vehtripSetExcelOrder Trip data (trip maintenance page)
 * @property {String[]} mailNotifySetExcelOrder Email notification data (email notification maintenance page)
 *
 * @property {String[]} KMB_profileExcelOrderDate Warning count data by date for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderName Warning count data by name/licence for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderDateAct Actual warning count data by date for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderNameAct Actual warning count data by name/licence for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderDateScore Warning score data by date for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderNameScore Warning score data by name/licence for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderDateRank Warning rank data by date for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderNameRank Warning rank data by name/licence for KMB (profile page)
 * @property {String[]} KMB_profileExcelOrderVideo Dangerous video data for KMB (profile page)
 */
angular.module('carSafety').constant('exportConfig', {
    vehicleSetExcelOrder: ['vehicleId', 'licence', 'vin', 'brand', 'model', 'type', 'year', 'department', 'runDistance', 'status', 'updateBy'],
    driverSetExcelOrder: ['driverId', 'name', 'driverCode', 'department', 'phoneHome', 'phoneMobile', 'phoneOffice', 'defaultdrv', 'dobirth', 'updateBy'],
    deviceSetExcelOrder: ['deviceSn', 'licence', 'status', 'lat', 'lng', 'lastLocUpdate', 'updateBy'],
    vehiclegrpSetExcelOrder: ['vehiclegrpId', 'groupName', 'groupDesc', 'department', 'vehicleBelong', 'updateBy'],
    drivergrpSetExcelOrder: ['drivergrpId', 'groupName', 'groupDesc', 'department', 'driverBelong', 'updateBy'],
    userSetExcelOrder: ['userId', 'username', 'fullName', 'email', 'groupname', 'department', 'lang', 'map', 'lastLogin', 'retryLogin', 'status', 'updateBy'],
    userroleSetExcelOrder: ['roleId', 'roleName', 'userFunc', 'updateBy'],
    mailNotifySetExcelOrder: ['notifyItem', 'notifyEmail', 'status', 'updateBy'],
    vehtripSetExcelOrder: ['tripId', 'start_time', 'end_time', 'vehicle', 'vehDepart', 'driver', 'driverCode', 'drvDepart', 'distance', 'avgspeed', 'updated_by'],
    warnExcelOrder: ['video', 'lat', 'lng', 'warningType', 'start_time', 'vehicle', 'vehDepart', 'driver', 'drvDepart', 'duration', 'start_spd', 'end_spd', 'top_spd', 'hw', 'near_hw'],
    profileExcelOrderDate: ['acc_date', 'total_score', 'drv_distance'],
    profileExcelOrderName: ['name', 'department', 'total_score', 'drv_distance'],
    profileExcelOrderDateAct: ['acc_date', 'total_score', 'drv_distance'],
    profileExcelOrderNameAct: ['name', 'department', 'total_score', 'drv_distance'],
    profileExcelOrderDateScore: ['acc_date', 'total_score', 'drv_distance'],
    profileExcelOrderNameScore: ['name', 'department', 'total_score', 'drv_distance'],
    profileExcelOrderDateRank: ['acc_date', 'total_rank', 'drv_distance'],
    profileExcelOrderNameRank: ['name', 'department', 'total_rank', 'drv_distance'],
    profileExcelOrderVideoDep: ['video', 'lat', 'lng', 'warningType', 'start_time', 'vehicle', 'vehDepart', 'driver', 'drvDepart', 'roc', 'duration', 'start_spd', 'end_spd', 'top_spd', 'hw', 'near_hw'],
    warnSpecExcelOrder: ['video', 'lat', 'lng', 'start_time', 'vehicle', 'vehDepart', 'driver', 'drvDepart', 'duration', 'start_spd', 'end_spd', 'top_spd', 'hw', 'near_hw'],
    CLP_profileExcelOrderDate: ['acc_date', 'total_score', 'drv_distance'],
    CLP_profileExcelOrderName: ['name', 'department', 'total_score', 'drv_distance'],
    CLP_profileExcelOrderDateAct: ['acc_date', 'total_score', 'drv_distance'],
    CLP_profileExcelOrderNameAct: ['name', 'department', 'total_score', 'drv_distance'],
    CLP_profileExcelOrderDateScore: ['acc_date', 'total_score', 'drv_distance'],
    CLP_profileExcelOrderNameScore: ['name', 'department', 'total_score', 'drv_distance'],
    CLP_profileExcelOrderDateRank: ['acc_date', 'total_rank', 'drv_distance'],
    CLP_profileExcelOrderNameRank: ['name', 'department', 'total_rank', 'drv_distance'],
    
})