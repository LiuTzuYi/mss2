<?php
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-19 16:19:11
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
/**
 * @apiDefine WarningDataDetails
 *
 * @apiSuccess {Object[]} data List of warning data
 * @apiSuccess {String} data.aaw AAW warning count/100km
 * @apiSuccess {String} data.aaw_score AAW warning score
 * @apiSuccess {String} data.abw ABW warning count/100km
 * @apiSuccess {String} data.abw_score ABW warning score
 * @apiSuccess {String} data.drv_distance Driving Distance
 * @apiSuccess {String} data.fcw FCW warning count/100km
 * @apiSuccess {String} data.fcw_score FCW warning score
 * @apiSuccess {String} data.hmw_h HMW H warning count/100km
 * @apiSuccess {String} data.hmw_h_score HMW H warning score
 * @apiSuccess {String} data.hmw_l HMW L warning count/100km
 * @apiSuccess {String} data.hmw_l_score HMW L warning score
 * @apiSuccess {String} data.hmw_m HMW M warning count/100km
 * @apiSuccess {String} data.hmw_m_score HMW M warning score
 * @apiSuccess {String} data.lldw LLDW warning count/100km
 * @apiSuccess {String} data.lldw_score LLDW warning score
 * @apiSuccess {String} data.pcw PCW warning count/100km
 * @apiSuccess {String} data.pcw_score PCW warning score
 * @apiSuccess {String} data.pcw_l PCW L warning count/100km
 * @apiSuccess {String} data.pcw_l_score PCW L warning score
 * @apiSuccess {String} data.rldw RLDW warning count/100km
 * @apiSuccess {String} data.rldw_score RLDW warning score
 * @apiSuccess {String} data.spw SPW warning count/100km
 * @apiSuccess {String} data.spw_score SPW warning score
 * @apiSuccess {String} data.ufcw_h UFCW H warning count/100km
 * @apiSuccess {String} data.ufcw_h_score UFCW H warning score
 * @apiSuccess {String} data.ufcw_l UFCW L warning count/100km
 * @apiSuccess {String} data.ufcw_l_score UFCW L warning score
 * @apiSuccess {String} data.vb VB warning count/100km
 * @apiSuccess {String} data.vb_score VB warning score
 */

 /**
 * @apiDefine WarningDataActCnt
 *
 * @apiSuccess {Object[]} dataActCnt List of warning data
 * @apiSuccess {String} dataActCnt.aaw AAW warning count/100km
 * @apiSuccess {String} dataActCnt.abw ABW warning count/100km
 * @apiSuccess {String} dataActCnt.drv_distance Driving Distance
 * @apiSuccess {String} dataActCnt.fcw FCW warning count/100km
 * @apiSuccess {String} dataActCnt.hmw_h HMW H warning count/100km
 * @apiSuccess {String} dataActCnt.hmw_l HMW L warning count/100km
 * @apiSuccess {String} dataActCnt.hmw_m HMW M warning count/100km
 * @apiSuccess {String} dataActCnt.lldw LLDW warning count/100km
 * @apiSuccess {String} dataActCnt.pcw PCW warning count/100km
 * @apiSuccess {String} dataActCnt.pcw_l PCW L warning count/100km
 * @apiSuccess {String} dataActCnt.rldw RLDW warning count/100km
 * @apiSuccess {String} dataActCnt.spw SPW warning count/100km
 * @apiSuccess {String} dataActCnt.ufcw_h UFCW H warning count/100km
 * @apiSuccess {String} dataActCnt.ufcw_l UFCW L warning count/100km
 * @apiSuccess {String} dataActCnt.vb VB warning count/100km
 */

$app->get('/companyScore_CLP/{type}/{distance}/{start_date}/{end_date}', 'getCompanyScore_CLP')->setName('PROFILE - COMPANY SCORE');

