/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:20
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-26 13:33:42
 */

/**
 * @apiDefine SuccessResponse
 *
 *@apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 */

/**
 * @apiDefine ErrorResponse
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx"
 *  }
 */

/**
 * @apiDefine UnauthorizedError
 *
 * @apiError (401) InvalidSession_10004 Unauthorized
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "message": "Unauthorized",
 *      "code": "10004"
 *  }
 */

/**
 * @api {get, post, patch, delete} /api/xxx Not Found
 * @apiName Not Found
 * @apiGroup Exception
 * @apiVersion 1.0.0
 *
 * @apiError (404) HttpError_404 URL not found
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "message": "Not Found",
 *      "code": "404"
 *  }
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-05-23 11:22:13
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-06 16:49:20
 */

/**
 * __fgetcsv
 * 修正原生fgetcsv讀取中文函式
 *
 * @param      resource  $handle  CSV文件檔案
 * @param      int       $length  每一行所讀取的最大資料長度
 * @param      string    $d       資料分隔符號(預設為逗號)
 * @param      string    $e       字串包含符號(預設為雙引號)
 *
 * @return     array  $_csv_data  CSV數據(每行)
 */

/**
 * __consecutiveArray
 * 組合連續數組 e.g [1,2,3,4] => [1-4]
 *
 * @param      array  $arr        原始數組
 *
 * @return     array  $returnArr  重組數組
 */

/**
 * __startWith
 * Check if string starts with substring
 *
 * @param      string  $str         The string
 * @param      string  $begnString  The begin substing for checking
 *
 * @return     boolean              The result of the checking
 */

/**
 * moveUploadedFile
 * Moves the uploaded file to the upload directory and assigns it a unique name to avoid overwriting an existing uploaded file.
 *
 * @param      string                   $directory     The directory
 * @param      \Slim\Http\UploadedFile  $uploadedFile  The uploaded file
 *
 * @return     string                   $filename      The filename of moved file
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:17:04
 */

/**
 * Database connect module - PDO
 * for SQL Server
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:17:13
 */

/**
 * Log module - Monolog
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:17:22
 */

/**
 * Mailing module - PHPMailer
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-27 17:24:29
 */

/**
 * Common variable setting
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-05-21 10:16:42
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-27 17:28:03
 */

						/**
						 * 2 fields
						* Driver Code, Card ID
						*/
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-11 17:01:02
 */

/**
 * @api {get} /api/deviceSet Get Device Data List
 * @apiName DEVICE - GET DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 2.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of devices
 * @apiSuccess {String} data.deviceSn Device SN [md_sn]
 * @apiSuccess {String} data.lastLocUpdate Last GPS update timestamp [last_loc_update_ts]
 * @apiSuccess {Object} data.licence Binded vehicle data
 * @apiSuccess {String} data.licence.licence Licence plate [vrm_mark_code]
 * @apiSuccess {String} data.licence.vrm_id Vehicle id [vrm_id]
 * @apiSuccess {Number} data.lat Latitude [lat]
 * @apiSuccess {Number} data.lng Longitude [lng]
 * @apiSuccess {String} data.status Device status [status]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "deviceSn": "1000-2000-0000-8a01",
 *              "lastLocUpdate": "2017-04-10 14:24:33",
 *              "licence": {
 *                  "licence": "EX196",
 *                  "vrm_id": "28"
 *              },
 *              "lat": 22.3327952,
 *              "lng": 114.2129047,
 *              "status": "I",
 *              "updated_by": "2018-01-12 13:27:42 (ben)",
 *              "version": "2"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10302 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/deviceSet Add Device
 * @apiName DEVICE - ADD DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} md_sn Device SN
 * @apiParam (Request Body) {String} vrm_id Vehicle id
 * @apiParam (Request Body) {String="A","I"} status Device status
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10303 No record affected
 * @apiError (400) InternalError_10304 MySql error
 * @apiError (400) UpdateFailure_10309 MySql error (duplicate key)
 * @apiError (400) UpdateFailure_10310 Binded vehicle
 * @apiError (400) UpdateFailure_10311 Vehicle not exist
 * @apiError (400) InternalError_10317 Add API error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /api/deviceSet Edit Device
 * @apiName DEVICE - EDIT DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} md_sn Device SN
 * @apiParam (Request Body) {String} vrm_id Vehicle id
 * @apiParam (Request Body) {String="A","I"} status Device status
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10305 No record affected
 * @apiError (400) InternalError_10306 MySql error
 * @apiError (400) UpdateFailure_10312 Invalid SN
 * @apiError (400) UpdateFailure_10313 No record affected
 * @apiError (400) UpdateFailure_10314 Vehicle binded
 * @apiError (400) UpdateFailure_10315 Vehicle not exist
 * @apiError (400) InternalError_10316 Delete API error
 * @apiError (400) InternalError_10318 Add API error
 * @apiError (400) UpdateFailure_10319 No record affected
 * @apiError (400) UpdateFailure_10320 No record affected
 * @apiError (400) InternalError_10321 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {delete} /api/deviceSet Delete Device
 * @apiName DEVICE - DELETE DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} md_sn Device SN
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10307 No record affected
 * @apiError (400) InternalError_10308 MySql error
 * @apiError (400) UpdateFailure_10322 Invalid SN
 * @apiError (400) InternalError_10323 Delete API error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /api/licenceAddL Get Licence Plate List (Device Dialog)
 * @apiName DEVICE - GET LICENCE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of vehicles
 * @apiSuccess {String} data.licence Licence plate [vrm_mark_code]
 * @apiSuccess {String} data.vrm_id Vehicle id [vrm_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "licence": "1001-1800-1138-cfac",
 *              "vrm_id": "2337"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10301 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:24
 */

/**
 * @api {get} /api/download/:filename/:type/:data Download File
 * @apiName DOWNLOAD - DOWNLOAD FILE
 * @apiGroup Download
 * @apiVersion 1.0.0
 *
 * @apiParam {String} filename Download filename
 * @apiParam {String="text/csv","application/zip"} type File type
 * @apiParam {String} data System generated filename
 *
 * @apiSuccess {File} - File stream
 *
 * @apiError (400) InternalError_12201 File not exists
 * @apiError (400) ParameterError_12202 Wrong parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-11 15:38:36
 */

