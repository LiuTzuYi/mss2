/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:29
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:15:21
*/

'use strict';
 /**
 * @memberof carSafety
 * @ngdoc Config
 * @name angular-translate
 * @requires pascalprecht.translate
 * @description
 *   Setup configuration for [Angular Translate](https://angular-translate.github.io/) module.
 */
angular.module('carSafety').config(['$translateProvider',
    /**
     * @memberof angular-translate
     * @function config
     * @param  {Provider} $translateProvider pascalprecht.translate module's provider
     */
    function ($translateProvider) {
        // set language file
        $translateProvider.useStaticFilesLoader({
                prefix: 'js/lang/locale-',
                suffix: '.json'
            })
            .registerAvailableLanguageKeys(['en', 'zh-cn', 'zh-tw'], {
                'en_*': 'en',
                'zh-CN': 'zh-cn',
                'zh-HK': 'zh-tw',
                'zh-TW': 'zh-tw',
                'zh-tw': 'zh-tw',
                'zh_*': 'zh-tw',
                '*': 'en'
            })
            .determinePreferredLanguage();
        // escapes HTML in the values of the interpolation parameters
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
    }
]);