/**
 * @api {get} /companyScore/{type}/{start_date}/{end_date} Get Company Score (Profile)
 * @apiName PROFILE - COMPANY SCORE
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.start_date Start date of the data
 * @apiSuccess {String} data.total_score Total score of all warnings
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.start_date Start date of the data
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "start_date": "2019-03-10",
 *              "total_score": 37.36,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "lldw": 32,
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11201 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

$app->group('/driverScore_CLP/{type}/{distance}/{start_date}/{end_date}/{mode}', function() {
	$this->get('', 'getDriverScore_CLP')->setName('PROFILE - DRIVER SCORE');
/**
 * @api {get} /driverScore/{type}/{start_date}/{end_date}/{mode} Get Driver Score (Profile - Company)
 * @apiName PROFILE - DRIVER SCORE
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c", "g", "i"} mode Mode of viewing
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the driver
 * @apiSuccess {String} data.id Driver ID of the driver
 * @apiSuccess {String} data.department Department of the driver
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the driver
 * @apiSuccess {String} dataActCnt.id Driver ID of the driver
 * @apiSuccess {String} dataActCnt.department Department of the driver
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "Chan Tai Man",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "Chan Tai Man",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11201 MySql errors
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/


	$this->get('/{id}', 'getDriverScore_CLP')->setName('PROFILE - DRIVER SCORE INDIVIDUAL');
/**
 * @api {get} /driverScore/{type}/{start_date}/{end_date}/{mode}/{id} Get Driver Score (Profile - Group/ Individual)
 * @apiName PROFILE - DRIVER SCORE INDIVIDUAL
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c", "g", "i"} mode Mode of viewing
 * @apiParam {String} id ID of the target (group/ individual)
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the driver
 * @apiSuccess {String} data.id Driver ID of the driver
 * @apiSuccess {String} data.department Department of the driver
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the driver
 * @apiSuccess {String} dataActCnt.id Driver ID of the driver
 * @apiSuccess {String} dataActCnt.department Department of the driver
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "Chan Tai Man",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "Chan Tai Man",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11202 MySql errors
 * @apiError (400) InternalError_11203 MySql errors
 * @apiError (400) InternalError_11204 MySql errors
 * @apiError (400) ParameterError_11206 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

});

$app->group('/drvgrpScore_CLP/{type}/{distance}/{start_date}/{end_date}/{mode}', function() {
	$this->get('', 'getDrvGrpScore_CLP')->setName('PROFILE - DRIVERGRP SCORE');
/**
 * @api {get} /drvgrpScore/{type}/{start_date}/{end_date}/{mode} Get Driver Group Score (Profile - Company)
 * @apiName PROFILE - DRIVERGRP SCORE
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","g"} mode Mode of viewing
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the driver group
 * @apiSuccess {String} data.id ID of the driver group
 * @apiSuccess {String} data.department Department of the driver group
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the driver group
 * @apiSuccess {String} dataActCnt.id ID of the driver group
 * @apiSuccess {String} dataActCnt.department Department of the driver group
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "Testing Group",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "Testing Group",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11207 MySql errors
 * @apiError (400) InternalError_11208 MySql errors
 * @apiError (400) ParameterError_11210 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->get('/{id}', 'getDrvGrpScore_CLP')->setName('PROFILE - DRIVERGRP SCORE INDIVIDUAL');
/**
 * @api {get} /drvgrpScore/{type}/{start_date}/{end_date}/{mode}/{id} Get Driver Group Score (Profile - Group)
 * @apiName PROFILE - DRIVERGRP SCORE INDIVIDUAL
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","g"} mode Mode of viewing
 * @apiParam {String} id ID of the target (group)
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the driver group
 * @apiSuccess {String} data.id ID of the driver group
 * @apiSuccess {String} data.department Department of the driver group
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the driver group
 * @apiSuccess {String} dataActCnt.id ID of the driver group
 * @apiSuccess {String} dataActCnt.department Department of the driver group
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "Testing Group",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "Testing Group",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11207 MySql errors
 * @apiError (400) InternalError_11208 MySql errors
 * @apiError (400) ParameterError_11210 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

});

$app->group('/vehicleScore_CLP/{type}/{distance}/{start_date}/{end_date}/{mode}', function() {
	$this->get('', 'getVehicleScore_CLP')->setName('PROFILE - VEHICLE SCORE');
/**
 * @api {get} /vehicleScore/{type}/{start_date}/{end_date}/{mode} Get Vehicle Score (Profile - Company)
 * @apiName PROFILE - VEHICLE SCORE
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","g","i"} mode Mode of viewing
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the vehicle
 * @apiSuccess {String} data.id ID of the vehicle
 * @apiSuccess {String} data.department Department of the vehicle
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the vehicle
 * @apiSuccess {String} dataActCnt.id ID of the vehicle
 * @apiSuccess {String} dataActCnt.department Department of the vehicle
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "GS-Tester-A-0762",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "GS-Tester-A-0762",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11211 MySql errors
 * @apiError (400) InternalError_11212 MySql errors
 * @apiError (400) InternalError_11213 MySql errors
 * @apiError (400) ParameterError_11215 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->get('/{id}', 'getVehicleScore_CLP')->setName('PROFILE - VEHICLE SCORE INDIVIDUAL');
/**
 * @api {get} /vehicleScore/{type}/{start_date}/{end_date}/{mode}/{id} Get Vehicle Score (Profile - Group/ Individual)
 * @apiName PROFILE - VEHICLE SCORE INDIVIDUAL
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","g","i"} mode Mode of viewing
 * @apiParam {String} id ID of the target (group/ individual)
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the vehicle
 * @apiSuccess {String} data.id ID of the vehicle
 * @apiSuccess {String} data.department Department of the vehicle
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the vehicle
 * @apiSuccess {String} dataActCnt.id ID of the vehicle
 * @apiSuccess {String} dataActCnt.department Department of the vehicle
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "GS-Tester-A-0762",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *           {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "GS-Tester-A-0762",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *           }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11211 MySql errors
 * @apiError (400) InternalError_11212 MySql errors
 * @apiError (400) InternalError_11213 MySql errors
 * @apiError (400) ParameterError_11215 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
});

$app->group('/vehgrpScore_CLP/{type}/{distance}/{start_date}/{end_date}/{mode}', function() {
	$this->get('', 'getVehGrpScore_CLP')->setName('PROFILE - VEHICLEGRP SCORE');
/**
 * @api {get} /vehgrpScore/{type}/{start_date}/{end_date}/{mode} Get Vehicle Group Score (Profile - Company)
 * @apiName PROFILE - VEHICLEGRP SCORE
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","g"} mode Mode of viewing
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the vehicle group
 * @apiSuccess {String} data.id ID of the vehicle group
 * @apiSuccess {String} data.department Department of the vehicle group
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the vehicle group
 * @apiSuccess {String} dataActCnt.id ID of the vehicle group
 * @apiSuccess {String} dataActCnt.department Department of the vehicle group
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "Testing Group",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "Testing Group",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11216 MySql errors
 * @apiError (400) InternalError_11217 MySql errors
 * @apiError (400) ParameterError_11219 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->get('/{id}', 'getVehGrpScore_CLP')->setName('PROFILE - VEHICLEGRP SCORE INDIVIDUAL');
/**
 * @api {get} /vehgrpScore/{type}/{start_date}/{end_date}/{mode}/{id} Get Vehicle Group Score (Profile - Group)
 * @apiName PROFILE - VEHICLEGRP SCORE INDIVIDUAL
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","g"} mode Mode of viewing
 * @apiParam {String} id ID of the target (group)
 *
 * @apiSuccess {String} message Status message
 * @apiUse WarningDataDetails
 * @apiSuccess {String} data.name Name of the vehicle group
 * @apiSuccess {String} data.id ID of the vehicle group
 * @apiSuccess {String} data.department Department of the vehicle group
 * @apiUse WarningDataActCnt
 * @apiSuccess {String} dataActCnt.name Name of the vehicle group
 * @apiSuccess {String} dataActCnt.id ID of the vehicle group
 * @apiSuccess {String} dataActCnt.department Department of the vehicle group
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw": 0.3,
 *              "aaw_score": 97,
 *              "abw": 1.5,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "department": "Root",
 *              "fcw": 2.7,
 *              "fcw_score": 82.07,
 *              "hmw_h": 3.9,
 *              "hmw_h_score": 90.3,
 *              "hmw_l": 0,
 *              "hmw_l_score": 100,
 *              "hmw_m": 8,
 *              "hmw_m_score": 89.9,
 *              "id": 88,
 *              "lldw": 12.2,
 *              "lldw_score": 84.7,
 *              "name": "Testing Group",
 *              "pcw": 6.6,
 *              "pcw_l": 3,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw": 24.1,
 *              "rldw_score": 69.75,
 *              "spw": 6.3,
 *              "spw_score": 84.3,
 *              "ufcw_h": 27.4,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l": 42.3,
 *              "ufcw_l_score": 64.67,
 *              "vb": 5.1,
 *              "vb_score": 100
 *          }
 *      ],
 *      "dataActCnt": [
 *          {
 *              "aaw": 3,
 *              "abw": 12,
 *              "drv_distance": 325.3,
 *              "department": "Root",
 *              "fcw": 23,
 *              "hmw_h": 29,
 *              "hmw_l": 0,
 *              "hmw_m": 46,
 *              "id": 88,
 *              "lldw": 32,
 *              "name": "Testing Group",
 *              "pcw": 18,
 *              "pcw_l": 10,
 *              "rldw": 53,
 *              "spw": 17,
 *              "start_date": "2019-03-09",
 *              "ufcw_h": 154,
 *              "ufcw_l": 184,
 *              "vb": 32
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11216 MySql errors
 * @apiError (400) InternalError_11217 MySql errors
 * @apiError (400) ParameterError_11219 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
});

$app->group('/warningRank_CLP/{type}/{distance}/{start_date}/{end_date}/{profile}', function() {
	$this->get('', 'getWarningRank_CLP')->setName('PROFILE - WARNING RANK');
/**
 * @api {get} /warningRank/{type}/{start_date}/{end_date}/{profile} Get Warning Rank (Profile - Company)
 * @apiName PROFILE - WARNING RANK
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","di","dg","vi","vg"} profile Target Profile
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning data
 * @apiSuccess {String} data.aaw_score AAW warning score
 * @apiSuccess {String} data.abw_score ABW warning score
 * @apiSuccess {String} data.drv_distance Driving Distance
 * @apiSuccess {String} data.fcw_score FCW warning score
 * @apiSuccess {String} data.hmw_h_score HMW H warning score
 * @apiSuccess {String} data.hmw_l_score HMW L warning score
 * @apiSuccess {String} data.hmw_m_score HMW M warning score
 * @apiSuccess {String} data.lldw_score LLDW warning score
 * @apiSuccess {String} data.pcw_score PCW warning score
 * @apiSuccess {String} data.pcw_l_score PCW L warning score
 * @apiSuccess {String} data.rldw_score RLDW warning score
 * @apiSuccess {String} data.spw_score SPW warning score
 * @apiSuccess {String} data.ufcw_h_score UFCW H warning score
 * @apiSuccess {String} data.ufcw_l_score UFCW L warning score
 * @apiSuccess {String} data.vb_score VB warning score
 * @apiSuccess {String} data.start_date Start date of the record
 * @apiSuccess {String} data.total_score Total score
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw_score": 97,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "fcw_score": 82.07,
 *              "hmw_h_score": 90.3,
 *              "hmw_l_score": 100,
 *              "hmw_m_score": 89.9,
 *              "lldw_score": 84.7,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw_score": 69.75,
 *              "spw_score": 84.3,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l_score": 64.67,
 *              "vb_score": 100,
 *              "start_date": "2019-03-10",
 *              "total_score": 0
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11220 MySql errors
 * @apiError (400) ParameterError_11221 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->get('/{id}', 'getWarningRank_CLP')->setName('PROFILE - WARNING RANK INDIVIDUAL');
/**
 * @api {get} /warningRank/{type}/{start_date}/{end_date}/{profile}/{id} Get Warning Rank (Profile - Group/ individual)
 * @apiName PROFILE - WARNING RANK INDIVIDUAL
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="d","w","m","y"} type Profile type
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String="c","di","dg","vi","vg"} profile Target Profile
 * @apiParam {String} id Target ID (Group/ Individual)
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning data
 * @apiSuccess {String} data.aaw_score AAW warning score
 * @apiSuccess {String} data.abw_score ABW warning score
 * @apiSuccess {String} data.drv_distance Driving Distance
 * @apiSuccess {String} data.fcw_score FCW warning score
 * @apiSuccess {String} data.hmw_h_score HMW H warning score
 * @apiSuccess {String} data.hmw_l_score HMW L warning score
 * @apiSuccess {String} data.hmw_m_score HMW M warning score
 * @apiSuccess {String} data.lldw_score LLDW warning score
 * @apiSuccess {String} data.pcw_score PCW warning score
 * @apiSuccess {String} data.pcw_l_score PCW L warning score
 * @apiSuccess {String} data.rldw_score RLDW warning score
 * @apiSuccess {String} data.spw_score SPW warning score
 * @apiSuccess {String} data.ufcw_h_score UFCW H warning score
 * @apiSuccess {String} data.ufcw_l_score UFCW L warning score
 * @apiSuccess {String} data.vb_score VB warning score
 * @apiSuccess {String} data.start_date Start date of the record
 * @apiSuccess {String} data.total_score Total score
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "aaw_score": 97,
 *              "abw_score": 85.1,
 *              "drv_distance": 335.5,
 *              "fcw_score": 82.07,
 *              "hmw_h_score": 90.3,
 *              "hmw_l_score": 100,
 *              "hmw_m_score": 89.9,
 *              "lldw_score": 84.7,
 *              "pcw_l_score": 100,
 *              "pcw_score": 56.2,
 *              "rldw_score": 69.75,
 *              "spw_score": 84.3,
 *              "ufcw_h_score": 54.23,
 *              "ufcw_l_score": 64.67,
 *              "vb_score": 100,
 *              "start_date": "2019-03-10",
 *              "total_score": 0
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11220 MySql errors
 * @apiError (400) ParameterError_11221 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
});
$app->get('/profileList_CLP/{profile}', 'getProfileList_CLP')->setName('PROFILE - GET FILTER LIST');
/**
 * @api {get} /profileList/{profile} Get Filter List
 * @apiName PROFILE - GET FILTER LIST
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="di","dg","vi","vg"} profile Target Profile
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning data
 * @apiSuccess {String} data.id ID of the individual/ vehicle
 * @apiSuccess {String} data.name name of the individual/ vehicle
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "id":"197",
 *              "name":"CSV Testing [Root]"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11223 MySql errors
 * @apiError (400) ParameterError_11224 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
$app->get('/profileBase_CLP/{profile}/{id}', 'getProfileBaseInfo_CLP')->setName('PROFILE - GET INFO');
/**
 * @api {get} /profileBase/{profile}/{id} Get Profile Base Info
 * @apiName PROFILE - GET INFO
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="di","dg","vi","vg"} profile Target Profile
 * @apiParam {String} id Target ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of base info
 * @apiSuccess {String} data.brand Brand of the vehicle
 * @apiSuccess {String} data.department Department of the vehicle/ vehicle group/ driver/ driver group
 * @apiSuccess {String} data.description Description of the group vehicle group/ driver group
 * @apiSuccess {String} data.model Model of the vehicle
 * @apiSuccess {String} data.name Name of the vehicle/ vehicle group/ driver/ driver group
 * @apiSuccess {String} data.type Type of the vehicle
 * @apiSuccess {String} data.year Year of the vehicle
 * @apiSuccess {String} data.dob Date of Birth of the driver
 * @apiSuccess {String} data.phone_home Home Telephone of the driver
 * @apiSuccess {String} data.phone_mobile Mobile of the driver
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message":"Success",
 *      "data":	[
 *          {
 *              "description":"Testing group",
 *              "name":"Testing",
 *              "department":"Root"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11226 MySql errors
 * @apiError (400) ParameterError_11227 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

$app->group('/profileVideo_CLP/{profile}/{start_date}/{end_date}', function() {
	$this->get('','getProfileVideo_CLP')->setName('PROFILE - GET VIDEO TABLE');
/**
 * @api {get} /profileVideo/{profile}/{start_date}/{end_date} Get Warning Video Table (Profile - Company)
 * @apiName PROFILE - GET VIDEO TABLE
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="c","di","dg","vi","vg"} profile Target Profile
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning video
 * @apiSuccess {String} data.warningType Warning Type
 * @apiSuccess {String} data.start_time Starting time of the warning
 * @apiSuccess {String} data.duration Duration of warning
 * @apiSuccess {String} data.start_spd Speed of the vehicle
 * @apiSuccess {String} data.end_spd Speed of the vehicle
 * @apiSuccess {String} data.top_spd Top speed of the vehicle
 * @apiSuccess {String} data.hw Headway(HW) of the vehicle
 * @apiSuccess {String} data.near_hw Nearest headway (HW) of the vehicle
 * @apiSuccess {String} data.roc
 * @apiSuccess {String} data.state
 * @apiSuccess {String} data.video Video ID of warning
 * @apiSuccess {String} data.videoReady Status of video uploading
 * @apiSuccess {String} data.driver Driver of the trip
 * @apiSuccess {String} data.vehicle Vehicle of the trip
 * @apiSuccess {String} data.drvDepartment Department of the driver
 * @apiSuccess {String} data.vehDepartment Department of the vehicle
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message":"Success",
 *      "data": [
 *          {
 *              "warningType":"FCW",
 *              "start_time":"2019-04-10 08:42:51",
 *              "duration":0.88,
 *              "start_spd":38,
 *              "end_spd":32,
 *              "top_spd":38,
 *              "hw":1.2,
 *              "near_hw":1,
 *              "roc":6.7999999999999998,
 *              "state":7,
 *              "video":"1_20190410_084250_UuHvV82",
 *              "videoReady":"Y",
 *              "driver":null,
 *              "vehicle":"GS-Tester-A-0762",
 *              "drvDepartment":null,
 *              "vehDepartment":"lv1 u4"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11228 MySql errors
 * @apiError (400) ParameterError_11229 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->get('/{id}','getProfileVideo_CLP')->setName('PROFILE - GET VIDEO TABLE /W ID');
/**
 * @api {get} /profileVideo/{profile}/{start_date}/{end_date}/{id} Get Warning Video Table (Profile - Group/ Individual)
 * @apiName PROFILE - GET VIDEO TABLE /W ID
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="c",di","dg","vi","vg"} profile Target Profile
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String} id Target ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning video
 * @apiSuccess {String} data.warningType Warning Type
 * @apiSuccess {String} data.start_time Starting time of the warning
 * @apiSuccess {String} data.duration Duration of warning
 * @apiSuccess {String} data.start_spd Speed of the vehicle
 * @apiSuccess {String} data.end_spd Speed of the vehicle
 * @apiSuccess {String} data.top_spd Top speed of the vehicle
 * @apiSuccess {String} data.hw Headway(HW) of the vehicle
 * @apiSuccess {String} data.near_hw Nearest headway (HW) of the vehicle
 * @apiSuccess {String} data.roc Rate of change of the vehicle
 * @apiSuccess {String} data.state Driver action
 * @apiSuccess {String} data.video Video ID of warning
 * @apiSuccess {String} data.videoReady Status of video uploading
 * @apiSuccess {String} data.driver Driver of the trip
 * @apiSuccess {String} data.vehicle Vehicle of the trip
 * @apiSuccess {String} data.drvDepartment Department of the driver
 * @apiSuccess {String} data.vehDepartment Department of the vehicle
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message":"Success",
 *      "data": [
 *          {
 *              "warningType":"FCW",
 *              "start_time":"2019-04-10 08:42:51",
 *              "duration":0.88,
 *              "start_spd":38,
 *              "end_spd":32,
 *              "top_spd":38,
 *              "hw":1.2,
 *              "near_hw":1,
 *              "roc":6.7999999999999998,
 *              "state":7,
 *              "video":"1_20190410_084250_UuHvV82",
 *              "videoReady":"Y",
 *              "driver":null,
 *              "vehicle":"GS-Tester-A-0762",
 *              "drvDepartment":null,
 *              "vehDepartment":"lv1 u4"
 *          }
 *      ]
 * }
 *
 * @apiError (400) InternalError_11228 MySql errors
 * @apiError (400) ParameterError_11229 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
});

$app->group('/profileQuerySpecWarn_CLP/{profile}/{start_time}/{end_time}/{warn}', function() {
	$this->get('','querySpecWarnProfile_CLP')->setName('PROFILE - QUERY SPEC WARNING DETAIL');
/**
 * @api {get} /profileQuerySpecWarn/{profile}/{start_time}/{end_time}/{warn} Get Specfic Warning Detail (Profile - Company)
 * @apiName PROFILE - QUERY SPEC WARNING DETAIL
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="c","di","dg","vi","vg"} profile Target Profile
 * @apiParam {String} start_time Start date
 * @apiParam {String} end_time End date
 * @apiParam {String} warn Target warning
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning video
 * @apiSuccess {String} data.start_time Starting time of the warning
 * @apiSuccess {String} data.duration Duration of warning
 * @apiSuccess {String} data.start_spd Speed of the vehicle
 * @apiSuccess {String} data.end_spd Speed of the vehicle
 * @apiSuccess {String} data.top_spd Top speed of the vehicle
 * @apiSuccess {String} data.hw Headway(HW) of the vehicle
 * @apiSuccess {String} data.near_hw Nearest headway (HW) of the vehicle
 * @apiSuccess {String} data.state Driver action
 * @apiSuccess {String} data.video Video ID of warning
 * @apiSuccess {String} data.videoReady Status of video uploading
 * @apiSuccess {String} data.driver Driver of the trip
 * @apiSuccess {String} data.vehicle Vehicle of the trip
 * @apiSuccess {String} data.drvDepartment Department of the driver
 * @apiSuccess {String} data.vehDepartment Department of the vehicle
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message":"Success",
 *      "data": [
 *          {
 *              "start_time":"2019-04-10 08:42:51",
 *              "duration":0.88,
 *              "start_spd":38,
 *              "end_spd":32,
 *              "top_spd":38,
 *              "hw":1.2,
 *              "near_hw":1,
 *              "state":7,
 *              "video":"1_20190410_084250_UuHvV82",
 *              "videoReady":"Y",
 *              "driver":null,
 *              "vehicle":"GS-Tester-A-0762",
 *              "drvDepartment":null,
 *              "vehDepartment":"lv1 u4"
 *          }
 *      ]
 * }
 *
 * @apiError (400) InternalError_11231 MySql errors
 * @apiError (400) ParameterError_11232 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
	$this->get('/{id}','querySpecWarnProfile_CLP')->setName('PROFILE - QUERY SPEC WARNING DETAIL /W ID');
/**
 * @api {get} /profileQuerySpecWarn/{profile}/{start_time}/{end_time}/{warn}/{id} Get Specfic Warning Detail (Profile - Group/ Individual)
 * @apiName PROFILE - QUERY SPEC WARNING DETAIL /W ID
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiParam {String="c","di","dg","vi","vg"} profile Target Profile
 * @apiParam {String} start_date Start date
 * @apiParam {String} end_date End date
 * @apiParam {String} warn Target warning
 * @apiParam {String} id Target ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning video
 * @apiSuccess {String} data.start_time Starting time of the warning
 * @apiSuccess {String} data.duration Duration of warning
 * @apiSuccess {String} data.start_spd Speed of the vehicle
 * @apiSuccess {String} data.end_spd Speed of the vehicle
 * @apiSuccess {String} data.top_spd Top speed of the vehicle
 * @apiSuccess {String} data.hw Headway(HW) of the vehicle
 * @apiSuccess {String} data.near_hw Nearest headway (HW) of the vehicle
 * @apiSuccess {String} data.state
 * @apiSuccess {String} data.video Video ID of warning
 * @apiSuccess {String} data.videoReady Status of video uploading
 * @apiSuccess {String} data.driver Driver of the trip
 * @apiSuccess {String} data.vehicle Vehicle of the trip
 * @apiSuccess {String} data.drvDepartment Department of the driver
 * @apiSuccess {String} data.vehDepartment Department of the vehicle
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message":"Success",
 *      "data": [
 *          {
 *              "start_time":"2019-04-10 08:42:51",
 *              "duration":0.88,
 *              "start_spd":38,
 *              "end_spd":32,
 *              "top_spd":38,
 *              "hw":1.2,
 *              "near_hw":1,
 *              "state":7,
 *              "video":"1_20190410_084250_UuHvV82",
 *              "videoReady":"Y",
 *              "driver":null,
 *              "vehicle":"GS-Tester-A-0762",
 *              "drvDepartment":null,
 *              "vehDepartment":"lv1 u4"
 *          }
 *      ]
 * }
 *
 * @apiError (400) InternalError_11231 MySql errors
 * @apiError (400) ParameterError_11232 Wrong parameters
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
});

function getCompanyScore_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$type = $args['type'];
	$distance = $args['distance'];
	$start_date = $args['start_date'];
	$end_date = $args['end_date'];
	$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date));

	$scoreCol = implode(", ", $setting['data']['fullScoreField_CLP']);
	$warnCol = implode(", ", $setting['data']['fullWarningField_CLP']);

	$sql = "SELECT acc_date, CAST(drv_distance/100000.0 AS FLOAT) AS drv_distance, total_score, grade, ".$scoreCol.", ".$warnCol." FROM avg_warning_comp WHERE company_id = :company_id and type = :type and acc_date > :start_date and acc_date <= :end_date and drv_distance > :distance ORDER BY acc_date ASC";
	$container->logger->info('['.$routename.'] sql: '.$sql );

	$sqlActCnt = "SELECT acc_date, ROUND(CAST(drv_distance/100000.0 AS FLOAT),1) AS drv_distance, total_score, ".$warnCol." FROM avg_warning_comp WHERE company_id = :company_id and type = :type and acc_date > :start_date and acc_date <= :end_date and drv_distance > :distance ORDER BY acc_date ASC";
	$container->logger->info('['.$routename.'] sqlActCnt: '.$sqlActCnt );


	try{
		$db = $container->db;
		$stmt = $db->prepare($sql, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("type", $type);
		$stmt->bindParam("distance", $distance);
		$stmt->bindParam("start_date", $start_date);
		$stmt->bindParam("end_date", $end_date);
		$stmt->execute();
		$companyScore = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		$db = $container->db;
		$stmt = $db->prepare($sqlActCnt, $prepOpts);
		$stmt->bindParam("company_id", $company_id);
		$stmt->bindParam("type", $type);
		$stmt->bindParam("distance", $distance);
		$stmt->bindParam("start_date", $start_date);
		$stmt->bindParam("end_date", $end_date);
		$stmt->execute();
		$companyActCnt = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		if($companyScore){
			foreach ($companyScore as $key1 => $data){
				$oridistance = $companyScore[$key1]['drv_distance'];
				foreach ($data as $key => $value){
					if($value!==null&&$key!=='acc_date'&&$key!=='grade'){
						if($key=='drv_distance'){
							$distance = round($value,1);
							$companyScore[$key1][$key] = (float)$distance;
						}
						elseif (fnmatch('*_score', $key)) {
							$companyScore[$key1][$key] = (float)$value;
						}
						else{
							$a = (float)$value;
							$companyScore[$key1][$key] = round($a/$oridistance*100,1);
						}
					}
				}
			}
		}
		if($companyActCnt){
			foreach ($companyActCnt as $key1 => $data){
				foreach ($data as $key => $value){
					if($value!==null&&$key!=='acc_date'){
						$companyActCnt[$key1][$key] = (float)$value;
					}
				}
			}
		}
		$container->logger->info('['.$routename.'] success.');
		if($companyScore&&$companyActCnt){
			$returnData = array('message' => 'Success','data' => $companyScore,'dataActCnt' => $companyActCnt);
		}
		else if($companyScore){
			$returnData = array('message' => 'Success','data' => $companyScore,'dataActCnt' => []);
		}
		else if($companyActCnt){
			$returnData = array('message' => 'Success','data' => [],'dataActCnt' => $companyActCnt);
		}
		else{
			$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
		}
		return $response->withJson($returnData);
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11201] '.$e);
		$returnData = array('message' => 'Fail','code'=>'11201');
		return $response->withJson($returnData,400);
	}
};

function getDriverScore_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$type = $args['type'];
	$distance = $args['distance'];
	$start_date = $args['start_date'];
	$end_date = $args['end_date'];
	$mode = $args['mode'];

	if(isset($args['id'])){
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode,'id'=>$args['id']));
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode));
	}

	$scoreCol = implode(", avg.", $setting['data']['fullScoreField_CLP']);
	$warnCol = implode(", avg.", $setting['data']['fullWarningField_CLP']);	
	$empty = false;

	switch ($mode) {
		case 'c':
			$sql2 = "SELECT driver_id FROM driver WHERE company_id = :company_id AND ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$driverIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($driverIds){
					$query_parts = implode("','", $driverIds);
					$sql = "SELECT avg.driver_id AS id, drv.name AS name, ou.title AS department, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score AS total_score, avg.grade AS grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_drv AS avg LEFT JOIN driver AS drv ON avg.driver_id = drv.driver_id LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE avg.driver_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";

					$sqlActCnt = "SELECT avg.driver_id AS id, drv.name AS name, ou.title AS department, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score AS total_score, avg.".$warnCol." FROM avg_warning_drv AS avg LEFT JOIN driver AS drv ON avg.driver_id = drv.driver_id LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE avg.driver_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( by company ): [ErrCode=11202] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11202');
				return $response->withJson($returnData,400);
			}
			break;
		case 'g':
			$group_id = $args['id'];
			$sql2 = "SELECT drvdtl.driver_id FROM driver_group_dtl AS drvdtl LEFT JOIN driver_group AS drvgrp ON drvdtl.drv_grp_id = drvgrp.drv_grp_id WHERE drvdtl.drv_grp_id = :group_id AND drvgrp.company_id = :company_id AND drvgrp.ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("group_id", $group_id);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$driverIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($driverIds){
					$query_parts = implode("','", $driverIds);
					$sql = "SELECT avg.driver_id AS id, drv.name AS name, ou.title AS department, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score AS total_score, avg.grade AS grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_drv AS avg LEFT JOIN driver AS drv ON avg.driver_id = drv.driver_id LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE avg.driver_id IN ('".$query_parts."') AND avg.type = :type AND avg.acc_date >= :start_date AND avg.acc_date <= :end_date AND avg.drv_distance > :distance ORDER BY avg.total_score DESC";
					$sqlActCnt = "SELECT avg.driver_id AS id, drv.name AS name, ou.title AS department, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score AS total_score, avg.".$warnCol." FROM avg_warning_drv AS avg LEFT JOIN driver AS drv ON avg.driver_id = drv.driver_id LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE avg.driver_id IN ('".$query_parts."') AND avg.type = :type AND avg.acc_date >= :start_date AND avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( by group ): [ErrCode=11203] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11203');
				return $response->withJson($returnData,400);
			}
			break;
		case 'i':
			$driver_id = $args['id'];
			$sql = "SELECT avg.acc_date, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score, avg.grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_drv AS avg LEFT JOIN driver AS drv ON avg.driver_id = drv.driver_id WHERE avg.driver_id = :driver_id AND drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			$sqlActCnt = "SELECT avg.acc_date, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score, avg.".$warnCol." FROM avg_warning_drv AS avg LEFT JOIN driver AS drv ON avg.driver_id = drv.driver_id WHERE avg.driver_id = :driver_id AND drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			break;
	}

	if(isset($sql)&&!$empty){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			if($mode=='i'){
				$stmt->bindParam("driver_id", $driver_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$driverScore = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			$db = $container->db;
			$stmt = $db->prepare($sqlActCnt, $prepOpts);
			if($mode=='i'){
				$stmt->bindParam("driver_id", $driver_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$driverActCnt = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			if($driverScore){
				foreach ($driverScore as $key1 => $data){
					$oridistance = $driverScore[$key1]['drv_distance'];
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'&&$key!=='grade'){
							if($key=='drv_distance'){
								$distance = round($value,1);
								$driverScore[$key1][$key] = (float)$distance;
							}
							elseif ($key=='id'||fnmatch('*_score', $key)){
								$driverScore[$key1][$key] = (float)$value;
							}
							else{
								$a = (float)$value;
								$driverScore[$key1][$key] = round($a/$oridistance*100,1);
							}
						}
					}
				}
			}
			if($driverActCnt){
				foreach ($driverActCnt as $key1 => $data){
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'){
							$driverActCnt[$key1][$key] = (float)$value;
						}
					}
				}
			}
			$container->logger->info('['.$routename.'] success.');
			if($driverScore&&$driverActCnt){
				$returnData = array('message' => 'Success','data' => $driverScore,'dataActCnt' => $driverActCnt);
			}
			else if($driverScore){
				$returnData = array('message' => 'Success','data' => $driverScore,'dataActCnt' => []);
			}
			else if($driverActCnt){
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => $driverActCnt);
			}
			else{
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
			}
			return $response->withJson($returnData);
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11204] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11204');
			return $response->withJson($returnData,400);
		}
	}
	else if (!isset($sql)&&$empty) {
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
		return $response->withJson($returnData);
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11206]');
		$returnData = array('message' => 'Fail','code'=>'11206');
		return $response->withJson($returnData,400);
	}
};

function getDrvGrpScore_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$type = $args['type'];
	$distance = $args['distance'];
	$start_date = $args['start_date'];
	$end_date = $args['end_date'];
	$mode = $args['mode'];

	if(isset($args['id'])){
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode,'id'=>$args['id']));
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode));
	}

	$scoreCol = implode(", avg.", $setting['data']['fullScoreField_CLP']);
	$warnCol = implode(", avg.", $setting['data']['fullWarningField_CLP']);
	$empty = false;

	switch ($mode) {
		case 'c':
			$sql2 = "SELECT drv_grp_id FROM driver_group WHERE company_id = :company_id AND ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$drvgrpIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($drvgrpIds){
					$query_parts = implode("','", $drvgrpIds);
					$sql = "SELECT avg.drv_grp_id AS id, grp.grp_alias AS name, ou.title AS department, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score AS total_score, avg.grade AS grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_drv_grp AS avg LEFT JOIN driver_group AS grp ON avg.drv_grp_id = grp.drv_grp_id LEFT JOIN org_chart AS ou ON grp.ou_id = ou.ou_id WHERE avg.drv_grp_id IN ('".$query_parts."') AND avg.type = :type AND avg.acc_date >= :start_date AND avg.acc_date <= :end_date AND avg.drv_distance > :distance ORDER BY avg.total_score DESC";
					$sqlActCnt = "SELECT avg.drv_grp_id AS id, grp.grp_alias AS name, ou.title AS department, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score AS total_score, avg.".$warnCol." FROM avg_warning_drv_grp AS avg LEFT JOIN driver_group AS grp ON avg.drv_grp_id = grp.drv_grp_id LEFT JOIN org_chart AS ou ON grp.ou_id = ou.ou_id WHERE avg.drv_grp_id IN ('".$query_parts."') AND avg.type = :type AND avg.acc_date >= :start_date AND avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( by company ): [ErrCode=11207] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11207');
				return $response->withJson($returnData,400);
			}
			break;
		case 'g':
			$drv_grp_id = $args['id'];
			$sql = "SELECT avg.acc_date, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score, avg.grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_drv_grp AS avg LEFT JOIN driver_group AS grp ON avg.drv_grp_id = grp.drv_grp_id WHERE avg.drv_grp_id = :drv_grp_id AND grp.company_id = :company_id AND grp.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date AND avg.acc_date <= :end_date AND avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			$sqlActCnt = "SELECT avg.acc_date, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score, avg.".$warnCol." FROM avg_warning_drv_grp AS avg LEFT JOIN driver_group AS grp ON avg.drv_grp_id = grp.drv_grp_id WHERE avg.drv_grp_id = :drv_grp_id AND grp.company_id = :company_id AND grp.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date AND avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			break;
	}

	if(isset($sql)&&!$empty){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			if($mode=='g'){
				$stmt->bindParam("drv_grp_id", $drv_grp_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$drvgrpScore = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			$db = $container->db;
			$stmt = $db->prepare($sqlActCnt, $prepOpts);
			if($mode=='g'){
				$stmt->bindParam("drv_grp_id", $drv_grp_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$drvgrpActCnt = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			if($drvgrpScore){
				foreach ($drvgrpScore as $key1 => $data){
					$oridistance = $drvgrpScore[$key1]['drv_distance'];
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'&&$key!=='grade'){
							if($key=='drv_distance'){
								$distance = round($value,1);
								$drvgrpScore[$key1][$key] = (float)$distance;
							}
							elseif($key=='id'||fnmatch('*_score', $key)){
								$drvgrpScore[$key1][$key] = (float)$value;
							}
							else{
								$a = (float)$value;
								$drvgrpScore[$key1][$key] = round($a/$oridistance*100,1);
							}
						}
					}
				}
			}
			if($drvgrpActCnt){
				foreach ($drvgrpActCnt as $key1 => $data){
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'){
							$drvgrpActCnt[$key1][$key] = (float)$value;
						}
					}
				}
			}
			$container->logger->info('['.$routename.'] success.');
			if($drvgrpScore&&$drvgrpActCnt){
				$returnData = array('message' => 'Success','data' => $drvgrpScore,'dataActCnt' => $drvgrpActCnt);
			}
			else if($drvgrpScore){
				$returnData = array('message' => 'Success','data' => $drvgrpScore,'dataActCnt' => []);
			}
			else if($drvgrpActCnt){
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => $drvgrpActCnt);
			}
			else{
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
			}
			return $response->withJson($returnData);
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11208] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11208');
			return $response->withJson($returnData,400);
		}
	}
	else if (!isset($sql)&&$empty) {
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
		return $response->withJson($returnData);
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11210]');
		$returnData = array('message' => 'Fail','code'=>'11210');
		return $response->withJson($returnData,400);
	}

};

function getVehicleScore_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$type = $args['type'];
	$distance = $args['distance'];
	$start_date = $args['start_date'];
	$end_date = $args['end_date'];
	$mode = $args['mode'];

	if(isset($args['id'])){
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode,'id'=>$args['id']));
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode));
	}

	$scoreCol = implode(", avg.", $setting['data']['fullScoreField_CLP']);
	$warnCol = implode(", avg.", $setting['data']['fullWarningField_CLP']);
	$empty = false;

	switch ($mode) {
		case 'c':
			$sql2 = "SELECT vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehicleIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($vehicleIds){
					$query_parts = implode("','", $vehicleIds);
					$sql = "SELECT avg.vrm_id AS id, veh.vrm_mark_code AS name, ou.title AS department, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score AS total_score, avg.grade AS grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_veh AS avg LEFT JOIN vehicle AS veh ON avg.vrm_id = veh.vrm_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE avg.vrm_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";

					$sqlActCnt = "SELECT avg.vrm_id AS id, veh.vrm_mark_code AS name, ou.title AS department, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score AS total_score, avg.".$warnCol." FROM avg_warning_veh AS avg LEFT JOIN vehicle AS veh ON avg.vrm_id = veh.vrm_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE avg.vrm_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( by company ): [ErrCode=11211] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11211');
				return $response->withJson($returnData,400);
			}
			break;
		case 'g':
			$group_id = $args['id'];
			$sql2 = "SELECT vehdtl.vrm_id FROM vehicle_group_dtl AS vehdtl LEFT JOIN vehicle_group AS vehgrp ON vehdtl.vrm_grp_id = vehgrp.vrm_grp_id WHERE vehdtl.vrm_grp_id = :group_id AND vehgrp.company_id = :company_id AND vehgrp.ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("group_id", $group_id);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehicleIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($vehicleIds){
					$query_parts = implode("','", $vehicleIds);
					$sql = "SELECT avg.vrm_id AS id, veh.vrm_mark_code AS name, ou.title AS department, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score AS total_score, avg.grade AS grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_veh AS avg LEFT JOIN vehicle AS veh ON avg.vrm_id = veh.vrm_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE avg.vrm_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
					$sqlActCnt = "SELECT avg.vrm_id AS id, veh.vrm_mark_code AS name, ou.title AS department, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score AS total_score, avg.".$warnCol." FROM avg_warning_veh AS avg LEFT JOIN vehicle AS veh ON avg.vrm_id = veh.vrm_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE avg.vrm_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( by group ): [ErrCode=11212] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11212');
				return $response->withJson($returnData,400);
			}
			break;
		case 'i':
			$vrm_id = $args['id'];
			$sql = "SELECT avg.acc_date, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score, avg.grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_veh AS avg LEFT JOIN vehicle AS veh ON avg.vrm_id = veh.vrm_id WHERE avg.vrm_id = :vrm_id AND veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date AND avg.acc_date <= :end_date AND avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			$sqlActCnt = "SELECT avg.acc_date, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score, avg.".$warnCol." FROM avg_warning_veh AS avg LEFT JOIN vehicle AS veh ON avg.vrm_id = veh.vrm_id WHERE avg.vrm_id = :vrm_id AND veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date AND avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			break;
	}

	if(isset($sql)&&!$empty){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			if($mode=='i'){
				$stmt->bindParam("vrm_id", $vrm_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$vehicleScore = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			$db = $container->db;
			$stmt = $db->prepare($sqlActCnt, $prepOpts);
			if($mode=='i'){
				$stmt->bindParam("vrm_id", $vrm_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$vehicleActCnt = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			if($vehicleScore){
				foreach ($vehicleScore as $key1 => $data){
					$oridistance = $vehicleScore[$key1]['drv_distance'];
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'&&$key!=='grade'){
							if($key=='drv_distance'){
								$distance = round($value,1);
								$vehicleScore[$key1][$key] = (float)$distance;
							}
							elseif($key=='id'||fnmatch('*_score', $key)){
								$vehicleScore[$key1][$key] = (float)$value;
							}
							else{
								$a = (float)$value;
								$vehicleScore[$key1][$key] = round($a/$oridistance*100,1);
							}
						}
					}
				}
			}
			if($vehicleActCnt){
				foreach ($vehicleActCnt as $key1 => $data){
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'){
							$vehicleActCnt[$key1][$key] = (float)$value;
						}
					}
				}
			}
			$container->logger->info('['.$routename.'] success.');
			if($vehicleScore&&$vehicleActCnt){
				$returnData = array('message' => 'Success','data' => $vehicleScore,'dataActCnt' => $vehicleActCnt);
			}
			else if($vehicleScore){
				$returnData = array('message' => 'Success','data' => $vehicleScore,'dataActCnt' => []);
			}
			else if($vehicleActCnt){
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => $vehicleActCnt);
			}
			else{
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
			}
			return $response->withJson($returnData);
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11213] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11213');
			return $response->withJson($returnData,400);
		}
	}
	else if (!isset($sql)&&$empty) {
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
		return $response->withJson($returnData);
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11215]');
		$returnData = array('message' => 'Fail','code'=>'11215');
		return $response->withJson($returnData,400);
	}

};

function getVehGrpScore_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$type = $args['type'];
	$distance = $args['distance'];
	$start_date = $args['start_date'];
	$end_date = $args['end_date'];
	$mode = $args['mode'];

	if(isset($args['id'])){
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode,'id'=>$args['id']));
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'mode'=>$mode));
	}

	$scoreCol = implode(", avg.", $setting['data']['fullScoreField_CLP']);
	$warnCol = implode(", avg.", $setting['data']['fullWarningField_CLP']);
	$empty = false;

	switch ($mode) {
		case 'c':
			$sql2 = "SELECT vrm_grp_id FROM vehicle_group WHERE company_id = :company_id AND ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehgrpIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($vehgrpIds){
					$query_parts = implode("','", $vehgrpIds);
					$sql = "SELECT avg.vrm_grp_id AS id, grp.grp_alias AS name, ou.title AS department, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score AS total_score, avg.grade AS grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_veh_grp AS avg LEFT JOIN vehicle_group AS grp ON avg.vrm_grp_id = grp.vrm_grp_id LEFT JOIN org_chart AS ou ON grp.ou_id = ou.ou_id WHERE avg.vrm_grp_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
					$sqlActCnt = "SELECT avg.vrm_grp_id AS id, grp.grp_alias AS name, ou.title AS department, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score AS total_score, avg.".$warnCol." FROM avg_warning_veh_grp AS avg LEFT JOIN vehicle_group AS grp ON avg.vrm_grp_id = grp.vrm_grp_id LEFT JOIN org_chart AS ou ON grp.ou_id = ou.ou_id WHERE avg.vrm_grp_id IN ('".$query_parts."') and avg.type = :type and avg.acc_date >= :start_date and avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.total_score DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( by company ): [ErrCode=11216] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11216');
				return $response->withJson($returnData,400);
			}
			break;
		case 'g':
			$vrm_grp_id = $args['id'];
			$sql = "SELECT avg.acc_date, CAST(avg.drv_distance/100000.0 AS FLOAT) AS drv_distance, avg.total_score, avg.grade, avg.".$scoreCol.", avg.".$warnCol." FROM avg_warning_veh_grp AS avg LEFT JOIN vehicle_group AS grp ON avg.vrm_grp_id = grp.vrm_grp_id WHERE avg.vrm_grp_id = :vrm_grp_id AND grp.company_id = :company_id AND grp.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date AND avg.acc_date <= :end_date AND avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			$sqlActCnt = "SELECT avg.acc_date, ROUND(CAST(avg.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, avg.total_score, avg.".$warnCol." FROM avg_warning_veh_grp AS avg LEFT JOIN vehicle_group AS grp ON avg.vrm_grp_id = grp.vrm_grp_id WHERE avg.vrm_grp_id = :vrm_grp_id AND grp.company_id = :company_id AND grp.ou_id IN ('".$oc_list."') AND avg.type = :type AND avg.acc_date > :start_date AND avg.acc_date <= :end_date and avg.drv_distance > :distance ORDER BY avg.acc_date ASC";
			break;
	}

	if(isset($sql)&&!$empty){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			if($mode=='g'){
				$stmt->bindParam("vrm_grp_id", $vrm_grp_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$vehgrpScore = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			$db = $container->db;
			$stmt = $db->prepare($sqlActCnt, $prepOpts);
			if($mode=='g'){
				$stmt->bindParam("vrm_grp_id", $vrm_grp_id);
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("type", $type);
			$stmt->bindParam("distance", $distance);
			$stmt->bindParam("start_date", $start_date);
			$stmt->bindParam("end_date", $end_date);
			$stmt->execute();
			$vehgrpActCnt = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			if($vehgrpScore){
				foreach ($vehgrpScore as $key1 => $data){
					$oridistance = $vehgrpScore[$key1]['drv_distance'];
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'&&$key!=='grade'){
							if($key=='drv_distance'){
								$distance = round($value,1);
								$vehgrpScore[$key1][$key] = (float)$distance;
							}
							elseif($key=='id'||fnmatch('*_score', $key)){
								$vehgrpScore[$key1][$key] = (float)$value;
							}
							else{
								$a = (float)$value;
								$vehgrpScore[$key1][$key] = round($a/$oridistance*100,1);
							}
						}
					}
				}
			}
			if($vehgrpActCnt){
				foreach ($vehgrpActCnt as $key1 => $data){
					foreach ($data as $key => $value){
						if($key!=='name'&&$value!==null&&$key!=='acc_date'&&$key!=='department'){
							$vehgrpActCnt[$key1][$key] = (float)$value;
						}
					}
				}
			}
			$container->logger->info('['.$routename.'] success.');
			if($vehgrpScore&&$vehgrpActCnt){
				$returnData = array('message' => 'Success','data' => $vehgrpScore,'dataActCnt' => $vehgrpActCnt);
			}
			else if($vehgrpScore){
				$returnData = array('message' => 'Success','data' => $vehgrpScore,'dataActCnt' => []);
			}
			else if($vehgrpActCnt){
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => $vehgrpActCnt);
			}
			else{
				$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
			}
			return $response->withJson($returnData);
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11217] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11217');
			return $response->withJson($returnData,400);
		}
	}
	else if (!isset($sql)&&$empty) {
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => [],'dataActCnt' => []);
		return $response->withJson($returnData);
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11219]');
		$returnData = array('message' => 'Fail','code'=>'11219');
		return $response->withJson($returnData,400);
	}
};

function getWarningRank_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$type = $args['type'];
	$distance = $args['distance'];
	$start_date = $args['start_date'];
	$end_date = $args['end_date'];
	$profile = $args['profile'];

	if(isset($args['id'])){
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'profile'=>$profile,'id'=>$args['id']));
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', array('type'=>$type,'distance'=>$distance,'start_date'=>$start_date,'end_date'=>$end_date,'profile'=>$profile));
	}

	$warnCol = implode(", warn.", $setting['data']['fullWarningField_CLP']);
	$empty = false;
	$empty2 = false;

	switch ($profile) {
		case 'c':
			/*$sql = "SELECT start_date, total_score, pcw_score, fcw_score, ufcw_h_score, ufcw_l_score, vb_score, hmw_h_score, hmw_m_score, hmw_l_score, lldw_score, rldw_score, spw_score, aaw_score, abw_score FROM warning_rank_comp WHERE company_id = :company_id and type = :type and start_date > :start_date and start_date <= :end_date ORDER BY start_date ASC";*/
			$ou_list = implode("','", $_SESSION['user']->oc_list);
			$subsql = "SELECT driver_id FROM driver WHERE company_id = :company_id AND ou_id IN ('".$ou_list."')";
			$subsql2 = "SELECT vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$ou_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($subsql);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$driverIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				if($driverIds){
					$query_parts = implode("','", $driverIds);
					$sql = "SELECT drv.driver_id AS id, drv.name AS name, ou.title AS department, ROUND(CAST(warn.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, warn.total_rank, warn.".$warnCol." FROM warning_rank_drv AS warn LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE warn.driver_id IN ('".$query_parts."') and warn.type = :type and warn.acc_date >= :start_date and warn.acc_date <= :end_date and warn.drv_distance > :distance ORDER BY warn.acc_date ASC";
				}
				else{
					$empty = true;
				}

				$stmt = $db->prepare($subsql2);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehicleIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($vehicleIds){
					$query_parts = implode("','", $vehicleIds);
					$sql_2 = "SELECT veh.vrm_id AS id, veh.vrm_mark_code AS name, ou.title AS department, ROUND(CAST(warn.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, warn.total_rank, warn.".$warnCol." FROM warning_rank_veh AS warn LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE warn.vrm_id IN ('".$query_parts."') and warn.type = :type and warn.acc_date >= :start_date and warn.acc_date <= :end_date and warn.drv_distance > :distance ORDER BY warn.acc_date ASC";
				}
				else{
					$empty2 = true;
				}
			}catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error (in company): [ErrCode=11220] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11220');
				return $response->withJson($returnData,400);
			}
			break;
		case 'di':
			$driver_id = $args['id'];
			$ou_list = implode("','", $_SESSION['user']->oc_list);
			$sql = "SELECT warn.acc_date, ROUND(CAST(warn.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, warn.total_rank, warn.".$warnCol." FROM warning_rank_drv AS warn LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id WHERE warn.driver_id = :driver_id AND drv.company_id = :company_id AND drv.ou_id IN ('".$ou_list."') and warn.type = :type and warn.acc_date > :start_date and warn.acc_date <= :end_date and warn.drv_distance > :distance ORDER BY warn.acc_date ASC";
			break;
		case 'dg':
			/*$drv_grp_id = $args['id'];
			$ou_list = implode("','", $_SESSION['user']->oc_list);
			$sql = "SELECT warn.start_date, warn.total_score, warn.pcw_score, warn.fcw_score, warn.ufcw_h_score, warn.ufcw_l_score, warn.vb_score, warn.hmw_h_score, warn.hmw_m_score, warn.hmw_l_score, warn.lldw_score, warn.rldw_score, warn.spw_score, warn.aaw_score, warn.abw_score FROM warning_rank_drv_grp AS warn LEFT JOIN driver_group AS grp ON warn.drv_grp_id = grp.drv_grp_id WHERE warn.drv_grp_id = :drv_grp_id AND grp.company_id = :company_id AND grp.ou_id IN ('".$ou_list."') and warn.type = :type and warn.start_date > :start_date and warn.start_date <= :end_date ORDER BY warn.start_date ASC";*/
			$group_id = $args['id'];
			$ou_list = implode("','", $_SESSION['user']->oc_list);
			$subsql = "SELECT drvdtl.driver_id FROM driver_group_dtl AS drvdtl LEFT JOIN driver_group AS drvgrp ON drvdtl.drv_grp_id = drvgrp.drv_grp_id WHERE drvdtl.drv_grp_id = :group_id AND drvgrp.company_id = :company_id AND drvgrp.ou_id IN ('".$ou_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($subsql);
				$stmt->bindParam("group_id", $group_id);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$driverIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($driverIds){
					$query_parts = implode("','", $driverIds);
					$sql = "SELECT drv.driver_id AS id, drv.name AS name, ou.title AS department, ROUND(CAST(warn.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, warn.total_rank, warn.".$warnCol." FROM warning_rank_drv AS warn LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE warn.driver_id IN ('".$query_parts."') and warn.type = :type and warn.acc_date >= :start_date and warn.acc_date <= :end_date and warn.drv_distance > :distance ORDER BY warn.acc_date ASC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error (in group): [ErrCode=11220] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11220');
				return $response->withJson($returnData,400);
			}
			break;
		case 'vi':
			$vrm_id = $args['id'];
			$ou_list = implode("','", $_SESSION['user']->oc_list);
			$sql = "SELECT warn.acc_date, ROUND(CAST(warn.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, warn.total_rank, warn.".$warnCol." FROM warning_rank_veh AS warn LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id WHERE warn.vrm_id = :vrm_id and veh.company_id = :company_id and veh.ou_id IN ('".$ou_list."') and warn.type = :type and warn.acc_date > :start_date and warn.acc_date <= :end_date and warn.drv_distance > :distance ORDER BY warn.acc_date ASC";
			break;
		case 'vg':
			/*$vrm_grp_id = $args['id'];
			$ou_list = implode("','", $_SESSION['user']->oc_list);
			$sql = "SELECT warn.start_date, warn.total_score, warn.pcw_score, warn.fcw_score, warn.ufcw_h_score, warn.ufcw_l_score, warn.vb_score, warn.hmw_h_score, warn.hmw_m_score, warn.hmw_l_score, warn.lldw_score, warn.rldw_score, warn.spw_score, warn.aaw_score, warn.abw_score FROM warning_rank_vrm_grp AS warn LEFT JOIN veh_reg_mark_group AS grp ON warn.vrm_grp_id = grp.vrm_grp_id WHERE warn.vrm_grp_id = :vrm_grp_id AND grp.company_id = :company_id AND grp.ou_id IN ('".$ou_list."') and warn.type = :type and warn.start_date > :start_date and warn.start_date <= :end_date ORDER BY warn.start_date ASC";*/
			$group_id = $args['id'];
			$ou_list = implode("','", $_SESSION['user']->oc_list);
			$subsql = "SELECT vehdtl.vrm_id FROM vehicle_group_dtl AS vehdtl LEFT JOIN vehicle_group AS vehgrp ON vehdtl.vrm_grp_id = vehgrp.vrm_grp_id WHERE vehdtl.vrm_grp_id = :group_id AND vehgrp.company_id = :company_id AND vehgrp.ou_id IN ('".$ou_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($subsql);
				$stmt->bindParam("group_id", $group_id);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$vehicleIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($vehicleIds){
					$query_parts = implode("','", $vehicleIds);
					$sql = "SELECT veh.vrm_id AS id, veh.vrm_mark_code AS name, ou.title AS department, ROUND(CAST(warn.drv_distance/100000.0 AS FLOAT),1) AS drv_distance, warn.total_rank, warn.".$warnCol." FROM warning_rank_veh AS warn LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE warn.vrm_id IN ('".$query_parts."') and warn.type = :type and warn.acc_date >= :start_date and warn.acc_date <= :end_date and warn.drv_distance > :distance ORDER BY warn.acc_date ASC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error (in group): [ErrCode=11220] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11220');
				return $response->withJson($returnData,400);
			}
			break;
	}

	try{
		if ($profile == 'c') {
			if(isset($sql)||isset($sql_2)){
				if(isset($sql) && !$empty){
					$db = $container->db;
					$stmt = $db->prepare($sql);
					$stmt->bindParam("type", $type);
					$stmt->bindParam("distance", $distance);
					$stmt->bindParam("start_date", $start_date);
					$stmt->bindParam("end_date", $end_date);
					$stmt->execute();
					$warningRankDrv = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;
				}
				if(isset($sql_2) && !$empty2){
					//get vehicle rank
					$db = $container->db;
					$stmt = $db->prepare($sql_2);
					//$stmt->bindParam("company_id", $company_id);
					$stmt->bindParam("type", $type);
					$stmt->bindParam("distance", $distance);
					$stmt->bindParam("start_date", $start_date);
					$stmt->bindParam("end_date", $end_date);
					$stmt->execute();
					$warningRankVeh = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;
				}

				$driverRank = [];
				$vehicleRank = [];

				if(isset($warningRankDrv)){
					foreach ($warningRankDrv as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null&&$key!=='acc_date'&&$key!=='name'&&$key!=='department'){
								$warningRankDrv[$key1][$key] = (float)$value;
							}
						}
					}
					$driverRank = $warningRankDrv;
				}

				if(isset($warningRankVeh)){
					foreach ($warningRankVeh as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null&&$key!=='acc_date'&&$key!=='name'&&$key!=='department'){
								$warningRankVeh[$key1][$key] = (float)$value;
							}
						}
					}
					$vehicleRank = $warningRankVeh;
				}

				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','vehicleRank' => $vehicleRank, 'driverRank' => $driverRank);
				return $response->withJson($returnData);
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','vehicleRank' => [], 'driverRank' => []);
				return $response->withJson($returnData);
			}
		}
		else if($profile == 'di' || $profile == 'dg' || $profile == 'vi' || $profile == 'vg') {
			if(isset($sql)&&!$empty){
				$db = $container->db;
				$stmt = $db->prepare($sql);
				if($profile=='di'){
					$stmt->bindParam("driver_id", $driver_id);
					$stmt->bindParam("company_id", $company_id);
				}
				if($profile=='vi'){
					$stmt->bindParam("vrm_id", $vrm_id);
					$stmt->bindParam("company_id", $company_id);
				}
				$stmt->bindParam("type", $type);
				$stmt->bindParam("distance", $distance);
				$stmt->bindParam("start_date", $start_date);
				$stmt->bindParam("end_date", $end_date);
				$stmt->execute();
				$warningRank = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;

				if($warningRank){
					foreach ($warningRank as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null&&$key!=='acc_date'&&$key!=='name'&&$key!=='department'){
								$warningRank[$key1][$key] = (float)$value;
							}
						}
					}
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $warningRank);
					return $response->withJson($returnData);
				}
				else{
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => []);
					return $response->withJson($returnData);
				}
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}
		}
		else{
			$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11221]');
			$returnData = array('message' => 'Fail','code'=>'11221');
			return $response->withJson($returnData,400);
		}
	}
	catch(PDOException $e) {
		$container->logger->error('['.$routename.'] SQL error: [ErrCode=11220] '.$e);
		$returnData = array('message' => 'Fail','code'=>'11220');
		return $response->withJson($returnData,400);
	}


	/*if($profile!=='c'){
		try{
			if(isset($sql)&&!$empty){
				$db = $container->db;
				$stmt = $db->prepare($sql);
				switch ($profile) {
					case 'di':
						$stmt->bindParam("driver_id", $driver_id);
						$stmt->bindParam("company_id", $company_id);
						break;
					case 'dg':
						break;
					case 'vi':
						$stmt->bindParam("vrm_id", $vrm_id);
						$stmt->bindParam("company_id", $company_id);
						break;
					case 'vg':
						//$stmt->bindParam("vrm_grp_id", $vrm_grp_id);
						//$stmt->bindParam("company_id", $company_id);
						break;
				}
				$stmt->bindParam("type", $type);
				$stmt->bindParam("start_date", $start_date);
				$stmt->bindParam("end_date", $end_date);
				$stmt->execute();
				$warningRank = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;

				$warningRank = [];
				if(isset($warningRank)){
					foreach ($warningRank as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null&&$key!=='acc_date'&&$key!=='name'&&$key!=='department'){
								$warningRank[$key1][$key] = (float)$value;
							}
						}
					}
				}
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => $warningRank);
				return $response->withJson($returnData);
			}else if (!isset($sql)&&$empty) {
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}else{
				$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11221]');
				$returnData = array('message' => 'Fail','code'=>'11221');
				return $response->withJson($returnData,400);
			}
		}catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11220] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11220');
			return $response->withJson($returnData,400);
		}
	}
	else if ($profile == 'c') {
		try{
			if((isset($sql) && !$empty)||(isset($sql_2) && !$empty2)){
				if(isset($sql) && !$empty){
					$db = $container->db;
					$stmt = $db->prepare($sql);
					$stmt->bindParam("type", $type);
					$stmt->bindParam("start_date", $start_date);
					$stmt->bindParam("end_date", $end_date);
					$stmt->execute();
					$warningRank = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;
				}
				if(isset($sql_2) && !$empty2){
					//get vehicle rank
					$db = $container->db;
					$stmt = $db->prepare($sql_2);
					//$stmt->bindParam("company_id", $company_id);
					$stmt->bindParam("type", $type);
					$stmt->bindParam("start_date", $start_date);
					$stmt->bindParam("end_date", $end_date);
					$stmt->execute();
					$warningRank2 = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$db = null;
				}

				$driverRank = [];
				$vehicleRank = [];

				if(isset($warningRank)){
					foreach ($warningRank as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null&&$key!=='acc_date'&&$key!=='name'&&$key!=='department'){
								$warningRank[$key1][$key] = (float)$value;
							}
						}
					}
					$driverRank = $warningRank;
				}

				if(isset($warningRank2)){
					foreach ($warningRank2 as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null&&$key!=='acc_date'&&$key!=='name'&&$key!=='department'){
								$warningRank2[$key1][$key] = (float)$value;
							}
						}
					}
					$vehicleRank = $warningRank2;
				}

				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','vehicleRank' => $vehicleRank, 'driverRank' => $driverRank);
				return $response->withJson($returnData);
			}else if ((!isset($sql)&&$empty) && (isset($sql_2)&&!$empty2)) {
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','vehicleRank' => [], 'driverRank' => []);
				return $response->withJson($returnData);
			}else{
				$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11221]');
				$returnData = array('message' => 'Fail','code'=>'11221');
				return $response->withJson($returnData,400);
			}
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11220] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11220');
			return $response->withJson($returnData,400);
		}
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11221]');
		$returnData = array('message' => 'Fail','code'=>'11221');
		return $response->withJson($returnData,400);
	}*/
};

