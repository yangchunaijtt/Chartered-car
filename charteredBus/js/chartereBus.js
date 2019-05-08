// 页面初始化数据
var newPageData = {
    uid:0,   // 用户的uid
    phone:0,    //  电话
    openid:0,   //  openid
    newPageHash:"",  // 初始化页面获取到的hash值。
    secrecy:""         // 存储
}
   // 禁用效果 
   $(document.body).css({
    "overflow-x":"hidden",
    "overflow-y":"hidden"
    });

  
  //  * 5.8号修改记录
  //  * 1：1241行判断  if ( releaseData.fabuarData.isOk )...
  //  * 2:1343 setMeal_touch, selectcar 的里面一些函数
  
$(function(){
    getOpenid(function(openid){
		// nowusermsg.newPageHash = window.location.hash;
		// nowusermsg.secrecy = urlToObj(nowusermsg.newPageHash);
		// if ( nowusermsg.newPageHash == "#passenger" || nowusermsg.newPageHash == "" || nowusermsg.secrecy == "" ) {
			
		// } else {
		// 	localStorage.setItem("uid-kongbatong",nowusermsg.secrecy.uid);
		// 	localStorage.setItem("mobile-kongbatong",nowusermsg.secrecy.mobile);
		// 	localStorage.setItem("userid-kongbatong",nowusermsg.secrecy.userid);
		// }

        newPageData.uid = localCache("uid-kongbatong");
        newPageData.openid = localCache("openid-kongbatong");
        newPageData.phone = localCache("mobile-kongbatong");
        newPageData.openid = openid;
        console.log("openid",openid,newPageData.uid,newPageData.openid);
        if(null == newPageData.uid || "" == newPageData.uid) {
            register("//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
        } else {
            //$(document.body).outerHeight($(window).outerHeight());
            // 得到订单数据
            myorder.myorderPage("","","");
            // 获取车辆类型
            selectcar.readChaPackageTypes();
            // 定位功能
            chartBus_amap();
            // 我的订单页绑定无限滚动效果
            //hdrunvowner();
            //城市具体地址选择页
            $(".address").outerHeight($(document.body).outerHeight());
            $("#add-address").outerHeight($(".address").outerHeight()-$(".address-city").outerHeight()-$(".address-header").outerHeight());
            // 提交订单页设置高度
            $(".selectcar").outerHeight($(document.body).outerHeight());

            // 地图页大小
            $(".busMap").outerHeight($(document.body).outerHeight());
            $("#container").outerHeight($(document.body).outerHeight()-42);
            // 详情页
            $(".details").outerHeight($(document.body).outerHeight());

            $(".price").outerHeight($(document.body).outerHeight());
            
            
        }
    },location.search);
// 设置高度
    
// 初始化调用的函数
    setTimeWheel();
//首页绑定事件
    $(".bus-myOrder").bind("touch click",function(){
        window.location.hash  = "#myorder";
    })
    // 从哪儿出发
    $("#bus-dpcity").bind("touch click",function(){
		var Release = releaseData.fabudpData.data;
		if (  releaseData.fabudpData.isOk && releaseData.fabudpData.data!="" && $("#bus-dpcity").text() != "从哪儿上车" ) {
			if ( releaseData.fabudpData.isLocation ) {
				$("#busMap-dzname").text( Release.addressComponent.formattedAddress);
					var busMap_dzcityname = "";
					if ( null != Release.addressComponent.township ){
						busMap_dzcityname += Release.addressComponent.township;
					}else if ( null != Release.addressComponent.street ){
						busMap_dzcityname += Release.addressComponent.street;
					}else if ( null != Release.addressComponent.streetNumber ){
						busMap_dzcityname += Release.addressComponent.streetNumber;
					}
				$("#busMap-dzcityname").text(busMap_dzcityname);
			}else {
				$("#busMap-dzname").text( Release.name);
				$("#busMap-dzcityname").text(Release.district);
			}
			$('#busMap-dzcity').text(releaseData.dpCity);
			window.location.hash  = "#busMap?seedpcity";
		}else {
			window.location.hash  = "#busMap?dpcity";
		}
    })
    // 点击去哪儿
    $("#bus-arcity").bind("touch click",function(){
		var Release = releaseData.fabuarData.data;
		if ( releaseData.fabuarData.isOk && Release!="" && $("#bus-arcity").text() != "您要去哪儿" ) {
			
			if ( releaseData.fabuarData.isLocation ) {
				$("#busMap-dzname").text( Release.addressComponent.formattedAddress);
					var busMap_dzcityname = "";
					if ( null != Release.addressComponent.township ){
						busMap_dzcityname += Release.addressComponent.township;
					}else if ( null != Release.addressComponent.street ){
						busMap_dzcityname += Release.addressComponent.street;
					}else if ( null != Release.addressComponent.streetNumber ){
						busMap_dzcityname += Release.addressComponent.streetNumber;
					}
				$("#busMap-dzcityname").text(busMap_dzcityname);
			}else {
				$("#busMap-dzname").text( Release.name);
				$("#busMap-dzcityname").text(Release.district);
			}
			$('#busMap-dzcity').text(releaseData.dpCity);
			window.location.hash  = "#busMap?seearcity";
		}else {
			window.location.hash  = "#busMap?arcity";
		}
    })
    // 选择包车方式
    $(".carcetbus-iconsleft").bind("touch click",function(){
        releaseData.useType = "单程";
        $(".carcetbus-iconsleft").css({
            "background":"#007aff",
            "color": "#fff"
        })
        $(".carcetbus-iconsright").css({
            "background":"#fff",
            "color": "#383636"
        })
        $("#time-divbottom").slideUp();
    })
    $(".carcetbus-iconsright").bind("touch click",function(){
        releaseData.useType = "往返";
        $(".carcetbus-iconsright").css({
            "background":"#007aff",
            "color": "#fff"
        })
        $(".carcetbus-iconsleft").css({
            "background":"#fff",
            "color": "#383636"
        })
        $("#time-divbottom").slideDown();
    })
    // 电话输入的限制
    $("#tell-phone").bind("keyup", function () {
                $(this).val($(this).val().replace(/[^\d.]/g, ""));
                //必须保证第一个为数字而不是.
                $(this).val($(this).val().replace(/^\./g, ""));
                //保证只有出现一个.而没有多个.
                $(this).val($(this).val().replace(/\.{2,}/g, "."));
                //保证.只出现一次，而不能出现两次以上
                $(this).val($(this).val().replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));
    })
    // 选车
    $("#selectionCar").bind("touch click",function(){
        bus.newselectcar();
    }) 
    
// 选车操作页绑定的操作
    $("#selectcar-return").bind("touch click",function(){
        window.location.hash = "#bus";
    })
   
    $("#selectcar-submitdiv").bind("touch click",function(){
        window.location.hash = "#price";
    })

// 地图页操作
    $("#busMap-input").bind("focus",function(){
        $("#address-city").text($("#busMap-city").text());
       
        window.location.hash = "#address?"+obtainData.busMap;
	})
	// 确认点击的按钮
    $("#busMap-qrclick").bind("touch click",function(){
        // 没有数据则不让跳转
        if( releaseData.dwlocationg=="" && releaseData.searchMap=="" ){
			if(location.hash==="#busMap?dpcity"){
				showMessage1btn("请选择起点","",0);
			}else if (location.hash=== "#busMap?arcity")  {
				showMessage1btn("请选择目的地","",0);
			}
            return false;
        }
        // 使用搜索数据
        if(location.hash==="#busMap?dpcity"){
			releaseData.dpCity = $("#busMap-city").text();
			
			// 赋值定位数据
			if ( releaseData.busMapDw &&  releaseData.dwlocationg.formattedAddress == $("#busMap-dzname").text()  ) {
				releaseData.fabudpData.isLocation = true  ;
				releaseData.fabudpData.data = releaseData.dwlocationg;
			} else {
				releaseData.fabudpData.isLocation = false ;
			}

			releaseData.fabudpData.isOk = true;
            $("#bus-dpcity").text($("#busMap-dzname").text());
        }else if ( location.hash=== "#busMap?arcity"){
			var busMap_arcity = releaseData.fabuarData;
			releaseData.arCity = $("#busMap-city").text();
			// 赋值定位数据
			if ( releaseData.busMapDw &&  releaseData.dwlocationg.formattedAddress == $("#busMap-dzname").text()  ) {
				releaseData.fabuarData.isLocation = true ;
				releaseData.fabuarData.data= releaseData.dwlocationg;
			}else {
				releaseData.fabuarData.isLocation = false;
			}
			releaseData.fabuarData.isOk = true;
            $("#bus-arcity").text($("#busMap-dzname").text());
        }
        window.location.hash = "#bus";
    })
// 城市具体地址选择
    $("#address-return").bind("touch click",function(){
        var val = window.location.hash;
        var hashone = val.split("?");
        window.location.hash = "#busMap?"+hashone[1];
    })
    // 跳转到选择
    $("#busMap-city").bind("touch click",function(){
		screen_city.hashVal = window.location.hash;
		$("#city-wrapper-nowcity").text($("#busMap-city").text());
        window.location.hash = "#screenCity";
    })
    $("#address-city").bind("touch click",function(){
		screen_city.hashVal = window.location.hash;
		$("#city-wrapper-nowcity").text($("#address-city").text());
        window.location.hash = "#screenCity";
    })
    // Input输入事件
    $("#address-input").bind("input",function(){
        address.addinput();
    })
    $("#address-input").bind("focus",function(){
        $("#address-input").val("");
    })
    // 下面数据点击事件

//我的订单页绑定事件
    //返回
     $("#myorder-return").bind("touch click",function(){
        window.location.hash = "#bus";
     })
    
    //  提交操作
    $("#selectcar-tijiao").bind("touch click",function(){
        selectcar.tijiao();
    })
    //监控输入
    $("#textarea").keyup(function(){
        var remain = $(this).val().length;
        if(remain >100){
            var num=$(".textarea").val().substr(0,100);
            $(".textarea").val(num);
        }else {
            var result = 100 - remain;
            $("#textarea-length").text(result+"/100");
        }
    });
// 我的订单页的操作
    $("#myorder-selectclick").bind("touch click",function(){
        $("#myorder-selectdiv").slideToggle();
    })
    // 选择时间
    $("#myorder-today").bind("touch click",function(){
        myorder.dateRange = "today";
        myorder.myorderSelect(1,"#myorder-today");
    })
    $("#myorder-week").bind("touch click",function(){
        myorder.dateRange = "weekday";
        myorder.myorderSelect(1,"#myorder-week");
    })
    $("#myorder-month").bind("touch click",function(){
        myorder.dateRange = "month";
        myorder.myorderSelect(1,"#myorder-month");
    })
    $("#myorder-timeqb").bind("touch click",function(){
        myorder.dateRange = "";
        myorder.myorderSelect(1,"#myorder-timeqb");
    })
    // 选择订单
    //状态（-2:待退款；-1:取消；0：下单；1：完成；2：待付款）
    $("#myorder-stsqx").bind("touch click",function(){
        myorder.status  = -1;
        myorder.myorderSelect(2,"#myorder-stsqx");
    })
    $("#myorder-ststk").bind("touch click",function(){
        myorder.status  = -2;
        myorder.myorderSelect(2,"#myorder-ststk");
    })
    $("#myorder-stsxd").bind("touch click",function(){
        myorder.status  = 0;
        myorder.myorderSelect(2,"#myorder-stsxd");
    })
    $("#myorder-stswc").bind("touch click",function(){
        myorder.status  = 1;
        myorder.myorderSelect(2,"#myorder-stswc");
    })
    $("#myorder-stsdfk").bind("touch click",function(){
        myorder.status  = 2;
        myorder.myorderSelect(2,"#myorder-stsdfk");
    })
    $("#myorder-stsqb").bind("touch click",function(){
        myorder.status  = "";
        myorder.myorderSelect(2,"#myorder-stsqb");
    })
    // 完成
    $("#myorder-stsbutton").bind("touch click",function(){
        $("#myorder-selectdiv").slideUp();
		
        myorder.myorderScreen();

//        runvownerval.page =2;  // 当前页，用于向页面发送请求的页码参数 第一次发送的为2 
//        runvownerval.loadcount=3;  // 页面展示的为第几页的数据 
//        hdrunvowner();
        
    })
// 订单详情页的操作
    $("#details-return").bind("touch click",function(){
        window.location.hash =  "#myorder";
    })
    // 看位置操作
    // 看出发的位置
    $("#details-clicklookdp").bind("touch click",function(){
        // 设置地图页的样式
        window.location.hash ="#busMap?xq";
        var result =  {P:parseFloat(details.detailsData.dLat),R:parseFloat(details.detailsData.dLng),lat:parseFloat(details.detailsData.dLat),lng:parseFloat(details.detailsData.dLng)};
        container.onclick(result);
    })
    // 看到达的位置
    $("#details-clicklookar").bind('touch click',function(){
        // 设置地图页的样式
        window.location.hash ="#busMap?xq";
        var result =  {P:parseFloat(details.detailsData.aLat),R:parseFloat(details.detailsData.aLng),lat:parseFloat(details.detailsData.aLat),lng:parseFloat(details.detailsData.aLng)};
        container.onclick(result);
    })
    // 价格页的操作
    $("#price-return").bind("touch click",function(){
        window.location.hash ="#selectcar?price";
    })
// 监控路由
    window.onhashchange = hashChange;
    hashChange();
})
// 封装的ajax请求
    /*  
        处理post请求
        data:请求的参数
        successCallback:成功的回调
        errorCallback:失败的回调
    */
    function  busAjax(data,successCallback,errorCallback){
        $.ajax({
            type:"post",
            url:data.url,
            data:data.data,
            success:function(data){
                successCallback(data);
            },
            error:function(data){
                errorCallback(data);
            }
        })
    }

