<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-04-04 17:39:21
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-27 17:24:29
 */

// Slim Framework setting
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = true;
$config['determineRouteBeforeAppMiddleware'] = true;

// Monolog setting
$config['logger']['name'] = 'gst-slim-php';
$config['logger']['level'] = Monolog\Logger::DEBUG;
$config['logger']['path'] = __DIR__ . '/../../../logs/app';

// Application setting
$config['version']['path'] = __DIR__ . '/../../../package.json';

// Host setting
$config['data']['webserver'] = 'http://10.33.22.47';
$config['data']['prd'] = 'http://223.197.178.21';

// Database(SQL Server) setting
$config['db']['host'] = '10.33.22.27';
$config['db']['hostprd'] = '10.33.22.27';
$config['db']['port'] = '1433';
$config['db']['user'] = 'ui';
$config['db']['charset'] = 'UTF-8';
$config['db']['pass']   = 'RDcP9UnXfDmPbwJd';
$config['db']['dbname'] = 'frontend_dev';
$config['db']['prepOpts'] = array(PDO::ATTR_EMULATE_PREPARES => true);

// YUWEI API setting
$config['api']['yuweipath']['host'] = 'http://10.33.22.26:8038';
$config['api']['yuweipath']['hostprd'] = 'http://10.33.22.26:8038';
$config['api']['yuweipath']['addDevice'] = '/api/vehicle/update?';
$config['api']['yuweipath']['editDevice'] = '/api/vehicle/update?';
$config['api']['yuweipath']['deleteDevice'] = '/api/vehicle/remove?';
$config['api']['yuweipath']['addDriver'] = '/api/driverInfo/update?';
$config['api']['yuweipath']['deleteDriver'] = '/api/driverInfo/remove?';
$config['api']['yuweiToken'] = '2935c51f26f473e0';
$config['api']['yuweiParam']['addDevice'] = array('token' => '','vehicleNo' => '','vehicleColor' => '黃色','termNo'=> '','code' => '','gas' => 810000.0,'func' => 16,'photoParam' => 4,'videoParam' => 8,'videoChName' => '{"CH1":"CH1","CH2":"CH2","CH3":"CH3","CH4":"CH4","CH5":"CH5,"CH6":"CH6,"CH7":"CH7,"CH8":"CH8"}','videoRelationCh' => '1,2,3,4,5,6,7,8','watchVideoByFlameout' => 0,'opType' => 0);
$config['api']['yuweiParam']['deleteDevice'] = array('token' => '','vehicleNo' => '');
$config['api']['yuweiParam']['addDriver'] = array('token' => '','companyNo'=>'117440513','driverCode'=>'','driverWorkNumber'=>'','driverName'=>'','sex'=>'男','driverLicence'=>'','identityCard'=>'','password'=>'0','licenseAgency'=>'GST','opType'=>1);
$config['api']['yuweiParam']['deleteDriver'] = array('token' => '', 'driverCode'=>'');
$config['api']['yuweipath']['livehost'] = 'http://10.33.22.26:3003';
$config['api']['yuweipath']['livehostprd'] = 'http://223.197.178.21:3003';
$config['api']['yuweipath']['liveMonitor'] = '/mydemo9/index.html?';

// Google Map API setting
$config['api']['googlepath'] = 'https://roads.googleapis.com/v1/snapToRoads?';
$config['api']['googleKey'] = 'AIzaSyBFFZM0aHlgzT-aL8qXuPT7deIEdDEPqLE';

// Baidu Map API setting
$config['api']['baiduKey'] = '9BDu0lFG2GuMunkgOvDnfYXpf8oGNtF2';
$config['api']['baidupath']['geoconv'] = 'https://api.map.baidu.com/geoconv/v1/?';
$config['api']['baidupath']['trackrectify'] = 'https://api.map.baidu.com/rectify/v1/track?';

// Encryption setting
$config['encrypt']['cipher'] = 'AES-256-CBC';
$config['encrypt']['key'] = base64_encode('GREENSAFETY');
$config['encrypt']['iv'] = '55d0b25e6d28e0e0';

