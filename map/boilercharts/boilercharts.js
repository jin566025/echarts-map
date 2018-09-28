//地图容器
var pageUrl = window.actionPath + 'sn/';


var chart = echarts.init(document.getElementById('main'));
//34个省、市、自治区的名字拼音映射数组
var provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shanxi1",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
};


//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京","天津","上海","重庆","香港","澳门"];
var mapdata = [];
//绘制全国地图
$.getJSON('map/china.json', function(data){
	echarts.registerMap('china', data);
});
var initURL = pageUrl+"house/proCount";
getMapData('china',initURL)
//地图点击事件
chart.on('click', function (params) {
	if( params.name in provinces ){
		// getCityMap(params.name)
		//如果点击的是34个省、市、自治区，绘制选中地区的二级地图
		$("#proSel").val(params.name).change()
// 		$.getJSON('map/province/'+ provinces[params.name] +'.json', function(data){
// 			echarts.registerMap( params.name, data);
// 		});
// 		var cityUrl = pageUrl+"house/cityCount?pro="+params.name
// 		getMapCity(params.name,cityUrl)

	}else if( params.seriesName in provinces ){
		//如果是【直辖市/特别行政区】只有二级下钻
		if(  special.indexOf( params.seriesName ) >=0  ){
			//renderMap('china',mapdata);
			$("#proSel").val("全部").change()
		}else{
			//getAreaMap(params.name)
			$("#citySel").val(params.name).change()
			//显示县级地图
// 			$.getJSON('map/city/'+ cityMap[params.name] +'.json', function(data){
// 				echarts.registerMap(params.name, data);
// 			});	
// 			var cityUrl = pageUrl+"house/cityCount?city="+params.name
// 			getMapCity(params.name,cityUrl)
		}	
	}else{
		$("#proSel").val("全部").change()
		//renderMap('china',mapdata);
	}
});