// 路由监控函数
    function hashChange(){
        var hash = window.location.hash;
        var hashone =  hash.split("?");
        var hashval = hashone[0]; // 用来判断路由
        var hashzhi = hashone[1]; // 用来取数据
        $("#address-input").attr("autofocus","");
        if( hashval === ""){
            window.location.hash = "#bus";
        }else if( hashval ==="#bus" ){
            hashcsh();
            $(".bus").show();
        }else if( hashval ==="#selectcar" ){
          if ( hashzhi != "price") {
            selectcar.newPage();
          }
            hashcsh();
            $(".selectcar").show(); 
            $(".selectcar-content").outerHeight($(".selectcar").outerHeight()-$(".selectcar-hd").outerHeight()-$(".selectcar-submit").outerHeight());
            $(".selectcar-content").css("overflow-y","scroll");
        }else if ( hashval ==="#details" ){
            hashcsh();
            details.newPage();
            $(".details").show();
        }else if ( hashval ==="#busMap" ){
			hashcsh();
            if(hashzhi==="xq"){
                $(".busMap-hdright").text("查看位置");
                $(".busMap-city").hide();//显示
				$(".busMap-dz").hide();
				$("#busMap-return").unbind();
                $("#busMap-return").bind("touch click",function(){
                    window.history.back(-1);
				})
				$(".busMap").show();
            }else if(hashzhi==="dpcity"){
                obtainData.busMap = hashzhi;
                $(".busMap-hdright").text("选择起点");
                $(".busMap-city").show();//显示
				$(".busMap-dz").show();
				$("#busMap-return").unbind();
                $("#busMap-return").bind("touch click",function(){
                    window.location.hash = "#bus";
				})
				$(".busMap").show();
            }else if ( hashzhi==="arcity") {
                obtainData.busMap = hashzhi;
                $(".busMap-hdright").text("选择目的地");
                $(".busMap-city").show();//显示
				$(".busMap-dz").show();
				$("#busMap-return").unbind();
                $("#busMap-return").bind("touch click",function(){
                    window.location.hash = "#bus";
				})
				$(".busMap").show();
            } else if ( hashzhi== "seedpcity"){
				obtainData.busMap = "dpcity";
                $(".busMap-hdright").text("查看起点");
                $(".busMap-city").show();//显示
				$(".busMap-dz").show();
				$("#busMap-return").unbind();
                $("#busMap-return").bind("touch click",function(){
                    window.location.hash = "#bus";
                })
				var seedpcity_dz = "";
				var fabudpData = releaseData.fabudpData.data;
				if ( releaseData.fabudpData.isLocation ) {
					$("#busMap-dzname").text(fabudpData.formattedAddress);
					if ( null != fabudpData.addressComponent.township ) {
						seedpcity_dz += fabudpData.addressComponent.township;
					}else if ( null != fabudpData.addressComponent.street ) {
						seedpcity_dz += fabudpData.addressComponent.street;
					}else if (  null != fabudpData.addressComponent.streetNumber ) {
						seedpcity_dz += fabudpData.addressComponent.streetNumber;
					}
					$("#busMap-dzcityname").text(seedpcity_dz);
					var result =  {P:parseFloat(fabudpData.position.lat),R:parseFloat(fabudpData.position.lng),lat:parseFloat(fabudpData.position.lat),lng:parseFloat(fabudpData.position.lng)};
				}else {
					$("#busMap-dzname").text(fabudpData.name);
					$("#busMap-dzcityname").text(fabudpData.address);
					var result =  {P:parseFloat(fabudpData.location.lat),R:parseFloat(fabudpData.location.lng),lat:parseFloat(fabudpData.location.lat),lng:parseFloat(fabudpData.location.lng)};
				}
				$("#busMap-dzcity").text(releaseData.dpCity);
				$("#busMap-city").text(releaseData.dpCity);

				$(".busMap").show();
				container.onclick(result);
			} else if ( hashzhi== "seearcity" ){
				obtainData.busMap = "arcity";
                $(".busMap-hdright").text("查看目的地");
                $(".busMap-city").show();//显示
				$(".busMap-dz").show();
				$("#busMap-return").unbind();
                $("#busMap-return").bind("touch click",function(){
                    window.location.hash = "#bus";
				})
				var seearcity_dz = "";
				var fabuarData = releaseData.fabuarData;
				if ( fabuarData.isLocation ) {
					$("#busMap-dzname").text(fabuarData.data.formattedAddress);
					if ( null != fabuarData.data.addressComponent.township ) {
						seearcity_dz += fabuarData.data.addressComponent.township;
					}else if ( null != fabuarData.data.addressComponent.street ) {
						seearcity_dz += fabuarData.data.addressComponent.street;
					}else if (  null != fabuarData.data.addressComponent.streetNumber ) {
						seearcity_dz += fabuarData.data.addressComponent.streetNumber;
					}
					$("#busMap-dzcityname").text(seearcity_dz);
					var result =  {P:parseFloat(fabuarData.data.position.lat),R:parseFloat(fabuarData.data.position.lng),lat:parseFloat(fabuarData.data.position.lat),lng:parseFloat(fabuarData.data.position.lng)};
				}else {
					$("#busMap-dzname").text(fabuarData.data.name);
					$("#busMap-dzcityname").text(fabuarData.data.address);
					var result =  {P:parseFloat(fabuarData.data.location.lat),R:parseFloat(fabuarData.data.location.lng),lat:parseFloat(fabuarData.data.location.lat),lng:parseFloat(fabuarData.data.location.lng)};
				}
				$("#busMap-dzcity").text(releaseData.arCity);
				$("#busMap-city").text(releaseData.arCity);

				$(".busMap").show();
				container.onclick(result);
			}
        }else if ( hashval ==="#address" ){
            hashcsh();
            // 清空操作
            $("#address-input").val("");
            $("#add-address").empty();

            $("#address-input").attr("autofocus","autofocus");
            $(".address").show();
        }else if ( hashval ==="#myorder" ){
            hashcsh();
            $(".myorder").show();			
			//我的订单
			//全部行程页 车主页的高度 
			myorder.myorderPage("","","");
			$(".myorder").outerHeight($(document.body).outerHeight());
			$(".myorder-gdwcdiv").outerHeight($(".myorder").outerHeight()-$(".myorder-header").outerHeight());
        }else if ( hashval ==="#price" ){
            price.newPage();
            hashcsh();
            $(".price").show();
			$(".price-newcenter").outerHeight($(".price").outerHeight()-$(".price-header").outerHeight());
			$(".price-newcenter").css("overflow-y","scroll");
        }else if ( hashval ==="#screenCity"){
            hashcsh();
            $(".screen-city").show();
			// 城市选择页绑定
            screen_city.newPage();
        }
        function hashcsh(){
            $(".bus").hide();
            $(".selectcar").hide();
            $(".details").hide();
            $(".busMap").hide();
            $(".address").hide();
            $(".myorder").hide();
            $(".screen-city").hide();
            $(".price").hide();
        }
    }
// 返回的的代码
    function register(val){
        var nowhref = window.location.href;
        localCache("page",nowhref);     // 存储在本地的地址
        window.location.href = val;		// 发送给他的地址 	
    }  
// 价格页的操作
    var price = {
        newPage:function(){
            $("#price-exceedtime").text(releaseData.clickbus.hourPrice+"元/小时");
			$("#price-exceedkile").text(releaseData.clickbus.disPrice+"元/公里");
			$("#price-supermoney").text(releaseData.clickbus.emptyPrice+"元/公里");
        }
    }
// 我的订单页的操作
    var myorder = {
        coid:"",
        status:"",
        dateRange:"",
        myorderData:"",
        myorderPage:function(coid,status,dateRange){
            $.ajax({
                url:"//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/queryPageMadeChaOrders.asp",
                type:"post",
                data:{
                    cur:1,       	//查看页码
                    uid:newPageData.uid,       	//用户id 
                    coid:coid,			//订单id
                    status:status,		    //状态
                    pageSize:8,             // 首页默认取8条数据
                    dateRange:dateRange   	//日期范围（"today","weekday","month"）
                },
                success:function(data){
                    console.log("请求订单成功",data);
                    $("#idmyorder").empty();
                    if( data.result>0){
                        myorder.myorderData =  data.obj.coList;
                        for(var i = 0;i<myorder.myorderData.length;i++){
                            $("#idmyorder").append(obtainData.template.myorder);
                            myorder.myorderRender(myorder.myorderData[i]);
                        }
 						
						if(data.page === 1){
							myorder.lastShow();
						}else if (data.page>1){
                            runvownerval.page = data.page;
                            hdrunvowner(status,dateRange);
                        }
                    }else{
						myorder.errShow();
					}
                },
                error:function(data){
                    console.log("请求订单失败",data);
                }
            })
        },
		statusHide:function(){
			$(".runvownerNode-load-status").find("p").hide();	
		},
		lastShow:function(){
			this.statusHide();
			$(".infinite-scroll-last").show();
		},
		errShow:function(){
			this.statusHide();
			$(".infinite-scroll-error").show();
		},
        myorderRender:function(val){
			// 还要根据订单状态，添加按钮
			// 最大的div
			var myorder_od = "myorder-od"+val.id;
			$("#myorder-od").attr("id",myorder_od);
			// 结果，还要添加什么按钮
			var odstatus = "";
			// 状态（-2:待退款；-1:取消；0：下单；1：完成；2：待付款）
			$("#myorder-odbutton").empty();
			if (  Date.parse(new Date()) > (Date.parse(val.departureTime)+86400000)){
				// 以下单的话，有个取消按钮，其他没有
				$("#myorder-odbutton").append('<a href="#bus" class="tjorder-myorderts">如需包车,请重新下单!</a>');
				odstatus = "已失效";
			}else { 
					if(val.status===-2){
						odstatus = "待退款";
						$("#myorder-odbutton").append('<span class="tjorder-myorderts">如有疑问请拨打客服电话</span>');
					}else if (val.status===-1){
						odstatus = "已取消";
						$("#myorder-odbutton").append('<a href="#bus" class="tjorder-myorderts">如需包车,请重新下单!</a>');
					}else if (val.status===0){
						odstatus = "已下单";        
					
						// 以下单的话，有个取消按钮，其他没有
						$("#myorder-odbutton").append('<span id="myorder-ddcancel" class="tjorder-submitbutton"  >取消订单</span>');
						
						$("#myorder-ddcancel").bind("touch click",function(){
							myorder.myorderqx(val.uid,val.id,0);
						})
						var myorder_ddcancelthree ="myorder-ddcancel"+val.id;
						$("#myorder-ddcancel").attr("id",myorder_ddcancelthree);
						
					}else if (val.status===1){
						odstatus = "已付款";
						var khtime = Date.parse((val.departureTime).replace(/-/g,"/"));
						var jttime =  Date.parse(new Date().toLocaleDateString().replace(/-/g,"/"));
						console.log("时间比较",khtime,jttime);
						if (parseInt(khtime) -  parseInt(jttime)  >  86400000){
							$("#myorder-odbutton").append('<span id="myorder-ddcancel" class="tjorder-submitbutton">取消订单</span>');
							$("#myorder-ddcancel").bind("touch click",function(){
								myorder.myorderqx(val.uid,val.id,0);
							})
							var myorder_ddcancelone = "myorder-ddcancel"+val.id;
							$("#myorder-ddcancel").attr("id",myorder_ddcancelone);
							// 1也可以取消，要判断提前一天没有。
						}else {
							$("#myorder-odbutton").append('<span class="tjorder-myorderts">祝您乘车愉快!</span>');
						}
					}else if (val.status===2){
						// 待付款下，有个取消的按钮和支付的按钮
						odstatus = "待付款";
						$("#myorder-odbutton").append('<span id="myorder-qrpaymonney" class="tjorder-submitbutton">确认支付</span><span id="myorder-ddcancel"  class="tjorder-submitbutton">取消订单</span>');
						$("#myorder-qrpaymonney").bind("touch click",function(){
							paymentModule.payMoney(parseFloat(val.price),val.uid,val.id,0);
						})
						var myorder_qrpaymonneytwo = "myorder-qrpaymonney"+val.id;
						$("#myorder-qrpaymonney").attr("id",myorder_qrpaymonneytwo);
						//  绑定事件
						$("#myorder-ddcancel").bind("touch click",function(){
							myorder.myorderqx(val.uid,val.id,0);
						})
						var myorder_ddcanceltwo = "myorder-ddcancel"+val.id;
						$("#myorder-ddcancel").attr('id',myorder_ddcanceltwo);
					}
			}
           
            var myorder_odbutton = "myorder-odbutton"+val.id;
            $("#myorder-odbutton").attr("id",myorder_odbutton);

            $("#myorder-odstatus").text(odstatus);

            var myorder_odstatus = "myorder-odstatus"+val.id;
            $("#myorder-odstatus").attr("id",myorder_odstatus);
            // 城际市内
            if(val.dpCity==="常州市" && val.arCity==="常州市"){
                $("#myorder-oddistance").text("市内");
            }else {
                $("#myorder-oddistance").text("城际");
			}
			$("#myorder-oddistance").attr("id","myorder-oddistance"+val.id);
            // 起点
            $("#myorder-oddpcity").text(val.departure);
            var myorder_oddpcity = "myorder-oddpcity"+val.id;
            $("#myorder-oddpcity").attr("id",myorder_oddpcity);
            // 终点
            $("#myorder-odarcity").text(val.arrival);
            var myorder_odarcity = "myorder-odarcity"+val.id;
			$("#myorder-odarcity").attr("id",myorder_odarcity);

			// 起点城市
            $("#myorder-newdpcity").text(val.dpCity);
            var myorder_newdpcity = "myorder-newdpcity"+val.id;
            $("#myorder-newdpcity").attr("id",myorder_newdpcity);
            // 终点城市
            $("#myorder-newarcity").text(val.arCity);
            var myorder_newarcity = "myorder-newarcity"+val.id;
			$("#myorder-newarcity").attr("id",myorder_newarcity);
			
            // 出发时间
            $("#myorder-oddptime").text(val.departureTime);
            var myorder_oddptime = "myorder-oddptime"+val.id;
            $("#myorder-oddptime").attr("id",myorder_oddptime);
            // 返程时间
            if(val.useType==="Return"){
                $("#myorder-odartime").text(val.returnTime);
            }else {
                $("#myorder-odartime").text("无返程");
            }
            var myorder_odartime = "myorder-odartime"+val.id;
            $("#myorder-odartime").attr("id",myorder_odartime);
            // 价格
            if( null == val.price   || val.price == ""){
                //状态（-2:待退款；-1:取消；0：下单；1：完成；2：待付款）
                var pricevalmoney = "";
                if(val.status===-2){
                    pricevalmoney ="待退款";
                }else if (val.status===-1){
                    pricevalmoney ="已取消";
                }else if (val.status===0){
                    pricevalmoney ="待确认";
                }else if (val.status===1){
                    pricevalmoney ="已确认";
                }else if (val.status===2){
                    pricevalmoney ="待付款";
                }
                $("#myorder-odprice").text(pricevalmoney);
            }else {
                $("#myorder-odprice").text(val.price);
                
            }
            var myorder_odprice = "myorder-odprice"+val.id;
            $("#myorder-odprice").attr("id",myorder_odprice);    
            // a标签
            var ahref = "//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/charteredBus.html#details"+"?uid="+val.uid+"&id="+val.id;
            $("#myorder-odahref").attr("href",ahref);
            var myorder_odahref = "myorder-odahref"+val.id;
            $("#myorder-odahref").attr("id",myorder_odahref);
        },
        myorderScreen:function(){   //点击确认按钮
			myorder.statusHide();	//重置状态栏
			$('#idmyorder').infiniteScroll('destroy'); //销毁滚动加载
			$('#idmyorder').off( 'load.infiniteScroll', onPageLoad); //注销滑动监听
			
			$(".myorder-gdwcdiv").animate({ scrollTop: 0 }, 10);  //返回顶部
						
            myorder.myorderPage(myorder.coid,myorder.status,myorder.dateRange);
        },
        myorderSelect:function(val,divname){
            if(val === 1){
                $("#myorder-today").css("color","#555");
                $("#myorder-week").css("color","#555");
                $("#myorder-month").css("color","#555");
                $("#myorder-timeqb").css("color","#555");
            }else if ( val ===2){
                $("#myorder-stsqx").css("color","#555");
                $("#myorder-ststk").css("color","#555");
                $("#myorder-stsxd").css("color","#555");
                $("#myorder-stswc").css("color","#555");
                $("#myorder-stsdfk").css("color","#555");
                $("#myorder-stsqb").css("color","#555");
            }
            $(divname).css("color","red");
        },
		myorderqx:function(uid,id,pdval){ //  取消的操作
			uid = ""+uid;
			id = "" + id;
			pdval = "" + pdval;
			showMessage2btn("确认取消订单吗?","myorder.ConfirmCancel(" + uid + "," + id + ",\"" + pdval + "\")");
		},
		ConfirmCancel:function(uid,id,pdval){
			uid = parseFloat(uid);
			id = parseFloat(id);

			showLodding("请稍等,取消中...");
			console.log("取消",uid,id);
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/cancelChaOrder.asp",
                data:{
                    uid:uid,
                    id:id
                },
                success:function(data){
					/* 加载成功，取消提示按钮 */
					clearDialog();
                    console.log("取消成功",data);
                    // 成功后，要调用下页面渲染的数据，再次渲染一下
                    if (data.result == 1) {
                        showMessage1btn("取消成功!","",0);
                        myorder.myorderPage("","","");
                        // 我的订单页绑定无限滚动效果
                        //hdrunvowner();
                        if (pdval=="详情页"){
                            details.newPage();
                        }
                    }else if(data.result == -1) {
                        showMessage1btn("取消失败,请重试!","",0);
                        myorder.myorderPage("","","");
                        // 我的订单页绑定无限滚动效果
                        //hdrunvowner();
                    }
                },
                error:function(data){
					/* 加载成功，取消提示按钮 */
					clearDialog();
					console.log("取消失败",data);
					if ( null == data.msg || "" == data.msg ) {
						showMessage1btn("网络出错，请重试!","",0);
					}else {
						showMessage1btn(data.msg,"",0);
					}
                }
            })
		}
	}
