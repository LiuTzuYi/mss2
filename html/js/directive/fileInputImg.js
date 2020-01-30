/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:25
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name fileInputImg
 * @restrict A
 * @description
 *   Custom function on change when select image input
 *
 * @attr {Function} file-input-img Selected image on change function
 *
 * @example
 * <input type="file" file-input-img="pathvariable">
 */
angular.module('carSafety').directive('fileInputImg', ['$parse','$timeout','$translate','$document','alertBox', function ($parse,$timeout,$translate,$document,alertBox) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind('change', function () {
                $timeout(function () {
                    var files = element[0].files
                    if(files.length!==0){
                        var checkimg = new RegExp(/^image\/[\w].+$/)
                        var validate = true
                        for(var i=0;i<files.length;i++){
                            if(checkimg.test(files[i].type)==false){
                                validate = false
                                alertBox.titleAlert('warning','notImage')
                                element[0].value = ""
                            }
                        }
                        if(validate==true){
                            var promises = []
                            var avatar
                            var reader = new FileReader();
                            for(var i=0;i<files.length;i++){
                                promises.push(new Promise(function(resolve, reject){
                                    reader.onload = function(event){
                                      resolve(event.target.result);
                                    };
                                    reader.readAsDataURL(files[i])
                                }))
                            }
                            Promise.all(promises).then(function (values){
                                for(var i=0;i<files.length;i++){
                                    avatar = values[i]
                                }
                                $parse(attributes.fileInputImg)
                                .assign(scope,avatar)
                                scope.$apply()
                            });
                        }
                    }
                })
            });
        }
    };
}]);