// PHPMailer setting
$config['mailer']['CharSet'] = 'UTF-8';
$config['mailer']['SMTPDebug'] = 2;
$config['mailer']['host'] = 'ud.1025.hk';
$config['mailer']['SMTPAuth'] = true;
$config['mailer']['username'] = 'system@greensafety.com.hk';
$config['mailer']['password'] = 'Abc_1234';
$config['mailer']['SMTPSecure'] = 'tls';
$config['mailer']['port'] = 1025;
$config['mailer']['sender'] = 'no-reply@greensafety.com.hk';
$config['mailer']['SMTPoption'] = array('ssl' => array('verify_peer' => false,'verify_peer_name' => false,'allow_self_signed' => true));
$config['mailer']['Debugoutput'] = 'error_log';

// FTP setting (video)
$config['ftp']['host'] = '10.33.22.26';
$config['ftp']['hostprd'] = '10.33.22.26';
$config['ftp']['port'] = '21';
$config['ftp']['username'] = 'yuweiftp';
$config['ftp']['password'] = 'eUckLCDF8TUCdDuW';

/**
 * Common variable setting
 */
// Enabled Function
$config['data']['userFunc'] = ['LIVE_LOCATION','LIVE_MONITOR','TRIP_DETAIL','TRIP_MAINT', 'TRIP_DRV_IMPORT', 'WARNING_EXPORT', 'VIDEO_BATCH_DOWNLOAD', 'COMPANY_PROFILE','VEHICLE_GRP_PROFILE','VEHICLE_PROFILE','DRIVER_GRP_PROFILE','DRIVER_PROFILE','VEHICLE_GRP_MAINT', 'VEHICLE_MAINT','DRIVER_MAINT','DRIVER_GRP_MAINT','DEVICE_MAINT','USER_MAINT','USER_ROLE_MAINT','ORG_CHART_MAINT','MAIL_NOTIFY_MAINT','ROSTER_MAINT'];
// Warning export headeer setting
$config['data']['exportWarnHeader']['en'] = ['Start Time','End Time','Warning Type','Latitude (WGS84)','Longitude (WGS84)','Duration (s)','Start Speed (kph)','End Speed (kph)','Top Speed (kph)','Rate Of Change (kph/s)','HW (s)','Nearest HW (s)','Driver Action (L: Left Indicator; R: Right Indicator; B: Brakes)','Video Status','Video ID','Dangerous Video (Y: Yes; N: No)','Vehicle','Vehicle Department','Vehicle Group','Vehicle Brand','Vehicle Model','Vehicle Type','Vehicle Run Distance-Within Date Range (KM)','Vehicle Total Run Distance (KM)','Driver','Driver Department','Driver Group'];
$config['data']['exportWarnHeader']['zh-tw'] = ['開始時間','結束時間','警報類型','緯度 (WGS84)','經度 (WGS84)','持續時間 (s)','開始速度 (kph)','結束速度 (kph)','最高速度 (kph)','速度變化 (kph/s)','前車距離 (s)','最近前車距離 (s)','司機行為 (L: 亮起左轉指示燈; R: 亮起右轉指示燈; B: 剎車)','視頻狀態','視頻ID','危險駕駛行為影片 (Y: 是; N: 否)','車輛','車輛部門','車輛分組','車輛品牌','車輛型號','車輛類型','車輛行走里數-日期範圍內 (KM)','車輛總行走里數 (KM)','司機','司機部門','司機分組'];
$config['data']['exportWarnHeader']['zh-cn'] = ['开始时间','结束时间','警报类型','纬度 (WGS84)','经度 (WGS84)','持续时间 (s)','开始速度 (kph)','结束速度 (kph)','最高速度 (kph)','速度变化 (kph/s)','前车距离 (s)','最近前车距离 (s)','司机行为 (L: 亮起左转指示灯; R: 亮起右转指示灯; B: 刹车)','视频状态','视频ID','危险驾驶行为影片 (Y: 是; N: 否)','车辆','车辆部门','车辆分组','车辆品牌','车辆型号','车辆类型','车辆行走里数-日期范围內 (KM)','车辆总行走里数 (KM)','司机','司机部门','司机分组'];
// Vehicle type mapping - Warning Export
$config['data']['vehType'] = '{"OTHERS_DEFAULT": "Others","_CAR": "Car","_VAN": "Van","MINIBUS": "Mini-Bus","_BUS": "Bus","_TRUCK": "Truck","CONCRETE_TRUCK": "Concrete Truck"}';
// Warning type mapping - Warning Export
$config['data']['warningType'] = '{"FCW_L2": "FCW", "LDW_L2": "LDW", "HMW_L2": "HMW", "AAW_L2": "AAW", "ABW_L2": "ABW", "ATW_L2": "ATW", "FDW_L2": "DWW", "CLW_L2": "CLW", "DTW_L2": "DTW", "NDW": "NDW", "YW_L2": "YW"}';
// Enabled warning type
$config['data']['wt'] = ['FCW_L2','LDW_L2','HMW_L2','AAW_L2','ABW_L2','ATW_L2','FDW_L2','CLW_L2','DTW_L2','NDW','YW_L2'];
// Warning count field setting - Profile
$config['data']['fullWarningField'] = ['FCW','FCW_L1','FCW_L2','LDW','LDW_L1','LDW_L2','HMW','HMW_L1','HMW_L2','PCW','PCW_L1','PCW_L2','ZDW','ZDW_L1','ZDW_L2','SSW','BDW','SPW','OHW','AAW','AAW_L1','AAW_L2','ABW','ABW_L1','ABW_L2','ATW','ATW_L1','ATW_L2','FDW','FDW_L1','FDW_L2','CLW','CLW_L1','CLW_L2','SMW','SMW_L1','SMW_L2','DTW','DTW_L1','DTW_L2','DAW','NDW','YW','YW_L1','YW_L2','FMW','EW','RAW','RAW_L1','RAW_L2','LRAW','LRAW_L1','LRAW_L2','RRAW','RRAW_L1','RRAW_L2','LROD','LROD_L1','LROD_L2','RROD','RROD_L1','RROD_L2'];
$config['data']['fullWarningField_CLP'] = ['FCW','FCW_L1','FCW_L2','LDW','LDW_L1','LDW_L2','HMW','HMW_L1','HMW_L2','PCW','PCW_L1','PCW_L2','ZDW','ZDW_L1','ZDW_L2','SSW','BDW','SPW','OHW','AAW','AAW_L1','AAW_L2','ABW','ABW_L1','ABW_L2','ATW','ATW_L1','ATW_L2','SMW','SMW_L1','SMW_L2','DAW','FMW','EW','RAW','RAW_L1','RAW_L2','LRAW','LRAW_L1','LRAW_L2','RRAW','RRAW_L1','RRAW_L2','LROD','LROD_L1','LROD_L2','RROD','RROD_L1','RROD_L2'];
// Safety score field setting - Profile
$config['data']['fullScoreField'] = ['FCW_score','FCW_L1_score','FCW_L2_score','LDW_score','LDW_L1_score','LDW_L2_score','HMW_score','HMW_L1_score','HMW_L2_score','PCW_score','PCW_L1_score','PCW_L2_score','ZDW_score','ZDW_L1_score','ZDW_L2_score','SSW_score','BDW_score','SPW_score','OHW_score','AAW_score','AAW_L1_score','AAW_L2_score','ABW_score','ABW_L1_score','ABW_L2_score','ATW_score','ATW_L1_score','ATW_L2_score','FDW_score','FDW_L1_score','FDW_L2_score','CLW_score','CLW_L1_score','CLW_L2_score','SMW_score','SMW_L1_score','SMW_L2_score','DTW_score','DTW_L1_score','DTW_L2_score','DAW_score','NDW_score','YW_score','YW_L1_score','YW_L2_score','FMW_score','EW_score','RAW_score','RAW_L1_score','RAW_L2_score','LRAW_score','LRAW_L1_score','LRAW_L2_score','RRAW_score','RRAW_L1_score','RRAW_L2_score','LROD_score','LROD_L1_score','LROD_L2_score','RROD_score','RROD_L1_score','RROD_L2_score'];
$config['data']['fullScoreField_CLP'] = ['FCW_score','FCW_L1_score','FCW_L2_score','LDW_score','LDW_L1_score','LDW_L2_score','HMW_score','HMW_L1_score','HMW_L2_score','PCW_score','PCW_L1_score','PCW_L2_score','ZDW_score','ZDW_L1_score','ZDW_L2_score','SSW_score','BDW_score','SPW_score','OHW_score','AAW_score','AAW_L1_score','AAW_L2_score','ABW_score','ABW_L1_score','ABW_L2_score','ATW_score','ATW_L1_score','ATW_L2_score','SMW_score','SMW_L1_score','SMW_L2_score','DAW_score','FMW_score','EW_score','RAW_score','RAW_L1_score','RAW_L2_score','LRAW_score','LRAW_L1_score','LRAW_L2_score','RRAW_score','RRAW_L1_score','RRAW_L2_score','LROD_score','LROD_L1_score','LROD_L2_score','RROD_score','RROD_L1_score','RROD_L2_score'];
//Active cam setting - Live Monitor
$config['data']['camList'] = ['BSD_CAM1','DMS_CAM2','ADAS_CAM3'];
//Dangerous video filtering
$config['data']['dangerVideoFilter'] = "( CASE WHEN warn.danger IS NULL THEN ( CASE WHEN ((warn.wt = 2010001 AND CAST((warn.start_spd - warn.end_spd)/NULLIF(warn.duration,0) AS FLOAT) > 0.0015) OR (warn.wt = 2010003 AND warn.start_spd >= 60 AND warn.hw <= 4) OR (warn.wt = 2010011 AND warn.end_spd >= 20) OR (warn.wt = 2010012 AND warn.end_spd >= 20) OR (warn.wt = 2020001)) THEN 'Y' ELSE 'N' END ) ELSE warn.danger END )";