// 取消订单的操作

 // 支付模块
 var  paymentModule = {
    paymentbttsj:{
        title:"",
        amount:0,
        billno: "",   // 生成订单号 
        instant_channel:"wx", // 订单支付形式 
        openid:{},  // openid的存储 
        usource:"Wx_Kbt",   // 用户的来源 
        FROID:111     // 发布单号，取当前信息的id值 
    },
    payMoney:function(moneyVal,valuid,valid,pddval){  // 只有乘客报名车主的行程才需要付钱 
		// valuid,valid  uid值和id值   valForid：支付单号
		//paymentModule.payMoney(parseFloat(val.price),val.uid,val.id,0);
		console.log(moneyVal,valuid,valid)
		$.ajax({
			type:"post",
			url:"//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/getChaOrderDetails.asp",
			data:{
				id:parseFloat(valid),       //信息id
				uid:newPageData.uid,      //用户id
			},
			success:function(success){
				console.log("支付判断-成功",success)
				showMessage1btn("","",0);
				//状态（-2:待退款；-1:取消；0：下单；1：完成；2：待付款）
				if (success.obj.status == -2 ){
					showMessage1btn("订单待退款中","",0);
				}else if (success.obj.status == -1 ){
					showMessage1btn("订单已取消","",0);
				}else if (success.obj.status == 0 ){
					showMessage1btn("订单待确认中","",0);
				}else if (success.obj.status == 1 ){
					showMessage1btn("订单已完成","",0);
				}else if (success.obj.status == 2 ){
					// 执行付款程序
					payLower();
				}
			},
			error:function(error){
				console.log("支付判断-失败",error)
				showMessage1btn("网络出错,稍后在试","",0);
			}
		})
		
        function payLower(){
			var paymentbttsj =  paymentModule.paymentbttsj;
			paymentbttsj.title = "包车付款";
			var bSign = "";
	
			var rand = "";
			for(var i = 0; i < 3; i++){
				var r = Math.floor(Math.random() * 10);
				rand += r ;
			}
			// 生成时间戳 "yyyyMMddhhmmss" 格式
			function pad2(n) { return n < 10 ? '0' + n : n };
			function generateTimeReqestNumber() {
				var date = new Date();
				return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
			}
			var sjc = "CAO"+generateTimeReqestNumber()+rand;
	
			paymentbttsj.billno = sjc;
	
			// 这里调用后那个 函数，发布单号，接受单号后，后面再继续
			// 向后台请求 id 
				var paymentbttsj =  paymentModule.paymentbttsj;
					// 参数
				paymentbttsj.amount   = moneyVal*100;
				var param = {"title" : paymentbttsj.title,"amount" : paymentbttsj.amount,"outtradeno" : paymentbttsj.billno};
				// 地址
				var url = "../../MobileWeb/common/getBSign-kongbatong.asp";
				// sfcsj.passenger 存储着用户的信息 
				paymentbttsj.openid = {
					uid:valuid,
					phone:newPageData.phone,
					usource:paymentbttsj.usource,
					caoId:parseFloat(valid)
				};
				console.log(param);
				$.post(url,param,function(data){

					if (!((typeof (data) == 'object') && data.constructor == Object)) {
						data = eval("(" + data + ")");
					}
					if(data.BSign) {
						bSign = data.BSign;
					BC.err = function(data) {
						console.log(data);
						//注册错误信息接受
						showMessage1btn(data["ERROR"],"",0);
					}
					console.log("aaaa",bSign,"aaaa",newPageData.openid,"aaaa",paymentbttsj.openid);
				BC.click({
					// "instant_channel" : paymentbttsj.instant_channel,
					"debug" : false,
					"need_ali_guide" : true,
					"use_app" : true,
					"title" : paymentbttsj.title, //商品名
					"amount" : moneyVal*100,  //总价（分）
					"out_trade_no" : paymentbttsj.billno, //自定义订单号
					"sign" : bSign, //商品信息hash值，含义和生成方式见下文
					"openid" : newPageData.openid,
					"optional" : paymentbttsj.openid //可选，自定义webhook的optional回调参数
				},
				{
					wxJsapiFinish : function(res) {
					switch(res.err_msg){
						case "get_brand_wcpay_request:ok":
							
							// 支付成功后，要刷新下页面
							myorder.myorderPage("","","");
							// 我的订单页绑定无限滚动效果
							//hdrunvowner();
							if ( pddval =="详情页") {
								details.newPage();
							}
							showMessage1btn("支付成功","to_myorder()",0);
							break;
						case "get_brand_wcpay_request:fail":
							showMessage1btn("系统出错，请联系我们！","to_myorder()",0);
							break;
						case "get_brand_wcpay_request:cancel":
							showMessage1btn("已取消支付！","to_myorder()",0);
							// 取消支付
							break;
						}
					}
				});
				BC.err = function(err) {
					//err 为object, 例 ｛”ERROR“ : "xxxx"｝;
					showMessage1btn(err.ERROR,"to_myorder()",0);
				}
				}else{
					showMessage1btn("后台参数错误！","to_myorder()",0);
				}                                           
					// 删除dialog
					clearDialog();
				},"json")
		}
    }
}
// 跳转到我的订单页
	function to_myorder(){
		myorder.myorderScreen();
		myorder.myorderPage("","","");
		window.location.reload();
	}
// 我的订单的无限滚动效果
    var runvownerval = {
        page:2,   // 当前页，用于向页面发送请求的页码参数 第一次发送的为2 
        loadcount:3  // 页面展示的为第几页的数据 
    }
    function hdrunvowner(status,dateRange){
		status = status?status:"";
		dateRange = dateRange?dateRange:"";
        var $runpassengerval = $('#idmyorder').infiniteScroll({     //#content是包含所有图或块的容器
            path: function(){
                // 如果用户滑动时，当前页面展示的数据页码小于等于后台的数据页码 
                // 数据量很小情况下  报错了 
                if(  this.loadCount <= runvownerval.page - 2 ){
                    // 获取全部时间的行程，失效页没有关系 
                    return "//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/queryPageMadeChaOrders_get.asp?cur="+(this.loadCount+2)+"&uid="+newPageData.uid+"&coid="+"&status="+status+"&dateRange="+dateRange+"&pageSize=8";
                }
            },
			append:".tjorder",
            history: false,
			historyTitle: false,
            elementScroll:".myorder-gdwcdiv",
            scrollThreshold:50,
            status:".runvownerNode-load-status",
            responseType:"json"
            //debug:true
        });
        $runpassengerval.on( 'load.infiniteScroll', onPageLoad)
    }
	
	function onPageLoad( event, response ) {
		var data = response;
		// 获取成功后，要把页面加1，方便用户在滑动，在触发获取函数
		// 开始处理结果 
		// 赋值最大页数 
		runvownerval.loadcount = data.page;
		runvownerval.page = data.page;
			if( data.result>0){
				for(var i = 0;i<data.obj.coList.length;i++){
					$("#idmyorder").append(obtainData.template.myorder);
					myorder.myorderRender(data.obj.coList[i]);
				}
			}
	}
	
// 详情页的设置
    var details = {
        detailsData:"",     //详情页的数据
        newPage:function(){
            var hash = window.location.hash;
            var hashone =  hash.split("?");
            var hashzhi = hashone[1]; // 用来取数据   uid=3&id=2
            var hashtwo = hashzhi.split("&");   //  uid= 3  id=2
            var uida = hashtwo[0].split("=");   
            var ida  = hashtwo[1].split("=");
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/getChaOrderDetails.asp",
                data:{
                    uid:parseInt(uida[1]),
                    id:parseInt(ida[1]) 
                },
                success:function(data){
                    console.log("详情页获取成功的数据",data);
                    if(data.result>0){
                        details.detailsData = data.obj;
                        details.renderPage(uida[1],data.obj);
                    }
                },
                error:function(data){
                    console.log("详情页获取失败的数据",data);
                }
            })
        },
        renderPage:function(uida,val){
            // 单程？
                if(val.useType==="Return"){
                    $("#details-reType").text("往返");
                    $("#details-artime").text(val.returnTime);
                }else {
                    $("#details-reType").text("单程");
                    $("#details-artime").text("无返程");
                }
            // 添加按钮的地方
				$("#details-buttonan").empty();
				if ( Date.parse(new Date()) > (Date.parse(val.departureTime)+86400000)) {
					odstatus = "(已失效)";
					$("#details-buttonan").append('<a href="#bus" class="details-myorderts">如需包车,请重新下单!</a>');
				}else {
					if(val.status===-2){
						odstatus = "(待退款)";
						$("#details-buttonan").append('<span class="details-myorderts">如有疑问请拨打客服电话</span>');
					}else if (val.status===-1){
						odstatus = "(已取消)";
						$("#details-buttonan").append('<a href="#bus" class="details-myorderts">如需包车,请重新下单!</a>');
					}else if (val.status===0){
						odstatus = "(已下单)";        
						
						// 以下单的话，有个取消按钮，其他没有
						$("#details-buttonan").append('<span id="myorder-ddcancel" class="details-submitbutton"  style="display:block;">取消订单</span>');
		
						$("#myorder-ddcancel").bind("touch click",function(){
							myorder.myorderqx(uida,val.id,"详情页");
						})
						
						var myorder_ddcancelthree ="myorder-ddcancel"+"details";
						$("#myorder-ddcancel").attr("id",myorder_ddcancelthree);
					}else if (val.status===1){
						odstatus = "(已付款)";
						var khtime = Date.parse((val.departureTime).replace(/-/g,"/"));
						var jttime =  Date.parse(new Date().toLocaleDateString().replace(/-/g,"/"));
						console.log("时间比较",khtime,jttime);
						if (parseInt(khtime) -  parseInt(jttime)  >  86400000){
							$("#details-buttonan").append('<span id="myorder-ddcancel" class="details-submitbutton" style="display:block;">取消订单</span>');
							$("#myorder-ddcancel").bind("touch click",function(){
								myorder.myorderqx(uida,val.id,"详情页");
							})
							var myorder_ddcancelone = "myorder-ddcancel"+"details";
							$("#myorder-ddcancel").attr("id",myorder_ddcancelone);
							// 1也可以取消，要判断提前一天没有。
						}else {
							$("#details-buttonan").append('<span class="details-myorderts">祝您乘车愉快!</span>');
						}
					}else if (val.status===2){
						// 待付款下，有个取消的按钮和支付的按钮
						odstatus = "(待付款)";
						$("#details-buttonan").append('<span id="myorder-qrpaymonney" class="details-submitbutton" style="float:left;">确认支付</span><span id="myorder-ddcancel"  class="details-submitbutton" style="float:right;">取消订单</span>');
						$("#myorder-qrpaymonney").bind("touch click",function(){
							paymentModule.payMoney(parseFloat(val.price),uida,val.id,"详情页");
						})
						var myorder_qrpaymonneytwo = "myorder-qrpaymonney"+"details";
						$("#myorder-qrpaymonney").attr("id",myorder_qrpaymonneytwo);
						//  绑定事件
						$("#myorder-ddcancel").bind("touch click",function(){
							myorder.myorderqx(uida,val.id,"详情页");
						})
						var myorder_ddcanceltwo = "myorder-ddcancel"+"details";
						$("#myorder-ddcancel").attr('id',myorder_ddcanceltwo);
					}
				}
                
                  $("#details-biaotitshi").text(odstatus);   
            // 支付
            if( null == val.payPrice  && null == val.outTradeNo){
                $("#details-price").hide();
            }else {
				// 进行渲染
				if ( null == val.payPrice) {
					$("#details-priceje").text("无支付信息");
				}else {
					$("#details-priceje").text(val.payPrice+"(已支付金额)");
				}
                if ( null != val.payDate ) {
					$("#details-pricetime").text(val.payDate);
				}else {
					$("#details-pricetime").text("");
				}
				if ( null != val.price) {
					$("#details-pricedh").text(val.price);
				}else {
					$("#details-pricedh").text("");
				}
				if ( null != val.outTradeNo ) {
					$("#details-oddsz").text(val.outTradeNo);
				}else {
					$("#details-oddsz").text("");
				}
                $("#details-oddNumber").show();
                // 存在数据则渲染
                $("#details-price").show();
			}
			
            // 退款
            if ( null == val.refundPrice  &&  null ==   val.outTradeNo ) {
                $("#details-refund").hide();
            }else {
				if ( null  == val.refundPrice) {
					$("#details-refundje").text("无退款信息");
				}else {
					$("#details-refundje").text(val.refundPrice+"(退款金额)");
				}
                if ( null != val.refundDate)  {
					$("#details-refundtime").text(val.refundDate);
				}else {
					$("#details-refundtime").text("");
				}
				if ( null != val.refundNo && "" != val.refundNo )  {
					$("#details-refunddh").text(val.refundNo+"(退款号)"); 
				}else {
					$("#details-refunddh").text("");
				}
                if ( null != val.outTradeNo ) {
					$("#details-oddsz").text(val.outTradeNo);
				}else{
					$("#details-oddsz").text("");
				}
                $("#details-oddNumber").show();
                $("#details-refund").show();
            } 
            // 位置信息
            $("#details-dptime").text(val.departureTime);
            $("#details-dpname").text(val.departure);
            $("#details-dpcity").text(val.dpCity);

            $("#details-arname").text(val.arrival);
            $("#details-arcity").text(val.arCity);
            // 车的信息
            $("#details-carperson").text(val.carInfo.pseats);
            $("#details-cardx").text(val.carInfo.trunks);
            $("#details-carname").text(val.carInfo.name);
            var details_img = "";
            if (val.carInfo.name==="舒适型") {
                details_img = "./charteredBus/img/buscarone.png";
            }else if (val.carInfo.name ==="商务型"){
                details_img = "./charteredBus/img/buscarfour.png";
            }else if (val.carInfo.name ==="11座小巴"){
                details_img = "./charteredBus/img/buscarthree.png";
            }else if (val.carInfo.name ==="19座中巴"){
                details_img = "./charteredBus/img/buscarthree.png";
            }else {
                details_img = "./charteredBus/img/buscartwo.png";
            }
            $("#details-carimg").attr("src",details_img);
            // 留言信息
            $("#details-mackera").text(val.remark);
        }
    }
// 首页操作的函数
    var bus = {
        newselectcar:function () {
            // 还要判断
            var tellTips = 0;
            // 获取手机号：
            var phone = document.getElementById('tell-phone').value;
            var cfsjb =  $("#dt-a-0").attr("data-val");
            var mdsjb =  $("#dt-c-1").attr("data-val");
            // 判断
            if ( newPageData.uid ===0){
                tellTips ="请登录";
            }else if ( newPageData.openid ===0) {
                tellTips ="请登录";
            }else if ( releaseData.useType === "" ) {
                tellTips ="请选择包车方式";
            }else if ( releaseData.useType === "单程" ){
                var cfsja =  $("#dt-a-0").attr("data-val");
                if(cfsja==""){
                    tellTips ="请选择上车时间";
                }
            }else if ( releaseData.useType === "往返" ){
                if(cfsjb==""){
                    tellTips ="请选择上车时间";
                }else if (mdsjb==""){
                    tellTips ="请选择返程时间"; 
                }
		      	} 
			
			
            if (releaseData.fabudpData.data=="") {
                tellTips ="请选择出发地";
            }else if (releaseData.fabuarData.data==""){
                tellTips ="请选择到达地";
            }
            
            var dpCity=releaseData.dpCity;          //出发城市
            if (dpCity != releaseData.arCity){
                if ( new Date(cfsjb).getHours() >=2  && new Date(cfsjb).getHours() <5 ){
                    tellTips ="跨市,不能选择夜里2点到5点";
                }
                if(mdsjb!=""){
                    if (new Date(mdsjb).getHours()  >=2 && new Date(mdsjb).getHours() <5 ){
                        tellTips ="跨市,不能选择夜里2点到5点";
                    }
                }
            }
           
            
            if ( releaseData.fabuarData.isOk ){
              if ( releaseData.fabuarData.isLocation){
                if ( fabuarData.data.position  ||null == releaseData.fabuarData.data.position.lng ){
                  tellTips ="请重新选择目的地";
                }
              }else {
                if (  null == releaseData.fabuarData.data.location || null == releaseData.fabuarData.data.location.lng   ){
                  tellTips ="请重新选择目的地";
                }
              }
              
            }
            if ( releaseData.fabudpData.isOk ){
              if ( releaseData.fabudpData.isLocation){
                if ( fabudpData.data.position  ||null == releaseData.fabudpData.data.position.lng ){
                  tellTips ="请重新选择出发地";
                }
              }else {
                if (  null == releaseData.fabudpData.data.location || null == releaseData.fabudpData.data.location.lng   ){
                  tellTips ="请重新选择出发地";
                }
              }
            }
			
			
            if (!(/^1[34578]\d{9}$/.test(phone))){
                // 验证手机号
                tellTips ="手机号码不正确";
            }else if ($("#bus-dpcity").text() == $("#bus-arcity").text()) {
                //阻止发布相同的数据
                tellTips="注意！出发地目的地一致";
            }else if ($("#bus-personinput").val()==""){
                tellTips ="请填写联系人姓名";
            }else if ($("#tell-phone").val()=="") {
                tellTips ="请填写联系人电话";
            }else if ( Date.parse($("#dt-a-0").attr("data-val").replace(/-/g,"/")) > Date.parse($("#dt-a-0").attr("data-val").replace(/-/g,"/")+1000) ) {
                tellTips="时间选择出错,请注意";
            }

            if (tellTips === 0 || tellTips==="") {
                // 成功则赋值
                if ( releaseData.useType === "往返") {
                    var cfsj =  $("#dt-a-0").attr("data-val");
                    var mdsj =  $("#dt-c-1").attr("data-val");
                    // 赋值
                    releaseData.departureTime = cfsj;
                    releaseData.returnTime = mdsj;
                }else if ( releaseData.useType === "单程"){
                    var cfsj =  $("#dt-a-0").attr("data-val");
                    // 赋值
                    releaseData.departureTime = cfsj;
                }
                releaseData.contact = $("#bus-personinput").val();
                releaseData.contactNumber = parseInt($("#tell-phone").val());
                window.location.hash = "#selectcar";
            }else {
                showMessage1btn(tellTips,"",0);
                console.log(tellTips);
                return false;
            }
        }
    }