/**
 * @api {get} /api/driverSet Get Driver Data List
 * @apiName DRIVER - GET DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of drivers
 * @apiSuccess {String} data.defaultdrv Default driver [is_default]
 * @apiSuccess {Number} data.driverId Driver id [driver_id]
 * @apiSuccess {String} data.driverCode Driver code [driver_code]
 * @apiSuccess {Object[]} data.department Department data
 * @apiSuccess {String} data.department.department Department name [title]
 * @apiSuccess {String} data.department.id Department id [ou_id]
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccess {String} data.dobirth Date of birth [dob]
 * @apiSuccess {String} data.phoneHome Home tel. number [phone_home]
 * @apiSuccess {String} data.phoneMobile Mobile phone number [phone_mobile]
 * @apiSuccess {String} data.phoneOffice Office tel. number [phone_office]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccess {Object[]} departments List of departments
 * @apiSuccess {String} departments.department Department name [title]
 * @apiSuccess {String} departments.id Department id [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "defaultdrv": "N",
 *              "department": {
 *                  "department": "Root",
 *                  "id": "5"
 *              },
 *              "dobirth": "1983-10-01",
 *              "driverCode": "90123",
 *              "driverId": 1
 *              "name": "Chan Tai Man",
 *              "phoneHome": "21234567",
 *              "phoneMobile": "91234567",
 *              "phoneOffice": null,
 *              "staffId": "1D0049E425",
 *              "updated_by": "2016-09-27 03:29:20 (SYSTEM)",
 *              "version": "0"
 *          }
 *      ],
 *      "departments": [
 *          {
 *              "department": "8",
 *              "id": "265"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10502 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/driverSet Add Driver
 * @apiName DRIVER - ADD DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driver_code Driver code
 * @apiParam (Request Body) {String} name Driver name
 * @apiParam (Request Body) {String} dob Date of birth
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {String} phone_home Home tel. number
 * @apiParam (Request Body) {String} phone_office Office tel. number
 * @apiParam (Request Body) {String} phone_mobile Mobile phone number
 * @apiParam (Request Body) {Blob} photo Driver avatar
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10523 Driver already exist
 * @apiError (400) InternalError_10524 Call API error (add)
 * @apiError (400) UpdateFailure_10503 No record affected
 * @apiError (400) InternalError_10504 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /api/driverSet Edit Driver
 * @apiName DRIVER - EDIT DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driver_id Driver id
 * @apiParam (Request Body) {String} driver_code Driver code
 * @apiParam (Request Body) {String} name Driver name
 * @apiParam (Request Body) {String} dob Date of birth
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {String} phone_home Home tel. number
 * @apiParam (Request Body) {String} phone_office Office tel. number
 * @apiParam (Request Body) {String} phone_mobile Mobile phone number
 * @apiParam (Request Body) {Blob} photo Driver avatar
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10505 No record affected
 * @apiError (400) InternalError_10506 MySql error
 * @apiError (400) UpdateFailure_10517 MySql error (duplicate key)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {delete} /api/driverSet Delete Driver
 * @apiName DRIVER - DELETE DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driver_id Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10507 No record affected
 * @apiError (400) UpdateFailure_10508 Linked records exist
 * @apiError (400) InternalError_10509 MySql error
 * @apiError (400) InternalError_10525 Call API error (delete)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /api/drvAvatar/:driver_id Get Driver Avatar
 * @apiName DRIVER - GET AVATAR
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiParam {String} driver_id Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Blob} data Driver avatar
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtQAAAJZCAYAAAC"
 *  }
 *
 * @apiError (400) InternalError_10501 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/driverImport Import Driver
 * @apiName DRIVER - IMPORT DRIVER
 * @apiGroup DriverSet
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Content-Type multipart/form-data
 * @apiParam {File} - File stream
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} data Import count
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": 5
 *  }
 *
 * @apiError (400) ImportFailure_10510 Wrong input pattern
 * @apiError (400) ImportFailure_10511 Upload file error
 * @apiError (400) ImportFailure_10512 No record affected
 * @apiError (400) ImportFailure_10513 Read CSV fail
 * @apiError (400) ImportFailure_10514 MySql error
 * @apiError (400) ImportFailure_10515 MySql error (duplicate key)
 * @apiError (400) ImportFailure_10518 Empty CSV file
 * @apiError (400) ImportFailure_10519 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10520 Department not exist
 * @apiError (400) ImportFailure_10521 Driver already exist
 * @apiError (400) ImportFailure_10522 No record affected in Yuwei DB
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [1,3,6,8,20]
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

						/**
						 * 8 fields
						* Name, driver code, staff card id (optional),  phone home (optional), phone mobile (optional), phone office (optional), date of birth (optional), department
						*/
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-07 18:25:03
 */

/**
 * @api {get} /api/drivergrpSet Get Driver Group Data List
 * @apiName DRIVER - GET DRIVER
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of driver groups
 * @apiSuccess {Number} data.drivergrpId Driver group ID [drv_grp_id]
 * @apiSuccess {Object[]} data.department Department data
 * @apiSuccess {String} data.department.department Department name [title]
 * @apiSuccess {String} data.department.id Department ID [ou_id]
 * @apiSuccess {String} data.groupDesc Driver group description [grp_descpt]
 * @apiSuccess {String} data.groupName Driver group name [grp_alias]
 * @apiSuccess {Object[]} data.driverBelong Driver data belongs to group
 * @apiSuccess {String} data.driverBelong.name Driver name [name]
 * @apiSuccess {String} data.driverBelong.id Driver ID [driver_id]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccess {Object[]} departments List of departments
 * @apiSuccess {String} departments.department Department name [title]
 * @apiSuccess {String} departments.id Department ID [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "drivergrpId": 4,
 *              "department": {
 *                  "department": "Root",
 *                  "id": "5"
 *              },
 *              "groupDesc": "Driver Group B",
 *              "groupName": "DRV_GRP_B",
 *              "driverBelong": [
 *                  {
 *                      "name": "6666",
 *                      "id": "5"
 *                  }
 *              ],
 *              "updated_by": "2016-09-27 03:29:20 (SYSTEM)",
 *              "version": "0"
 *          }
 *      ],
 *      "departments": [
 *          {
 *              "department": "8",
 *              "id": "265"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10402 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/drivergrpSet Add Driver Group
 * @apiName DRIVERGRP - ADD DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} grp_alias Driver group name
 * @apiParam (Request Body) {String} grp_descpt Driver group description
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {Object[]} driverBelong Drivers belong to group
 * @apiParam (Request Body) {String} driverBelong.id Driver id
 * @apiParam (Request Body) {String} driverBelong.name Driver name
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10403 No record affected
 * @apiError (400) InternalError_10404 MySql error
 * @apiError (400) UpdateFailure_10411 MySql error (duplicate key)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /api/drivergrpSet Edit Driver Group
 * @apiName DRIVERGRP - EDIT DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} drv_grp_id Driver group id
 * @apiParam (Request Body) {String} grp_alias Driver group name
 * @apiParam (Request Body) {String} grp_descpt Driver group description
 * @apiParam (Request Body) {String} ou_id Deaprtment id
 * @apiParam (Request Body) {Object[]} driverBelong Drivers belong to group
 * @apiParam (Request Body) {String} driverBelong.id Driver id
 * @apiParam (Request Body) {String} driverBelong.name Driver name
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10405 No record affected
 * @apiError (400) InternalError_10406 MySql error
 * @apiError (400) UpdateFailure_10412 MySql error (duplicate key)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {delete} /api/drivergrpSet Delete Driver Group
 * @apiName DRIVERGRP - DELETE DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} drv_grp_id Driver group id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_10407 No record affected
 * @apiError (400) UpdateFailure_10408 Link records exist
 * @apiError (400) UpdateFailure_10409 MySql error
 * @apiError (400) InternalError_10410 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /api/drivergrpAddL Get Driver List (Driver Group Dialog)
 * @apiName DRIVERGRP - GET DRIVER
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of drivers
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccess {String} data.id Driver id [driver_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "name": "666",
 *              "id": "2337"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10401 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/drivergrpImport Import Driver Group
 * @apiName DRIVERGRP - IMPORT DRIVER GRP
 * @apiGroup DriverGrpSet
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Content-Type multipart/form-data
 * @apiParam {File} - File stream
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} add_group_count Group import count
 * @apiSuccess {Number} add_grpdriver_count Group driver import count
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "add_group_count": 5,
 *      "add_grpdriver_count": 5
 *  }
 *
 * @apiError (400) ImportFailure_10413 Empty CSV file
 * @apiError (400) ImportFailure_10414 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10415 Wrong input pattern
 * @apiError (400) ImportFailure_10416 Department not exist
 * @apiError (400) ImportFailure_10417 Read CSV fail
 * @apiError (400) ImportFailure_10418 Upload file error
 * @apiError (400) ImportFailure_10419 Driver Group not exist
 * @apiError (400) ImportFailure_10420 Driver not exist
 * @apiError (400) ImportFailure_10421 No record affected
 * @apiError (400) ImportFailure_10422 MySql error (duplicate key)
 * @apiError (400) InternalError_10423 MySql error
 * @apiError (400) ImportFailure_10424 Duplicate group name
 * @apiError (400) ImportFailure_10425 Duplicate driver in one group
 * @apiError (400) ImportFailure_10426 File not sorted
 * @apiError (400) ImportFailure_10427 Groups not added
 * @apiError (400) ImportFailure_10428 Vehicles not added
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [1,3,6,8,20]
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:38
 */

/**
 * @api {get} /api/heartbeat Maintain Session
 * @apiName HEARTBEAT
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 202 Accepted
 *  {
 *      "message": "Accepted"
 *  }
 *
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-14 18:32:38
 */

