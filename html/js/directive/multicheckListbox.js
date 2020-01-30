/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:31
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:28:34
*/

'use strict';
/**
 * @memberof carSafety
 * @ngdoc Directive
 * @name multicheckListbox
 * @restrict A
 * @description
 *   Multiple selected checkbox component with grouping
 *
 * @attr {Object[]} option-list Option list
 * @attr {Object|Object[]} selected-model Selected data
 * @attr {Object} extra-settings Component configuration, see properties
 * @attr {Object} text-option Component text/translation code configuration, see properties
 *
 * @property {Boolean} [hasGroup] Enable grouping -- extra-settings
 * @property {Boolean} [allCheck] Enable select all -- extra-settings
 * @property {Boolean} [search] Enable search filter -- extra-settings
 * @property {String} [grpOptionLabel] Grouping option label field -- extra-settings
 * @property {String} [subOptionLabel] Child option label field -- extra-settings
 * @property {String} [grpOptionId] Grouping option id field -- extra-settings
 * @property {String} [subOptionId] Child option id field -- extra-settings
 * @property {String} [grpOptsubLabel] Child data grouping label -- extra-settings
 * @property {String} [itemLabel] Option label field (without grouping) -- extra-settings
 * @property {String} [itemId] Option id field (without grouping) -- extra-settings
 *
 * @property {String} searchText Search text/translation code -- text-option
 * @property {String} uncheckAllText Uncheck all text/translation code -- text-option
 * @property {String} checkAllText Check all text/translation code -- text-option
 *
 * @example
 * <div multicheck-listbox option-list="optionsList" selected-model="pickList" extra-settings="multicheckSet" text-option="multicheckText"></div>
 */