// 车型选择页的操作
    // 注意事项：
    // 以后会是多个套餐，目前按一个套餐来计算。当添加套餐时，在添加更多内容。
    var  selectcar  = {
        // 要阻止重复提交
        olddpcityname:'',
        oldarcityname:'',
        carTypeData:[],     // 存储的数据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        choseTypeData:"",  // 存储被选中的数据
        selectcar_kilometre:0,  // 距离
        setmealArr:"",       // 套餐的数据
        readChaPackageTypes:function(){
          $.ajax({
            type:"post",
            url:"//qckj.czgdly.com/bus/MobileWeb/buyTicket/readChaPackageTypes.asp",
            data:{
              id:"",
            },
            success:function(data){
              console.log("套餐success",data);
              if ( data.result > 0 ){
                selectcar.setmealArr = data.obj.lilist;
                $("#scroll-wraper").outerWidth($(document.body).outerHeight()*data.obj.lilist.length);
                $("#scroll-wraper").empty();
                for (var i = 0;i<data.obj.lilist.length;i++) {
                  $("#scroll-wraper").append('<div id="scroll-item-div" class="scroll-item-div clearfix"><div class="scroll-item" id="scroll-item"><div class="name" id="setmeal-name">套餐'+data.obj.lilist[i].id+'</div><div class="content" id="setmeal-ctheader">'+data.obj.lilist[i].name+'</div><div class="tell">超出请参考预订须知</div></div></div>');
                  // 绑上是数组的第几个数组元素
                  selectcar.setMeal_bind(i);
                } 
                
                // 调用滑动效果
                selectcar.setMeal_touch();
                // 默认为第一个套餐
                selectcar.cartype(data.obj.lilist[0].id,false);
              }
            },
            error:function(data){
              console.log("套餐error",data);
            }
          })
        },
        setMeal_touch:function(){
          var nowitem = 1;  // 当前是第几个，默认第一个
          var startX = 0;
          var endX = 0;
          var bodyWidth = parseFloat($(document.body).outerHeight());
          $("#scroll-wraper").bind("touchstart",function(e){
            startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
          })

          $("#scroll-wraper").bind("touchend",function(e){
            endX = e.originalEvent.changedTouches[0].pageX;
             
             if (nowitem == 1 ){
                
                if ( endX < startX ) {
                  // 鼠标向左
                  // 想向右滑
                  nowitem ++ ;
                }
             }else if (nowitem == selectcar.setmealArr.length) {
                // 最后一页只能往左
                if ( endX > startX){
                  // 鼠标向右
                  nowitem  -- ;
               }
             } else if ( nowitem >1 && nowitem < selectcar.setmealArr.length ) {
                // 1:0
                // 2: -667
                // 3: -667*2 
                if ( endX < startX ) {
                  // 鼠标向左滑 endX > startX
                  nowitem ++ ;
                  
                }else  if ( endX > startX){
                  // 鼠标向右滑 endX < startX
                  // 图片要 减
                  nowitem  -- ;
                }

             }else if (nowitem <1) {
               nowitem = 1;
             }
             $("#scroll-wraper").css("transform","translateX("+-(nowitem-1)*bodyWidth+"px)");
              //  调用
             selectcar.filp(nowitem);
             console.log("滑动",nowitem,startX,endX);

          })
        },
        filp:function(id){
            // 1
            // 要请求 0的数据
           id = id - 1 ;

          $("#scroll-item-div>.scroll-item").css("background","#fff");
          $(".scroll-item>.name").css("color","#2577e3");
          $(".scroll-item>.content").css("color","#9c622a");
          $(".scroll-item>.tell").css("color","#999");

          $("#scroll-item"+id).css("background","#2577e3");
          $("#scroll-item"+id+">.name").css("color","#fff");
          $("#scroll-item"+id+">.content").css("color","#fff");
          $("#scroll-item"+id+">.tell").css("color","#fff");
          var select_data =  selectcar.setmealArr.find(function(value, indexes, arr){  if( id == indexes){return value}});// 得到目前是第几个套餐
          console.log("选择套餐的数据",select_data,"选择的套餐",select_data.id);
          selectcar.cartype(select_data.id,true);
        },
        setMeal_bind(id){
          // 赋宽度
          $("#scroll-item-div").outerWidth($(document.body).outerHeight());
          $("#scroll-item-div").attr("id","scroll-item-div"+id);
          $("#scroll-item").attr("id","scroll-item"+id);
        },
        cartype:function(PTId,isnewPage){
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/buyTicket/readChaCarTypes.asp",
                data:{
                    top:0,
                    id:"",
                    PTId:PTId
                },
                success:function(data){
                    console.log("车辆类型数据",data);
                    selectcar.carTypeData = [];
                    selectcar.carTypeData = data.obj.lilist;
                    if(data.result>0){
                        $("#selectcar-addcar").empty();
                        for(var i = 0;i<data.obj.lilist.length;i++){
                            $("#selectcar-addcar").append(obtainData.template.selectcar);
                            selectcar.selectcarRender(i,data.obj.lilist[i]);
                        }
                        selectcar.selectcarBind();
                        if ( null != isnewPage && isnewPage){
                          selectcar.newPage();
                        }
                    }
                },
                error:function(data){
                    console.log(data);
                }
            })
        },
        selectcarRender:function(i,val){
            console.log(i,val);
            // id号，给用户找数据用
            $("#selectcar-id").text(i);
            var sid =  "selectcar-id"+i;
            $("#selectcar-id").attr("id",sid);
            // icon
            var icon = "selectcar-carspan"+i;
            $("#selectcar-carspan").attr("id",icon);
            // img
            var imgsrc = "";
            if(val.name==="舒适型"){
                imgsrc = "./charteredBus/img/buscarone.png";
            }else if (val.name==="商务型"){
                imgsrc = "./charteredBus/img/buscarfour.png";
            }else if (val.name==="11座小巴"){
                imgsrc ="./charteredBus/img/buscarthree.png";
            }else if (val.name ==="19座中巴") {
                imgsrc ="./charteredBus/img/buscarthree.png";
            }else {
                imgsrc = "./charteredBus/img/buscartwo.png";
            }
            var imgdiv = "selectcar-img"+i;
            $("#selectcar-img").attr("src",imgsrc);
            $("#selectcar-img").attr("id",imgdiv);
            // 名字
            $("#selectcar-name").text(val.name);
            var name = "selectcar-name"+i;
            $("#selectcar-name").attr('id',name);
            // div
            var cardiv = "selectcar-car"+i;
            $("#selectcar-car").attr("id",cardiv);
        },
        selectcarBind:function(){
            // 点击选车
            $("#selectcar-car0").bind("touch click",function(e){
                e.preventDefault();
                selectcar.clickbus(0,"#selectcar-car0");
                e.stopPropagation()
            })
            $("#selectcar-car1").bind("touch click",function(e){
                e.preventDefault()
                selectcar.clickbus(1,"#selectcar-car1");
                e.stopPropagation()
            })
            $("#selectcar-car2").bind("touch click",function(e){
                e.preventDefault();
                selectcar.clickbus(2,"#selectcar-car2");
                e.stopPropagation()
            })
            $("#selectcar-car3").bind("touch click",function(e){
                e.preventDefault();
                selectcar.clickbus(3,"#selectcar-car3");
                e.stopPropagation()
            })
            $("#selectcar-car4").bind("touch click",function(e){
                e.preventDefault();
                selectcar.clickbus(4,"#selectcar-car4");
                e.stopPropagation()
            })
            
            $("#selectcar-car5").bind("touch click",function(e){
                e.preventDefault();
                selectcar.clickbus(5,"#selectcar-car5");
                e.stopPropagation()
            })
            $("#selectcar-car6").bind("touch click",function(e){
                e.preventDefault();
                selectcar.clickbus(6,"#selectcar-car6");
                e.stopPropagation()
            })
            $("#selectcar-car7").bind("touch click",function(e){
                e.preventDefault();
                selectcar.clickbus(7,"#selectcar-car7");
                e.stopPropagation()
            })
        },
        newPage:function () {
            $("#selectcar-dpcity").text(releaseData.dpCity);
            $("#selectcar-arcity").text(releaseData.arCity);
            if( releaseData.useType === "单程" ){
			        $("#selectcar-arrivalTime").text("无返程");
            }else if ( releaseData.useType === "往返" ) {
				      $("#selectcar-arrivalTime").text($("#dt-c-1").attr("data-val")+"返程");
            }
            $("#selectcar-departure").text($("#bus-dpcity").text());
            $("#selectcar-departureTime").text($("#dt-a-0").attr("data-val")+"上车");
            $("#selectcar-arrival").text($("#bus-arcity").text());

          // 其他取消掉
          $(".selectcar-carimg").css("border-color","#7e7d7d");
          $(".selectcar-carimg>span").css("color","#555");
          // 给第一个上个颜色
          $("#selectcar-car0").css("border-color","rgb(0, 141, 255)");
          $("#selectcar-carspan0").css("color","rgb(0, 141, 255)");
          // 返回左侧
          $(".selectcar-cardiv").animate({ scrollLeft: 0 }, 10);  //返回左边
        // 行李形式
        // 车辆类型
            var people = selectcar.carTypeData[0].pseats;
            var matter = selectcar.carTypeData[0].trunks;
            $("#selectcar-goodspeople").text(people);
            $("#selectcar-goodsmatter").text(matter);
             // 价格
            var dLng = 0;           // 出发经度
            var dLat = 0;           // 出发纬度
            var fabudpData = releaseData.fabudpData;
            if ( fabudpData.isOk  ) {
              if ( fabudpData.isLocation ) {
                dLng = fabudpData.data.position.R;
                dLat = fabudpData.data.position.P;
              }else {
                dLng =  fabudpData.data.location.R;
                dLat =  fabudpData.data.location.P;
              }
            }
             
            var returnfs = 1;
            var  day_time = 1;
            var mileage = 100 ; // 送他多少里，默认一天的里数
            if(releaseData.useType==="单程"){
                returnfs = 1;
                day_time = 1;
                mileage = 100;
            }else if (releaseData.useType==="往返"){
                returnfs = 2;
                day_time = getTwoDayTime($("#dt-a-0").attr("data-val").replace(/-/g,"/"),$("#dt-c-1").attr("data-val").replace(/-/g,"/")) +1 ;
                mileage = mileage * day_time;
            }
            
            var dpcity  = [dLng.toFixed(6),dLat.toFixed(6)];

            var fabuarData = releaseData.fabuarData.data;
            var arcity = "" ;
            if (releaseData.fabuarData.isOk) {
              if (releaseData.fabuarData.isLocation) {
                arcity =  [fabuarData.position.lng.toFixed(6),fabuarData.position.lat.toFixed(6)];
              }else {
                arcity =  [fabuarData.location.lng.toFixed(6),fabuarData.location.lat.toFixed(6)];
              }
            }
            //  var dis = parseFloat((AMap.GeometryUtil.distanceOfLine([dpcity,arcity])*returnfs/1000).toFixed(1));
            var dis = 0 ;  // 距离

            showLodding("计算预估价中...");
            // 距离
            function get_path () {
              var get_url = '//restapi.amap.com/v3/direction/driving?key=f2ac4e16093bd03c67c74b39e765b244&originid=&destinationid=&extensions=base&strategy=2&waypoints=&avoidpolygons=&avoidroad=&origin='+dpcity+'&destination='+arcity;
              $.get(get_url,function(data,status){
                if (data.status == 1 || data.status=="1" ) {
                  dis = parseFloat((parseFloat(data.route.paths[0].distance)*returnfs/1000).toFixed(1));
                  Calculation();
                              // 清除
                              clearDialog();
                }else {
                  get_path ();
                              // 清除
                              clearDialog();
                }
                console.log("请求距离",data,status);
                        // 清除
                              clearDialog();
              });
            }
			      get_path ();
			 
            // 算出钱
            function Calculation(){
              selectcar.selectcar_kilometre = dis;
              console.log("初始化来回一共多少公里",dis, mileage);
              $("#selectcar-kilometre").text(dis+"(公里)");
              var dismoney = 0;
              // 超公里费
              var car_cmintiueMoney = 1;
              car_cmintiueMoney = selectcar.carTypeData[0].disPrice;
              
              var jcmoney = parseFloat(selectcar.carTypeData[0].price.replace(",",""))*day_time;
              
              releaseData.clickbus = selectcar.carTypeData[0];
              if (dis>mileage) {
                dismoney = jcmoney+ ( dis - mileage )*car_cmintiueMoney;
              }else {
                dismoney =jcmoney;
              }
              dismoney =  dismoney.toFixed(0);
              $("#selectcar-submitmoney").text(dismoney);
            }
        },
        clickbus:function(val,divname){
            console.log(val,divname);
            // 得到数据
            var sjData = selectcar.carTypeData[val];
            // 车辆类型
            var people = sjData.pseats;
            var matter = sjData.trunks;
            var spanname = "#selectcar-carspan"+val;
            $("#selectcar-goodspeople").text(people);
            $("#selectcar-goodsmatter").text(matter);

            releaseData.carType =sjData.id;
            releaseData.clickbus = selectcar.carTypeData[val];
          
          $(".selectcar-carimg").css("border-color","#7e7d7d");
          
          $(".selectcar-carimg>span").css("color","#555");
          
          
                $(divname).css("border-color","rgb(0, 141, 255)");
                $(spanname).css("color","rgb(0, 141, 255)");

                // 价格
          var  day_time = 1;
          var mileage = 100 ; // 送他多少里，默认一天的里数

          if(releaseData.useType==="单程"){
            day_time = 1;
            mileage = 100;
          }else if (releaseData.useType==="往返"){
            day_time = getTwoDayTime($("#dt-a-0").attr("data-val").replace(/-/g,"/"),$("#dt-c-1").attr("data-val").replace(/-/g,"/")) +1 ;
            mileage = mileage * day_time;
          }
			
			    // 算出钱
          function Calculation(){
            var dis = selectcar.selectcar_kilometre ;  // 距离
            var dismoney = 0;
            // 超公里费
            var car_cmintiueMoney = 1;
            car_cmintiueMoney = sjData.disPrice;
            var jcmoney = parseFloat(sjData.price.replace(",",""))*day_time;
            releaseData.clickbus = sjData;
            if (dis>mileage) {
              dismoney = jcmoney+ ( dis - mileage )*car_cmintiueMoney;
            }else {
              dismoney =jcmoney;
            }
            dismoney =  dismoney.toFixed(0);
            $("#selectcar-submitmoney").text(dismoney);
            console.log("点击的数据",car_cmintiueMoney,mileage);
          };
		      Calculation();
        },
        tijiao:function(){
            var tellTrips = "";
            //判断用户是否登录
            if( newPageData.uid===0){
                tellTrips = "请登录";
            }else if ( newPageData.openid === 0){
                tellTrips = "请登录";
            }else if ( releaseData.useType === "往返" ){
                releaseData
            }
            if(tellTrips!==""){
                showMessage1btn(tellTrips,"",0);
                return false;
            }

            // 生成随机数
                var rand = "";
                for(var i = 0; i < 3; i++){
                    var r = Math.floor(Math.random() * 10);
                    rand += r ;
                }
                // 生成时间戳 "yyyyMMddhhmmss" 格式
                function pad2(n) { return n < 10 ? '0' + n : n };
                function generateTimeReqestNumber() {
                    var date = new Date();
                    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
                }
                var sjc = "CAO"+generateTimeReqestNumber()+rand;
			
			// 赋值
            var departure = "";     //出发地名
            var dLng = 0;           // 出发经度
			var dLat = 0;           // 出发纬度
			
			var arrival = "";     //目的地名
            var aLng = 0;           // 目的经度
			var aLat = 0;           // 目的纬度
			// 赋值函数
			function assignment(){
				var fabuarData = releaseData.fabuarData.data;
				var fabudpData = releaseData.fabudpData.data;
				// 出发的经纬度
				if (releaseData.fabudpData.isOk) {
					if (releaseData.fabudpData.isLocation) {
						
						dLng = fabudpData.position.R;
						dLat = fabudpData.position.P;
						if ( null != fabudpData.addressComponent.township) {
							departure += fabudpData.addressComponent.township;
						}else if (null != fabudpData.addressComponent.street ) {
							departure += fabudpData.addressComponent.street;
						}else if (null != fabudpData.addressComponent.streetNumber ) {
							departure += fabudpData.addressComponent.streetNumber ;
						}
					}else {
						// 使用搜索数据
						departure = fabudpData.name;
						
						dLng =  fabudpData.location.R;
						dLat =  fabudpData.location.P;
					}
				}
				// 目的地的经纬度和地名
				if (releaseData.fabuarData.isOk) {
					if (releaseData.fabuarData.isLocation) {
						
						aLng = fabuarData.position.R;
						aLat = fabuarData.position.P;
						if ( null != fabuarData.addressComponent.township) {
							arrival += fabuarData.addressComponent.township;
						}else if (null != fabuarData.addressComponent.street ) {
							arrival += fabuarData.addressComponent.street;
						}else if (null != fabuarData.addressComponent.streetNumber ) {
							arrival += fabuarData.addressComponent.streetNumber ;
						}
					}else {
						// 使用搜索数据
						arrival = fabuarData.name;
						
						aLng =  fabuarData.location.R;
						aLat =  fabuarData.location.P;
					}
				}
				if(releaseData.useType=="单程"){
					releaseData.returnTime = "";
				}
				if(releaseData.useType==="单程"){
					releaseData.useType ="Single";
				}else if (releaseData.useType==="往返"){
					releaseData.useType ="Return";
				}
			}
			// 用于 阻止重复提交订单的用途
			function prevent(){
				selectcar.olddpcityname = "";
				selectcar.oldarcityname = "";
				var fabuarData_name = "";
				if ( releaseData.fabuarData.isLocation ) {
					fabuarData_name = releaseData.fabuarData.data.formattedAddress;
				}else {
					fabuarData_name =  releaseData.fabuarData.data.name;
				}
				if (departure==selectcar.olddpcityname &&  selectcar.oldarcityname == fabuarData_name ){
					// 10秒后初始化下。
					showMessage1btn("不能提交重复单,请等待10秒!","",0);
					setTimeout(function(){
						selectcar.olddpcityname = '';
						selectcar.oldarcityname = '';
					},10000);
					return false ;
					// 阻止重复提交
				}else{                
					selectcar.olddpcityname = departure;
					selectcar.oldarcityname = fabuarData_name;
				}
			}

			assignment();
			prevent();
			
			showLodding("请稍等，提交中...");
            // 读取车辆类型
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/saveMadeChaOrders.asp",
                data:{
                    uid:newPageData.uid,				 //用户id
                    dpCity:releaseData.dpCity.trim(),			    //出发城市
                    departure:departure.trim(),		    //出发地
                    dLng:dLng.toFixed(6),				//出发地经度
                    dLat:dLat.toFixed(6),				//出发地纬度
                    arCity:releaseData.arCity.trim(),			    //到达城市
                    arrival:arrival.trim(),		//目的地
                    aLng:aLng.toFixed(6),				//目的地经度
                    aLat:aLat.toFixed(6),				//目的地纬度
                    departureTime:$("#dt-a-0").attr("data-val"),	    //出发时间
                    returnTime:$("#dt-c-1").attr("data-val"),       //返回时间
                    useType:releaseData.useType,			//包车方式
                    carType:releaseData.carType,		//车辆类型
                    contact:releaseData.contact.trim(),			//联系人
                    contactNumber:releaseData.contactNumber,	    //联系人电话
                    price:parseFloat($("#selectcar-submitmoney").text()), // 价格
                    remark:$("#textarea").val().trim(),			     //备注
                },
                success:function(result){
					 
                    console.log("添加成功的数据",result);
                    // 要阻止他提交多次
                    /* 加载成功，取消提示按钮 */
					 clearDialog();
					 if ( null == result.msg || "" == result.msg ) {
						showMessage1btn("提交成功!","myorderPageTo()",0);
					 }else {
						showMessage1btn(result.msg,"myorderPageTo()",0);
					 }
					
					// 提交成功要把数据初始化下
					releaseData.contact ="";
					releaseData.contactNumber =0;
					$("#textarea").val("");
					releaseData.fabudpData.data = "";
					releaseData.fabudpData.isLocation = false;
					releaseData.fabudpData.isOk = false;
					releaseData.fabuarData.data = "";
					releaseData.fabuarData.isLocation = false;
					releaseData.fabuarData.data.isOk = false;
					// 界面初始化
					$("#bus-dpcity").text("从哪儿上车");
					$("#bus-arcity").text("您要去哪儿");
					$("#bus-personinput").val("");
					$("#tell-phone").val("");
					// 地图页的初始化
					$("#busMap-dzname").text("请选择地址");
					$("#busMap-dzcityname").text("请选择地址");
					$("#busMap-dzcity").text("请选择城市");
					// 时间的初始化
					releaseData.useType = "单程";
					$(".carcetbus-iconsleft").css({
						"background":"#007aff",
						"color": "#fff"
					})
					$(".carcetbus-iconsright").css({
						"background":"#fff",
						"color": "#383636"
					})
					$("#time-divbottom").slideUp();

                },
                error:function(result){
					/* 加载成功，取消提示按钮 */
					clearDialog();
					console.log("添加失败",result);
					if ( null == result.msg || "" == result.msg ){
						showMessage1btn("网络出错,请重试!","",0);
					}else {
						showMessage1btn(result.msg,"",0);
					}
                    
                }
            })
		}
    }
