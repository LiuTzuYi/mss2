/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:29:10
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name stPersist
 * @requires smart-table
 * @restrict AE
 * @description
 *   Save table configuration and status
 *
 * @example
 * <div st-persist="table-id" st-table="collectionDisplay" st-safe-src="actCollection" st-filtered="actCollectionFiltered">
 */
angular.module('carSafety').directive('stPersist', function () {
    return {
        require: '^stTable',
        link: function (scope, element, attr, ctrl) {
            //var nameSpace = attr.stPersist;
            //save the table state every time it changes
            var rawtablestate = ctrl.tableState()

            scope.$watch(function () {
                var json = {}
                json.table = attr.stPersist
                json.tablestate = JSON.stringify(ctrl.tableState())
                return json
            }, function (newValue, oldValue) {
                if (newValue !== oldValue){
                    if(newValue.table !== oldValue.table){
                        if(sessionStorage.getItem(newValue.table.split('_full')[0])===null){
                            sessionStorage.setItem(newValue.table.split('_full')[0], JSON.stringify(rawtablestate));
                        }
                        else{
                            var savedState = JSON.parse(sessionStorage.getItem(newValue.table.split('_full')[0]));
                            var tableState = ctrl.tableState();
                            angular.extend(tableState, savedState);
                        }
                    }
                    else{
                        if(newValue.table!==""){
                            sessionStorage.setItem(newValue.table.split('_full')[0], JSON.stringify(rawtablestate));
                        }
                    }
                }
            }, true);

        }
    };
})