/**
 * @api {get} /api/liveLocation/:map Get Live Location
 * @apiName LIVELOCATION
 * @apiGroup LiveLocation
 * @apiVersion 1.0.0
 *
 * @apiParam {String="googleMap","baiduMap"} map Map type
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of vehicle's live location
 * @apiSuccess {String} data.brand Vehicle brand [brand]
 * @apiSuccess {String} data.model Vehicle model [model]
 * @apiSuccess {String} data.department Vehicle department name [title]
 * @apiSuccess {String} data.driver Vehicle current driver data [name,title]
 * @apiSuccess {String} data.last_loc_update_ts Last GPS update timestamp (last_loc_update_ts)
 * @apiSuccess {String} data.last_loc_update_ts_utc Last GPS update timestamp millionseconds (last_loc_update_ts)
 * @apiSuccess {Number} data.lat Latitude [lat]
 * @apiSuccess {Number} data.lng Longitude [lng]
 * @apiSuccess {String} data.licence Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.runStatus Vehicle running status (GPS) [last_loc_update_ts]
 * @apiSuccess {String} data.sn Vehicle device sn [md_sn]
 * @apiSuccess {String} data.type Vehicle type [veh_type_code]
 * @apiSuccess {Object[]} dataCnt Vehicle running status (GPS) count
 * @apiSuccess {Number} dataCnt.offline Count for offline (1-4 days) [last_loc_update_ts]
 * @apiSuccess {Number} dataCnt.offlinegt Count for offline (>4 days) [last_loc_update_ts]
 * @apiSuccess {Number} dataCnt.online Count for online (<24 hours) [last_loc_update_ts]
 * @apiSuccess {Object[]} deviceCnt Vehicle device status count
 * @apiSuccess {Number} deviceCnt.A Count for active [status]
 * @apiSuccess {Number} deviceCnt.I Count for inactive [status]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "brand": "Honda",
 *              "department": "lv1 u4",
 *              "driver": null,
 *              "last_loc_update_ts": "2019-03-20 09:18:31",
 *              "last_loc_update_ts_utc": 1553044711000,
 *              "lat": 22.26263333333333,
 *              "licence": "GS-Tester-A-0762",
 *              "lng": 114.25042,
 *              "model": "Freed",
 *              "runStatus": "online",
 *              "sn": "1001-1800-0762-d48c",
 *              "status": "A",
 *              "type": "OTHERS_DEFAULT"
 *          }
 *      ],
 *      "dataCnt": {
 *          "offline": 0,
 *          "offlinegt": 483,
 *          "online": 2
 *      },
 *      "deviceCnt": {
 *          "A": 404,
 *          "I": 81
 *      }
 *  }
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [
 *         {
 *              "brand": "Honda",
 *              "department": "lv1 u4",
 *              "driver": null,
 *              "last_loc_update_ts": "2019-03-20 09:18:31",
 *              "last_loc_update_ts_utc": 1553044711000,
 *              "lat": null,
 *              "licence": "GS-Tester-A-0762",
 *              "lng": null,
 *              "model": "Freed",
 *              "runStatus": "online",
 *              "sn": "1001-1800-0762-d48c",
 *              "status": "A",
 *              "type": "OTHERS_DEFAULT"
 *          }
 *      ],
 * 		"dataCnt": {
 *          "offline": 0,
 *          "offlinegt": 483,
 *          "online": 2
 *      },
 *      "deviceCnt": {
 *          "A": 404,
 *          "I": 81
 *      }
 *  }
 * @apiError (400) RequestError_10101 Baidu Call error
 * @apiError (400) InternalError_10102 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-08-14 18:30:18
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-22 17:49:55
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-23 13:14:47
 */

/**
 * @api {get} /api/loginbanner/:comp/:lang Pre-Login Prompt
 * @apiName PRELOGIN - BANNER
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiParam {String} comp Company code
 * @apiParam {String="en","zh-cn","zh-tw"} lang Language
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {String} data Prompt message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": "The computing resources that you are going to access..."
 *  }
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) InternalError_10003 MySql error
 * @apiUse ErrorResponse
 */

/**
 * @api {post} /api/login Login
 * @apiName LOGIN
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} appVersion Application version
 * @apiParam (Request Body) {String} company_code Company code
 * @apiParam (Request Body) {String} username Username
 * @apiParam (Request Body) {String} password Password
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) LoginFailed_10001 Login failed
 * @apiError (400) ApplicationError_10002 Wrong app version
 * @apiError (400) InternalError_10003 MySql error
 * @apiError (400) InternalError_10013 Updata time failed
 * @apiError (400) LoginFailed_10014 Account locked
 * @apiError (400) LoginFailed_10028 Password expired
 * @apiError (400) LoginFailed_10029 First time login
 * @apiError (400) LoginFailed_10031 Inactive account

 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": "userA"
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /api/logout Logout
 * @apiName LOGOUT
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:49
 */

/**
 * @api {get} /api/mailNotifySet Get Email Notification List
 * @apiName MAILNOTIFY - GET MAILNOTIFY
 * @apiGroup MailNotifySet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of notification item
 * @apiSuccess {String} data.notifyItem Notification item [notify_item]
 * @apiSuccess {String} data.notifyItemId Notification item id [mail_notify_id]
 * @apiSuccess {Array[]} data.notifyEmail Notification receiver [notify_email]
 * @apiSuccess {String} data.status Notification status [status]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "notifyEmail": ["aa@testing.com", "bb@testing.com", "cc@testing.com"],
 *              "notifyItem": "veh_offline_report",
 *              "notifyItemId": 1,
 *              "status": "OFF",
 *              "updated_by": "2019-01-18 15:10:38 (zilvia)",
 *              "version": "2"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11901 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /api/mailNotifySet Edit Email Notification
 * @apiName MAILNOTIFY - EDIT MAILNOTIFY
 * @apiGroup MailNotifySet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} mail_notify_id Notification item id
 * @apiParam (Request Body) {Array} notifyEmail Notification receiver
 * @apiParam (Request Body) {String="A","I"} status Notification status
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11902 No record affected
 * @apiError (400) UpdateFailure_11903 MySql error (duplicate key)
 * @apiError (400) InternalError_11904 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /api/mailNotifyStatus Set Email Notification Status
 * @apiName MAILNOTIFY - SET MAILNOTIFY STATUS
 * @apiGroup MailNotifySet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} mail_notify_id Notification item id
 * @apiParam (Request Body) {String="A","I"} status Notification status
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11905 No record affected
 * @apiError (400) UpdateFailure_11906 MySql error (duplicate key)
 * @apiError (400) InternalError_11907 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:33:53
 */

/**
 * @api {get} /api/orgchartSet Get Department List
 * @apiName ORGCHART - GET ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of departments
 * @apiSuccess {String} data.department Department name [title]
 * @apiSuccess {String} data.descpt Department description [descpt]
 * @apiSuccess {String} data.id Department id [ou_id]
 * @apiSuccess {Object[]} data.parentData Parent Department data
 * @apiSuccess {String} data.parentData.parent_id Parent Department id [ou_id]
 * @apiSuccess {String} data.parentData.parent_descpt Parent Department title [title]
 * @apiSuccess {Boolean} data.showFunc Display function
 * @apiSuccess {Object[]} data.children List of children departments data
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "department": "Root"
 *              "descpt": "root"
 *              "id": "5"
 *              "parentData": {
 *                  "parent_id": null,
 *                  "parent_descpt": null
 *              },
 *              "showFunc": false,
 *              "children": [],
 *              "updated_by": "2018-09-24 13:11:32 (admin)",
 *              "version": "1"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11702 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/orgchartSet Add Department
 * @apiName ORGCHART - ADD ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} department Department name
 * @apiParam (Request Body) {String} descpt Department description
 * @apiParam (Request Body) {String} parent_id Parent department id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11703 No record affected
 * @apiError (400) UpdateFailure_11704 MySql error (duplicate key)
 * @apiError (400) InternalError_11705 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /api/orgchartSet Edit Department
 * @apiName ORGCHART - EDIT ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} id Department id
 * @apiParam (Request Body) {String} department Department name
 * @apiParam (Request Body) {String} descpt Department description
 * @apiParam (Request Body) {String} parent_id Parent department id
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11706 No record affected
 * @apiError (400) UpdateFailure_11707 MySql error (duplicate key)
 * @apiError (400) InternalError_11708 MySql error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {delete} /api/orgchartSet Delete Department
 * @apiName ORGCHART - DELETE ORGCHART
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} id Department id
 *
 * @apiSuccess {String} message Status message
 * @apiUse SuccessResponse
 *
 * @apiError (400) UpdateFailure_11709 No record affected
 * @apiError (400) UpdateFailure_11710 Link records exist
 * @apiError (400) InternalError_11711 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /api/orgchartAddLL Get Department List (Organization Chart Dialog)
 * @apiName ORGCHART - GET DEPARTMENTS
 * @apiGroup OrgChartSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of departments
 * @apiSuccess {String} data.parent_descpt Department name [title]
 * @apiSuccess {String} data.parent_id Department id [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "parent_descpt": "8",
 *              "parent_id": "265"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11701 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-19 16:19:11
 */

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
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:34:06
 */

