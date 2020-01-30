/*
* @Author: Zilvia Kam
* @Date:   2019-04-04 17:39:30
* @Last Modified by:   Zilvia Kam
* @Last Modified time: 2019-10-08 11:24:51
*/

/**
 * @memberof carSafety
 * @ngdoc Controller
 * @name orgchartSetCtrl
 * @requires $scope,$state,$stateParams,$http,blockUI,$timeout,$translate,langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user,Idle,Keepalive,httpSuccessCheck,alertBox,$compile,$filter,refetchMapService
 * @description
 *   Controller for organization chart maintenance page.
 */
angular.module('carSafety').controller("orgchartSetCtrl",["$scope","$state","$stateParams","$http","blockUI","$timeout","$translate","langService","$document","$window","$mdDialog","formValidService","tmhDynamicLocale","user", "Idle", "Keepalive", "httpSuccessCheck", "alertBox", "$compile", "$filter", "refetchMapService", function($scope, $state, $stateParams, $http, blockUI, $timeout, $translate, langService,$document,$window,$mdDialog,formValidService,tmhDynamicLocale,user, Idle, Keepalive, httpSuccessCheck, alertBox, $compile, $filter, refetchMapService){
	Idle.watch();
	var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

	$scope.permission = user.func_code;

	$scope.userInfo = user;

	$scope.lang = $scope.userInfo.lang;

	window.document.title = $translate.instant('orgchartSet');

	$scope.updatelang = function(){
		var postData = {
            lang: $scope.lang
        }
		$http({
            method: 'POST',
            url: '/api/updateLang',
            data: postData
        }).then(function successCallback(response) {
        	blockUi.removeClass('block-ui-active block-ui-visible')
        	var errorphp = httpSuccessCheck.checkHttp(response)
			if(errorphp){
				alertBox.errorAlert('90006_01')
				$scope.lang = $scope.userInfo.lang;
			}
			else{
                if($scope.userInfo.map=='googleMap'){
                    refetchMapService.deleteGoogle()
                }
            	$state.reload()
            }
        }, function errorCallback(response) {
        	blockUi.removeClass('block-ui-active block-ui-visible')
			var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if(errorphp){
                alertBox.errorAlert('90006_'+errorphp)
            }
            else{
                alertBox.errorAlert(response.data.code)
            }
            $scope.lang = $scope.userInfo.lang;
        });
	}

    $scope.$on('IdleStart', function () {
        alertBox.idleAlert()
    })

    $scope.$on('IdleEnd', function () {
        swal.close(function(){
            clearInterval(timerInterval)
        })
    })

    $scope.$on('IdleTimeout', function () {
        if(angular.element(document.body).hasClass('md-dialog-is-showing')){
            $mdDialog.cancel()
        }
        swal.close(function(){
            clearInterval(timerInterval)
        })
        var func = function(result){
            $state.go('login', {}, { reload: true })
        }
        $http({
            method: 'GET',
            url: '/api/logout'
        }).then(function successCallback(response) {
        	blockUi.removeClass('block-ui-active block-ui-visible')
            alertBox.timeoutAlert(func)
        }, function errorCallback(response) {
        	blockUi.removeClass('block-ui-active block-ui-visible')
            alertBox.timeoutAlert(func)
        });
    })

    $scope.nodeTemplate = function(data) {
        var html = "<div class=\"title\"></div><div class=\"content\"><p class=\"groupname\" ng-click=\"showFunc(\'"+data.id+"\')\">"+data.department+"</p><div ng-if=\""+data.showFunc+"\"><p class=\"detail titletext\">{{\"departmentdescpt\"|translate}}:</p><p class=\"detail\">"+data.descpt+"</p><p class=\"detail titletext\">{{\"lastUpdateBy\"|translate}}:</p><p class=\"detail\">"+data.updated_by+"</p><hr><button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"addeditItem($event,\'add\',\'"+data.id+"\')\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></button><button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"addeditItem($event,\'edit\',\'"+data.id+"\')\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button><button type=\"button\" class=\"btn btn-danger btn-sm right\" ng-click=\"removeItem(\'"+data.id+"\')\" ng-if=\"userInfo.ou_id!==\'"+data.id+"\'\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button></div></div>"
        var template = angular.element(html);
        var element = $compile(template)($scope)
        return element;
    };

    $scope.orgchart = $('#chart-container').orgchart({
        'data': {},
        'nodeTemplate': $scope.nodeTemplate,
        'chartClass': 'orgchart-custom',
        'toggleSiblingsResp': true
    });

    $scope.refreshList = function(){
        $http({
            method: 'GET',
            url: '/api/orgchartSet'
        }).then(function successCallback(response) {
            var errorphp = httpSuccessCheck.checkHttp(response)
            if(errorphp){
                blockUi.removeClass('block-ui-active block-ui-visible')
                alertBox.errorAlert('91702_01')
            }
            else{
                if(response.data.data[0]){
                    $scope.datasource = response.data.data[0]
                }
                else{
                    $scope.datasource = response.data.data
                }
                $scope.orgchart.init({'data':$scope.datasource})
                $scope.filterChart()
                blockUi.removeClass('block-ui-active block-ui-visible')
            }
        }, function errorCallback(response) {
            blockUi.removeClass('block-ui-active block-ui-visible')
            var errorphp = httpSuccessCheck.checkerrorHttp(response)
            if(errorphp){
                alertBox.errorAlert('91702_'+errorphp)
            }
            else{
                alertBox.errorAlert(response.data.code)
            }
        });
    }

    $scope.refreshList()

    $scope.exportOrgchart = function(){
        var exportFilename = $translate.instant('orgChart')
        $scope.orgchart.export(exportFilename)
    }

    $scope.removeItem = function removeItem(id) {
        swal({
            title: $translate.instant('delete_item'),
            type: 'question',
            target: document.getElementsByTagName('BODY')[0],
            showCancelButton: true,
            confirmButtonText: $translate.instant('ok'),
            cancelButtonText: $translate.instant('cancel'),
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        })
        .then(function(result){
            if (result.value) {
                var postData = {
                    id: id
                }
                $http({
                    method: 'DELETE',
                    url: '/api/orgchartSet',
                    data: postData,
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('91705_01')
                    }
                    else{
                        alertBox.titleAlert('success','deleteSuccess')
                        $scope.refreshList()
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('91705_'+errorphp)
                    }
                    else{
                        alertBox.errorAlert(response.data.code)
                    }
                });
            }
        })
    }

    $scope.filterChart = function(){
        var chart = $('.orgchart');

        chart.removeClass('noncollapsable')
        chart.find('.node').removeClass('matched retained')
        .end().find('.hidden').removeClass('hidden')
        .end().find('.slide-down, .slide-up, .slide-left, .slide-right').removeClass('slide-down slide-up slide-right slide-left');

        if($scope.filter){
            chart.addClass('noncollapsable');

            chart.find('.node').filter(function(index, node) {
                return $(node).text().toLowerCase().indexOf($scope.filter.toLowerCase()) > -1;
            })
            .addClass('matched')
            .closest('table').parents('table').find('tr:first').find('.node').addClass('retained');

            chart.find('.matched,.retained').each(function(index, node) {
                $(node).removeClass('slide-up')
                .closest('.nodes').removeClass('hidden')
                .siblings('.lines').removeClass('hidden');
                var unmatched = $(node).closest('table').parent().siblings().find('.node:first:not(.matched,.retained)')
                .closest('table').parent().addClass('hidden');
                unmatched.parent().prev().children().slice(1, unmatched.length * 2 + 1).addClass('hidden');
            });

            /*chart.find('.matched').each(function(index, node) {
                if (!$(node).closest('tr').siblings(':last').find('.matched').length) {
                  $(node).closest('tr').siblings().addClass('hidden');
                }
            });*/

            if(chart.find('.matched,.retained').length==0){
                chart.find('.node').each(function(index, node) {
                    $(node).closest('tr').addClass('hidden');
                    $(node).closest('tr').siblings().addClass('hidden');
                });
            }
        }
    }

    $scope.redraw = function(object,str) {
        Object.keys(object).forEach(function (k) {
            if(object[k] && typeof object[k] === 'object'){
                return $scope.redraw(object[k], str)
            }
            else{
                if(k=='id'&&object[k]==str){
                    object['showFunc'] = !object['showFunc']
                }
            }
        });
    }

    $scope.find = function(obj, id) {
        var result;
        for (var p in obj) {
            if (obj.id == id) {
                return obj;
            } else {
                if (typeof obj[p] == 'object') {
                    result = $scope.find(obj[p], id);
                    if (result) {
                        return result;
                    }
                }
            }
        }
        return result;
    }

    $scope.funcClick = {
        id: null,
        time: null
    }

    $scope.showFunc = function(str){
        var tmp = angular.copy($scope.datasource)
        if($scope.funcClick.id!==str){
            $scope.funcClick.id = str;
            $scope.funcClick.time = 1;
            $scope.redraw(tmp,str)
        }
        else{
            $scope.funcClick.time += 1;
            if($scope.funcClick.time%2!==0){
                $scope.redraw(tmp,str)
            }
        }
        $scope.orgchart.init({'data':tmp})
        $scope.filterChart()
    }

    $timeout(function () {
        var table = document.getElementsByClassName('orgchart-container')[0]
        var headerHeight = document.getElementsByClassName('orgchart-content-header')[0].clientHeight
        table.style.minHeight = 'calc( 100% - '+headerHeight+'px )'
    })

    angular.element($window).bind('resize', function () {
        var table = document.getElementsByClassName('orgchart-container')[0]
        var headerHeight = document.getElementsByClassName('orgchart-content-header')[0].clientHeight
        table.style.minHeight = 'calc( 100% - '+headerHeight+'px )'
    })

    $scope.$on('$destroy', function(){
        if(angular.element(document.body).hasClass('md-dialog-is-showing')){
            $mdDialog.cancel()
        }
        angular.element($window).unbind('resize')
    })

    $scope.addeditItem = function(ev,action,row) {
        if(row){
            row = $scope.find($scope.datasource,row)
        }
        if(action=='edit'){
            $http({
                method: 'GET',
                url: '/api/orgchartAddL/'+row.id
            }).then(function successCallback(response) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                var errorphp = httpSuccessCheck.checkHttp(response)
                if(errorphp){
                    alertBox.errorAlert('91701_01')
                }
                else{
                    var dialogparentlist = response.data.data
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/view/component/dialog/orgchartSetDialog.html',
                        parent: angular.element(document.querySelector('.orgchart-wrap')),
                        targetEvent: ev,
                        locals: {
                            action: action,
                            row: angular.copy(row),
                            parentList: angular.copy(dialogparentlist),
                            rootnode: $scope.userInfo.ou_id,
                        },
                        clickOutsideToClose: false,
                        escapeToClose: false,
                        focusOnOpen: false,
                        //hasBackdrop:false,
                        disableParentScroll: true,
                        fullscreen: true // Only for -xs, -sm breakpoints.
                    })
                    .then(function(answer) {
                        alertBox.titleAlert('success',answer)
                        $scope.refreshList()
                    }, function() {

                    });
                }
            }, function errorCallback(response) {
                blockUi.removeClass('block-ui-active block-ui-visible')
                var errorphp = httpSuccessCheck.checkerrorHttp(response)
                if(errorphp){
                    alertBox.errorAlert('91701_'+errorphp)
                }
                else{
                    alertBox.errorAlert(response.data.code)
                }
            });
        }
        else{
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/view/component/dialog/orgchartSetDialog.html',
                parent: angular.element(document.querySelector('.orgchart-wrap')),
                targetEvent: ev,
                locals: {
                    action: action,
                    row: angular.copy(row),
                    parentList: [],
                    rootnode: $scope.userInfo.ou_id,
                },
                clickOutsideToClose: false,
                escapeToClose: false,
                focusOnOpen: false,
                //hasBackdrop:false,
                disableParentScroll: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                alertBox.titleAlert('success',answer)
                $scope.refreshList()
            }, function() {

            });
        }

    };

    function DialogController($scope, $mdDialog, $window, action, row, parentList, formValidService, rootnode) {

        var html = document.getElementsByTagName('HTML')[0]
        var blockUi = angular.element(document.getElementsByTagName("BODY")[0]);

        $timeout(function(){
            html.style.removeProperty('overflow-y')
        })

        $scope.action = action;

        $scope.root = rootnode;

        $timeout(function () {
            var body = document.getElementsByTagName('body')[0]
            body.style.position='fixed'
            //body.style.top=0+'px'
            body.style.width=100+'%'
        })

        $scope.$watch(function () {
            if(document.getElementsByClassName('set-dialog-wrap')[0]){
                return document.getElementsByClassName('set-dialog-wrap')[0].scrollTop;
            }
            else{
                return false;
            }
        },
        function (newValue, oldValue) {
            if (newValue!==0&&newValue!==false){
                document.getElementsByClassName('set-dialog-wrap')[0].scrollTop=0;
            }
        })

        $scope.parentList = parentList;

        if($scope.action=='add'){
            $scope.row={
                department: "",
                descpt: "",
                parentData: {parent_id:row.id,parent_descpt:row.department}
            }
        }
        else{
            $scope.row=row
            if(!$scope.row.parentData.parent_descpt){
                $scope.row.parentData=undefined
            }
        }

        if($scope.action=='edit'){
            var dataArr
            if($scope.root==$scope.row.id){
                dataArr = ['department','departmentdescpt']
            }
            else{
                dataArr = ['department','departmentdescpt','parentTAH']
            }
            $timeout(function () {
                for(var i=0;i<dataArr.length;i++){
                    var validate = document.getElementsByName(dataArr[i])[0]
                    if(dataArr[i].indexOf('TAH')!==-1){
                        formValidService.setValidTAH(validate)
                    }
                    else if(dataArr[i].indexOf('IPG')!==-1){
                        formValidService.setValidIPG(validate)
                    }
                    else{
                        formValidService.setValid(validate)
                    }
                }
            })
        }
        else{
            var dataArr = ['department']
        }

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.submit = function(answer) {
            var parent_id=null
            if(answer.parentData!==undefined){
                parent_id = answer.parentData.parent_id
            }
            if($scope.action=='add'){
                var postData = {
                    department: answer.department,
                    descpt: answer.descpt,
                    parent_id: parent_id
                }
                $http({
                    method: 'POST',
                    url: '/api/orgchartSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('91703_01')
                    }
                    else{
                        $mdDialog.hide('addSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('91703_'+errorphp)
                    }
                    else{
                        alertBox.errorAlert(response.data.code)
                    }
                });
            }
            else{
                var postData = {
                    id: answer.id,
                    department: answer.department,
                    descpt: answer.descpt,
                    parent_id: parent_id,
                    version: answer.version
                }
                $http({
                    method: 'PATCH',
                    url: '/api/orgchartSet',
                    data: postData
                }).then(function successCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('91704_01')
                    }
                    else{
                        $mdDialog.hide('editSuccess');
                    }
                }, function errorCallback(response) {
                    blockUi.removeClass('block-ui-active block-ui-visible')
                    var errorphp = httpSuccessCheck.checkerrorHttp(response)
                    if(errorphp){
                        alertBox.errorAlert('91704_'+errorphp)
                    }
                    else{
                        alertBox.errorAlert(response.data.code)
                    }
                });
            }

        };

        $scope.typeaheadscroll = function(){
            $timeout(function () {
                if(document.querySelector('.md-virtual-repeat-sizer').clientHeight<80){
                    document.querySelector('.md-virtual-repeat-offsetter').style.transform = "translateY(0)"
                }
            })
        }

        $scope.validate = function(formstr){
            $timeout(function () {
                var validate = document.getElementsByName(formstr)[0]
                var invalidFunc
                var validFunc
                var validMatch
                var tahValidModel
                if(formstr.indexOf('Match')!==-1){
                    validMatch = formstr.split("Match")[0]+'Confirm'
                }
                if(formstr.indexOf('TAH')!==-1){
                    validate = document.getElementsByName(formstr)[1]
                    tahValidModel = formstr.split("TAH")[0]
                    invalidFunc = 'setInvalidTAH'
                    validFunc = 'setValidTAH'
                }
                else if(formstr.indexOf('IPG')!==-1){
                    invalidFunc = 'setInvalidIPG'
                    validFunc = 'setValidIPG'
                }
                else{
                    invalidFunc = 'setInvalid'
                    validFunc = 'setValid'
                }
                if(validate){
                    if(formstr.indexOf('TAH')!==-1){
                        if($scope.addEdit[formstr].$invalid){
                            formValidService[invalidFunc](validate)
                        }
                        else{
                            if($scope.row[tahValidModel]){
                                if($scope['noResults'+formstr]){
                                formValidService[invalidFunc](validate)
                                }
                                else{
                                    formValidService[validFunc](validate)
                                }
                            }
                            else{
                                formValidService[validFunc](validate)
                            }
                        }
                    }
                    else if($scope.addEdit[formstr].$invalid){
                        formValidService[invalidFunc](validate)
                    }
                    else{
                        formValidService[validFunc](validate)
                    }
                }
                if(validMatch){
                    $scope.validate(validMatch)
                }
            })
        }

        $scope.validateSelect = function(formstr){
            var validate = document.getElementsByName(formstr)[0]
            formValidService.setValidTAH(validate)
        }

        $scope.validateForm = function(){
            $scope.attempt = true;
            for(var i=0;i<dataArr.length;i++){
                var validate = document.getElementsByName(dataArr[i])[0]
                if(!$scope.addEdit[dataArr[i]].$touched){
                    if(dataArr[i].indexOf('TAH')!==-1){
                        formValidService.setValidTAH(validate)
                    }
                    else if(dataArr[i].indexOf('IPG')!==-1){
                        formValidService.setInvalidIPG(validate)
                    }
                    else{
                        formValidService.setValid(validate)
                    }
                }
            }
        }
    }

    DialogController.$inject = ["$scope", "$mdDialog", "$window", "action", "row", "parentList", "formValidService", "rootnode"];

}]);