
$(function(){
	$('.nano').nanoScroller({
		preventPageScrolling: true
	});

	
	var Chart2 = echarts.init(document.getElementById('pricetotal2'));
	var color = ['#975fe4', '#3aa0ff', '#36cbcb', '#4dcb73', '#fad337', '#f2637b'];
	var data =[
			{
				name: '货道故障',
				value: 320,
			},
			{
				name: '门锁故障',
				value: 586},
			{	                
				name: '主板故障',	                
				value: 874,
			},
			{	                
				name: '副板故障',
				value: 725,
			},
			{	                
				name: '通讯故障',	                
				value: 874,
			},
			{	                
				name: '其他故障',	                
				value: 874,
			}
		];

	var option2 = {
		tooltip : { //提示框组件
			trigger: 'item', //触发类型(饼状图片就是用这个)
			formatter: "{c} <br/>{b}" //提示框浮层内容格式器
		},
		series: [{
			type: 'pie',
			center:['50%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
			radius: ['60%', '85%'],         // 饼图的半径，数组的第一项是内半径，第二项是外半径。
			hoverAnimation: true,           // 是否开启 hover 在扇区上的放大动画效果。
			color: color,                   // 圆环图的颜色
			
			label: {                        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.	            ,
				normal: {	                
					show: true,             // 是否显示标签[ default: false ]	                
					position: 'inside',    // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。	                
					 //formatter: '{b} : {c}件'  标签内容	            ,
				},
			},	        
			labelLine: {                    // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。	            ,
				normal: {	                
					show: true,             // 是否显示视觉引导线。	                
					length: 15,             // 在 label 位置 设置为'outside'的时候会显示视觉引导线。	                
					length2: 10,            // 视觉引导项第二段的长度。	                
					lineStyle: {            // 视觉引导线的样式	                    ,
						//color: '#000',	                    
						//width: 1	                
					},
				} ,
			},	        
			data: data
		}]
	};
	Chart2.setOption(option2);
	
	
	
	
	
	var barData = [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20];
	$(".my-charts-nav").click(function(){
		var index = $(this).index(".my-charts-nav");
		$(".my-charts-nav").removeClass("my-charts-nav-active");
		$(this).addClass("my-charts-nav-active");
		if(index==0){
			renderBar("bar",barData);
		}else{
			renderBar("line",barData);
		}
	})
	
	renderBar("bar",barData);
	
	
	
})


var Chart3 = echarts.init(document.getElementById("my-map"));
var option3 = {
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
						return params.name
					}
				}
		},

		animationDuration:1000,
		animationEasing:'cubicOut',
		animationDurationUpdate:1000
		 
};


var Chart1 = echarts.init(document.getElementById('pricetotal'));
function renderBar(type,data){
	var option1 = {
		grid: {
			x: 30,
			y: 30,
		},
		xAxis: {
			data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
			axisLine:{
				show:false
			}
		},
		yAxis: {
			// name: '金额'
			axisLine:{
				show:false
			}
		},
		series: [{
			name: '金额',
			type: type,
			barWidth:"34px",
			data: data,
			itemStyle:{
				normal:{
					color:"#36cbcb"
				}
			}
		}]
	};
	Chart1.setOption(option1);
}



function renderMap(map,data){
	option3.series = [
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
						formatter:function(params){
							return params.name+"88"
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
				data:data
		}
	]
	Chart3.setOption(option3);
}


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

var special = ["北京","天津","上海","重庆","香港","澳门"];

Chart3.on('click',function(params){
	
	if(params.name in provinces){
		$.getJSON('map/province/'+provinces[params.name]+'.json',function(data){
			getMapData(params,data)
		})
	}else if(params.seriesName in provinces){
		if(special.indexOf(params.seriesName)>=0){
			getChina()
		}else{
			$.getJSON('map/city/'+ cityMap[params.name] +'.json', function(data){
				getMapData(params,data)
			});	
		}
	}else{
		getChina()
	}
})

function getMapData(params,data){
	var list = "";
	var _mapdata = []
	
	list = data.features;
	_mapdata=[];
	list.forEach(function(ele,i){
		_mapdata.push({name:list[i].properties.name})
	})
	echarts.registerMap( params.name, data);
	renderMap(params.name,_mapdata)
}
getChina()
function getChina(){
	$.getJSON('map/china.json', function(data){
		var d = [];
		for( var i=0;i<data.features.length;i++ ){
			d.push({
				name:data.features[i].properties.name
			})
		}
		echarts.registerMap('china', data);
		renderMap('china',d)
	});
}