//初始化绘制全国地图配置
var option = {
	backgroundColor: '#F6F6F6',
    title : {
        text: '',
        subtext: '',
        left: 'center',
        textStyle:{
            color: '#fff',
            fontSize:16,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
        },
        subtextStyle:{
        	color: '#ccc',
            fontSize:13,
            fontWeight:'normal',
            fontFamily:"Microsoft YaHei"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter:function(params){
        	if(isNaN(params.value)){
        		return " "
        	}else{
        		return params.name+"\n"+params.value
        	}
        }
    },

    animationDuration:1000,
		animationEasing:'cubicOut',
		animationDurationUpdate:1000
     
};
function renderMap(map,data){
	option.title.subtext = "";
	option.series = [ 
				{
							name: map,
							type: 'map',
							mapType: map,
							zoom: 1.2,
							// center: ['50%', '50%'],
							roam: false,
							nameMap:{
								'china':'中国'
							},
							label: {
								normal:{
									show:true,
									textStyle:{
										color:'dodgerblue',
										fontSize:12,
									},
									// formatter:'{b}\n{c}'
									formatter:function(params){
										if(isNaN(params.value)){
											return " "
										}else{
											return params.name+"\n"+params.value
										}
									}
								},
								emphasis: {
									show: true,
									textStyle:{
										color:'#fff',
										fontSize:12
									}
								}
						},
						itemStyle: {
								normal: {
										areaColor: '#F4F3EF',
										borderColor: '#bbb'
								},
								emphasis: {
										areaColor: 'dodgerblue'
								}
						},
// 								markPoint:{
// 									symbolSize:"40",
// 									label: {
// 										normal: {
// 											show: true,
// 											formatter: '{b}\n{c}',
// 											textStyle:{
// 												color:'#7FFFD4',
// 												fontSize:12,
// 											},
// 										}
// 									},
// 									itemStyle: {
// 										normal: {
// 											color: ['#10CC67']
// 										}
// 									},
// 									markArea: {
// 										itemStyle: {
// 											normal: {
// 												color: ['#7FFFD4']
// 											}
// 										}
// 									},
// 									
// 									//data:_newArray
// 									data: [
// 											{name: '广东',value:'10', coord: [113.051227,23.685022], symbol: 'circle'},
// 											{name: '浙江',value:'100', coord: [120.051227,28.685022], symbol: 'circle'},
// 											{name: '江苏',value:'80', coord: [120.051227,33.685022], symbol: 'circle'}
// 									]
// 								},
						data:data
					}	
			];
			//渲染地图
			chart.setOption(option);

}

$(function(){
		$('.nano').nanoScroller({
			preventPageScrolling: true
		});
		Common.getJsonRemote({
			url: pageUrl + "house/count",
			// data: TableComn.getQueryData($bssTable, new Query(), bssVue.params, data),
			success: function(res){
					if(res.status=="200"){
						$("#zc").html(res.data[1])
						$("#bj").html(res.data[2])
						$("#gz").html(res.data[3])
						$("#qb").html(res.data[0])
					}
			},
		})
		$('#nameinput').on('input',function(){
			var _val  =$(this).val();
			var _query;
			if(_val){
				_query  = '{"w":[{"k":"houseName","v":'+_val+',"m":"LK"}],"o":[],"p":{"n":1,"s":10}}';
				_query = encodeURI(_query);
			}
			getList(_query)
		})
		
		
		$("#proSel").change(function(){
			$("#citySel").html('<option style="display: none;">请选择市</option>');
			$("#areaSel").html('<option style="display: none;">请选择区县</option>');
			getCity();
			selChange();
			
		})
		$("#citySel").change(function(){
			$("#areaSel").html('<option style="display: none;">请选择区县</option>');
			getArea();
			selChange();
		})
		$("#areaSel").change(function(){
			selChange();
		})
		
		$("#statusSel").change(function(){
			selChange();
		})
		getList()
		getPro()
		
		$(".my-details").on("click",".my-detail",function(){
			var myDetail = $(this);
			var _address = myDetail.find(".my-city-address3");
			if(myDetail.hasClass("opened")){
				myDetail.removeClass("opened");
				_address.html("")
			}else{
				var _pk = myDetail.attr("data-snHousePk");
				var _query = '{"w":[{"k":"snHousePk","v":'+_pk+',"m":"LK"}],"o":[],"p":{"n":1,"s":10}}';
				_query = encodeURI(_query);
				Common.getJsonRemote({
					url: pageUrl + "boiler/list?query="+_query,
					success: function(res){
						if(res.status=="200"){
							_address.html("")
							var _list =  res.data.items;
							if(_list.length==0){
								myDetail.addClass("opened");
								_address.append('<p style="text-align:center;height:50px;line-height:50px;">暂无数据</p>')
							}else{
								myDetail.addClass("opened");
								var status_cls,statNm;
								for(var i=0;i<_list.length;i++){
									  statNm = _list[i].statNm
										if(!statNm){
											statNm = '未知'
										}else if(statNm=="正常"){
											status_cls="my-status3"
										}else if(statNm=="故障"){
											status_cls="my-status2"
										}else if(statNm=="报警"){
											status_cls="my-status1"
										}
										var _html	=	'<div class="my-city-address3-content clear">'+
																	'<div class="my-city-address3-left">'+_list[i].boilerName+'</div>'+
																	'<div class="my-city-address3-right  '+status_cls+' ">'+statNm+'</div>'+
																'</div>';
										_address.append(_html);
								}
							}
						}
					},
				})
			}
		})
})

function getMapData(name,url){
	Common.getJsonRemote({
		url:url,
		success:function(res){
			var d = [];
			for(var i in res){
				d.push({
					name:i,
					value:res[i]
				})
			}
			mapdata = d;
			renderMap(name,d);
		}
	})
}

function getMapCity(name,url){
	Common.getJsonRemote({
		url:url,
		success:function(res){
			var d = [];
			for(var i in res){
				d.push({
					name:i,
					value:res[i]
				})
			}
			renderMap(name,d);
		}
	})
}

//市
function getCityMap(name){
	$.getJSON('map/province/'+ provinces[name] +'.json', function(data){
		echarts.registerMap( name, data);
	});
	var cityUrl = pageUrl+"house/cityCount?pro="+name
	getMapCity(name,cityUrl)
}
//区
function getAreaMap(name){
	console.log(cityMap[name])
	$.getJSON('map/city/'+ cityMap[name] +'.json', function(data){
		echarts.registerMap(name, data);
	});	
	var cityUrl = pageUrl+"house/cityCount?city="+name
	getMapCity(name,cityUrl)
}


function selChange(){
	
	var array = [];
	var json1 = {"k":"proNm","v":$("#proSel").val(),"m":"LK"};
	var json2 = {"k":"cityNm","v":$("#citySel").val(),"m":"LK"};
	var json3 = {"k":"disNm","v":$("#areaSel").val(),"m":"LK"};
	var json4 = {"k":"statNm","v":$("#statusSel").val(),"m":"LK"};
	
	
	var _proId = $("#proSel option:selected").attr("data-aid");
	var _cityId = $("#citySel option:selected").attr("data-aid");
	var _areaId = $("#areaSel option:selected").attr("data-aid");
	var statuId = $("#statusSel option:selected").attr("data-aid");
	if(_proId){
		_proId==88888 ? console.log(""):array.push(JSON.stringify(json1));
		if(_proId && !_cityId){
			if(_proId==88888){
				getMapData('china',initURL)
			}else{
				var proName = $("#proSel").val()
				getCityMap(proName)
			}
			
		}
		
	}
	if(_cityId){
		_cityId==88888 ? console.log(""):array.push(JSON.stringify(json2));
		if(_proId && _cityId){
			if(_cityId==88888){
				var proName = $("#proSel").val()
				getCityMap(proName)
			}else{
				var proName = $("#citySel").val()
				getAreaMap(proName)
			}	
		}
	}
	if(_areaId){
		_areaId==88888 ? console.log(""):array.push(JSON.stringify(json3));
	}
	if(statuId){
		statuId==88888 ? console.log(""):array.push(JSON.stringify(json4));
	}
	var _query = '{"w":['+array+'],"o":[],"p":{"n":1,"s":10}}';
	_query = encodeURI(_query);
	getList(_query)
	if(array.length==0){
		getMapData('china',initURL)
	}
}
function getList(query){

	var _url;
	if(query){
		_url =pageUrl + "house/list?query="+query;
	}else{
		_url=pageUrl + "house/list";
	}
	Common.getJsonRemote({
		url: _url,
		success: function(res){
				console.log(res)
				$("#my-datas-num").html(res.data.items.length)
				if(res.status=="200"){
					var _list =  res.data.items;
					$(".nano-content").html("");
					if(_list.length==0){
						$(".nano-content").html('<p style="text-align:center;height:50px;line-height:50px;">暂无数据</p>')
					}else{
						var status_cls = "";
						var statNm,status_cls;
						for(var i=0;i<_list.length;i++){
							statNm = _list[i].statNm;
							status_cls="my-status3";
							if(!statNm){
								statNm = '未知'
							}else if(statNm=="正常"){
								status_cls="my-status3"
							}else if(statNm=="故障"){
								status_cls="my-status2"
							}else if(statNm=="报警"){
								status_cls="my-status1"
							}
							var html = '<div class="my-detail" data-snHousePk='+_list[i].snHousePk+'>'+
													'<div class="my-detail-top clear">'+
														'<p class="my-detail-top-p">'+_list[i].houseName+' </p>'+
														'<span class="my-detail-top-span '+status_cls+' ">'+statNm+'</span>'+
													'</div>'+
													'<div class="my-city-address">'+
														'<img src="../../../img/123/pos1.png" />'+
														'<span>'+_list[i].proNm+_list[i].cityNm+_list[i].disNm+_list[i].addr+'</span>'+
													'</div>'+
													'<div class="my-city-address2">'+
														'<img src="../../../img/123/pos3.png" />'+
														'<span> '+_list[i].cityNm+'——'+_list[i].disNm+'</span>'+
													'</div>'+
													'<div class="my-city-address3"></div>'+
												'</div>'
							$(".nano-content").append(html)
						}
					}
				}
		},
	})
}


function getPro(){
	$.getJSON('map/china.json', function(data){
		var list = data.features;
		$("#proSel").append('<option style="display: none;">请选择省</option>');
		$("#proSel").append('<option data-aid="88888">全部</option>');
		for(var i=0;i<list.length;i++){
			var html = '<option data-aid='+list[i].id+'>'+list[i].properties.name+'</option>';
			$("#proSel").append(html)
		}
	})
}

function getCity(){
	//var proId = $("#proSel option:selected").attr("data-aid");
	var proName = $("#proSel").val();
	if(proName=="全部"){
		
	}else{
		$.getJSON('map/province/'+provinces[proName]+'.json', function(data){
			$("#citySel").html("")
			var list = data.features;
			$("#citySel").append('<option style="display: none;">请选择市</option>');
			$("#citySel").append('<option data-aid="88888">全部</option>');
			for(var i=0;i<list.length;i++){
				var html = '<option data-aid='+list[i].id+'>'+list[i].properties.name+'</option>';
				$("#citySel").append(html)
			}
		})
	}
	
}

function getArea(){
	var cityName = $("#citySel").val();
	if(cityName=="全部"){
		
	}else{
		$.getJSON('map/city/'+ cityMap[cityName] +'.json', function(data){
			$("#areaSel").html("")
			var list = data.features;
			$("#areaSel").append('<option style="display: none;">请选择区县</option>');
			$("#areaSel").append('<option data-aid="88888">全部</option>');
			for(var i=0;i<list.length;i++){
				var html = '<option data-aid='+list[i].id+'>'+list[i].properties.name+'</option>';
				$("#areaSel").append(html)
			}
		})
	}
	
}