// 跳转 到 详情单页
    function myorderPageTo(){
        setTimeout(function(){
            // 得到订单数据
            myorder.myorderPage("","","");
            // 我的订单页绑定无限滚动效果
            //hdrunvowner();
           window.location.hash = "#myorder";
        },500);
    }
// 发布信息数据 
    var releaseData = {
		busMapDw:false,    // busMap页是否是定位的数据，默认是定位的数据
        uid:0,				 //用户id
        outTradeNo:0,		     //订单号（"CAO"开头）
        dpCity:"",			    //出发城市
        departure:"",		    //出发地
        dLng:0,				//出发地经度
        dLat:0,				//出发地纬度
        arCity:"",			    //到达城市
        arrival:"",			//目的地
        aLng:0,				//目的地经度
        aLat:0,				//目的地纬度
        departureTime:0,	    //出发时间
        returnTime:0,       //返回时间
        useType:"单程",			//包车方式
        carType:1,		//车辆类型
        contact:"",			//联系人
        contactNumber:0,	    //联系人电话
        price:"",           //价格
        remark:"",			    //备注
        // 上面是发布需要的数据，下面是是其他数据
        pricebutton:false,
        dwlocationg:"",         // 定位的数据
        searchMap:"",           // 搜索得到的数据
        dpsearch:"",            // 起点确认的数据
        arsearch:"",            // 到达点确认的数据
		fabudpData:{
			isOk:false,			// 是否点击了确认
			isLocation:false,
			data:"",
		},       // 确认的起点的数据
		fabuarData:{
			isOk:false,		// 是否点击了确认
			isLocation:false,	
			data:"",
		},       // 确认的到达地的数据
        clickbus:"",            // 选择的车的信息数据
    }
// 获取到数据(包含ajax，和地图数据)
    var obtainData = {
        busMap:"",   // 存储busmap的值
        template:{
            address:'<div id="address-addselect" class="addselect clearfix"><span class="addselect-left iconfont iconzhifeiji1"></span><div class="addselect-right clearfix"><span class="addselect-rtone" id="address-rtone"></span><span class="addselect-rttwo" id="address-rttwo"></span></div></div>',
			myorder:'<div id="myorder-od" class="tjorder clearfix"><a id="myorder-odahref" style="display:block;width:100%;"><div class="tjorder-hd clearfix"> <div class="tjorder-hdleft clearfix"><span class="tjorder-hdlefticon iconfont iconkeche"></span><span id="myorder-oddistance"  class="tjorder-hdleftnr"></span></div><p id="myorder-odstatus" class="tjorder-hdright"></p></div><div  class="tjorder-ct clearfix"><div   class="tjorder-ctleft"><span  id="myorder-newdpcity"></span><span id="myorder-oddpcity"></span></div><div  class="tjorder-ctright"><span id="myorder-newarcity"></span><span id="myorder-odarcity"></span></div></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">出发时间:</span><span id="myorder-oddptime" class="tjorder-datelefttime"></span></div><div class="tjorder-dateright clearfix"><span class="tjorder-daterighticon iconfont iconrenminbi1688"></span><span id="myorder-odprice" class="tjorder-daterightmoney"></span></div></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">返程时间:</span><span id="myorder-odartime" class="tjorder-datelefttime"></span></div></div></a><div id="myorder-odbutton" class="tjorder-button clearfix"></div></div>',
            selectcar:'<div id="selectcar-car" class="selectcar-carimg clearfix"><div id="selectcar-id" style="display: none;"></div><span id="selectcar-carspan" class="iconfont icondui"></span><img id="selectcar-img" src=""><p id="selectcar-name"></p></div>',
        }
    }
// 页面ajax的几个地方
    var carnewajax = {

    }
// 城市地址选择页
    var address = {
        addinput:function(){
            var keywords = document.getElementById("address-input").value;
            AMap.plugin('AMap.Autocomplete', function(){
                    var autoOptions = {
                        city:"常州"
                    }                 
                    var searchval = "";
              // 实例化Autocomplete             
                searchval = $("#address-city").text()+keywords;
              var autoComplete = new AMap.Autocomplete(autoOptions);             
              autoComplete.search(searchval, function(status,result) {
                    if(status==="complete"){
                        releaseData.searchMap = result.tips;
                        var hash =  window.location.hash;
                        if(hash==="#address?dpcity"){
                            releaseData.dpsearch = result.tips;
                        }else if (hash === "#address?arcity"){
                            releaseData.arsearch = result.tips;
                        }
                        $("#add-address").empty();
                        if(result.tips.length>10){
                            result.tips.length = 10;
                        }
                        for(var i = 0;i<result.tips.length;i++){
                            address.search(i,releaseData.searchMap[i]);
                        }
                        address.divclick();
                    }
              })
            })
        },
        search:function(i,val){
            $("#add-address").append(obtainData.template.address);

            $("#address-rtone").text(val.name);
            var rtone = "address-rtone"+i;
            $("#address-rtone").attr("id",rtone);

            $("#address-rttwo").text(val.address);
            var rttwo = "address-rttwo"+i;
            $("#address-rttwo").attr("id",rttwo);

            var rtthree = "address-addselect"+i;
            $("#address-addselect").attr("id",rtthree);
        },
        divclick:function(){
            $("#address-addselect0").bind("touch click",function(){
                address_addselect(0);
            })
            $("#address-addselect1").bind("touch click",function(){
                address_addselect(1);
            })
            $("#address-addselect2").bind("touch click",function(){
                address_addselect(2);
            })
            $("#address-addselect3").bind("touch click",function(){
                address_addselect(3);
            })
            $("#address-addselect4").bind("touch click",function(){
                address_addselect(4);
            })
            $("#address-addselect5").bind("touch click",function(){
                address_addselect(5);
            })
            $("#address-addselect6").bind("touch click",function(){
                address_addselect(6);
            })
            $("#address-addselect7").bind("touch click",function(){
                address_addselect(7);
            })
            $("#address-addselect8").bind("touch click",function(){
                address_addselect(8);
            })
            $("#address-addselect9").bind("touch click",function(){
                address_addselect(9);
            })
            function address_addselect(i){
                // 点击时候，赋值给发布数据。
                // 同时在地图上画点。画点用户点击时画不了的。(完成)
                // 给地图页赋值，赋城市名和地址名。
                // 给首页页赋值
                var sjval = "";
                var hash = window.location.hash;
				if(hash==="#address?dpcity"){
					sjval = releaseData.dpsearch[i];
				}else if ( hash === "#address?arcity") {
					sjval = releaseData.arsearch[i];
				}
                console.log("点击的数据",sjval);
                // 赋值
                var cityname = $("#address-city").text();  //城市名
				var dzwz  = sjval.address;      //位置

				var dzname = sjval.name;   // 名字
                $("#busMap-dzname").text(dzname);
                $("#busMap-dzcityname").text(dzwz);
                // 赋城市名
                $("#busMap-city").text(cityname);
                $("#busMap-dzcity").text(cityname);
                console.log(hash);
                if( hash==="#address?dpcity" ){
					releaseData.fabudpData.isLocation = false;
					releaseData.fabudpData.data = sjval;
					
                    window.location.hash = "#busMap?dpcity";
                }else if ( hash === "#address?arcity" ) {
					releaseData.fabuarData.isLocation = false ;
					releaseData.fabuarData.data  = sjval ;
					
                    window.location.hash = "#busMap?arcity";
				}
				
                var result =  {P:parseFloat(sjval.location.lat),R:parseFloat(sjval.location.lng),lat:parseFloat(sjval.location.P),lng:parseFloat(sjval.location.R)};
                container.onclick(result);
            }
        }
    }
