(function(){
    /**
     * 全局变量
     */
    var _this = this,
        pageUrl = window.actionPath + 'jl/goods/page',
        delUrl = window.actionPath + 'jl/goods/del',
        exportUrl = window.actionPath + 'jl/goods/export',

        $bssTable = $('#bssTable');
                                                                              
    /**
     * vue初始化
     */
    var bssVue = new Vue({
        el: '#bssContent',
        data: {
            params:{}
        },
        methods:{
            init: function(){
                Common.initDatepicker();
            },
            info: function(pk){
                window.open(infoHtmlUrl + '?pk=' + pk);
            },
            info2: function(pk){
                window.location.href = infoUrl + '?pk=' + pk;
            },
            add: function(){
                window.location.href = formHtmlUrl;
            },
						add2:function(){
							window.location.href = formHtmlUrl2;
						},
            upd: function(pk){
//                if (TableComn.checkSelectedDataLengthEqOne(_table)) {
//                    var selectedData = TableComn.getSelectedData(_table)[0];
                    window.location.href = formHtmlUrl + '?pk=' + pk;
//                }
            },
            del: function(){
                if (TableComn.checkSelectedDataLengthEqMulti(_table)) {
                    var pks = TableComn.getSelectedDataByField(_table, 'jlGoodsPk').join(',');
                    Common.openConfirm({
                        message: '确定删除？',
                        confirmFunc: function(){
                            // 发送删除请求
                            Common.formRemote({
                                url: delUrl,
                                type: 'GET',
                                data: {'pks': pks},
                                success: function(result){
                                    Common.showResultMessage(result);
                                    bssVue.reload();
                                }
                            });
                        }
                    });
                }
            },
            del2: function(pk){
                Common.openConfirm({
                    message: '确定删除？',
                    confirmFunc: function(){
                        // 发送删除请求
                        Common.formRemote({
                            url: delUrl,
                            type: 'GET',
                            data: {'pks': pk},
                            success: function(result){
                                Common.showResultMessage(result);
                                bssVue.reload();
                            }
                        });
                    }
                });
              },
              
              
              jy: function(pk){
              	$.ajax({
              	url: jinyongUrl,
                  type: 'GET',
                  data: {'pk': pk},
                  success: function(result){
                      Common.showResultMessage(result);
                      bssVue.reload();
                  }
              	})
                },
                
                qy: function(pk){
                	$.ajax({
                	url: qiyongUrl,
                    type: 'GET',
                    data: {'pk': pk},
                    success: function(result){
                        Common.showResultMessage(result);
                        bssVue.reload();
                    }
                	})
                  },
                
                
                
                
                
            expt: function(){
                var query = TableComn.buildQuery($bssTable, new Query(), bssVue.params);
                window.open(exportUrl + '?query=' + encodeURI(query.toString()));
            },
            search: function () {
                _table.draw( true );
            },
            reload: function (event) {
                bssVue.params = {};
                _table.draw( true );
            }
        },
        mounted: function() {
            this.init();
        }
      });
                                                                              
    /**
     * dataTable初始化
     */
    var _table = $bssTable.dataTable($.extend(true, {}, TableConfig.dataTables.defaultOption, {
        fixedHeader: TableConfig.dataTables.headerFixed,
        columns: [
            TableConfig.dataTables.column.checkbox,
            {data: "jlGoodsPk", width: "100px"},
            {data: "sx", width: "100px"},
            {data: "brand", width: "100px"},
            {data: "name", width: "100px"},
            {data: "jlSupNm", width: "100px"},
            {data: "code", width: "100px"},
//            {data: "catNm", width: "100px"},
            {data: "statNm", width: "100px"},
            {data: null, defaultContent: "", orderable: false, width: "200px",
                render : function(data, type, row, meta) {
                	if(data.statNm=="启用"){
                		//单品
                		if(data.hasPkg==0){
                			return '<div class="btn-group">'
                    		+ '<a class="btn btn-xs btn-info js-upd" data-pk=' + data.jlGoodsPk + '>修改</a>'
                    		+ '<a class="btn btn-xs btn-danger js-del2" data-pk=' + data.jlGoodsPk + '>删除</a>'
                    		+ '<a class="btn btn-xs btn-primary moreHandle" data-pk=' + data.jlGoodsPk + '>更多操作</a>'
    											
    											+ '<div class="user-handle-area">'
    														+ '<div class="user-state user-clearfix user-handler-section">'
    														+ '	<div class="user-state-left user-fl">状态</div>'
    															+ '<div class="user-state-right user-right-circle user-fr" data-pk=' + data.jlGoodsPk + '>'
    																+ '<div class="user-state-circle"  style="margin-left:20px"></div>'
    														+ '	</div>'
    														+ '</div>'
    													+ '</div>'
    											
                    		+ '</div>';
                		}else{
                			//组合
                			return '<div class="btn-group">'
                			+ '<a class="btn btn-xs btn-danger js-del2" data-pk=' + data.jlGoodsPk + '>删除</a>'
                    		+ '<a class="btn btn-xs btn-primary moreHandle" data-pk=' + data.jlGoodsPk + '>更多操作</a>'
    											
    											+ '<div class="user-handle-area">'
    														+ '<div class="user-state user-clearfix user-handler-section">'
    														+ '	<div class="user-state-left user-fl">状态</div>'
    															+ '<div class="user-state-right user-right-circle user-fr" data-pk=' + data.jlGoodsPk + '>'
    																+ '<div class="user-state-circle"  style="margin-left:20px"></div>'
    														+ '	</div>'
    														+ '</div>'
    													+ '</div>'
    											
                    		+ '</div>';
                		}
                		
                		
                	}else{
                		//单品
                		if(data.hasPkg==0){
                			return '<div class="btn-group">'
                    		+ '<a class="btn btn-xs btn-info js-upd" data-pk=' + data.jlGoodsPk + '>修改</a>'
                    		+ '<a class="btn btn-xs btn-danger js-del2" data-pk=' + data.jlGoodsPk + '>删除</a>'
                    		+ '<a class="btn btn-xs btn-primary moreHandle" data-pk=' + data.jlGoodsPk + '>更多操作</a>'
    											
    											+ '<div class="user-handle-area">'
    														+ '<div class="user-state user-clearfix user-handler-section">'
    														+ '	<div class="user-state-left user-fl">状态</div>'
    															+ '<div class="user-state-right user-fr" data-pk=' + data.jlGoodsPk + '>'
    																+ '<div class="user-state-circle"></div>'
    														+ '	</div>'
    														+ '</div>'
    													+ '</div>'
    											
                    		+ '</div>';
                			
                		}else{
                			//组合
                			return '<div class="btn-group">'
                    		+ '<a class="btn btn-xs btn-danger js-del2" data-pk=' + data.jlGoodsPk + '>删除</a>'
                    		+ '<a class="btn btn-xs btn-primary moreHandle" data-pk=' + data.jlGoodsPk + '>更多操作</a>'
    											
    											+ '<div class="user-handle-area">'
    														+ '<div class="user-state user-clearfix user-handler-section">'
    														+ '	<div class="user-state-left user-fl">状态</div>'
    															+ '<div class="user-state-right user-fr" data-pk=' + data.jlGoodsPk + '>'
    																+ '<div class="user-state-circle"></div>'
    														+ '	</div>'
    														+ '</div>'
    													+ '</div>'
    											
                    		+ '</div>';
                			
                		}
                		
                	}
                    
                }
            }
        ],
        ajax: function(data, callback, settings) {//ajax配置为function,手动调用异步查询
            //手动控制遮罩
            Common.showStandby($('.js-standby'));

            var pk = location.search.split("=")[1];
			var _query = {"w":[{"k":"jlSupPk","v":pk,"m":"EQ"}],"o":[],"p":{"n":1,"s":10}},
			_query = JSON.stringify(_query);
			var _data = {};
			pk ? _data.query = _query : _data = TableComn.getQueryData($bssTable, new Query(), bssVue.params, data);                                                                           
            Common.getJsonRemote({
                url: pageUrl+"?type=0",
                data: _data,
                success: function(result){
                    Common.showErrorResultMessage(result);
                    callback(TableComn.getReturnData(result, data));
                }
            })
        },
        "createdRow": function (row, data, index) {
        },
        "drawCallback": function(settings) {
            TableComn.jumpPageEvent($bssTable);
            $bssTable.find('.group-checkable').prop('checked', false);
            $('.js-info').on('click', function(){
                bssVue.info($(this).data('pk'));
            });
            $('.js-upd').on('click', function(){
                bssVue.upd($(this).data('pk'));
            });
            $('.js-del2').on('click', function(){
                bssVue.del2($(this).data('pk'));
            });
            $('.js-info').on('click', function(){
                bssVue.info($(this).data('pk'));
            });
            $('.js-info2').on('click', function(){
                bssVue.info2($(this).data('pk'));
            });
            
            /********************更多操作动态显示JS代码开始**************************/
			
			$('.moreHandle').on('click', function(){
				/*var _next = $(this).next()
				if(_next.hasClass("opened")){
					_next.hide().removeClass("opened");
				}else{
					_next.show().addClass("opened");
				}*/
				$(".user-handle-area").hide();
				var _next = $(this).next();
				_next.delay(300).show(0);
			});
			
			/*$('.moreHandle').mouseenter(function(){

				$(".user-handle-area").hide();
				var _next = $(this).next();
				_next.delay(300).show(0);
					
			});*/
			
			$('.moreHandle').mouseleave(function(){
				var _this = $(this);
				setTimeout(function(){
					if(!$(".user-handle-area").is('.focuse'))
					{
						$(".user-handle-area").hide();
					}
					
				},200);					
			});
			
			$('.user-handle-area').mouseenter(function(){

				$(this).show().addClass("focuse");
					
			});
			$('.user-handle-area').mouseleave(function(){

				$(this).hide().removeClass("focuse");;
					
			});
			
		/********************更多操作动态显示JS代码结束**************************/
			$(".user-state-right").on('click', function(){
				var pk = $(this).data('pk');
				//todo pk
				
				
				var _target = $(this);
				var target = _target.find(".user-state-circle");
				console.log(target)
				if(_target.hasClass("user-right-circle")){
					_target.removeClass("user-right-circle");
					target.animate({"marginLeft":"0px"});
					
					bssVue.jy(pk);
				}else{
					_target.addClass("user-right-circle")
					target.animate({"marginLeft":"20px"});
					bssVue.qy(pk);
				}
			})
        } 
    })).api();//此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
                                                                                   
    /**
     * dataTable全选框, 全选和全不选事件
     */
    TableComn.groupCheckableChange($bssTable);
                                                                                
    /**
     * dataTable复选框
     */
    TableComn.checkableChange($bssTable);
                                                                                
})();