/**
 * @api {post} /api/roster Import roster
 * @apiName ROSTER
 * @apiGroup RosterSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {Boolean=true,false} checkDriver Check if driver exists
 * @apiParam (Request Body) {Boolean=true,false} checkLicPlate Check if licence plate exists
 * @apiParam (Request Body) {String} roster Roster
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Response message from external call
 * @apiSuccess {Number} data.totalRead Total number of import records
 * @apiSuccess {String} data.status Import status
 * @apiSuccess {Object[]} data.result List of update messages
 * @apiSuccess {Object[]} data.result.x Update message for line x
 * @apiSuccess {Number} data.result.x.tripCnt Number of trip updated for line x
 * @apiSuccess {Number} data.result.x.warnCnt Number of warning updated for line x
 * @apiSuccess {String} data.result.x.reason Error message for line x
 * @apiSuccess {String} data.result.x.errCode Error code for line x
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "totalRead": 1,
 *              "status": "fail",
 *              "result": {
 *                  "1": {
 *                      "tripCnt": 0,
 *                      "warnCnt": 0
 *                  }
 *              }
 *          }
 *      ]
 *  }
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "totalRead": 1,
 *              "status": "success",
 *              "result": {
 *                  "1": {
 *                      "reason": "Invalid driver name or driver code.",
 *                      "errCode": "ERR_0003"
 *                  }
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11101 Call server error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:37:47
 */

/**
 * @api {get} /api/hasSession/:company_code/:path Check Session
 * @apiName SESSION - CHECK COMPANY
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data User session data
 * @apiSuccess {String} data.company_name Company name (user belong)
 * @apiSuccess {String} data.department Department name (user belong)
 * @apiSuccess {String} data.fullname User fullname
 * @apiSuccess {Array[]} data.func_code User specify function code
 * @apiSuccess {String} data.lang User specify language
 * @apiSuccess {String} data.map User specify map
 * @apiSuccess {String} data.ou_id Department id (user belong)
 * @apiSuccess {Object[]} data.pwdSetting Company specify password setting (user belong)
 * @apiSuccess {String} data.pwdSetting.char Password minimum length
 * @apiSuccess {String} data.pwdSetting.type Password minimum charater type
 * @apiSuccess {String} data.timezone Company specify timezone (user belong)
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": {
 *          "company_name": "GreenSafety Company (Demo)",
 *          "department": "Root",
 *          "fullname": "Zilvia Kam",
 *          "func_code": ["COMPANY_PROFILE", "DEVICE_MAINT", "DRIVER_GRP_MAINT", "DRIVER_GRP_PROFILE", "DRIVER_MAINT"],
 *          "lang": "en",
 *          "map": "googleMap",
 *          "ou_id": "5",
 *          "pwdSetting": {
 *              "char": "6",
 *              "type": "1"
 *          },
 *          "timezone": "+8:00"
 *      }
 *  }
 *
 * @apiError (400) InvalidSession_10005 Unauthorized
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-19 11:47:15
 */

/**
 * @api {get} /api/getWarnVideo/:licence/:video_id Streaming Video
 * @apiName WARNING - GET VIDEO
 * @apiGroup Streaming
 * @apiVersion 1.0.0
 *
 * @apiParam {String} licence Licence Plate
 * @apiParam {String} video_id Video id
 *
 * @apiSuccess {File} - File stream
 *
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "message": "Fail"
 *  }
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-19 11:57:18
 */

/**
 * @api {get} /api/warnFilter/:filter_type Get Trip Detail Filter List
 * @apiName WARNING - GET FILTER LIST
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="driver","vehicle","driverGrp","vehicleGrp"} filter_type Filter type
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of filter list data
 * @apiSuccess {String} data.licenceId Vehicle id [vrm_id]
 * @apiSuccess {String} data.licence Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.driverId Driver id [driver_id]
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccess {String} data.groupName Driver/Vehicle group name [grp_alias]
 * @apiSuccess {String} data.vehiclegrpId Vehicle group id [vrm_grp_id]
 * @apiSuccess {String} data.drivergrpId Driver group id [drv_grp_id]
 * @apiSuccess {Object[]} data.vehicleBelong List of vehicles belong to group
 * @apiSuccess {String} data.vehicleBelong.id Vehicle id [vrm_id]
 * @apiSuccess {String} data.vehicleBelong.licence Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {Object[]} data.driverBelong List of drivers belong to group
 * @apiSuccess {String} data.id Driver id [driver_id]
 * @apiSuccess {String} data.name Driver name [name]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "licenceId": "2337",
 *              "licence": "1001-1800-1138-cfac"
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "groupName": "123",
 *              "vehiclegrpId": "13",
 *              "vehicleBelong": {
 *                  "id": "1327",
 *                  "licence": "GS-Tester-A-0938"
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "driverId": "11753",
 *              "name": "2223"
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "groupName": "123",
 *              "drivergrpId": "13",
 *              "driverBelong": {
 *                  "id": "11753",
 *                  "name": "2223"
 *              }
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10202 MySql error
 * @apiError (400) ParameterError_10203 Wrong parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/warnTrip/:filter_type Get Trip List
 * @apiName WARNING - GET TRIP LIST
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="driver","vehicle","driverGrp","vehicleGrp"} filter_type Filter type
 * @apiParam (Request Body) {String} start Start date
 * @apiParam (Request Body) {String} end End date
 * @apiParam (Request Body) {String[]} arrayData Vehicle/Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of trip data by vehicle/driver
 * @apiSuccess {String} data.distance Trip distance [drv_distance]
 * @apiSuccess {String} data.drv_name Trip driver name [name]
 * @apiSuccess {String} data.drv_name_ou Driver department [title]
 * @apiSuccess {String} data.duration Trip duration
 * @apiSuccess {String} data.endDate Trip end time [end_time]
 * @apiSuccess {String} data.licence Trip vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.licence_ou Vehicle department [title]
 * @apiSuccess {String} data.startDate Trip start time [start_time]
 * @apiSuccess {String} data.trip_id Trip id [veh_trip_id]
 * @apiSuccess {String} data.type Vehicle type [veh_type_code]
 * @apiSuccess {String} data.vrm_id Vehicle id [vrm_id]
 * @apiSuccess {String} data.driver_id Driver id [driver_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "distance": "0.0",
 *              "drv_name": null,
 *              "drv_name_ou": null,
 *              "duration": "00:43",
 *              "endDate": "2019-03-21 10:36:12",
 *              "licence": "GS-Tester-A-0765",
 *              "licence_ou: "Root",
 *              "startDate": "2019-03-21 09:52:42",
 *              "trip_id": "2856441",
 *              "type": "OTHERS_DEFAULT",
 *              "vrm_id": "955"
 *          }
 *      ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "distance": "0.0",
 *              "drv_name": "aa9a",
 *              "drv_name_ou": "lv2 u6",
 *              "duration": "00:43",
 *              "endDate": "2019-03-21 10:36:12",
 *              "licence": "GS-Tester-A-0765",
 *              "licence_ou: "Root",
 *              "startDate": "2019-03-21 09:52:42",
 *              "trip_id": "2856441",
 *              "type": "OTHERS_DEFAULT",
 *              "driver_id": "2179"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10204 MySql error
 * @apiError (400) ParameterError_10205 Wrong parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/warnTripData/:map/:filter_type Get Trip Detail
 * @apiName WARNING - GET TRIP DATA
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="googleMap","baiduMap"} map Map type
 * @apiParam {String="driver","vehicle","driverGrp","vehicleGrp"} filter_type Filter type
 *
 * @apiParam (Request Body) {String} start Start time
 * @apiParam (Request Body) {String} end End time
 * @apiParam (Request Body) {String} id Vehicle/Driver id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of warning data of trip
 * @apiSuccess {Number} data.duration Warning duration
 * @apiSuccess {Number} data.end_spd Warning end speed
 * @apiSuccess {Number} data.hw Warning headway distance
 * @apiSuccess {Number} data.near_hw Warning nearest headway distance
 * @apiSuccess {Number} data.start_spd Warning start speed
 * @apiSuccess {Number} data.start_time Warning start time
 * @apiSuccess {String} data.start_time_utc Warning start time millionseconds
 * @apiSuccess {Number} data.state Driver action
 * @apiSuccess {Number} data.top_spd Warning top speed
 * @apiSuccess {String} data.video Warning video id
 * @apiSuccess {String} data.videoReady Warning video status
 * @apiSuccess {String} data.warningType Warning type
 * @apiSuccess {Object[]} dataPoint List of warning location data of trip
 * @apiSuccess {Number[]} dataPoint.mark Warning location
 * @apiSuccess {String} dataPoint.warn Warning type
 * @apiSuccess {String} dataPoint.video Warning video id
 * @apiSuccess {String} dataPoint.videoReady Warning video status
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "duration": 1.64,
 *              "end_spd": 35,
 *              "hw": 0,
 *              "near_hw": 0,
 *              "start_spd": 35,
 *              "start_time": "2019-03-21 09:37:35",
 *              "start_time_utc": 1553132255,
 *              "state": 2,
 *              "top_spd": 35,
 *              "video": "2_20190321_093735_c7Eo9Ux",
 *              "videoReady": "N",
 *              "warningType": "PCW"
 *          }
 *      ],
 *      "dataPoint": [
 *          {
 *              "mark": [22.263154999999998, 114.23816666666669],
 *              "time_utc": 1549807138,
 *              "video": null,
 *              "videoReady": null,
 *              "warn": "UFCW"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) RequestError_10206 Baidu Call Error
 * @apiError (400) InternalError_10207 MySql error
 * @apiError (400) ParameterError_10208 Wrong Parameter
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /api/getWarningPath/:map/:trip_id Get Trip Path
 * @apiName WARNING - GET TRIP PATH
 * @apiGroup TripDetail
 * @apiVersion 1.0.0
 *
 * @apiParam {String="googleMap","baiduMap"} map Map type
 * @apiParam {String} trip_id Trip id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Array[]} data List of trip path location
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          [22.26312133560225, 114.23867372697602],
 *          [22.2631266, 114.2385086]
 *      ]
 *  }
 *
 * @apiError (400) RequestError_10209 Baidu/ Google Call Fail
 * @apiError (400) InternalError_10207 Sql error
 * @apiUse ErrorResponse
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *      "message": "Fail",
 *      "data": [
 *          [22.26312133560225, 114.23867372697602],
 *          [22.2631266, 114.2385086]
 *      ]
 *  }
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-28 13:06:17
 */