// 新城市选择页操作函数
var screen_city = {
	hashVal:"#busMap?dpcity",
    newPage:function(){
        var cityWrapper = document.querySelector('.city-wrapper-hook');
        var cityScroller = document.querySelector('.scroller-hook');
        var cities = document.querySelector('.cities-hook');
        var shortcut = document.querySelector('.shortcut-hook');

        var scroll;

        var shortcutList = [];
        var anchorMap = {};

        function initCities() {
        var y = 0;
        var titleHeight = 28;
        var itemHeight = 44;

        var lists = '';
        var en = '<ul>';
        cityData.forEach(function (group) {
            var name = group.name;
            lists += '<div class="title">'+name+'</div>'; 
            lists += '<ul>';
            group.cities.forEach(function(g) {
            lists += '<li class="item" data-name="'+ g.name +'" data-id="'+ g.cityid +'"><span class="border-1px name">'+ g.name +'</span></li>';
            });
            lists += '</ul>';


            var name = group.name.substr(0, 1);
            en += '<li data-anchor="'+name+'" class="item">'+name+'</li>';
            var len = group.cities.length;
            anchorMap[name] = y;
            y -= titleHeight + len * itemHeight;

        });
        en += '</ul>';

        cities.innerHTML = lists;

        shortcut.innerHTML = en;
        shortcut.style.top = (cityWrapper.clientHeight - shortcut.clientHeight) / 2 + 'px';

        $("#cities-hook-div > ul").children("li").each(function(index, element) {
            $(this).unbind("click").bind("click",function(){
               console.log($(this).context.innerText);
               var city_name = $(this).context.innerText.trim();
               $("#busMap-city").text(city_name);
               $("#address-city").text(city_name);
				//  window.history.back(-1);
			   window.location.hash = screen_city.hashVal;
            });
        });
		$("#city-wrapper-div").bind("click",function(){
            var city_wrapper_div = $("#city-wrapper-nowcity").text();
            if (city_wrapper_div == "" || city_wrapper_div == null ||city_wrapper_div == undefined ) {
                return false;
            }else {
                $("#busMap-city").text(city_wrapper_div);
				$("#address-city").text(city_wrapper_div);
				//window.history.back(-1);
				window.location.hash = screen_city.hashVal;
            }
        })
        scroll = new window.BScroll(cityWrapper, {
            probeType: 3,
            click:true
        });

        // scroll.on('scroll', function (pos) {
        //   console.log(Math.round(pos.y));
        // });

        scroll.scrollTo(0, 0);
        }


        //bind Event
        function bindEvent() {
        var touch = {};
        var firstTouch;

        shortcut.addEventListener('touchstart', function (e) {

            var anchor = e.target.getAttribute('data-anchor');

            firstTouch = e.touches[0];
            touch.y1 = firstTouch.pageY;
            touch.anchor = anchor;

            scrollTo(anchor);

        });

        shortcut.addEventListener('touchmove', function (e) {

            firstTouch = e.touches[0];
            touch.y2 = firstTouch.pageY;

            var anchorHeight = 16;

            var delta = (touch.y2 - touch.y1) / anchorHeight | 0;

            var anchor = shortcutList[shortcutList.indexOf(touch.anchor) + delta];

            scrollTo(anchor);

            e.preventDefault();
            e.stopPropagation();

        });

        function scrollTo(anchor) {
            var maxScrollY = cityWrapper.clientHeight - cityScroller.clientHeight;

            var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]));

            if (typeof y !== 'undefined') {
                scroll.scrollTo(0, y);
            }
        }
        }

        initCities();
        bindEvent();
        $(".shortcut").css("top","60px");
        
    },

}
// 依赖的数组值
var cityData = [
	{
        name: "★周边城市",
		cities: [
			{
				name: "常州市",
				tags: "CHANGZHOU,常州市",
				cityid: 1
			},
			{
				name: "无锡市",
				tags: "WUXI,无锡市",
				cityid: 4
			},
			{
				name: "苏州市",
				tags: "SUZHOU,苏州市",
				cityid: 2
			},
			{
				name: "上海市",
				tags: "SHANGHAI,上海市",
				cityid: 3
			},
			{
				name: "南京市",
				tags: "NANJING,南京市",
				cityid: 6
			}
		]
	},
	{
		name: "A",
		cities: [
			{
				name: "鞍山市",
				tags: "ANSHAN,鞍山市",
				cityid: 64
			},
			{
				name: "安庆市",
				tags: "ANQING,安庆市",
				cityid: 149
			},
			{
				name: "安阳市",
				tags: "ANYANG,安阳市",
				cityid: 174
			},
			{
				name: "阿拉善盟",
				tags: "ALASHANMENG,阿拉善盟",
				cityid: 202
			},
			{
				name: "阿坝州",
				tags: "ABAZHOU,阿坝州",
				cityid: 290
			},
			{
				name: "安顺市",
				tags: "ANSHUN,安顺市",
				cityid: 294
			},
			{
				name: "阿里地区",
				tags: "ALIDIQU,阿里地区",
				cityid: 316
			},
			{
				name: "安康市",
				tags: "ANKANG,安康市",
				cityid: 320
			},
			{
				name: "阿克苏地区",
				tags: "AKESUDIQU,阿克苏地区",
				cityid: 348
			},
			{
				name: "阿勒泰地区",
				tags: "ALETAIDIQU,阿勒泰地区",
				cityid: 355
			},
			{
				name: "阿拉尔市",
				tags: "ALAER,阿拉尔市",
				cityid: 356
			}
		]
	},
	{
		name: "B",
		cities: [
			{
				name: "北京市",
				tags: "BEIJING,北京市",
				cityid: 1
			},
			{
				name: "保定市",
				tags: "BAODING,保定市",
				cityid: 62
			},
			{
				name: "包头市",
				tags: "BAOTOU,包头市",
				cityid: 63
			},
			{
				name: "本溪市",
				tags: "BENXI,本溪市",
				cityid: 77
			},
			{
				name: "蚌埠市",
				tags: "BANGBU,蚌埠市",
				cityid: 100
			},
			{
				name: "北海市",
				tags: "BEIHAI,北海市",
				cityid: 161
			},
			{
				name: "滨州市",
				tags: "BINZHOU,滨州市",
				cityid: 166
			},
			{
				name: "宝鸡市",
				tags: "BAOJI,宝鸡市",
				cityid: 170
			},
			{
				name: "亳州市",
				tags: "BOZHOU,亳州市",
				cityid: 189
			},
			{
				name: "巴彦淖尔市",
				tags: "BAYANNAOER,巴彦淖尔市",
				cityid: 199
			},
			{
				name: "白山市",
				tags: "BAISHAN,白山市",
				cityid: 208
			},
			{
				name: "白城市",
				tags: "BAICHENG,白城市",
				cityid: 210
			},
			{
				name: "百色市",
				tags: "BAISE,百色市",
				cityid: 263
			},
			{
				name: "白沙黎族自治县",
				tags: "BAISHALIZUZIZHIXIAN,白沙黎族自治县",
				cityid: 278
			},
			{
				name: "巴中市",
				tags: "BAZHONG,巴中市",
				cityid: 288
			},
			{
				name: "毕节地区",
				tags: "BIJIEDIQU,毕节地区",
				cityid: 296
			},
			{
				name: "保山市",
				tags: "BAOSHAN,保山市",
				cityid: 301
			},
			{
				name: "白银市",
				tags: "BAIYIN,白银市",
				cityid: 323
			},
			{
				name: "巴音郭楞州",
				tags: "BAYINGUOLENGZHOU,巴音郭楞州",
				cityid: 350
			},
			{
				name: "博尔塔拉州",
				tags: "BOERTALAZHOU,博尔塔拉州",
				cityid: 352
			}
		]
	},
	{
		name: "C",
		cities: [
			{
				name: "成都市",
				tags: "CHENGDU,成都市",
				cityid: 17
			},
			{
				name: "重庆市",
				tags: "CHONGQING,重庆市",
				cityid: 18
			},
			{
				name: "长沙市",
				tags: "CHANGSHA,长沙市",
				cityid: 24
			},
			{
				name: "长春市",
				tags: "CHANGCHUN,长春市",
				cityid: 25
			},
			{
				name: "常州市",
				tags: "CHANGZHOU,常州市",
				cityid: 45
			},
			{
				name: "沧州市",
				tags: "CANGZHOU,沧州市",
				cityid: 59
			},
			{
				name: "承德市",
				tags: "CHENGDE,承德市",
				cityid: 72
			},
			{
				name: "常德市",
				tags: "CHANGDE,常德市",
				cityid: 106
			},
			{
				name: "郴州市",
				tags: "CHENZHOU,郴州市",
				cityid: 107
			},
			{
				name: "长治市",
				tags: "CHANGZHI,长治市",
				cityid: 127
			},
			{
				name: "滁州市",
				tags: "CHUZHOU,滁州市",
				cityid: 148
			},
			{
				name: "池州市",
				tags: "CHIZHOU,池州市",
				cityid: 187
			},
			{
				name: "赤峰市",
				tags: "CHIFENG,赤峰市",
				cityid: 196
			},
			{
				name: "巢湖市",
				tags: "CHAOHU,巢湖市",
				cityid: 204
			},
			{
				name: "朝阳市",
				tags: "CHAOYANG,朝阳市",
				cityid: 205
			},
			{
				name: "潮州市",
				tags: "CHAOZHOU,潮州市",
				cityid: 257
			},
			{
				name: "崇左市",
				tags: "CHONGZUO,崇左市",
				cityid: 267
			},
			{
				name: "澄迈县",
				tags: "CHENGMAIXIAN,澄迈县",
				cityid: 274
			},
			{
				name: "楚雄州",
				tags: "CHUXIONGZHOU,楚雄州",
				cityid: 308
			},
			{
				name: "昌都地区",
				tags: "CHANGDUDIQU,昌都地区",
				cityid: 313
			},
			{
				name: "昌吉州",
				tags: "CHANGJIZHOU,昌吉州",
				cityid: 351
			}
		]
	},
	{
		name: "D",
		cities: [
			{
				name: "大连市",
				tags: "DALIAN,大连市",
				cityid: 14
			},
			{
				name: "东莞市",
				tags: "DONGWAN,东莞市",
				cityid: 21
			},
			{
				name: "大庆市",
				tags: "DAQING,大庆市",
				cityid: 48
			},
			{
				name: "东营市",
				tags: "DONGYING,东营市",
				cityid: 73
			},
			{
				name: "德州市",
				tags: "DEZHOU,德州市",
				cityid: 120
			},
			{
				name: "大同市",
				tags: "DATONG,大同市",
				cityid: 125
			},
			{
				name: "大理州",
				tags: "DALIZHOU,大理州",
				cityid: 136
			},
			{
				name: "丹东市",
				tags: "DANDONG,丹东市",
				cityid: 163
			},
			{
				name: "德阳市",
				tags: "DEYANG,德阳市",
				cityid: 173
			},
			{
				name: "大兴安岭地区",
				tags: "DAXINGANLINGDIQU,大兴安岭地区",
				cityid: 218
			},
			{
				name: "儋州市",
				tags: "DANZHOU,儋州市",
				cityid: 270
			},
			{
				name: "东方市",
				tags: "DONGFANG,东方市",
				cityid: 273
			},
			{
				name: "定安县",
				tags: "DINGANXIAN,定安县",
				cityid: 275
			},
			{
				name: "达州市",
				tags: "DAZHOU,达州市",
				cityid: 285
			},
			{
				name: "德宏州",
				tags: "DEHONGZHOU,德宏州",
				cityid: 309
			},
			{
				name: "迪庆州",
				tags: "DIQINGZHOU,迪庆州",
				cityid: 311
			},
			{
				name: "定西市",
				tags: "DINGXI,定西市",
				cityid: 330
			}
		]
	},
	{
		name: "E",
		cities: [
			{
				name: "鄂尔多斯市",
				tags: "EERDUOSI,鄂尔多斯市",
				cityid: 43
			},
			{
				name: "鄂州市",
				tags: "EZHOU,鄂州市",
				cityid: 230
			},
			{
				name: "恩施州",
				tags: "ENSHIZHOU,恩施州",
				cityid: 235
			}
		]
	},
	{
		name: "F",
		cities: [
			{
				name: "福州市",
				tags: "FUZHOU,福州市",
				cityid: 34
			},
			{
				name: "佛山市",
				tags: "FOSHAN,佛山市",
				cityid: 36
			},
			{
				name: "抚顺市",
				tags: "FUSHUN,抚顺市",
				cityid: 66
			},
			{
				name: "阜新市",
				tags: "FUXIN,阜新市",
				cityid: 164
			},
			{
				name: "阜阳市",
				tags: "FUYANG,阜阳市",
				cityid: 188
			},
			{
				name: "抚州市",
				tags: "FUZHOU,抚州市",
				cityid: 223
			},
			{
				name: "防城港市",
				tags: "FANGCHENGGANG,防城港市",
				cityid: 260
			}
		]
	},
	{
		name: "G",
		cities: [
			{
				name: "广州市",
				tags: "GUANGZHOU,广州市",
				cityid: 3
			},
			{
				name: "贵阳市",
				tags: "GUIYANG,贵阳市",
				cityid: 82
			},
			{
				name: "赣州市",
				tags: "GANZHOU,赣州市",
				cityid: 102
			},
			{
				name: "桂林市",
				tags: "GUILIN,桂林市",
				cityid: 135
			},
			{
				name: "贵港市",
				tags: "GUIGANG,贵港市",
				cityid: 262
			},
			{
				name: "广元市",
				tags: "GUANGYUAN,广元市",
				cityid: 280
			},
			{
				name: "广安市",
				tags: "GUANGAN,广安市",
				cityid: 284
			},
			{
				name: "甘孜州",
				tags: "GANZIZHOU,甘孜州",
				cityid: 291
			},
			{
				name: "甘南州",
				tags: "GANNANZHOU,甘南州",
				cityid: 333
			},
			{
				name: "固原市",
				tags: "GUYUAN,固原市",
				cityid: 336
			},
			{
				name: "果洛州",
				tags: "GUOLUOZHOU,果洛州",
				cityid: 342
			}
		]
	},
	{
		name: "H",
		cities: [
			{
				name: "杭州市",
				tags: "HANGZHOU,杭州市",
				cityid: 5
			},
			{
				name: "合肥市",
				tags: "HEFEI,合肥市",
				cityid: 15
			},
			{
				name: "哈尔滨市",
				tags: "HAERBIN,哈尔滨市",
				cityid: 16
			},
			{
				name: "呼和浩特市",
				tags: "HUHEHAOTE,呼和浩特市",
				cityid: 41
			},
			{
				name: "邯郸市",
				tags: "HANDAN,邯郸市",
				cityid: 60
			},
			{
				name: "葫芦岛市",
				tags: "HULUDAO,葫芦岛市",
				cityid: 70
			},
			{
				name: "衡水市",
				tags: "HENGSHUI,衡水市",
				cityid: 80
			},
			{
				name: "海口市",
				tags: "HAIKOU,海口市",
				cityid: 83
			},
			{
				name: "湖州市",
				tags: "HUZHOU,湖州市",
				cityid: 90
			},
			{
				name: "淮安市",
				tags: "HUAIAN,淮安市",
				cityid: 97
			},
			{
				name: "衡阳市",
				tags: "HENGYANG,衡阳市",
				cityid: 105
			},
			{
				name: "汉中市",
				tags: "HANZHONG,汉中市",
				cityid: 115
			},
			{
				name: "菏泽市",
				tags: "HEZE,菏泽市",
				cityid: 124
			},
			{
				name: "惠州市",
				tags: "HUIZHOU,惠州市",
				cityid: 133
			},
			{
				name: "黄山市",
				tags: "HUANGSHAN,黄山市",
				cityid: 141
			},
			{
				name: "淮南市",
				tags: "HUAINAN,淮南市",
				cityid: 150
			},
			{
				name: "淮北市",
				tags: "HUAIBEI,淮北市",
				cityid: 183
			},
			{
				name: "呼伦贝尔市",
				tags: "HULUNBEIER,呼伦贝尔市",
				cityid: 198
			},
			{
				name: "鹤岗市",
				tags: "HEGANG,鹤岗市",
				cityid: 212
			},
			{
				name: "黑河市",
				tags: "HEIHE,黑河市",
				cityid: 217
			},
			{
				name: "黄石市",
				tags: "HUANGSHI,黄石市",
				cityid: 227
			},
			{
				name: "黄冈市",
				tags: "HUANGGANG,黄冈市",
				cityid: 232
			},
			{
				name: "怀化市",
				tags: "HUAIHUA,怀化市",
				cityid: 244
			},
			{
				name: "鹤壁市",
				tags: "HEBI,鹤壁市",
				cityid: 247
			},
			{
				name: "河源市",
				tags: "HEYUAN,河源市",
				cityid: 254
			},
			{
				name: "贺州市",
				tags: "HEZHOU,贺州市",
				cityid: 264
			},
			{
				name: "河池市",
				tags: "HECHI,河池市",
				cityid: 265
			},
			{
				name: "红河州",
				tags: "HONGHEZHOU,红河州",
				cityid: 306
			},
			{
				name: "海东地区",
				tags: "HAIDONGDIQU,海东地区",
				cityid: 338
			},
			{
				name: "海北州",
				tags: "HAIBEIZHOU,海北州",
				cityid: 339
			},
			{
				name: "黄南州",
				tags: "HUANGNANZHOU,黄南州",
				cityid: 340
			},
			{
				name: "海南州",
				tags: "HAINANZHOU,海南州",
				cityid: 341
			},
			{
				name: "海西州",
				tags: "HAIXIZHOU,海西州",
				cityid: 344
			},
			{
				name: "哈密地区",
				tags: "HAMIDIQU,哈密地区",
				cityid: 346
			},
			{
				name: "和田地区",
				tags: "HETIANDIQU,和田地区",
				cityid: 347
			}
		]
	},
	{
		name: "J",
		cities: [
			{
				name: "济南市",
				tags: "JINAN,济南市",
				cityid: 12
			},
			{
				name: "锦州市",
				tags: "JINZHOU,锦州市",
				cityid: 68
			},
			{
				name: "晋中市",
				tags: "JINZHONG,晋中市",
				cityid: 71
			},
			{
				name: "吉林市",
				tags: "JILIN,吉林市",
				cityid: 74
			},
			{
				name: "济宁市",
				tags: "JINING,济宁市",
				cityid: 79
			},
			{
				name: "金华市",
				tags: "JINHUA,金华市",
				cityid: 86
			},
			{
				name: "嘉兴市",
				tags: "JIAXING,嘉兴市",
				cityid: 88
			},
			{
				name: "九江市",
				tags: "JIUJIANG,九江市",
				cityid: 101
			},
			{
				name: "荆州市",
				tags: "JINGZHOU,荆州市",
				cityid: 109
			},
			{
				name: "景德镇市",
				tags: "JINGDEZHEN,景德镇市",
				cityid: 151
			},
			{
				name: "江门市",
				tags: "JIANGMEN,江门市",
				cityid: 153
			},
			{
				name: "揭阳市",
				tags: "JIEYANG,揭阳市",
				cityid: 154
			},
			{
				name: "焦作市",
				tags: "JIAOZUO,焦作市",
				cityid: 175
			},
			{
				name: "晋城市",
				tags: "JINCHENG,晋城市",
				cityid: 190
			},
			{
				name: "鸡西市",
				tags: "JIXI,鸡西市",
				cityid: 211
			},
			{
				name: "佳木斯市",
				tags: "JIAMUSI,佳木斯市",
				cityid: 215
			},
			{
				name: "吉安市",
				tags: "JIAN,吉安市",
				cityid: 221
			},
			{
				name: "荆门市",
				tags: "JINGMEN,荆门市",
				cityid: 229
			},
			{
				name: "济源市",
				tags: "JIYUAN,济源市",
				cityid: 252
			},
			{
				name: "金昌市",
				tags: "JINCHANG,金昌市",
				cityid: 322
			},
			{
				name: "嘉峪关市",
				tags: "JIAYUGUAN,嘉峪关市",
				cityid: 324
			},
			{
				name: "酒泉市",
				tags: "JIUQUAN,酒泉市",
				cityid: 328
			}
		]
	},
	{
		name: "K",
		cities: [
			{
				name: "昆明市",
				tags: "KUNMING,昆明市",
				cityid: 19
			},
			{
				name: "开封市",
				tags: "KAIFENG,开封市",
				cityid: 110
			},
			{
				name: "喀什地区",
				tags: "KASHIDIQU,喀什地区",
				cityid: 179
			},
			{
				name: "克拉玛依市",
				tags: "KELAMAYI,克拉玛依市",
				cityid: 180
			},
			{
				name: "克孜勒苏柯州",
				tags: "KEZILESUKEZHOU,克孜勒苏柯州",
				cityid: 349
			}
		]
	},
	{
		name: "L",
		cities: [
			{
				name: "洛阳市",
				tags: "LUOYANG,洛阳市",
				cityid: 27
			},
			{
				name: "兰州市",
				tags: "LANZHOU,兰州市",
				cityid: 30
			},
			{
				name: "廊坊市",
				tags: "LANGFANG,廊坊市",
				cityid: 46
			},
			{
				name: "临沂市",
				tags: "LINYI,临沂市",
				cityid: 58
			},
			{
				name: "辽阳市",
				tags: "LIAOYANG,辽阳市",
				cityid: 75
			},
			{
				name: "连云港市",
				tags: "LIANYUNGANG,连云港市",
				cityid: 96
			},
			{
				name: "泸州市",
				tags: "LUZHOU,泸州市",
				cityid: 117
			},
			{
				name: "莱芜市",
				tags: "LAIWU,莱芜市",
				cityid: 122
			},
			{
				name: "聊城市",
				tags: "LIAOCHENG,聊城市",
				cityid: 123
			},
			{
				name: "柳州市",
				tags: "LIUZHOU,柳州市",
				cityid: 134
			},
			{
				name: "丽江市",
				tags: "LIJIANG,丽江市",
				cityid: 137
			},
			{
				name: "丽水市",
				tags: "LISHUI,丽水市",
				cityid: 139
			},
			{
				name: "拉萨市",
				tags: "LASA,拉萨市",
				cityid: 178
			},
			{
				name: "六安市",
				tags: "LIUAN,六安市",
				cityid: 186
			},
			{
				name: "临汾市",
				tags: "LINFEN,临汾市",
				cityid: 193
			},
			{
				name: "吕梁市",
				tags: "LVLIANG,吕梁市",
				cityid: 194
			},
			{
				name: "辽源市",
				tags: "LIAOYUAN,辽源市",
				cityid: 206
			},
			{
				name: "龙岩市",
				tags: "LONGYAN,龙岩市",
				cityid: 226
			},
			{
				name: "娄底市",
				tags: "LOUDI,娄底市",
				cityid: 245
			},
			{
				name: "漯河市",
				tags: "LUOHE,漯河市",
				cityid: 248
			},
			{
				name: "来宾市",
				tags: "LAIBIN,来宾市",
				cityid: 266
			},
			{
				name: "临高县",
				tags: "LINGAOXIAN,临高县",
				cityid: 277
			},
			{
				name: "乐山市",
				tags: "LESHAN,乐山市",
				cityid: 283
			},
			{
				name: "凉山州",
				tags: "LIANGSHANZHOU,凉山州",
				cityid: 292
			},
			{
				name: "六盘水市",
				tags: "LIUPANSHUI,六盘水市",
				cityid: 293
			},
			{
				name: "临沧市",
				tags: "LINCANG,临沧市",
				cityid: 304
			},
			{
				name: "林芝地区",
				tags: "LINZHIDIQU,林芝地区",
				cityid: 317
			},
			{
				name: "陇南市",
				tags: "LONGNAN,陇南市",
				cityid: 331
			},
			{
				name: "临夏州",
				tags: "LINXIAZHOU,临夏州",
				cityid: 332
			}
		]
	},
	{
		name: "M",
		cities: [
			{
				name: "绵阳市",
				tags: "MIANYANG,绵阳市",
				cityid: 50
			},
			{
				name: "马鞍山市",
				tags: "MAANSHAN,马鞍山市",
				cityid: 99
			},
			{
				name: "牡丹江市",
				tags: "MUDANJIANG,牡丹江市",
				cityid: 129
			},
			{
				name: "茂名市",
				tags: "MAOMING,茂名市",
				cityid: 155
			},
			{
				name: "梅州市",
				tags: "MEIZHOU,梅州市",
				cityid: 156
			},
			{
				name: "眉山市",
				tags: "MEISHAN,眉山市",
				cityid: 286
			}
		]
	},
	{
		name: "N",
		cities: [
			{
				name: "南京市",
				tags: "NANJING,南京市",
				cityid: 11
			},
			{
				name: "宁波市",
				tags: "NINGBO,宁波市",
				cityid: 20
			},
			{
				name: "南宁市",
				tags: "NANNING,南宁市",
				cityid: 33
			},
			{
				name: "南昌市",
				tags: "NANCHANG,南昌市",
				cityid: 38
			},
			{
				name: "南充市",
				tags: "NANCHONG,南充市",
				cityid: 53
			},
			{
				name: "南通市",
				tags: "NANTONG,南通市",
				cityid: 92
			},
			{
				name: "南阳市",
				tags: "NANYANG,南阳市",
				cityid: 113
			},
			{
				name: "宁德市",
				tags: "NINGDE,宁德市",
				cityid: 144
			},
			{
				name: "南平市",
				tags: "NANPING,南平市",
				cityid: 145
			},
			{
				name: "内江市",
				tags: "NEIJIANG,内江市",
				cityid: 282
			},
			{
				name: "怒江州",
				tags: "NUJIANGZHOU,怒江州",
				cityid: 310
			},
			{
				name: "那曲地区",
				tags: "NAQUDIQU,那曲地区",
				cityid: 312
			}
		]
	},
	{
		name: "P",
		cities: [
			{
				name: "平顶山市",
				tags: "PINGDINGSHAN,平顶山市",
				cityid: 103
			},
			{
				name: "攀枝花市",
				tags: "PANZHIHUA,攀枝花市",
				cityid: 119
			},
			{
				name: "莆田市",
				tags: "PUTIAN,莆田市",
				cityid: 143
			},
			{
				name: "盘锦市",
				tags: "PANJIN,盘锦市",
				cityid: 165
			},
			{
				name: "濮阳市",
				tags: "PUYANG,濮阳市",
				cityid: 176
			},
			{
				name: "萍乡市",
				tags: "PINGXIANG,萍乡市",
				cityid: 219
			},
			{
				name: "普洱市",
				tags: "PUER,普洱市",
				cityid: 303
			},
			{
				name: "平凉市",
				tags: "PINGLIANG,平凉市",
				cityid: 327
			}
		]
	},
	{
		name: "Q",
		cities: [
			{
				name: "青岛市",
				tags: "QINGDAO,青岛市",
				cityid: 13
			},
			{
				name: "泉州市",
				tags: "QUANZHOU,泉州市",
				cityid: 35
			},
			{
				name: "秦皇岛市",
				tags: "QINHUANGDAO,秦皇岛市",
				cityid: 61
			},
			{
				name: "齐齐哈尔市",
				tags: "QIQIHAER,齐齐哈尔市",
				cityid: 65
			},
			{
				name: "曲靖市",
				tags: "QUJING,曲靖市",
				cityid: 138
			},
			{
				name: "衢州市",
				tags: "QUZHOU,衢州市",
				cityid: 140
			},
			{
				name: "清远市",
				tags: "QINGYUAN,清远市",
				cityid: 157
			},
			{
				name: "七台河市",
				tags: "QITAIHE,七台河市",
				cityid: 216
			},
			{
				name: "潜江市",
				tags: "QIANJIANG,潜江市",
				cityid: 238
			},
			{
				name: "钦州市",
				tags: "QINZHOU,钦州市",
				cityid: 261
			},
			{
				name: "琼海市",
				tags: "QIONGHAI,琼海市",
				cityid: 269
			},
			{
				name: "黔西南州",
				tags: "QIANXINANZHOU,黔西南州",
				cityid: 297
			},
			{
				name: "黔东南州",
				tags: "QIANDONGNANZHOU,黔东南州",
				cityid: 298
			},
			{
				name: "黔南州",
				tags: "QIANNANZHOU,黔南州",
				cityid: 299
			},
			{
				name: "庆阳市",
				tags: "QINGYANG,庆阳市",
				cityid: 329
			}
		]
	},
	{
		name: "R",
		cities: [
			{
				name: "日照市",
				tags: "RIZHAO,日照市",
				cityid: 167
			},
			{
				name: "日喀则地区",
				tags: "RIKAZEDIQU,日喀则地区",
				cityid: 315
			}
		]
	},
	{
		name: "S",
		cities: [
			{
				name: "深圳市",
				tags: "SHENZHEN,深圳市",
				cityid: 2
			},
			{
				name: "上海市",
				tags: "SHANGHAI,上海市",
				cityid: 4
			},
			{
				name: "沈阳市",
				tags: "SHENYANG,沈阳市",
				cityid: 8
			},
			{
				name: "石家庄市",
				tags: "SHIJIAZHUANG,石家庄市",
				cityid: 22
			},
			{
				name: "苏州市",
				tags: "SUZHOU,苏州市",
				cityid: 23
			},
			{
				name: "三亚市",
				tags: "SANYA,三亚市",
				cityid: 37
			},
			{
				name: "绍兴市",
				tags: "SHAOXING,绍兴市",
				cityid: 89
			},
			{
				name: "绥化市",
				tags: "SUIHUA,绥化市",
				cityid: 128
			},
			{
				name: "四平市",
				tags: "SIPING,四平市",
				cityid: 130
			},
			{
				name: "宿迁市",
				tags: "SUQIAN,宿迁市",
				cityid: 147
			},
			{
				name: "汕头市",
				tags: "SHANTOU,汕头市",
				cityid: 158
			},
			{
				name: "商丘市",
				tags: "SHANGQIU,商丘市",
				cityid: 177
			},
			{
				name: "石河子市",
				tags: "SHIHEZI,石河子市",
				cityid: 181
			},
			{
				name: "宿州市",
				tags: "SUZHOU,宿州市",
				cityid: 185
			},
			{
				name: "朔州市",
				tags: "SHUOZHOU,朔州市",
				cityid: 191
			},
			{
				name: "松原市",
				tags: "SONGYUAN,松原市",
				cityid: 209
			},
			{
				name: "双鸭山市",
				tags: "SHUANGYASHAN,双鸭山市",
				cityid: 213
			},
			{
				name: "上饶市",
				tags: "SHANGRAO,上饶市",
				cityid: 224
			},
			{
				name: "三明市",
				tags: "SANMING,三明市",
				cityid: 225
			},
			{
				name: "十堰市",
				tags: "SHIYAN,十堰市",
				cityid: 228
			},
			{
				name: "随州市",
				tags: "SUIZHOU,随州市",
				cityid: 234
			},
			{
				name: "神农架林区",
				tags: "SHENNONGJIALINQU,神农架林区",
				cityid: 239
			},
			{
				name: "邵阳市",
				tags: "SHAOYANG,邵阳市",
				cityid: 240
			},
			{
				name: "三门峡市",
				tags: "SANMENXIA,三门峡市",
				cityid: 249
			},
			{
				name: "韶关市",
				tags: "SHAOGUAN,韶关市",
				cityid: 253
			},
			{
				name: "汕尾市",
				tags: "SHANWEI,汕尾市",
				cityid: 255
			},
			{
				name: "遂宁市",
				tags: "SUINING,遂宁市",
				cityid: 281
			},
			{
				name: "山南地区",
				tags: "SHANNANDIQU,山南地区",
				cityid: 314
			},
			{
				name: "商洛市",
				tags: "SHANGLUO,商洛市",
				cityid: 321
			},
			{
				name: "石嘴山市",
				tags: "SHIZUISHAN,石嘴山市",
				cityid: 334
			}
		]
	},
	{
		name: "T",
		cities: [
			{
				name: "天津市",
				tags: "TIANJIN,天津市",
				cityid: 7
			},
			{
				name: "太原市",
				tags: "TAIYUAN,太原市",
				cityid: 26
			},
			{
				name: "唐山市",
				tags: "TANGSHAN,唐山市",
				cityid: 40
			},
			{
				name: "铁岭市",
				tags: "TIELING,铁岭市",
				cityid: 69
			},
			{
				name: "台州市",
				tags: "TAIZHOU,台州市",
				cityid: 87
			},
			{
				name: "泰州市",
				tags: "TAIZHOU,泰州市",
				cityid: 95
			},
			{
				name: "泰安市",
				tags: "TAIAN,泰安市",
				cityid: 121
			},
			{
				name: "天水市",
				tags: "TIANSHUI,天水市",
				cityid: 169
			},
			{
				name: "铜陵市",
				tags: "TONGLING,铜陵市",
				cityid: 184
			},
			{
				name: "通辽市",
				tags: "TONGLIAO,通辽市",
				cityid: 197
			},
			{
				name: "通化市",
				tags: "TONGHUA,通化市",
				cityid: 207
			},
			{
				name: "天门市",
				tags: "TIANMEN,天门市",
				cityid: 237
			},
			{
				name: "屯昌县",
				tags: "TUNCHANGXIAN,屯昌县",
				cityid: 276
			},
			{
				name: "铜仁地区",
				tags: "TONGRENDIQU,铜仁地区",
				cityid: 295
			},
			{
				name: "铜川市",
				tags: "TONGCHUAN,铜川市",
				cityid: 318
			},
			{
				name: "吐鲁番地区",
				tags: "TULUFANDIQU,吐鲁番地区",
				cityid: 345
			},
			{
				name: "塔城地区",
				tags: "TACHENGDIQU,塔城地区",
				cityid: 354
			}
		]
	},
	{
		name: "W",
		cities: [
			{
				name: "武汉市",
				tags: "WUHAN,武汉市",
				cityid: 6
			},
			{
				name: "威海市",
				tags: "WEIHAI,威海市",
				cityid: 42
			},
			{
				name: "无锡市",
				tags: "WUXI,无锡市",
				cityid: 47
			},
			{
				name: "乌鲁木齐市",
				tags: "WULUMUQI,乌鲁木齐市",
				cityid: 52
			},
			{
				name: "潍坊市",
				tags: "WEIFANG,潍坊市",
				cityid: 81
			},
			{
				name: "温州市",
				tags: "WENZHOU,温州市",
				cityid: 85
			},
			{
				name: "芜湖市",
				tags: "WUHU,芜湖市",
				cityid: 98
			},
			{
				name: "乌海市",
				tags: "WUHAI,乌海市",
				cityid: 195
			},
			{
				name: "乌兰察布市",
				tags: "WULANCHABU,乌兰察布市",
				cityid: 200
			},
			{
				name: "梧州市",
				tags: "WUZHOU,梧州市",
				cityid: 259
			},
			{
				name: "五指山市",
				tags: "WUZHISHAN,五指山市",
				cityid: 268
			},
			{
				name: "文昌市",
				tags: "WENCHANG,文昌市",
				cityid: 271
			},
			{
				name: "万宁市",
				tags: "WANNING,万宁市",
				cityid: 272
			},
			{
				name: "文山州",
				tags: "WENSHANZHOU,文山州",
				cityid: 305
			},
			{
				name: "渭南市",
				tags: "WEINAN,渭南市",
				cityid: 319
			},
			{
				name: "武威市",
				tags: "WUWEI,武威市",
				cityid: 325
			},
			{
				name: "吴忠市",
				tags: "WUZHONG,吴忠市",
				cityid: 335
			}
		]
	},
	{
		name: "X",
		cities: [
			{
				name: "西安市",
				tags: "XIAN,西安市",
				cityid: 10
			},
			{
				name: "西宁市",
				tags: "XINING,西宁市",
				cityid: 28
			},
			{
				name: "厦门市",
				tags: "XIAMEN,厦门市",
				cityid: 32
			},
			{
				name: "徐州市",
				tags: "XUZHOU,徐州市",
				cityid: 39
			},
			{
				name: "湘潭市",
				tags: "XIANGTAN,湘潭市",
				cityid: 55
			},
			{
				name: "邢台市",
				tags: "XINGTAI,邢台市",
				cityid: 67
			},
			{
				name: "襄阳市",
				tags: "XIANGYANG,襄阳市",
				cityid: 108
			},
			{
				name: "新乡市",
				tags: "XINXIANG,新乡市",
				cityid: 111
			},
			{
				name: "许昌市",
				tags: "XUCHANG,许昌市",
				cityid: 112
			},
			{
				name: "咸阳市",
				tags: "XIANYANG,咸阳市",
				cityid: 116
			},
			{
				name: "新余市",
				tags: "XINYU,新余市",
				cityid: 152
			},
			{
				name: "宣城市",
				tags: "XUANCHENG,宣城市",
				cityid: 182
			},
			{
				name: "忻州市",
				tags: "XINZHOU,忻州市",
				cityid: 192
			},
			{
				name: "锡林郭勒盟",
				tags: "XILINGUOLEMENG,锡林郭勒盟",
				cityid: 201
			},
			{
				name: "兴安盟",
				tags: "XINGANMENG,兴安盟",
				cityid: 203
			},
			{
				name: "孝感市",
				tags: "XIAOGAN,孝感市",
				cityid: 231
			},
			{
				name: "咸宁市",
				tags: "XIANNING,咸宁市",
				cityid: 233
			},
			{
				name: "仙桃市",
				tags: "XIANTAO,仙桃市",
				cityid: 236
			},
			{
				name: "湘西州",
				tags: "XIANGXIZHOU,湘西州",
				cityid: 246
			},
			{
				name: "信阳市",
				tags: "XINYANG,信阳市",
				cityid: 250
			},
			{
				name: "西双版纳州",
				tags: "XISHUANGBANNAZHOU,西双版纳州",
				cityid: 307
			}
		]
	},
	{
		name: "Y",
		cities: [
			{
				name: "烟台市",
				tags: "YANTAI,烟台市",
				cityid: 29
			},
			{
				name: "银川市",
				tags: "YINCHUAN,银川市",
				cityid: 49
			},
			{
				name: "宜昌市",
				tags: "YICHANG,宜昌市",
				cityid: 51
			},
			{
				name: "岳阳市",
				tags: "YUEYANG,岳阳市",
				cityid: 56
			},
			{
				name: "营口市",
				tags: "YINGKOU,营口市",
				cityid: 76
			},
			{
				name: "扬州市",
				tags: "YANGZHOU,扬州市",
				cityid: 91
			},
			{
				name: "盐城市",
				tags: "YANCHENG,盐城市",
				cityid: 94
			},
			{
				name: "运城市",
				tags: "YUNCHENG,运城市",
				cityid: 104
			},
			{
				name: "宜宾市",
				tags: "YIBIN,宜宾市",
				cityid: 118
			},
			{
				name: "阳泉市",
				tags: "YANGQUAN,阳泉市",
				cityid: 126
			},
			{
				name: "延吉市",
				tags: "YANJI,延吉市",
				cityid: 131
			},
			{
				name: "玉林市",
				tags: "YULIN,玉林市",
				cityid: 162
			},
			{
				name: "延安市",
				tags: "YANAN,延安市",
				cityid: 171
			},
			{
				name: "榆林市",
				tags: "YULIN,榆林市",
				cityid: 172
			},
			{
				name: "伊春市",
				tags: "YICHUN,伊春市",
				cityid: 214
			},
			{
				name: "鹰潭市",
				tags: "YINGTAN,鹰潭市",
				cityid: 220
			},
			{
				name: "宜春市",
				tags: "YICHUN,宜春市",
				cityid: 222
			},
			{
				name: "益阳市",
				tags: "YIYANG,益阳市",
				cityid: 242
			},
			{
				name: "永州市",
				tags: "YONGZHOU,永州市",
				cityid: 243
			},
			{
				name: "阳江市",
				tags: "YANGJIANG,阳江市",
				cityid: 256
			},
			{
				name: "云浮市",
				tags: "YUNFU,云浮市",
				cityid: 258
			},
			{
				name: "雅安市",
				tags: "YAAN,雅安市",
				cityid: 287
			},
			{
				name: "玉溪市",
				tags: "YUXI,玉溪市",
				cityid: 300
			},
			{
				name: "玉树州",
				tags: "YUSHUZHOU,玉树州",
				cityid: 343
			},
			{
				name: "伊犁州",
				tags: "YILIZHOU,伊犁州",
				cityid: 353
			}
		]
	},
	{
		name: "Z",
		cities: [
			{
				name: "郑州市",
				tags: "ZHENGZHOU,郑州市",
				cityid: 9
			},
			{
				name: "遵义市",
				tags: "ZUNYI,遵义市",
				cityid: 44
			},
			{
				name: "株洲市",
				tags: "ZHUZHOU,株洲市",
				cityid: 54
			},
			{
				name: "淄博市",
				tags: "ZIBO,淄博市",
				cityid: 57
			},
			{
				name: "张家口市",
				tags: "ZHANGJIAKOU,张家口市",
				cityid: 78
			},
			{
				name: "珠海市",
				tags: "ZHUHAI,珠海市",
				cityid: 84
			},
			{
				name: "镇江市",
				tags: "ZHENJIANG,镇江市",
				cityid: 93
			},
			{
				name: "周口市",
				tags: "ZHOUKOU,周口市",
				cityid: 114
			},
			{
				name: "中山市",
				tags: "ZHONGSHAN,中山市",
				cityid: 132
			},
			{
				name: "漳州市",
				tags: "ZHANGZHOU,漳州市",
				cityid: 142
			},
			{
				name: "舟山市",
				tags: "ZHOUSHAN,舟山市",
				cityid: 146
			},
			{
				name: "湛江市",
				tags: "ZHANJIANG,湛江市",
				cityid: 159
			},
			{
				name: "肇庆市",
				tags: "ZHAOQING,肇庆市",
				cityid: 160
			},
			{
				name: "枣庄市",
				tags: "ZAOZHUANG,枣庄市",
				cityid: 168
			},
			{
				name: "张家界市",
				tags: "ZHANGJIAJIE,张家界市",
				cityid: 241
			},
			{
				name: "驻马店市",
				tags: "ZHUMADIAN,驻马店市",
				cityid: 251
			},
			{
				name: "自贡市",
				tags: "ZIGONG,自贡市",
				cityid: 279
			},
			{
				name: "资阳市",
				tags: "ZIYANG,资阳市",
				cityid: 289
			},
			{
				name: "昭通市",
				tags: "ZHAOTONG,昭通市",
				cityid: 302
			},
			{
				name: "张掖市",
				tags: "ZHANGYE,张掖市",
				cityid: 326
			},
			{
				name: "中卫市",
				tags: "ZHONGWEI,中卫市",
				cityid: 337
			}
		]
	}
];
// 地图操作的函数