function getProfileList_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$profile = $args['profile'];
	$container->logger->info('['.$routename.'] parameters:', array('profile'=>$profile));

	switch ($profile) {
		case 'di':
			$sql = "SELECT drv.driver_id AS id, ISNULL(drv.name,'')+' ['+ISNULL(ou.title,'')+']' AS name FROM driver AS drv LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') ORDER BY drv.name ASC";
			break;
		case 'dg':
			$sql = "SELECT drvgrp.drv_grp_id AS id, ISNULL(drvgrp.grp_alias,'')+' ['+ISNULL(ou.title,'')+']' AS name FROM driver_group AS drvgrp LEFT JOIN org_chart AS ou ON drvgrp.ou_id = ou.ou_id WHERE drvgrp.company_id = :company_id AND drvgrp.ou_id IN ('".$oc_list."') ORDER BY drvgrp.grp_alias ASC";
			break;
		case 'vi':
			$sql = "SELECT veh.vrm_id AS id, ISNULL(veh.vrm_mark_code,'')+' ['+ISNULL(ou.title,'')+']' AS name FROM vehicle AS veh LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') ORDER BY veh.vrm_mark_code ASC";
			break;
		case 'vg':
			$sql = "SELECT vehgrp.vrm_grp_id AS id, ISNULL(vehgrp.grp_alias,'')+' ['+ISNULL(ou.title,'')+']' AS name FROM vehicle_group AS vehgrp LEFT JOIN org_chart AS ou ON vehgrp.ou_id = ou.ou_id WHERE vehgrp.company_id = :company_id AND vehgrp.ou_id IN ('".$oc_list."') ORDER BY vehgrp.grp_alias ASC";
			break;
	}

	if(isset($sql)){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			$stmt->execute();
			$dataList = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			if($dataList){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => $dataList);
				return $response->withJson($returnData);
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11223] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11223');
			return $response->withJson($returnData,400);
		}
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11224]');
		$returnData = array('message' => 'Fail','code'=>'11224');
		return $response->withJson($returnData,400);
	}
}

