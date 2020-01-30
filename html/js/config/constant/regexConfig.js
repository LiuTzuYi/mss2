/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:05:26
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Constant
 * @name regexConfig
 * @description
 *   Setup regular expression constant variables and configurations.
 *
 * @property {String} symbolregex Contain symbol pattern
 * @property {RegExp} usernameregex Username pattern
 * @property {RegExp} drivercoderegex Driver code pattern
 * @property {RegExp} passwordregex_1 Password pattern (must contain 1 type of charaters)
 * @property {RegExp} passwordregex_2 Password pattern (must contain 2 type of charaters)
 * @property {RegExp} passwordregex_3 Password pattern (must contain 3 type of charaters)
 * @property {RegExp} passwordregex_4 Password pattern (must contain 4 type of charaters)
 * @property {RegExp} emailregex Email pattern
 * @property {RegExp} filenameregex Filename pattern
 */
angular.module('carSafety').constant('regexConfig', {
	symbolregex: "[\x20-\x2F\x3A-\x40\x56-\x60\x7B-\x7E]",
    usernameregex: /^([0-9|A-Z|a-z|\-|\_|\']+(\.[0-9|A-Z|a-z|\-|\_|\']+)?)$/,
    drivercoderegex: /^([0-9|A-Z|a-z|\-]+||[0-9|A-Z|a-z|\-]+\_\d+)$/,
    passwordregex_1: /^(?=.*((?=.*[0-9])|(?=.*[A-Z])|(?=.*[a-z])|(?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])))[\x21-\x3E\x40-\x7E]{0,}$/,
    passwordregex_2: /^(?=.*((?=.*((?=.*[0-9])(?=.*[A-Z])))|(?=.*((?=.*[0-9])(?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])))|(?=.*((?=.*[0-9])(?=.*[a-z])))|(?=.*((?=.*[A-Z])(?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])))|(?=.*((?=.*[A-Z])(?=.*[a-z])))|(?=.*((?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])(?=.*[a-z])))))[\x21-\x3E\x40-\x7E]{0,}$/,
    passwordregex_3: /^(?=.*((?=.*((?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])))|(?=.*((?=.*[0-9])(?=.*[A-Z])(?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])))|(?=.*((?=.*[0-9])(?=.*[a-z])(?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])))|(?=.*((?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])))))[\x21-\x3E\x40-\x7E]{0,}$/,
    passwordregex_4: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2F\x3A-\x3E\x40\x56-\x60\x7B-\x7E])[\x21-\x3E\x40-\x7E]{0,}$/,
    emailregex: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/,
    filenameregex: /^([\w\_]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d])+?$/,
    licenceplateregex: /^([\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[0-9|A-Z|a-z])+?$/
})