// 定位功能  定位功能 
    function chartBus_amap(){
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy:true, //是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RT',     //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(14,parseFloat($(document.body).outerHeight()*0.275)),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true  //定位成功后是否自动调整地图视野到定位点
			});
			
			//监听按钮事件
			AMap.event.addListener(geolocation, 'complete', container.onsuccess);

            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    container.onsuccess(result);
                }else{
                    console.log("定位失败",result);
					showMessage1btn("定位失败,请刷新在试","",0);
					releaseData.busMapDw =  false ;
                }
            });
        });
    }
        
    var container = {
		onsuccess:function(result){   // 定位成功得到的数据
			// 定位时都清楚所有marker
			map.remove(markers);
            console.log("定位成功",result);
			releaseData.dwlocationg = result;
			var val = releaseData.dwlocationg;
			var hash = window.location.hash;
            if( val !="" ){
                $("#busMap-dzname").text(val.formattedAddress);
                $("#busMap-dzcity").text(val.addressComponent.city);
                var textval = val.addressComponent.street+val.addressComponent.streetNumber;
                $("#busMap-dzcityname").text(textval);
                // 定位后，还得把几个城市更新
                $("#busMap-city").text(val.addressComponent.city);
				$("#address-city").text(val.addressComponent.city);
				releaseData.busMapDw = true;

				if ( hash == "#busMap?seedpcity" ) {
					releaseData.fabudpData.isLocation = true  ;
					releaseData.fabudpData.data = releaseData.dwlocationg;
					window.location.hash = "#busMap?dpcity"
				}else if ( hash == "#busMap?seearcity"){
					releaseData.fabuarData.isLocation = true ;
					releaseData.fabuarData.data= releaseData.dwlocationg;
					window.location.hash = "#busMap?arcity"
				}else if ( hash == "#busMap?dpcity"){
					releaseData.fabudpData.isLocation = true  ;
					releaseData.fabudpData.data = releaseData.dwlocationg;
				}else if ( hash == "#busMap?arcity" ){
					releaseData.fabuarData.isLocation = true ;
					releaseData.fabuarData.data= releaseData.dwlocationg;
				}

            }
        },
        onclick:function(result){   //用于画maker，并聚焦用。
            // 先清除所有macker，在画macker

            console.log(result);
            // 第一步
            document.getElementById('lnglat').value = result;
            // 第二步
            var position = [result.R, result.P]; 
            map.setCenter(position); 
            // 获取地图中心点
            var currentCenter = map.getCenter(); 
            // 第三部
            if(result==false){
                document.getElementById('lnglat').value = {};
                regeoCode();
            }
            document.getElementById('lnglat').value = result;
            regeoCode(result);

        }
    }