// Mailing setting (forget password)
$config['data']['mail_subject_zh-cn'] = '忘记密码 - GreenSafety';
$config['data']['mail_subject_zh-tw'] = '忘記密碼 - GreenSafety';
$config['data']['mail_subject_en'] = 'Forgot Password - GreenSafety';
$config['data']['mail_logo'] = __DIR__ . '/../config/mail_templates/logo-header.png';
$config['data']['mail_html_zh-cn'] = __DIR__ . '/../config/mail_templates/forgotpw-cn.html';
$config['data']['mail_html_zh-tw'] = __DIR__ . '/../config/mail_templates/forgotpw-tw.html';
$config['data']['mail_html_en'] = __DIR__ . '/../config/mail_templates/forgotpw-en.html';
$config['data']['mail_text_zh-cn'] = __DIR__ . '/../config/mail_templates/forgotpw-cn.txt';
$config['data']['mail_text_zh-tw'] = __DIR__ . '/../config/mail_templates/forgotpw-tw.txt';
$config['data']['mail_text_en'] = __DIR__ . '/../config/mail_templates/forgotpw-en.txt';

// Pre-login alert setting
/*$config['banner']['test']['default'] = __DIR__ . '/../config/banner_templates/test-en.html';
$config['banner']['test']['en'] = __DIR__ . '/../config/banner_templates/test-en.html';
$config['banner']['test']['zh-tw'] = __DIR__ . '/../config/banner_templates/test-tw.html';
$config['banner']['test']['zh-cn'] = __DIR__ . '/../config/banner_templates/test-cn.html';*/

// Reset Password path setting
$config['updatepwd']['uipath'] = 'updatePwd';
$config['resetpwd']['uipath'] = 'resetPwd';
$config['resetpwd']['linkpath'] = 'reset/password';

// Admin Panel setting
$config['adminpanel']['token'] = '350b1daa012d871cc3eac3aa1e8359bef8754214';

// Admin Panel FTP setting (driver card import)
$config['adminpanel']['drvcard_import']['host'] = '10.33.22.27';
$config['adminpanel']['drvcard_import']['hostprd'] = '10.33.22.27';
$config['adminpanel']['drvcard_import']['port'] = '21';
$config['adminpanel']['drvcard_import']['username'] = 'uploadftp';
$config['adminpanel']['drvcard_import']['password'] = 'XjxJa2wXyP2V8BwS';
$config['adminpanel']['drvcard_import']['ftpdir'] = 'Driver_Card_Import';
$config['adminpanel']['drvcard_import']['fulldir'] = 'C:\Users\Public\Documents\Driver_Card_Import';

// Admin Panel company management setting
$config['adminpanel']['company']['disclaimerdir'] = __DIR__ . '/../config/banner_templates';
?>