/**
 * @api {get} /api/vehtripFilterList Get Trip Filter List
 * @apiName VEHICLE TRIP - GET FILTER LIST
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object} data Filter option lists
 * @apiSuccess {Object[]} data.deptList Department option list
 * @apiSuccess {String} data.deptList.id Department id [ou_id]
 * @apiSuccess {String} data.deptList.name Department name [title]
 * @apiSuccess {Object[]} data.drvList Driver option list
 * @apiSuccess {String} data.drvList.id Driver id [driver_id]
 * @apiSuccess {String} data.drvList.name Driver name [name]
 * @apiSuccess {Object[]} data.vehList Vehicle option list
 * @apiSuccess {String} data.vehList.id Vehicle id [vrm_id]
 * @apiSuccess {String} data.vehList.name Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.vehList.ou_id Vehicle department id [ou_id]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": {
 *          "deptList": [
 *              {
 *                  "id": "265",
 *                  "name": "8"
 *              }
 *          ],
 *          "drvList": [
 *              {
 *                  "id": "11753",
 *                  "name": "2223 [Root]"
 *              }
 *          ],
 *          "vehList": [
 *              {
 *                  "id": "2337",
 *                  "name": "1001-1800-1138-cfac [Root]",
 *                  "ou_id": "5"
 *              }
 *          ]
 *      }
 *  }
 *
 * @apiError (400) InternalError_11801 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/queryVehTrip Get Trip Data
 * @apiName VEHICLE TRIP - GET TRIP
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} start Start date
 * @apiParam (Request Body) {String} end End date
 * @apiParam (Request Body) {String} drvid Driver id
 * @apiParam (Request Body) {String} vehid Vehicle id
 * @apiParam (Request Body) {String} vehdept Vehicle department
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of trip data
 * @apiSuccess {String} data.driver Driver name [name]
 * @apiSuccess {String} data.drvDepart Driver department [title]
 * @apiSuccess {String} data.drvId Driver id [driver_id]
 * @apiSuccess {String} data.start_time Start time [start_time]
 * @apiSuccess {String} data.end_time End time [end_time]
 * @apiSuccess {String} data.tripId Trip id [veh_trip_id]
 * @apiSuccess {String} data.vehicle Vehicle licence plate [vrm_mark_code]
 * @apiSuccess {String} data.vehDepart Vehicle department [title]
 * @apiSuccess {String} data.updated_by Last updated information [update_ts, update_user]
 * @apiSuccess {String} data.version Data version [version]
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "driver": "28",
 *              "drvDepart": "Root",
 *              "drvId": "12193",
 *              "end_time": "2019-03-22 08:32:55",
 *              "start_time": "2019-03-22 08:10:53",
 *              "tripId": 2859915,
 *              "updated_by": "2019-03-22 12:47:32 (zilvia)",
 *              "vehDepart": "lv1 u4",
 *              "vehicle": "GS-Tester-A-0762",
 *              "version": "3"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_11802 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /api/tripDrvUpdate Update Trip Driver
 * @apiName VEHICLE TRIP - UPDATE DRIVER
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} driverId Device SN
 * @apiParam (Request Body) {Number} tripId Vehicle id
 * @apiParam (Request Body) {String} version Data version
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess SuccessResponse:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10803 No record affected
 * @apiError (400) UpdateFailure_10804 MySql error (duplicate key)
 * @apiError (400) InternalError_10805 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/tripDrvImport Import Trip Driver
 * @apiName VEHICLE TRIP - IMPORT DRIVER
 * @apiGroup TripSet
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String[]} tripDrv List of trip driver data (Trip ID, Driver Code)
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} data Import count
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": 1
 *  }
 *
 * @apiError (400) ImportFailure_11806 Some record not updated
 * @apiError (400) ImportFailure_11807 Some driver not exist
 * @apiError (400) ImportFailure_11808 No driver exist in company or department
 * @apiError (400) InternalError_10809 MySql error
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Unauthorized",
 *      "code": 1xxxx,
 *      "data": [1, 3, 4]
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-01 14:47:59
 */

/**
 * @api {post} /api/updateLang Update Language
 * @apiName USER - UPDATE LANG
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} lang Language
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10006 Fail (no row affected)
 * @apiError (400) InternalError_10007 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

/**
 * @api {post} /api/updateMap Update Map
 * @apiName USER - UPDATE MAP
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} map Map
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10008 Fail (no row affected)
 * @apiError (400) InternalError_10009 MySql error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

/**
 * @api {post} /api/updatepw Update Password
 * @apiName PASSWORD - UPDATE PASSWORD
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} password Old password
 * @apiParam (Request Body) {String} newpassword New password
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10010 Fail (no row affected)
 * @apiError (400) ValidationError_10011 Fail (wrong old password)
 * @apiError (400) InternalError_10012 Fail (no user data)
 * @apiError (400) UpdateFailure_10015 Fail (no row affected and add password history fail)
 * @apiError (400) UpdateFailure_10016 New password found in password history
 * @apiError (400) UpdateFailure_10017 Restrict user to change password to only once per day
 * @apiError (400) UpdateFailure_10030 Fail (no user data)
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /preresetpwd/{comp}/{token} Get Preset Password Data
 * @apiName PASSWORD - GET RESET DATA
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam {String} comp Company code
 * @apiParam {String} token Token
 *
 * @apiError (400) RequestError_10021 Password already changed
 * @apiError (400) RequestError_10022 Link has expired
 * @apiError (400) RequestError_10023 Fail to decrypt request link
 * @apiError (400) RequestError_10024 SQL error
 * @apiError (400) RequestError_10025 Retrieve params fail
 * @apiError (400) RequestError_10026 Fail (no user data)
 * @apiError (400) RequestError_10027 Company not match
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

/**
 * @api {post} /requestPwdChange Forget Password
 * @apiName PASSWORD - FORGET PASSWORD
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username Username
 * @apiParam {String} comp Company code
 * @apiParam {String} email Email
 * @apiParam {String} lang Language
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) InternalError_10018 Fail to encrypt request link
 * @apiError (400) InternalError_10019 SQL error
 * @apiError (400) InternalError_10020 Send email fail
 * @apiError (400) InternalError_10032 email not registered
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:34:32
 */