function getProfileBaseInfo_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$profile = $args['profile'];
	$container->logger->info('['.$routename.'] parameters:', array('profile'=>$profile,'id'=>$args['id']));

	switch ($profile) {
		case 'di':
			$driver_id = $args['id'];
			$sql = "SELECT drv.name AS name, drv.dob AS dob, drv.phone_home AS phone_home, drv.phone_mobile AS phone_mobile, ou.title AS department FROM driver AS drv LEFT JOIN org_chart AS ou ON drv.ou_id = ou.ou_id WHERE drv.company_id = :company_id AND drv.driver_id = :driver_id AND drv.ou_id IN ('".$oc_list."')";
			break;
		case 'dg':
			$drv_grp_id = $args['id'];
			$sql = "SELECT grp.grp_descpt AS description, grp.grp_alias AS name, ou.title AS department FROM driver_group AS grp LEFT JOIN org_chart AS ou ON grp.ou_id = ou.ou_id WHERE grp.company_id = :company_id and grp.drv_grp_id = :drv_grp_id AND grp.ou_id IN ('".$oc_list."')";
			break;
		case 'vi':
			$vrm_id = $args['id'];
			$sql = "SELECT veh.vrm_mark_code AS name, veh.brand AS brand, veh.model AS model, veh.year, vt.veh_type_code AS type, ou.title AS department FROM vehicle AS veh LEFT JOIN vehicle_type AS vt ON veh.type = vt.veh_type_id LEFT JOIN org_chart AS ou ON veh.ou_id = ou.ou_id WHERE veh.company_id = :company_id and veh.vrm_id = :vrm_id AND veh.ou_id IN ('".$oc_list."')";
			break;
		case 'vg':
			$vrm_grp_id = $args['id'];
			$sql = "SELECT grp.grp_descpt AS description, grp.grp_alias AS name, ou.title AS department FROM vehicle_group AS grp LEFT JOIN org_chart AS ou ON grp.ou_id = ou.ou_id WHERE grp.company_id = :company_id AND grp.vrm_grp_id = :vrm_grp_id AND grp.ou_id IN ('".$oc_list."')";
			break;
	}

	if(isset($sql)){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			$stmt->bindParam("company_id", $company_id);
			switch ($profile) {
				case 'di':
					$stmt->bindParam("driver_id", $driver_id);
					break;
				case 'dg':
					$stmt->bindParam("drv_grp_id", $drv_grp_id);
					break;
				case 'vi':
					$stmt->bindParam("vrm_id", $vrm_id);
					break;
				case 'vg':
					$stmt->bindParam("vrm_grp_id", $vrm_grp_id);
					break;
			}
			$stmt->execute();
			$dataBase = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			if($dataBase){
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => $dataBase);
				return $response->withJson($returnData);
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11226] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11226');
			return $response->withJson($returnData,400);
		}
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11227]');
		$returnData = array('message' => 'Fail','code'=>'11227');
		return $response->withJson($returnData,400);
	}
}

