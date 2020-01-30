<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:20
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-08-26 13:33:42
 */
ini_set('max_execution_time', 240);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, PATCH, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

use Slim\Exception\NotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';
date_default_timezone_set('Asia/Hong_Kong');
session_start();

require_once 'config/setup.php';

$app = new \Slim\App(['settings'=>$config]);

$container = $app->getContainer();

require_once 'config/logger.php';
require_once 'config/database.php';
require_once 'config/mailer.php';
require_once 'config/customFunc.php';

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

$app->add(function (Request $request, Response $response, callable $next) {
    global $app;
    $container = $app->getContainer();
    $route = $request->getAttribute('route');

    if (empty($route)) {
        $uri = $request->getUri();
        $path = $uri->getPath();
        $container->logger->warning('[ROUTE] /'.$path.' not exists. [ErrCode=404]');
        $returnData = array('message' => 'Not found', 'code' => '404');
        return $response->withJson($returnData,404);
    }

    $name = $route->getName();
    $timeout = 1800;
    $newtime = time();
    $setting = $container->get('settings');
    $valid = false;

    if(($name != 'LOGIN') && ($name != 'LOGOUT') && ($name != 'PASSWORD - GET RESET DATA') && ($name != 'PASSWORD - FORGET PASSWORD') && ($name != 'PRELOGIN - BANNER') && (strpos($name, 'ADMINPANEL') === false) ){
        $container->logger->debug('[SESSION - CHECK SESSION] START');
        if(isset($_SESSION['user']) && isset($_SESSION['LAST_ACTIVITY']) && ($newtime - $_SESSION['LAST_ACTIVITY'] <= $timeout)){
            if(($name == 'SESSION - CHECK COMPANY')){
                $routeParams = $request->getAttribute('routeInfo')[2];
                if((isset($_SESSION['FLAG'])&&$_SESSION['FLAG']==$routeParams['path'])||(!isset($_SESSION['FLAG'])&&$routeParams['path']!==$setting['updatepwd']['uipath']&&$routeParams['path']!==$setting['resetpwd']['uipath'])){
                    $valid = true;
                }
                else{
                    $container->logger->info('[SESSION - CHECK SESSION] invalid. [ErrCode=10004]');
                }
            }
            else{
                $valid = true;
            }
            if($valid){
                $_SESSION['LAST_ACTIVITY'] = $newtime;
                $container->logger->info('[SESSION - CHECK SESSION] session variable updated.', array('LAST_ACTIVITY'=>$_SESSION['LAST_ACTIVITY']));
                if(($name != 'ORGCHART - ADD ORGCHART') && ($name != 'ORGCHART - EDIT ORGCHART') && ($name != 'ORGCHART - DELETE ORGCHART') && ($name != 'PASSWORD - UPDATE PASSWORD') && ($name != 'USER - UPDATE LANG') && ($name != 'USER - UPDATE MAP') && ($name != 'USER - EDIT USER')){
                    session_write_close();
                }
            }
        }
        else{
            $container->logger->info('[SESSION - CHECK SESSION] timeout. [ErrCode=10004]');
        }
    }
    else{
        $valid = true;
    }

    if(!$valid){
        session_unset();
        $returnData = array('message' => 'Unauthorized', 'code' => '10004');
        return $response->withJson($returnData, 401);
    }

    $response = $next($request, $response);

    if(isset($_SESSION['FLAGDONE'])){
        session_unset();
    }

    return $response;
});

require_once 'routes/session.php';
require_once 'routes/heartbeat.php';
require_once 'routes/login.php';
require_once 'routes/user.php';
require_once 'routes/liveLocation.php';
require_once 'routes/tripDetail.php';
require_once 'routes/tripSet.php';
require_once 'routes/warnDataExport.php';
require_once 'routes/warnVideoBatch.php';
require_once 'routes/download.php';
require_once 'routes/streaming.php';
require_once 'routes/profile.php';
require_once 'routes/CLP-profile.php';
require_once 'routes/vehicleSet.php';
require_once 'routes/vehiclegrpSet.php';
require_once 'routes/driverSet.php';
require_once 'routes/drivergrpSet.php';
require_once 'routes/deviceSet.php';
require_once 'routes/userSet.php';
require_once 'routes/userRoleSet.php';
require_once 'routes/orgChartSet.php';
require_once 'routes/mailnotifySet.php';
require_once 'routes/rosterSet.php';
require_once 'routes/adminpanel.php';
require_once 'routes/liveMonitor.php';

$app->run();
?>
