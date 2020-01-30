/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:18
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-09-03 15:09:34
*/
/**
 * @api {get} /api/deviceSet Get Device Data List
 * @apiName DEVICE - GET DEVICE
 * @apiGroup DeviceSet
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} message Status message
 * @apiSuccess {Object[]} data List of devices
 * @apiSuccess {String} data.deviceSn Device SN [md_sn]
 * @apiSuccess {String} data.lastLocUpdate Last GPS update timestamp [last_loc_update_ts]
 * @apiSuccess {Object} data.licence Vehicle data
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