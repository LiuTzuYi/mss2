/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-05-31 16:11:10
*/
(function () {
    'use strict';

    var app = angular.module('angular-baidu-map', []);

    app.directive('baiduMap', ['$window','$timeout', function ($window,$timeout) {
        return {
            restrict: 'A',
            scope: {
                mapReady: '&',
                mapOpts: '='
            },
            transclude: true,
            link: function (scope, element, attrs, nullCtrl, transclude) {
                if(window.BMap){
                    var map = new BMap.Map(element[0],scope.mapOpts);
                    scope.bMap = map;
                    scope.mapReady({map: map});
                    transclude(scope, function(clone){
                        element.append(clone);
                    });
                }
                else{
                    $window.baiduMapLoaded = function () {
                        var map = new BMap.Map(element[0],scope.mapOpts);
                        scope.bMap = map;
                        scope.mapReady({map: map});
                        transclude(scope, function(clone){
                            element.append(clone);
                        });
                    };

                    var script = document.createElement("script");
                    script.src = 'https://api.map.baidu.com/api?'+ attrs.baiduMap + '&callback=baiduMapLoaded';
                    document.body.appendChild(script);
                }
            }
        };
    }]);
})();