// 时间
	var geocoder,marker;
	var markers = [];
    function regeoCode(result) {

		map.remove(markers);

        if(!geocoder){
            geocoder = new AMap.Geocoder({
                city: "常州", //城市设为北京，默认：“全国”
                radius: 1000 //范围，默认：500
            });
        }
        // var lnglat  = document.getElementById('lnglat').value.split(',');
        marker = new AMap.Marker({
            position: result
        });
		map.add(marker);
		
		markers.push(marker);

        // marker.setPosition(lnglat);
        
        // geocoder.getAddress(lnglat, function(status, result) {
        //     if (status === 'complete'&&result.regeocode) {
        //     }else{alert(JSON.stringify(result))}
        // });
    }
/* 绑定 */
    // document.getElementById('lnglat').onkeydown = function(e) {
    //     if (e.keyCode === 13) {
    //         regeoCode();
    //         return false;
    //     }
    //     return true;
    // }; 
    
   // 地图的初始化
   var map = new AMap.Map('container', {
        center:[119.955,31.779],
        zoom:11
    });
    map.on('complete', function(){
        // 地图图块加载完成后触发
        // 位置
        $(".amap-zoomcontrol").css({
            "height":"94px",
            "top":-($(document.body).outerHeight()*0.646875)+"px" 
        });
    });


// 城市选择页操作
    var searchcity = {
        returnPage:function(){
            console.log(1);
            setTimeout(function(){
                window.history.back(-1);
            },500);
        },
        clickCity:function(divname){
            var val = $(divname).text();
            $("#busMap-city").text(val);
            $("#address-city").text(val);
            $("#searchcity-nowcity").text(val);

            $("#searchcity-cz").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-wx").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-sh").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-sz").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-tz").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-nj").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-hz").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-nt").css({
                "background":"#fff",
                "color":"#555"
            })
            $("#searchcity-zj").css({
                "background":"#fff",
                "color":"#555"
            })

            $(divname).css({
                "color":"#fff",
                "background":"#ff8700"
            })
        }
    }

// 获取结束时间 - 起始时间 的天数
// startTime:起始时间  
// endtime：结束时间
function getTwoDayTime (startTime,endTime) {
    startTime =  new Date(startTime);
    startTime.setHours(0,0,0,0);
    endTime = new Date(endTime);
    endTime.setHours(0,0,0,0);
    var day   = 0;
    day = parseInt((endTime - startTime)/86400000);  // 60*60*100*42天
    return day;
}

// 时间插件的函数
    // 时间选择所需要的数据 
    function setTimeWheel(){            
        var dd = new Date();
        dd.setMinutes(Math.round(dd.getMinutes()/10)*10);
        var currYear = dd.getFullYear();  
        var opt={};
        //opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
        dd.setDate(dd.getDate()+2);//获取AddDayCount天后的日期
        opt.sdatetime = {minDate: dd};
        opt.sdtdefault_0 = {
            dateOrder: 'yymmddDD',
            theme: 'android-ics light', //皮肤样式
            display: 'bottom', //显示方式 
            mode: 'scroller', //日期选择模式
            lang:'zh',
            dateFormat: 'yyyy-mm-dd',
            startYear:currYear, //开始年份
            endYear:currYear + 1, //结束年份
            stepMinute: 10,  // More info about stepMinute: //docs.mobiscroll.com/2-16-1/datetime#!opt-stepMinute
            onSelect: function (valueText, inst) {  
                var sday = inst.getDate();  
                var today = new Array('周日','周一','周二','周三','周四','周五','周六'); 
                //获取当前日期
                var tmpNow = new Date();
                tmpNow.setMinutes(Math.round(dd.getMinutes()/10)*10);
                tmpNow.setDate(tmpNow.getDate()+2);//获取AddDayCount天后的日期
                
                var dateArray = inst.getArrayVal();
                var week = today[sday.getDay()];  
                var year = dateArray[0];
                var Month = parseInt(dateArray[1]) + 1;
                var day = dateArray[2];
                var hour = dateArray[3];
                var minute = dateArray[4];
                
                if (sday < tmpNow){
                    opt.sdatetime = {minDate: tmpNow};
                    week = today[tmpNow.getDay()];
                    year = tmpNow.getFullYear();
                    Month = tmpNow.getMonth() + 1;
                    day = tmpNow.getDate();
                    hour = tmpNow.getHours();
                    minute = tmpNow.getMinutes();
                }
                if (parseInt(Month) < 10) {
                    Month = "0" + Month;
                }
                if (parseInt(hour) < 10) {
                    hour = "0" + hour;
                }
                if (parseInt(minute) < 10) {
                    minute = "0" + minute;
                }
                if ($(this).hasClass("start_time_default")){
                    $(this).removeClass("start_time_default").addClass("start_time only_one_time");
                }
                var tmpStr = "<span class='date'>" + Month + "月" + day + "日" + "<b class='week'>" + week + "</b>" + hour + ":" + minute + "</span>"
                $(this).html(tmpStr);
                $(this).attr("data-val",valueText);
                
                var optSDateTime_tmp = $.extend(opt['sdatetime'], opt['sdtdefault_0']);


                if (releaseData.useType == "往返") {
                    if ( this.id =="dt-c-1"){
                        opt.sdatetime = {minDate:tmpNow,maxDate: new Date(($("#dt-c-1").attr("data-val")).replace(/-/g,"/"))};
                        optSDateTime_tmp = $.extend(opt['sdatetime'], opt['sdtdefault_0']);
                        $("#dt-a-0").mobiscroll().datetime(optSDateTime_tmp);
                    }else if ( this.id =="dt-a-0" ){
                        opt.sdatetime = {minDate:new Date(($("#dt-a-0").attr("data-val")).replace(/-/g,"/"))};
                        optSDateTime_tmp = $.extend(opt['sdatetime'], opt['sdtdefault_0']);
                        $("#dt-c-1").mobiscroll().datetime(optSDateTime_tmp);
                    }   
                }else {
                    //  就是单程
                    $("#dt-a-0").mobiscroll().datetime(optSDateTime_tmp);
                }
            },
        };
        var optSDateTime_0 = $.extend(opt['sdatetime'], opt['sdtdefault_0']);
        $("#dt-a-0").mobiscroll().datetime(optSDateTime_0);  
        $("#dt-c-1").mobiscroll().datetime(optSDateTime_0); 
	}
	
	// url转成obj形式
    // function urlToObj(str){
    //     　　var obj = {};
    //     　　var arr1 = str.split("?");
    //     　　var arr2 = arr1[1].split("&");
    //     　　for(var i=0 ; i < arr2.length; i++){
    //     　　　　var res = arr2[i].split("=");
    //     　　　　obj[res[0]] = res[1];
    //     　　}
    //     　　return obj;
    // }

	

	