/**
 * @api {get} /userroleSet Get User Role
 * @apiName USERROLE - GET USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Data of user role
 * @apiSuccess {String[]} compFunc Function
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 * 		"message":"Success",
 * 		"data":
 * 		[
 * 			{
 * 				"roleId":4,
 * 				"roleName":"Chun Wo User",
 * 				"updated_by":"2018-10-03 18:28:27 (zilvia)",
 * 				"version":"5",
 * 				"userFunc":["WARNING_MAP","USER_MAINT"]
 * 			},
 * 		],
 * 		"compFunc":
 * 		[
 * 			"COMPANY_PROFILE",
 * 			"DEVICE_MAINT",
 * 			"DRIVER_GRP_MAINT",
 * 			"DRIVER_GRP_PROFILE",
 * 			"DRIVER_MAINT",
 * 			"DRIVER_PROFILE",
 * 			"LIVE_LOCATION",
 * 			"MAIL_NOTIFY_MAINT",
 * 			"ORG_CHART_MAINT",
 * 			"ROSTER_MAINT",
 * 			"TRIP_DRV_IMPORT",
 * 			"USER_MAINT",
 * 			"USER_ROLE_MAINT",
 * 			"VEHICLE_GRP_MAINT",
 * 			"VEHICLE_GRP_PROFILE",
 * 			"VEHICLE_MAINT",
 * 			"VEHICLE_PROFILE",
 * 			"VEHICLE_TRIP_MAINT",
 * 			"VIDEO_BATCH_DOWNLOAD",
 * 			"VRM_MAINT",
 * 			"WARNING_EXPORT",
 * 			"WARNING_MAP"
 * 		]
 * 	}
 *
 * @apiError (400) InternalError_11001 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /userroleSet Add User Role
 * @apiName USERROLE - GET USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} group_name Group name
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} userFunc Editing function
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_11002 Fail (no insert ID)
 * @apiError (400) InternalError_11003 SQL error
 * @apiError (400) UpdateFailure_11010 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /userroleSet Edit User Role
 * @apiName USERROLE - EDIT USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} group_name Group name
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} version Role version
 * @apiParam (Request Body) {String} userFunc Editing function
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_11004 Fail (no row affected)
 * @apiError (400) InternalError_11005 SQL error
 * @apiError (400) UpdateFailure_11011 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {delete} /userroleSet Delete User Role
 * @apiName USERROLE - DELETE USERROLE
 * @apiGroup User Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} group_id Group ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_11006 Fail (no row affected)
 * @apiError (400) UpdateFailure_11007 Fail (has linked record)
 * @apiError (400) UpdateFailure_11008 Fail (SQL execute return false)
 * @apiError (400) InternalError_11009 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-05-31 12:34:35
 */

/**
 * @api {get} /userSet Get User
 * @apiName USER - GET USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of user
 * @apiSuccess {Object} data.department Department Object
 * @apiSuccess {String} data.department.department Name of department
 * @apiSuccess {String} data.department.id Department ID
 * @apiSuccess {String} data.email User email
 * @apiSuccess {String} data.fullName User name
 * @apiSuccess {Object} data.groupname Group information object
 * @apiSuccess {String} data.groupname.group_id Group ID
 * @apiSuccess {String} data.groupname.groupname Group Name
 * @apiSuccess {String} data.lang Language
 * @apiSuccess {String} data.lastLogin Last login timestamp
 * @apiSuccess {String} data.map Map
 * @apiSuccess {Number} data.retryLogin Number of login retry
 * @apiSuccess {String} data.status Account status
 * @apiSuccess {String} data.updated_by Update timestamp
 * @apiSuccess {Number} data.userId User ID
 * @apiSuccess {String} data.username Username
 * @apiSuccess {String} data.version Version
 * @apiSuccess {Object[]} departments Department List Objects
 * @apiSuccess {String} departments.department Department name
 * @apiSuccess {String} departments.id Department ID
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "version":"0",
 *              "userId":1,
 *              "username":"antonio",
 *              "fullName":"Antonio Wong",
 *              "lang":"en",
 *              "map":"googleMap",
 *              "lastLogin":"2018-12-12 14:00:52",
 *              "retryLogin":0,
 *              "status":"A",
 *              "email":null,
 *              "updated_by":"2019-01-14 13:17:05 (SYSTEM)",
 *              "groupname":
 *                  {
 *                      "groupname":"test permission",
 *                      "group_id":"139"
 *                  },
 *              "department":
 *                  {
 *                      "department":"Root",
 *                      "id":"5"
 *                  }
 *          }
 *      ],
 *      "departments": [
 *          {
 *              "department":"lv2 u6",
 *              "id":"49"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10902 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /userSet Add user
 * @apiName USER - ADD USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} username Username
 * @apiParam (Request Body) {String} password Password
 * @apiParam (Request Body) {String} fullname Fullname
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} lang Language
 * @apiParam (Request Body) {String} map Map
 * @apiParam (Request Body) {String} status Status
 * @apiParam (Request Body) {String} email Email
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10903 Fail (no row affected)
 * @apiError (400) InternalError_10904 SQL error
 * @apiError (400) UpdateFailure_10909 Username already exist
 * @apiError (400) UpdateFailure_10910 Add password history fail
 * @apiError (400) UpdateFailure_10911 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /userSet Edit user
 * @apiName USER - EDIT USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} user_id User ID
 * @apiParam (Request Body) {String} fullname Fullname
 * @apiParam (Request Body) {String} group_id Group ID
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} lang Language
 * @apiParam (Request Body) {String} map Map
 * @apiParam (Request Body) {String} status Status
 * @apiParam (Request Body) {String} email Email
 * @apiParam (Request Body) {String} version Version
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10905 Fail (no row affected)
 * @apiError (400) InternalError_10906 SQL error
 * @apiError (400) UpdateFailure_10912 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {delete} /userSet Delete user
 * @apiName USER - DELETE USER
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} user_id User ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10907 Fail (no row affected)
 * @apiError (400) InternalError_10908 SQL errors
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /userAddL Get User Groups and Departments
 * @apiName USER - GET USER GRPS & DEPARTMENTS
 * @apiGroup User Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} group_id Status message
 * @apiSuccess {Object[]} data Group data
 * @apiSuccess {String} data.groupname Group name
 * @apiSuccess {String} data.group_id Group ID
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "groupname":"ADVANCED USER",
 *              "group_id":"138"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10901 SQL errors
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-25 16:36:33
 */

/**
 * @api {get} /vehicleSet Get Vehicle
 * @apiName VEHICLE - GET VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Vehicle list
 * @apiSuccess {Object} data.department Department Information
 * @apiSuccess {String} data.department.department Department name
 * @apiSuccess {String} data.department.id Department ID
 * @apiSuccess {String} data.licence Vehicle licence
 * @apiSuccess {String} data.vehicleId Vehicle ID
 * @apiSuccess {String} data.status Vehicle status
 * @apiSuccess {String} data.updated_by Last update timestamp
 * @apiSuccess {Object} data.vehicle Vehicle object
 * @apiSuccess {String} data.vehicle.vehicle Vehicle name
 * @apiSuccess {String} data.vehicle.vehicle_id Vehicle ID
 * @apiSuccess {String} data.version Version
 * @apiSuccess {Object[]} departments Department List
 * @apiSuccess {String} departments.department Department name
 * @apiSuccess {String} departments.id Department ID
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "vehicleId":10,
 *              "status":"A",
 *              "version":"0",
 *              "licence":"RA8326",
 *              "updated_by":"2016-09-07 17:14:46 (SYSTEM)",
 *              "vehicle":
 *                  {
 *                      "vehicle":null,
 *                      "vehicle_id":null
 *                  },
 *              "department":
 *                  {
 *                      "department":"Root",
 *                      "id":"5"
 *                  }
 *          }
 *      ],
 *      "departments": [
 *          {
 *              "department": "8",
 *              "id": "265"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10802 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 **/