function getProfileVideo_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$map = $_SESSION['user']->map;

	$profile = $args['profile'];
	$start_date = $args['start_date'];
	$end_date = $args['end_date'];

	if(isset($args['id'])){
		$id = $args['id'];
		$container->logger->info('['.$routename.'] parameters:', array('profile'=>$profile,'start_date'=>$start_date,'end_date'=>$end_date,'id'=>$args['id']));
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', array('profile'=>$profile,'start_date'=>$start_date,'end_date'=>$end_date));
	}

	$empty = false;
	$wt = implode("','", $setting['data']['wt']);

	/*$filter = "AND ((trip.wt = 1 AND trip.duration >= 800 AND CAST((trip.start_spd - trip.end_spd)/CAST(trip.duration/1000.0 AS FLOAT) AS FLOAT) > 0) OR (trip.wt = 2 AND CAST((trip.start_spd - trip.end_spd)/CAST(trip.duration/1000.0 AS FLOAT) AS FLOAT) > 6 AND trip.duration >= 500) OR (trip.wt = 101 AND trip.duration > 1000 AND trip.duration <= 1500 AND CAST((trip.start_spd - trip.end_spd)/CAST(trip.duration/1000.0 AS FLOAT) AS FLOAT) >= 6 AND trip.top_spd > 10) OR (trip.wt = 101 AND trip.duration >= 1600 AND CAST((trip.start_spd - trip.end_spd)/CAST(trip.duration/1000.0 AS FLOAT) AS FLOAT) >= 3 AND trip.top_spd > 10))";*/

	$filter = $setting['data']['dangerVideoFilter'];

	switch ($profile) {
		case 'c':
			$sql2 = "SELECT vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$subquery = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($subquery){
					$query_parts = implode("','", $subquery);
					$sql = "SELECT wt.warn_type_code AS warningType, warn.start_time, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.start_spd AS start_spd, warn.end_spd AS end_spd, warn.top_spd AS top_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, ROUND(CAST((warn.start_spd-warn.end_spd)/NULLIF(warn.duration/1000.0,0) AS FLOAT),1) AS roc, warn.vehicle_status AS vehStatus, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE warn.vrm_id IN ('".$query_parts."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time AND media.media_full_id IS NOT NULL AND media.status = 'Y' AND wt.warn_type_code IN ('".$wt."') AND ".$filter." = 'Y' ORDER BY warn.start_time DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( subquery ): [ErrCode=11228] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11228');
				return $response->withJson($returnData,400);
			}
			break;
		case 'di':
			$sql = "SELECT wt.warn_type_code AS warningType, warn.start_time, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.start_spd AS start_spd, warn.end_spd AS end_spd, warn.top_spd AS top_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, ROUND(CAST((warn.start_spd-warn.end_spd)/NULLIF(warn.duration/1000.0,0) AS FLOAT),1) AS roc, warn.vehicle_status AS vehStatus, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE warn.driver_id = :id AND drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time AND media.media_full_id IS NOT NULL AND media.status = 'Y' AND wt.warn_type_code IN ('".$wt."') AND ".$filter." = 'Y' ORDER BY warn.start_time DESC";
			break;
		case 'dg':
			$sql2 = "SELECT driver_id FROM driver_group_dtl WHERE drv_grp_id = :id";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("id", $id);
				$stmt->execute();
				$subquery = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($subquery){
					$query_parts = implode("','", $subquery);
					$sql = "SELECT wt.warn_type_code AS warningType, warn.start_time, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.start_spd AS start_spd, warn.end_spd AS end_spd, warn.top_spd AS top_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, ROUND(CAST((warn.start_spd-warn.end_spd)/NULLIF(warn.duration/1000.0,0) AS FLOAT),1) AS roc, warn.vehicle_status AS vehStatus, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE warn.driver_id IN ('".$query_parts."') AND drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time AND media.media_full_id IS NOT NULL AND media.status = 'Y' AND wt.warn_type_code IN ('".$wt."') AND ".$filter." = 'Y' ORDER BY warn.start_time DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( subquery ): [ErrCode=11228] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11228');
				return $response->withJson($returnData,400);
			}
			break;
		case 'vi':
			$sql = "SELECT wt.warn_type_code AS warningType, warn.start_time, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.start_spd AS start_spd, warn.end_spd AS end_spd, warn.top_spd AS top_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, ROUND(CAST((warn.start_spd-warn.end_spd)/NULLIF(warn.duration/1000.0,0) AS FLOAT),1) AS roc, warn.vehicle_status AS vehStatus, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE warn.vrm_id = :id AND veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time  AND media.media_full_id IS NOT NULL AND media.status = 'Y' AND wt.warn_type_code IN ('".$wt."') AND ".$filter." = 'Y' ORDER BY warn.start_time DESC";
			break;
		case 'vg':
			$sql2 = "SELECT vrm_id FROM vehicle_group_dtl WHERE vrm_grp_id = :id";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("id", $id);
				$stmt->execute();
				$subquery = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($subquery){
					$query_parts = implode("','", $subquery);
					$sql = "SELECT wt.warn_type_code AS warningType, warn.start_time, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.start_spd AS start_spd, warn.end_spd AS end_spd, warn.top_spd AS top_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, ROUND(CAST((warn.start_spd-warn.end_spd)/NULLIF(warn.duration/1000.0,0) AS FLOAT),1) AS roc, warn.vehicle_status AS vehStatus, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE warn.vrm_id IN ('".$query_parts."') AND veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time AND media.media_full_id IS NOT NULL AND media.status = 'Y' AND wt.warn_type_code IN ('".$wt."') AND ".$filter." = 'Y' ORDER BY warn.start_time DESC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( subquery ): [ErrCode=11228] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11228');
				return $response->withJson($returnData,400);
			}
			break;
	}

	if(isset($sql)&&!$empty){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			if($profile==='di'||$profile==='vi'){
				$stmt->bindParam("id", $id);
			}
			if($profile!=='c'){
				$stmt->bindParam("company_id", $company_id);
			}
			$stmt->bindParam("start_time", $start_date);
			$stmt->bindParam("end_time", $end_date);
			$stmt->execute();
			$videoData = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			if($videoData){
				if($map == 'googleMap'){
					/*foreach ($videoData as $key1 => $data){
						$videoData[$key1]['roc'] = ((float)$data['start_spd']-(float)$data['end_spd'])/(float)$data['duration'];
					}*/
					/*foreach ($videoData as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null){
								if($key!=='video'&&$key!=='warningType'&&$key!=='start_time'&&$key!=='video'&&$key!=='videoReady'&&$key!=='driver'&&$key!=='vehicle'&&$key!=='drvDepartment'&&$key!=='vehDepartment'){
									$videoData[$key1][$key] = (float)$value;
								}
							}
						}
					}
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $videoData);
					return $response->withJson($returnData);*/
					foreach ($videoData as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null){
								if($key!=='video'&&$key!=='warningType'&&$key!=='start_time'&&$key!=='video'&&$key!=='videoReady'&&$key!=='driver'&&$key!=='vehicle'&&$key!=='drvDepartment'&&$key!=='vehDepartment'){
									$videoData[$key1][$key] = (float)$value;
								}
							}
						}
						$tmplng = (float)$data['lng'];
						$tmplat = (float)$data['lat'];
						$videoData[$key1]['gps'] = array($tmplat,$tmplng);
						$videoData[$key1]['rawgps'] = array($tmplat,$tmplng);
						unset($videoData[$key1]['lat']);
						unset($videoData[$key1]['lng']);
					}
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $videoData);
					return $response->withJson($returnData);
				}
				else{
					foreach ($videoData as $key1 => $data){
						foreach ($data as $key => $value){
							if($value!==null){
								if($key!=='video'&&$key!=='warningType'&&$key!=='start_time'&&$key!=='video'&&$key!=='videoReady'&&$key!=='driver'&&$key!=='vehicle'&&$key!=='drvDepartment'&&$key!=='vehDepartment'){
									$videoData[$key1][$key] = (float)$value;
								}
							}
						}
						$dttmp = new DateTime($videoData[$key1]['start_time'],new DateTimeZone($_SESSION['user']->timezone));
						$videoData[$key1]['time_utc'] = (float) $dttmp->format('U');
						$tmplng = (float)$videoData[$key1]['lng'];
						$tmplat = (float)$videoData[$key1]['lat'];
						$videoData[$key1]['rawgps'] = array($tmplat,$tmplng);
					}
					$tmpvideodata = $videoData;
					foreach ($videoData as $key1 => $data) {
						unset($videoData[$key1]['lat']);
						unset($videoData[$key1]['lng']);
					}
					$points = array();
					$tmpvideodata1 = array_values(array_filter($tmpvideodata,function($var) {return (($var['lat'] != null && $var['lng'] != null)&&($var['lat'] != 0 && $var['lng'] != 0));}));
					$tmpvideodata2 = array_values(array_filter($tmpvideodata,function($var) {return ( $var['lat'] == null || $var['lng'] == null || ($var['lat'] == 0 && $var['lng'] == 0));}));
					$ptarr = [];
					foreach( $tmpvideodata1 as $data ) {
						$pt = $data['lng'] . ',' . $data['lat'];
						array_push($ptarr, $pt);
					}
					$videochunk = array_chunk($ptarr, 100);
					for ($i=0; $i < count($videochunk); $i++) {
						$videochunk[$i] = join(';', $videochunk[$i]);
					}
					$APIkey = $setting['api']['baiduKey'];
					$path = $setting['api']['baidupath']['geoconv'];
					foreach ( $videochunk as $key=>$data ) {
						$postData = array(
						    'coords'=>$data,
						    'from'=>1,
						    'to'=>5,
						    'ak'=>$APIkey
						);
						$postData = http_build_query($postData);
						if(($key+1)%50==0){
							sleep(1);
						}
						$ch = curl_init();
						$timeout = 5;
						curl_setopt($ch,CURLOPT_URL,$path);
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
						curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
						curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
						curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
						$result = curl_exec($ch);

						if(!curl_errno($ch)){
							$json = json_decode($result,true);
							if($json['status'] == 0){
							 	$pointpath = $json['result'];
							 	foreach ($pointpath as $key2 => $point) {
							 		$tmppoint = $tmpvideodata1[$key*100+$key2];
							 		$tmppoint['gps'] = array($point['x'],$point['y']);
							 		array_push($points,$tmppoint);
							 	}
							}
							else{
								$errorcurl = true;
								if(isset($json['message'])&&isset($json['status'])){
									$error_msg = "BAIDU_RETURN=".'"'.$json['message'].' ['.$json['status']."]".'"';
								}
								else{
									$error_msg = "BAIDU_RETURN=".'"'.json_encode($json).'"';
								}
								break;
							}
						}
						else{
							$errorcurl = true;
							$error_msg = "BAIDU_CURL_ERROR=".'"'.curl_error($ch).'"';
							break;
						}
						curl_close($ch);
					}
					if(!isset($errorcurl)){
						foreach ($tmpvideodata2 as $empty) {
							if($empty['lng']!==null){
								$emptytmplng = (float)$empty['lng'];
							}
							if($empty['lat']!==null){
								$emptytmplat = (float)$empty['lat'];
							}
							$tmppoint = $empty;
					 		$tmppoint['gps'] = array($emptytmplng,$emptytmplat);
					 		array_push($points,$tmppoint);
						}
						usort($points, function($a, $b) {
						    return $a['time_utc'] <=> $b['time_utc'];
						});
						foreach ($points as $key1 => $data) {
							unset($videoData[$key1]['time_utc']);
							unset($videoData[$key1]['lat']);
							unset($videoData[$key1]['lng']);
						}
						$container->logger->info('['.$routename.'] success.');
						$returnData = array('message' => 'Success','data' => $points);
						return $response->withJson($returnData);
					}
					else{
						$container->logger->error('['.$routename.'] call baidu error: '.$error_msg);
						$returnData = array('message' => 'Success','data' => $videoData);
						return $response->withJson($returnData);
					}
				}
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11228] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11228');
			return $response->withJson($returnData,400);
		}
	}
	else if (!isset($sql)&&$empty) {
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => [],'data' => []);
		return $response->withJson($returnData);
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11229]');
		$returnData = array('message' => 'Fail','code'=>'11229');
		return $response->withJson($returnData,400);
	}
}

