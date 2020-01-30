<?php

/**
 * @Author: Zilvia Kam
 * @Date:   2019-05-23 11:22:13
 * @Last Modified by:   Zilvia Kam
 * @Last Modified time: 2019-09-06 16:49:20
 */

use Slim\Http\UploadedFile;

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
function __fgetcsv(&$handle, $length = null, $d = ",", $e = '"') {
    $d = preg_quote($d);
    $e = preg_quote($e);
    $_line = "";
    $eof=false;
    while ($eof != true) {
    $_line .= (empty ($length) ? fgets($handle) : fgets($handle, $length));
    $itemcnt = preg_match_all('/' . $e . '/', $_line, $dummy);
    if ($itemcnt % 2 == 0){
    $eof = true;
    }
    }
    $_csv_line = preg_replace('/(?: |[ ])?$/', $d, trim($_line));
    $_csv_pattern = '/(' . $e . '[^' . $e . ']*(?:' . $e . $e . '[^' . $e . ']*)*' . $e . '|[^' . $d . ']*)' . $d . '/';
    preg_match_all($_csv_pattern, $_csv_line, $_csv_matches);
    $_csv_data = $_csv_matches[1];
    for ($_csv_i = 0; $_csv_i < count($_csv_data); $_csv_i++) {
    $_csv_data[$_csv_i] = preg_replace("/^" . $e . "(.*)" . $e . "$/s", "$1", $_csv_data[$_csv_i]);
    $_csv_data[$_csv_i] = str_replace($e . $e, $e, $_csv_data[$_csv_i]);
    }
    return empty ($_line) ? false : $_csv_data;
}

/**
 * __consecutiveArray
 * 組合連續數組 e.g [1,2,3,4] => [1-4]
 *
 * @param      array  $arr        原始數組
 *
 * @return     array  $returnArr  重組數組
 */
function __consecutiveArray($arr) {
    asort($arr);
    $previous = null;
    $result = array();
    $consecutiveArray = array();
    foreach($arr as $idx => $number) {
        if($idx==0){
            $consecutiveArray[] = $number;
        }
        else{
            if ($number == $previous + 1) {
                $consecutiveArray[] = $number;
            }
            else {
                $result[] = $consecutiveArray;
                $consecutiveArray = array($number);
            }
        }
        $previous = $number;
    }
    $result[] = $consecutiveArray;
    $returnArr = array();
    foreach($result as $range) {
        if(count($range)>1){
            $first = reset($range);
            $last = end($range);
            array_push($returnArr,$first."-".$last);
        }
        else{
            array_push($returnArr,reset($range));
        }
    }
    return $returnArr;
}

/**
 * __startWith
 * Check if string starts with substring
 *
 * @param      string  $str         The string
 * @param      string  $begnString  The begin substing for checking
 *
 * @return     boolean              The result of the checking
 */
function __startWith($str, $begnString) {
    $len = strlen($begnString);
    return (substr($str, 0, $len) === $begnString);
}

function request_get_range($range){
    $arr = array();
    if(preg_match('/^bytes\=\d*\-\d*(,\d*-\d*)*$/', $range)){
        $range = explode(',', substr($range, 6))[0];
        $parts = explode('-', $range);
        $start = intval($parts[0]);
        array_push($arr,$start);
        if($parts[1]&&!is_null($parts[1])){
            $end = intval($parts[1]);
        }
        if($end){
            array_push($arr,$end);
        }
        else{
            array_push($arr,null);
        }
    }
    else{
        array_push($arr,0);
        array_push($arr,null);
    }
    return $arr;
}

function request_partial_response($content, $range){
    $size = strlen($content);
    $start = $range[0];
    $end = $range[1];
    if(is_null($end)){
        $end = $size - $start - 1;
    }
    $end = min($end, $size - 1);
    $length = $end - $start + 1;
    $bytes = substr($content,$start,$length);
    return $bytes;
}

/**
 * moveUploadedFile
 * Moves the uploaded file to the upload directory and assigns it a unique name to avoid overwriting an existing uploaded file.
 *
 * @param      string                   $directory     The directory
 * @param      \Slim\Http\UploadedFile  $uploadedFile  The uploaded file
 *
 * @return     string                   $filename      The filename of moved file
 */
function moveUploadedFile($directory, UploadedFile $uploadedFile, $prefix = null) {
    $date = date("YmdHis");
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    // Ramdom filename with date
    if(!empty($prefix)){
        $basename = $prefix.'-'.$date.'-'.bin2hex(random_bytes(8));
    }
    else{
        $basename = $date.'-'.bin2hex(random_bytes(8));
    }
    $filename = sprintf('%s.%0.8s', $basename, $extension);
    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
    return $filename;
}