/**
 * @api {post} /vehicleSet Add Vehicle
 * @apiName VEHICLE - ADD VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request body) {String} vrm_mark_code Vehicle mark code
 * @apiParam (Request body) {String} status Vehicle status
 * @apiParam (Request body) {String} vehicle_id Vehicle ID
 * @apiParam (Request body) {String} ou_id Department ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10803 Fail (no row affected)
 * @apiError (400) InternalError_10804 SQL error
 * @apiError (400) UpdateFailure_10810 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /vehicleSet Edit Vehicle
 * @apiName VEHICLE - EDIT VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request body) {String} vrm_id Vehicle ID
 * @apiParam (Request body) {String} vrm_mark_code Vehicle mark code
 * @apiParam (Request body) {String} status Vehicle status
 * @apiParam (Request body) {String} vehicle_id Vehicle ID
 * @apiParam (Request body) {String} version Version
 * @apiParam (Request body) {String} ou_id Department ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10805 Fail (no row affected)
 * @apiError (400) InternalError_10806 SQL error
 * @apiError (400) UpdateFailure_10811 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {delete} /vehicleSet Delete Vehicle
 * @apiName VEHICLE - DELETE VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request body) {String} vrm_id Vehicle ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10807 Fail (no row affected)
 * @apiError (400) UpdateFailure_10808 Fail (has linked record)
 * @apiError (400) InternalError_10809 SQL error
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [1,3,6,8,20]
 *  }
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /vehicleAddL Get Vehicle Type Detail
 * @apiName VEHICLE - GET VEHICLE DTL
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Vehicle list
 * @apiSuccess {String} data.id Vehicle type ID
 * @apiSuccess {String} data.veh_type Vehicle type name
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "id": "80",
 *              "veh_type": "CAR"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10801 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /vehicleImport Import Vehicle Detail
 * @apiName VEHICLE - IMPORT VEHICLE
 * @apiGroup Vehicle Settings
 * @apiVersion 1.0.0
 *
 * @apiParam {File} - File stream
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} data Import count
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": 1
 *  }
 *
 * @apiError (400) ImportFailure_10812 Empty CSV file
 * @apiError (400) ImportFailure_10813 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10814 Wrong pattern
 * @apiError (400) ImportFailure_10815 Department not exist
 * @apiError (400) ImportFailure_10816 Vehicle type not exist
 * @apiError (400) InternalError_10817 Nothing added
 * @apiError (400) ImportFailure_10818 Duplicate key
 * @apiError (400) InternalError_10819 SQL error
 * @apiError (400) ImportFailure_10820 Read CSV fail
 * @apiError (400) ImportFailure_10821 Upload file error
 * @apiError (400) ImportFailure_10822 Licence already exist
 * @apiError (400) ImportFailure_10823 VIN already exist
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [1,3,6,8,20]
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-27 15:35:30
 */

/**
 * @api {get} /vehiclegrpSet Get Vehicle Detail
 * @apiName VEHICLEGRP - GET VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data Vehicle group information
 * @apiSuccess {Object} data.department Department information
 * @apiSuccess {String} data.department.department Department name
 * @apiSuccess {String} data.department.id Department ID
 * @apiSuccess {String} data.groupDesc Group description
 * @apiSuccess {String} data.groupName Group name
 * @apiSuccess {String} data.updated_by Update timestamp
 * @apiSuccess {Object[]} data.vehicleBelong Vehicle member
 * @apiSuccess {String} data.vehicleBelong.id Vehicle ID
 * @apiSuccess {String} data.vehicleBelong.licence Vehicle licence
 * @apiSuccess {String} data.vehiclegrpId Vehicle group ID
 * @apiSuccess {String} data.version Version
 * @apiSuccess {Object[]} departments Department List
 * @apiSuccess {String} departments.department Department name
 * @apiSuccess {String} departments.id Department ID
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 *          {
 *              "vehiclegrpId":1,
 *              "groupName":"VEH_GRP_A",
 *              "groupDesc":"Vehicle Group A",
 *              "updated_by":"2018-09-14 16:57:44 (zilvia)",
 *              "version":"2",
 *              "vehicleBelong": [
 *                  {
 *                      "id":"17",
 *                      "licence":"LE3415"
 *                  }
 *              ],
 *              "department":
 *                  {
 *                      "department":"Root",
 *                      "id":"5"
 *                  }
 *          }
 *      ],
 *      "departments": [
 *          {
 *              "department": "8",
 *              "id": "265"
 *          }
 *      ]
 *  }
 *
 * @apiError (400) InternalError_10702 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /vehiclegrpSet Add Vehicle Detail
 * @apiName VEHICLEGRP - ADD VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} grp_alias Group name
 * @apiParam (Request Body) {String} grp_descp Group description
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} vehicleBelong Vehicle list
 * @apiParam (Request Body) {String} vehicleBelong.id Vehicle ID
 * @apiParam (Request Body) {String} vehicleBelong.licence Vehicle licence
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10703 Fail (no row affected)
 * @apiError (400) InternalError_10704 SQL error
 * @apiError (400) UpdateFailure_10711 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {patch} /vehiclegrpSet Edit Vehicle Detail
 * @apiName VEHICLEGRP - ADD VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} grp_alias Group name
 * @apiParam (Request Body) {String} grp_descp Group description
 * @apiParam (Request Body) {String} ou_id Department ID
 * @apiParam (Request Body) {String} vrm_grp_id Vehicle group ID
 * @apiParam (Request Body) {String} version Version
 * @apiParam (Request Body) {String} vehicleBelong Vehicle list
 * @apiParam (Request Body) {String} vehicleBelong.id Vehicle ID
 * @apiParam (Request Body) {String} vehicleBelong.licence Vehicle licence
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10705 Fail (no row affected)
 * @apiError (400) InternalError_10706 SQL error
 * @apiError (400) UpdateFailure_10712 SQL error (duplicate key)
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * 0@api {delete} /vehiclegrpSet Delete Vehicle Detail
 * @apiName VEHICLEGRP - DELETE VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} vrm_grp_id Group ID
 *
 * @apiSuccess {String} message Status message
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success"
 *  }
 *
 * @apiError (400) UpdateFailure_10707 Fail (no row affected)
 * @apiError (400) UpdateFailure_10708 Fail (has linked record)
 * @apiError (400) UpdateFailure_10709 Fail (SQL execute return false)
 * @apiError (400) InternalError_10710 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {get} /vehiclegrpAddL Get Vehicle List
 * @apiName VEHICLEGRP - GET VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} data Vehicle list
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": [
 * 			{
 * 				"id": "2337",
 * 				"licence": "1001-1800-1138-cfac"
 * 			}
 * 		]
 *  }
 *
 * @apiError (400) InternalError_10701 SQL error
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /vehiclegrpImport Import Vehicle Group
 * @apiName VEHICLEGRP - IMPORT VEHICLE GRP
 * @apiGroup Vehicle Group Settings
 * @apiVersion 1.0.0
 *
 * @apiParam {File} - File stream
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Number} add_group_count Number of group added
 * @apiSuccess {Number} add_vehicle_count Number of vehicle added
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "add_group_count": 10,
 *      "add_vehicle_count": 100
 *  }
 *
 * @apiError (400) ImportFailure_10713 Empty CSV file
 * @apiError (400) ImportFailure_10714 Not ASCI or UTF-8
 * @apiError (400) ImportFailure_10715 Wrong pattern
 * @apiError (400) ImportFailure_10716 Department not exist
 * @apiError (400) ImportFailure_10717 Read CSV fail
 * @apiError (400) ImportFailure_10718 Upload file error
 * @apiError (400) ImportFailure_10719 Vehicle group not exist
 * @apiError (400) ImportFailure_10720 License not exist
 * @apiError (400) InternalError_10721 Nothing added
 * @apiError (400) ImportFailure_10722 Duplicate key
 * @apiError (400) InternalError_10723 SQL error
 * @apiError (400) ImportFailure_10724 Duplicate group name
 * @apiError (400) ImportFailure_10725 Duplicate driver in one group
 * @apiError (400) ImportFailure_10726 File not sorted
 * @apiError (400) ImportFailure_10727 Some group not added
 * @apiError (400) ImportFailure_10728 Some veh not added
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "message": "Fail",
 *      "code": "1xxxx",
 *      "data": [1,3,6,8,20]
 *  }
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-17 17:57:59
 */