function querySpecWarnProfile_CLP (Request $request, Response $response, array $args){
	global $app;
	$container = $app->getContainer();
	$setting = $container->get('settings');
	$prepOpts = $setting['db']['prepOpts'];
	$routename = $request->getAttribute('route')->getName();
	$container->logger->debug('['.$routename.'] START');

	$username = $_SESSION['user']->username;
	$company_id = $_SESSION['user']->company_id;
	$ou_id = $_SESSION['user']->ou_id;
	$oc_list = implode("','", $_SESSION['user']->oc_list);

	$map = $_SESSION['user']->map;

	$profile = $args['profile'];
	$start_time = $args['start_time'];
	$end_time = $args['end_time'];
	$warn = $args['warn'];

	if(isset($args['id'])){
		$container->logger->info('['.$routename.'] parameters:', array('profile'=>$profile,'start_time'=>$start_time,'end_time'=>$end_time,'warn'=>$args['warn'],'id'=>$args['id']));
	}
	else{
		$container->logger->info('['.$routename.'] parameters:', array('profile'=>$profile,'start_time'=>$start_time,'end_time'=>$end_time,'warn'=>$args['warn']));
	}

	$warnFilter = "wt.warn_type_code LIKE :warn+'%'";
	if(preg_match("/^.+_.+$/",$warn)){
		$warnFilter = "wt.warn_type_code = :warn";
	}
	$empty = false;

	switch ($profile) {
		case 'c':
			$sql2 = "SELECT vrm_id FROM vehicle WHERE company_id = :company_id AND ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->execute();
				$subquery = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($subquery){
					$query_parts = implode("','", $subquery);
					$sql = "SELECT wt.warn_type_code AS warn_type, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.end_spd AS end_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, warn.start_spd AS start_spd, warn.start_time AS start_time, warn.vehicle_status AS vehStatus, warn.top_spd AS top_spd, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE ".$warnFilter." AND warn.vrm_id IN ('".$query_parts."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time ORDER BY warn.start_time ASC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( subquery ): [ErrCode=11231] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11231');
				return $response->withJson($returnData,400);
			}
			break;
		case 'di':
			$driver_id = $args['id'];
			$sql = "SELECT wt.warn_type_code AS warn_type, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.end_spd AS end_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, warn.start_spd AS start_spd, warn.start_time AS start_time, warn.vehicle_status AS vehStatus, warn.top_spd AS top_spd, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE ".$warnFilter." AND warn.driver_id = :driver_id AND drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time ORDER BY warn.start_time ASC";
			break;
		case 'dg':
			$drv_grp_id = $args['id'];
			$sql2 = "SELECT drvdtl.driver_id FROM driver_group_dtl AS drvdtl LEFT JOIN driver AS drv ON drvdtl.driver_id = drv.driver_id WHERE drvdtl.drv_grp_id = :drv_grp_id AND drv.company_id = :company_id AND drv.ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->bindParam("drv_grp_id", $drv_grp_id);
				$stmt->execute();
				$subquery = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($subquery){
					$query_parts = implode("','", $subquery);
					$sql = "SELECT wt.warn_type_code AS warn_type, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.end_spd AS end_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, warn.start_spd AS start_spd, warn.start_time AS start_time, warn.vehicle_status AS vehStatus, warn.top_spd AS top_spd, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE ".$warnFilter." AND warn.driver_id IN ('".$query_parts."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time ORDER BY warn.start_time ASC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( subquery ): [ErrCode=11231] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11231');
				return $response->withJson($returnData,400);
			}
			break;
		case 'vi':
			$vrm_id = $args['id'];
			$sql = "SELECT wt.warn_type_code AS warn_type, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.end_spd AS end_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, warn.start_spd AS start_spd, warn.start_time AS start_time, warn.vehicle_status AS vehStatus, warn.top_spd AS top_spd, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE ".$warnFilter." AND warn.vrm_id = :vrm_id AND veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time ORDER BY warn.start_time ASC";
			break;
		case 'vg':
			$vrm_grp_id = $args['id'];
			$sql2 = "SELECT vehdtl.vrm_id FROM vehicle_group_dtl AS vehdtl LEFT JOIN vehicle AS veh ON vehdtl.vrm_id = veh.vrm_id WHERE vehdtl.vrm_grp_id = :vrm_grp_id AND veh.company_id = :company_id AND veh.ou_id IN ('".$oc_list."')";
			try{
				$db = $container->db;
				$stmt = $db->prepare($sql2, $prepOpts);
				$stmt->bindParam("company_id", $company_id);
				$stmt->bindParam("vrm_grp_id", $vrm_grp_id);
				$stmt->execute();
				$subquery = $stmt->fetchAll(PDO::FETCH_COLUMN);
				$db = null;
				if($subquery){
					$query_parts = implode("','", $subquery);
					$sql = "SELECT wt.warn_type_code AS warn_type, warn.lat, warn.lng, ROUND(CAST(warn.duration/1000.0 AS FLOAT),2) AS duration, warn.end_spd AS end_spd, ROUND(CAST(warn.hw/10.0 AS FLOAT),1) AS hw, ROUND(CAST(warn.near_hw/10.0 AS FLOAT),1) AS near_hw, warn.start_spd AS start_spd, warn.start_time AS start_time, warn.vehicle_status AS vehStatus, warn.top_spd AS top_spd, media.media_full_id AS video, media.status AS videoReady, drv.name AS driver, veh.vrm_mark_code AS vehicle, oudrv.title AS drvDepartment, ouveh.title AS vehDepartment FROM log_data AS warn INNER JOIN warning_type AS wt ON warn.wt = wt.warn_type_id LEFT JOIN log_data_media AS media ON ( warn.vrm_id = media.vrm_id AND warn.yuwei_alarm_id = media.yuwei_alarm_id AND warn.yuwei_cam_type = media.yuwei_cam_type ) LEFT JOIN vehicle AS veh ON warn.vrm_id = veh.vrm_id LEFT JOIN driver AS drv ON warn.driver_id = drv.driver_id LEFT JOIN org_chart AS oudrv ON oudrv.ou_id = drv.ou_id LEFT JOIN org_chart AS ouveh ON ouveh.ou_id = veh.ou_id WHERE ".$warnFilter." AND warn.vrm_id IN ('".$query_parts."') AND warn.acc_date >= :start_time AND warn.acc_date <= :end_time ORDER BY warn.start_time ASC";
				}
				else{
					$empty = true;
				}
			}
			catch(PDOException $e) {
				$container->logger->error('['.$routename.'] SQL error ( subquery ): [ErrCode=11231] '.$e);
				$returnData = array('message' => 'Fail','code'=>'11231');
				return $response->withJson($returnData,400);
			}
			break;
	}

	if(isset($sql)&&!$empty){
		try{
			$db = $container->db;
			$stmt = $db->prepare($sql, $prepOpts);
			switch ($profile) {
				case 'di':
					$stmt->bindParam("driver_id", $driver_id);
					$stmt->bindParam("company_id", $company_id);
					break;
				case 'vi':
					$stmt->bindParam("vrm_id", $vrm_id);
					$stmt->bindParam("company_id", $company_id);
					break;
			}
			$stmt->bindParam("warn", $warn);
			$stmt->bindParam("start_time", $start_time);
			$stmt->bindParam("end_time", $end_time);
			$stmt->execute();
			$warnData = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$db = null;
			if($warnData){
				if($map == 'googleMap'){
					/*foreach ($warnData as $key => $data) {
						foreach ($data as $key2 => $value) {
							if($value!==null){
								if($key2!=='video'&&$key2!=='videoReady'&&$key2!=='start_time'&&$key2!=='driver'&&$key2!=='vehicle'&&$key2!=='drvDepartment'&&$key2!=='vehDepartment'){
									$warnData[$key][$key2] = (float)$value;
								}
							}
						}
					}
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $warnData);
					return $response->withJson($returnData);*/
					foreach ($warnData as $key => $data) {
						foreach ($data as $key2 => $value) {
							if($value!==null){
								if($key2!=='warn_type'&&$key2!=='video'&&$key2!=='videoReady'&&$key2!=='start_time'&&$key2!=='driver'&&$key2!=='vehicle'&&$key2!=='drvDepartment'&&$key2!=='vehDepartment'){
									$warnData[$key][$key2] = (float)$value;
								}
							}
						}
						$tmplng = (float)$data['lng'];
						$tmplat = (float)$data['lat'];
						$warnData[$key]['gps'] = array($tmplat,$tmplng);
						$warnData[$key]['rawgps'] = array($tmplat,$tmplng);
						unset($warnData[$key]['lat']);
						unset($warnData[$key]['lng']);
					}
					$container->logger->info('['.$routename.'] success.');
					$returnData = array('message' => 'Success','data' => $warnData);
					return $response->withJson($returnData);
				}
				else{
					foreach ($warnData as $key => $data) {
						foreach ($data as $key2 => $value) {
							if($value!==null){
								if($key2!=='video'&&$key2!=='videoReady'&&$key2!=='start_time'&&$key2!=='driver'&&$key2!=='vehicle'&&$key2!=='drvDepartment'&&$key2!=='vehDepartment'){
									$warnData[$key][$key2] = (float)$value;
								}
							}
						}
						$dttmp = new DateTime($warnData[$key]['start_time'],new DateTimeZone($_SESSION['user']->timezone));
						$warnData[$key]['time_utc'] = (float) $dttmp->format('U');
						$tmplng = (float)$warnData[$key]['lng'];
						$tmplat = (float)$warnData[$key]['lat'];
						$warnData[$key]['rawgps'] = array($tmplat,$tmplng);
					}
					$tmpwarndata = $warnData;
					foreach ($warnData as $key1 => $data) {
						unset($warnData[$key1]['lat']);
						unset($warnData[$key1]['lng']);
					}
					$points = array();
					$tmpwarndata1 = array_values(array_filter($tmpwarndata,function($var) {return (($var['lat'] != null && $var['lng'] != null)&&($var['lat'] != 0 && $var['lng'] != 0));}));
					$tmpwarndata2 = array_values(array_filter($tmpwarndata,function($var) {return ( $var['lat'] == null || $var['lng'] == null || ($var['lat'] == 0 && $var['lng'] == 0));}));
					$ptarr = [];
					foreach( $tmpwarndata1 as $data ) {
						$pt = $data['lng'] . ',' . $data['lat'];
						array_push($ptarr, $pt);
					}
					$warnchunk = array_chunk($ptarr, 100);
					for ($i=0; $i < count($warnchunk); $i++) {
						$warnchunk[$i] = join(';', $warnchunk[$i]);
					}
					$APIkey = $setting['api']['baiduKey'];
					$path = $setting['api']['baidupath']['geoconv'];
					foreach ( $warnchunk as $key=>$data ) {
						$postData = array(
						    'coords'=>$data,
						    'from'=>1,
						    'to'=>5,
						    'ak'=>$APIkey
						);
						$postData = http_build_query($postData);
						if(($key+1)%50==0){
							sleep(1);
						}
						$ch = curl_init();
						$timeout = 5;
						curl_setopt($ch,CURLOPT_URL,$path);
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
						curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
						curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
						curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
						$result = curl_exec($ch);

						if(!curl_errno($ch)){
							$json = json_decode($result,true);
							if($json['status'] == 0){
							 	$pointpath = $json['result'];
							 	foreach ($pointpath as $key2 => $point) {
							 		$tmppoint = $tmpwarndata1[$key*100+$key2];
							 		$tmppoint['gps'] = array($point['x'],$point['y']);
							 		array_push($points,$tmppoint);
							 	}
							}
							else{
								$errorcurl = true;
								if(isset($json['message'])&&isset($json['status'])){
									$error_msg = "BAIDU_RETURN=".'"'.$json['message'].' ['.$json['status']."]".'"';
								}
								else{
									$error_msg = "BAIDU_RETURN=".'"'.json_encode($json).'"';
								}
								break;
							}
						}
						else{
							$errorcurl = true;
							$error_msg = "BAIDU_CURL_ERROR=".'"'.curl_error($ch).'"';
							break;
						}
						curl_close($ch);
					}
					if(!isset($errorcurl)){
						foreach ($tmpwarndata2 as $empty) {
							if($empty['lng']!==null){
								$emptytmplng = (float)$empty['lng'];
							}
							if($empty['lat']!==null){
								$emptytmplat = (float)$empty['lat'];
							}
							$tmppoint = $empty;
					 		$tmppoint['gps'] = array($emptytmplng,$emptytmplat);
					 		array_push($points,$tmppoint);
						}
						usort($points, function($a, $b) {
						    return $a['time_utc'] <=> $b['time_utc'];
						});
						foreach ($points as $key1 => $data) {
							unset($warnData[$key1]['time_utc']);
							unset($warnData[$key1]['lat']);
							unset($warnData[$key1]['lng']);
						}
						$container->logger->info('['.$routename.'] success.');
						$returnData = array('message' => 'Success','data' => $points);
						return $response->withJson($returnData);
					}
					else{
						$container->logger->error('['.$routename.'] call baidu error: '.$error_msg);
						$returnData = array('message' => 'Success','data' => $warnData);
						return $response->withJson($returnData);
					}
				}
			}
			else{
				$container->logger->info('['.$routename.'] success.');
				$returnData = array('message' => 'Success','data' => []);
				return $response->withJson($returnData);
			}
		}
		catch(PDOException $e) {
			$container->logger->error('['.$routename.'] SQL error: [ErrCode=11231] '.$e);
			$returnData = array('message' => 'Fail','code'=>'11231');
			return $response->withJson($returnData,400);
		}
	}
	else if (!isset($sql)&&$empty) {
		$container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data' => [],'data' => []);
		return $response->withJson($returnData);
	}
	else{
		$container->logger->warning('['.$routename.'] wrong parameter. [ErrCode=11232]');
		$returnData = array('message' => 'Fail','code'=>'11232');
		return $response->withJson($returnData,400);
	}
}