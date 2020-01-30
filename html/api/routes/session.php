<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-06-06 11:37:47
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

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
$app->get('/hasSession/{company_code}/{path}', 'hasSession')->setName('SESSION - CHECK COMPANY');

function hasSession (Request $request, Response $response, array $args){
    global $app;
    $container = $app->getContainer();
    $setting = $container->get('settings');
    $prepOpts = $setting['db']['prepOpts'];
    $routename = $request->getAttribute('route')->getName();
    $container->logger->debug('['.$routename.'] START');

    $company_code = $args['company_code'];
    $path = $args['path'];
    $container->logger->info('['.$routename.'] parameters:', array('company_code'=>$company_code,'path'=>$path));

	if($_SESSION['user']->company_code==$company_code){
        $data = clone $_SESSION['user'];
        unset($data->group_id);
        unset($data->user_id);
        unset($data->username);
        unset($data->company_code);
        unset($data->company_id);
        unset($data->oc_list);
        unset($data->compFunc);
        unset($data->departments);
        $container->logger->info('['.$routename.'] success.');
		$returnData = array('message' => 'Success','data'=>$data);
        return $response->withJson($returnData);
    }
    else{
        $container->logger->warning('['.$routename.'] wrong company_code. [ErrCode=10005]');
        session_unset();
    	$returnData = array('message' => 'Unauthorized', 'code' => '10005');
        return $response->withJson($returnData, 401);
    }
};