/**
 * @api {get} /filterListData Get Filter List Data
 * @apiName EXPORT WARNING DATA - GET FILTER LIST DATA
 * @apiGroup WarnDataExport
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object} data List of filter list
 * @apiSuccess {Object[]} data.brandList List of vehicle brand
 * @apiSuccess {String} data.brandList.brand Vehicle brand
 * @apiSuccess {Object[]} data.deptList List of department
 * @apiSuccess {String} data.deptList.id ID of the department
 * @apiSuccess {String} data.deptList.name Name of the department
 * @apiSuccess {String} data.deptList.parent Parent of the department
 * @apiSuccess {Object[]} data.deptList.children Children of the department
 * @apiSuccess {String} data.deptList.children.id Children ID
 * @apiSuccess {String} data.deptList.children.name Children name
 * @apiSuccess {String} data.deptList.children.parent Parent ID
 * @apiSuccess {Object[]} data.drvGrp List of driver group
 * @apiSuccess {String} data.drvGrp.id ID of the driver group
 * @apiSuccess {String} data.drvGrp.name Name of the driver group
 * @apiSuccess {Object[]} data.drvList List of driver
 * @apiSuccess {String} data.drvList.grp_id Driver group ID the driver belongs
 * @apiSuccess {String} data.drvList.id ID of of the driver group
 * @apiSuccess {String} data.drvList.name Name of the driver group
 * @apiSuccess {String} data.drvList.ou_id Department ID the driver belongs
 * @apiSuccess {Object[]} data.modelList List of vehicle model
 * @apiSuccess {String} data.modelList.model Vehicle model
 * @apiSuccess {Object[]} data.vehGrp List of vehicle group
 * @apiSuccess {String} data.vehGrp.id ID of the vehicle group
 * @apiSuccess {String} data.vehGrp.name Name of the vehicle group
 * @apiSuccess {Object[]} data.vehList List of vehicle
 * @apiSuccess {String} data.vehList.brand Brand of the vehicle
 * @apiSuccess {String} data.vehList.grp_id Vehicle group ID the vehicle belongs
 * @apiSuccess {String} data.vehList.id ID of the vehicle
 * @apiSuccess {String} data.vehList.model Model of the vehicle
 * @apiSuccess {String} data.vehList.name Name of the vehicle
 * @apiSuccess {String} data.vehList.ou_id Department ID the vehicle belongs
 * @apiSuccess {String} data.vehList.type_id Vehicle type
 * @apiSuccess {Object[]} data.vehtypeList List of vehicle type
 * @apiSuccess {String} data.vehtypeList.id ID of the vehicle type
 * @apiSuccess {String} data.vehtypeList.name Name of the vehicle type
 * @apiSuccess {Object[]} data.wtList List of warning type
 * @apiSuccess {String} data.wtList.id ID of warning type
 * @apiSuccess {String} data.wtList.name Name of warning type
 * @apiSuccess {String} data.wtList.parent Parent of warning type
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "data": {
 *          "brandList": {
 *              "brand": "123"
 *          },
 *          "deptList": [
 *               {
 *                  "id":"5",
 *                  "name":"Root",
 *                  "parent":null,
 *                  "children": [
 *                     {
 *                          "id":"7",
 *                          "name":"lv1 u1",
 *                          "parent":"5",
 *                          "children": [
 *                              {
 *                                  "id":"449",
 *                                  "name":"ant",
 *                                  "parent":"7"
 *                              }
 *                          ]
 *                      }
 *                  ]
 *              }
 *          ],
 *          "drvGrp": [
 *              {
 *                  "id":"197",
 *                  "name":"CSV Testing"
 *              }
 *          ],
 *          "drvList": [
 *              {
 *                  "id":"11753",
 *                  "name":"2223 [Root]",
 *                  "ou_id":"5",
 *                  "grp_id":null
 *              }
 *          ],
 *          "modelList": [
 *              {
 *                  "model":"132"
 *              }
 *          ],
 *          "vehGrp": [
 *              {
 *                  "id": "123",
 *                  "name": "123"
 *              }
 *          ],
 *          "vehList": [
 *              {
 *                  "id":"2337",
 *                  "name":"1001-1800-1138-cfac [Root]",
 *                  "ou_id":"5",
 *                  "brand":"Test",
 *                  "model":"Car",
 *                  "type_id":"1",
 *                  "grp_id":null
 *              }
 *          ],
 *          "vehtypeList": [
 *              {
 *                  "id":"2",
 *                  "name":"CAR"
 *              }
 *          ],
 *          "wtList": [
 *              {
 *                  "id":"2",
 *                  "name":"PCW",
 *                  "parent":null
 *              }
 *          ]
 *      }
 *  }
 *
 * @apiError (400) InternalError_12101 SQL error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */

/**
 * @api {post} /api/warningRawData Get Warning Data
 * @apiName EXPORT WARNING DATA - GET RAW WARNING DATA
 * @apiGroup WarnDataExport
 * @apiVersion 1.0.0
 *
 * @apiParam (Request Body) {String} startDate Start date
 * @apiParam (Request Body) {String} endDate End date
 * @apiParam (Request Body) {String} lang Language
 * @apiParam (Request Body) {String} dataFilename Warning data filename
 * @apiParam (Request Body) {String} [wt]
 * @apiParam (Request Body) {String} [driverTag]
 * @apiParam (Request Body) {String} [driver]
 * @apiParam (Request Body) {String} [vehicle]
 * @apiParam (Request Body) {String} [duration]
 * @apiParam (Request Body) {String} [startSpd]
 * @apiParam (Request Body) {String} [endSpd]
 * @apiParam (Request Body) {String} [topSpd]
 * @apiParam (Request Body) {String} [hw]
 * @apiParam (Request Body) {String} [nearHW]
 * @apiParam (Request Body) {String} [state]
 * @apiParam (Request Body) {String} [stateFlag]
 * @apiParam (Request Body) {String} [video]
 * @apiParam (Request Body) {String} [runDistance]
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {String} url URL for download file
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "url": "http://dgdsweb04/api/download/V2FybmluZ0RhdGFfMjAxOTAzMjE%3D/csv/L3RtcC9kYXRhYjJVbjlG"
 *  }
 *
 * @apiError (400) InternalError_12102 Cannot create file
 * @apiError (400) InternalError_12103 SQL error
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */
/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-21 16:07:13
 */

/**
 * @api {post} /api/getVideoArchive Get Warning Video Archive
 * @apiName VIDEO DOWNLOAD - GET VIDEO ARCHIVE
 * @apiGroup WarnVideoBatch
 * @apiVersion 1.0.0
 *
 * @apiParam {String} archiveFilename Archive filename
 * @apiParam {String} videoPrefix Video filename prefix
 * @apiParam {Array[]} videoArray List of video id
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {String} url URL for download file
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "message": "Success",
 *      "url": "http://dgdsweb04/api/download/eXl5/zip/L3RtcC92aWRlb0FyY2hpdmVLRWZsY3U%3D"
 *  }
 *
 * @apiError (400) InternalError_12001 Cannot create zip file
 * @apiError (400) RequestError_12002 Incorrect video ID
 * @apiError (400) InternalError_12003 MongoDB error
 * @apiError (400) RequestError_12004 Empty result or out of range
 *
 * @apiUse ErrorResponse
 * @apiUse UnauthorizedError
 */