angular.module('carSafety').directive('multicheckListbox', ['$parse','$timeout','$translate','$document','$filter', function ($parse,$timeout,$translate,$document,$filter) {
    return {
        restrict: 'A',
        templateUrl: '../../view/component/multicheckListbox.html',
        link: function (scope, element, attributes) {
            scope.$watchGroup([attributes.optionList, attributes.selectedModel, attributes.extraSettings, attributes.textOption], function(newValues, oldValues) {
            	scope.optionList = scope.$eval(attributes.optionList)
            	scope.selectedModel = scope.$eval(attributes.selectedModel)
            	scope.extraSettings = scope.$eval(attributes.extraSettings)
            	scope.textOption = scope.$eval(attributes.textOption)
/*            	if(!scope.optionList||!scope.selectedModel){
            		//console.error('No option can be used.')
            	}*/
            	if(!scope.extraSettings){
            		scope.extraSettings = {
            			hasGroup: false,
            			allCheck: true,
            			search: true,
            			grpOptionLabel: 'grpLabel',
            			subOptionLabel: 'subLabel',
            			grpOptionId: 'grpId',
            			subOptionId: 'subId',
            			grpOptsubLabel: 'item',
            			itemLabel: 'itemLabel',
            			itemId: 'itemId'
            		}
            	}
            	else{
            		if(!scope.extraSettings.hasGroup){
            			scope.extraSettings.hasGroup = false
            		}
        			if(!scope.extraSettings.grpOptionLabel){
            			scope.extraSettings.grpOptionLabel = 'grpLabel'
            		}
            		if(!scope.extraSettings.subOptionLabel){
            			scope.extraSettings.subOptionLabel = 'subLabel'
            		}
            		if(!scope.extraSettings.grpOptionId){
            			scope.extraSettings.grpOptionId = 'grpId'
            		}
            		if(!scope.extraSettings.subOptionId){
            			scope.extraSettings.subOptionId = 'subId'
            		}
            		if(!scope.extraSettings.grpOptsubLabel){
            			scope.extraSettings.grpOptsubLabel = 'item'
            		}
            		if(!scope.extraSettings.itemLabel){
            			scope.extraSettings.itemLabel = 'itemLabel'
            		}
            		if(!scope.extraSettings.itemId){
            			scope.extraSettings.itemId = 'itemId'
            		}
            		if(!scope.extraSettings.allCheck){
            			scope.extraSettings.allCheck = true
            		}
            		if(!scope.extraSettings.search){
            			scope.extraSettings.search = true
            		}
            	}

            	scope.grpText={}
            	scope.itemText={}

            	scope.showSubList = []

            })

        	scope.allChecked = function(grpid){
        		var idx
        		for(var i=0;i<scope.optionList.length;i++){
        			if(scope.optionList[i][scope.extraSettings.grpOptionId]==grpid){
        				idx = i
        				break;
        			}
        		}
        		if(scope.selectedModel[grpid]){
        			return scope.selectedModel[grpid].length===scope.optionList[idx][scope.extraSettings.grpOptsubLabel].length
        		}
        		else{
        			return false
        		}
        	}

        	scope.isIndeterminate = function(grpid){
        		var idx
        		for(var i=0;i<scope.optionList.length;i++){
        			if(scope.optionList[i][scope.extraSettings.grpOptionId]==grpid){
        				idx = i
        				break;
        			}
        		}
        		if(scope.selectedModel[grpid]){
        			return (scope.selectedModel[grpid].length!==0&&scope.selectedModel[grpid].length!==scope.optionList[idx][scope.extraSettings.grpOptsubLabel].length)
        		}
        		else{
        			return false
        		}
        	}

			scope.toggleAll = function(grpid){
				var idx
        		for(var i=0;i<scope.optionList.length;i++){
        			if(scope.optionList[i][scope.extraSettings.grpOptionId]==grpid){
        				idx = i
        				break;
        			}
        		}
        		if(scope.selectedModel[grpid]){
        			delete scope.selectedModel[grpid]
        		}
        		else{
        			scope.selectedModel[grpid]=angular.copy(scope.optionList[idx][scope.extraSettings.grpOptsubLabel])
        		}
        	}

        	scope.existsSub = function(grpid,itemid){
        		if(scope.selectedModel[grpid]){
        			var idx
        			for(var i=0;i<scope.selectedModel[grpid].length;i++){
	        			if(scope.selectedModel[grpid][i][scope.extraSettings.subOptionId]==itemid){
	        				idx = i
	        				break;
	        			}
	        		}
	        		if(idx!==undefined){
	        			return true
	        		}
	        		else{
	        			return false
	        		}
        		}
        		else{
        			return false
        		}
        	}

        	scope.toggleSub = function(grpid,item){
        		var exists = false
        		var idx
        		if(scope.selectedModel[grpid]){
        			for(var i=0;i<scope.selectedModel[grpid].length;i++){
	        			if(scope.selectedModel[grpid][i][scope.extraSettings.subOptionId]==item[scope.extraSettings.subOptionId]){
	        				scope.selectedModel[grpid].splice(i,1)
	        				if(scope.selectedModel[grpid].length==0){
	        					delete scope.selectedModel[grpid]
	        				}
	        				exists = true
	        				break;
	        			}
	        		}
	        		if(!exists){
	        			scope.selectedModel[grpid].push(item)
	        		}
        		}
        		else{
        			scope.selectedModel[grpid]=[]
        			scope.selectedModel[grpid].push(item)
        		}
        	}

        	scope.shSubListFunc = function(grpid){
        		var exist = scope.showSubList.indexOf(grpid)
        		if(exist!==-1){
        			 scope.showSubList.splice(exist,1)
        		}
        		else{
        			scope.showSubList.push(grpid)
        		}
        	}

        	scope.checkALL = function(){
        		if(scope.extraSettings.hasGroup){
                    var tmpfilter = {}
                    tmpfilter[scope.extraSettings.grpOptsubLabel] = {}
                    tmpfilter[scope.extraSettings.grpOptsubLabel][scope.extraSettings.subOptionLabel] = scope.grpText.search
	        		var arr = $filter('optionalFilter')(scope.optionList,{groupName: scope.grpText.search},tmpfilter,scope.grpText.search)
	        		for(var i=0;i<arr.length;i++){
                        if(arr[i][scope.extraSettings.grpOptsubLabel].length!==0){
    	    				scope.selectedModel[arr[i][scope.extraSettings.grpOptionId]]=[]
                        }
	    				for(var j=0;j<arr[i][scope.extraSettings.grpOptsubLabel].length;j++){
	    					var selected = angular.copy(arr[i][scope.extraSettings.grpOptsubLabel][j])
	    					scope.selectedModel[arr[i][scope.extraSettings.grpOptionId]].push(selected)
	    				}
	        		}
	        	}
	        	else{
	        		var arr = $filter('filter')(scope.optionList,scope.itemText,false)
	        		for(var i=0;i<arr.length;i++){
	        			var exists = false
		                for(var j=0;j<scope.selectedModel.length;j++){
		                    if(scope.selectedModel[j][scope.extraSettings.itemId]==arr[i][scope.extraSettings.itemId]){
		                        exists = true
		                        break;
		                    }
		                }
		                if(!exists){
		                	scope.selectedModel.push(arr[i])
		                }
		            }
	        	}
        	}

        	scope.uncheckALL = function(){
        		if(scope.extraSettings.hasGroup){
                    var tmpfilter = {}
                    tmpfilter[scope.extraSettings.grpOptsubLabel] = {}
                    tmpfilter[scope.extraSettings.grpOptsubLabel][scope.extraSettings.subOptionLabel] = scope.grpText.search
	        		var arr = $filter('optionalFilter')(scope.optionList,{groupName: scope.grpText.search},tmpfilter,scope.grpText.search)
	        		for(var i=0;i<arr.length;i++){
	        			if(scope.selectedModel[arr[i][scope.extraSettings.grpOptionId]]){
	        				delete scope.selectedModel[arr[i][scope.extraSettings.grpOptionId]]
	        			}
	        		}
	        	}
	        	else{
	        		var arr = $filter('filter')(scope.optionList,scope.itemText,false)
	        		for(var i=0;i<arr.length;i++){
		                for(var j=0;j<scope.selectedModel.length;j++){
		                    if(scope.selectedModel[j][scope.extraSettings.itemId]==arr[i][scope.extraSettings.itemId]){
		                        scope.selectedModel.splice(j,1)
		                        break;
		                    }
		                }
		            }
	        	}
        	}

        	scope.itemExists = function(item){
        		var exists = false
        		for(var i=0;i<scope.selectedModel.length;i++){
        			if(scope.selectedModel[i][scope.extraSettings.itemId]==item[scope.extraSettings.itemId]){
        				exists = true
        				break
        			}
        		}
        		return exists
        	}

        	scope.toggleItem = function(item){
        		var exists = false
        		var idx
        		for(var i=0;i<scope.selectedModel.length;i++){
        			if(scope.selectedModel[i][scope.extraSettings.itemId]==item[scope.extraSettings.itemId]){
        				exists = true
        				idx = i
        				break
        			}
        		}
        		if(exists){
        			scope.selectedModel.splice(i,1)
        		}
        		else{
        			scope.selectedModel.push(item)
        		}
        	}
        }
    }
}])