// 页面初始化数据
var newPageData = {
    uid:0,   // 用户的uid
    phone:0,    //  电话
    openid:0,   //  openid
    
}
   // 禁用效果 
   $(document.body).css({
    "overflow-x":"hidden",
    "overflow-y":"hidden"
    });

$(function(){
    getOpenid(function(openid){
        newPageData.uid = localCache("uid-kongbatong");
        newPageData.openid = localCache("openid-kongbatong");
        newPageData.phone = localCache("mobile-kongbatong");
        newPageData.openid = openid;
        console.log("openid",openid,newPageData.uid,newPageData.openid);
        if(null == newPageData.uid || "" == newPageData.uid) {
            register("//qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
        } else {
            //$(document.body).outerHeight($(window).outerHeight());
			//我的订单
			//全部行程页 车主页的高度 
			$(".myorder").outerHeight($(document.body).outerHeight());
			$(".myorder-gdwcdiv").outerHeight($(document.body).outerHeight()-$(".myorder-header").outerHeight()-6);
            // 得到订单数据
            myorder.myorderPage("","","");
            // 获取车辆类型
            selectcar.cartype();
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
            // 定位功能
            chartBus_amap();
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
        window.location.hash  = "#busMap?dpcity";
    })
    // 点击去哪儿
    $("#bus-arcity").bind("touch click",function(){
        window.location.hash  = "#busMap?arcity";
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
    $("#busMap-qrclick").bind("touch click",function(){
        // 没有数据则不让跳转
        if(releaseData.dwlocationg==="" && releaseData.searchMap===""){
            return false;
        }
        // 使用搜索数据
        if(location.hash==="#busMap?dpcity"){
            releaseData.dpCity = $("#busMap-city").text();
            // 如果搜索页被点击了，则不使用定位数据
            if( releaseData.sfaddress === true ){
                releaseData.dwsjUsed = false;
            }
            $("#bus-dpcity").text($("#busMap-dzname").text());
        }else if ( location.hash=== "#busMap?arcity"){
            releaseData.arCity = $("#busMap-city").text();
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
        window.location.hash = "#searchcity";
    })
    $("#address-city").bind("touch click",function(){
        window.location.hash = "#searchcity";
    })
    // Input输入事件
    $("#address-input").bind("input",function(){
        address.addinput();
    })
    $("#address-input").bind("focus",function(){
        $("#address-input").val("");
    })
    // 下面数据点击事件
// 城市选择页面
    $("#searchcity-return").bind("touch click",function(){
        window.history.back(-1);
    })
//我的订单页绑定事件
    //返回
     $("#myorder-return").bind("touch click",function(){
        window.location.hash = "#bus";
     })
    //  点击
      $("#searchcity-nowcity").bind("touch click",function(){
        searchcity.clickCity("#searchcity-nowcity");
        searchcity.returnPage();
     })
     $("#searchcity-cz").bind("touch click",function(){
        searchcity.clickCity("#searchcity-cz");
        searchcity.returnPage();
     })
     $("#searchcity-wx").bind("touch click",function(){
        searchcity.clickCity("#searchcity-wx");
        searchcity.returnPage();
     })
     $("#searchcity-sh").bind("touch click",function(){
        searchcity.clickCity("#searchcity-sh");
        searchcity.returnPage();
     })
     $("#searchcity-sz").bind("touch click",function(){
        searchcity.clickCity("#searchcity-sz");
        searchcity.returnPage();
     })
     $("#searchcity-tz").bind("touch click",function(){
        searchcity.clickCity("#searchcity-tz");
        searchcity.returnPage();
     })
     $("#searchcity-nj").bind("touch click",function(){
        searchcity.clickCity("#searchcity-nj");
        searchcity.returnPage();
     })
     $("#searchcity-hz").bind("touch click",function(){
        searchcity.clickCity("#searchcity-hz");
        searchcity.returnPage();
     })
     $("#searchcity-nt").bind("touch click",function(){
        searchcity.clickCity("#searchcity-nt");
        searchcity.returnPage();
     })
     $("#searchcity-zj").bind("touch click",function(){
        searchcity.clickCity("#searchcity-zj");
        searchcity.returnPage();
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
            showMessage1btn("字数超过限制!","",0);
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
        window.location.hash ="#selectcar";
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
            hashcsh();
            selectcar.newPage();
            $(".selectcar").show(); 
        }else if ( hashval ==="#details" ){
            hashcsh();
            details.newPage();
            $(".details").show();
        }else if ( hashval ==="#busMap" ){
            if(hashzhi==="xq"){
                $(".busMap-hdright").text("查看位置");
                $(".busMap-city").hide();//显示
                $(".busMap-dz").hide();
                $("#busMap-return").bind("touch click",function(){
                    window.history.back(-1);
                })
            }else if(hashzhi==="dpcity"){
                obtainData.busMap = hashzhi;
                $(".busMap-hdright").text("选择起点");
                $(".busMap-city").show();//显示
                $(".busMap-dz").show();
                $("#busMap-return").bind("touch click",function(){
                    window.location.hash = "#bus";
                })
            }else if (hashzhi==="arcity") {
                obtainData.busMap = hashzhi;
                $(".busMap-hdright").text("选择目的地");
                $(".busMap-city").show();//显示
                $(".busMap-dz").show();
                $("#busMap-return").bind("touch click",function(){
                    window.location.hash = "#bus";
                })
            }
            hashcsh();
            $(".busMap").show();
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
        }else if ( hashval ==="#searchcity" ){
            hashcsh();
            $("#searchcity-nowcity").text($("#busMap-city").text());
            $("#searchcity").show();
        }else if ( hashval ==="#price" ){
            price.newPage();
            hashcsh();
            $(".price").show();
        }
        function hashcsh(){
            $(".bus").hide();
            $(".selectcar").hide();
            $(".details").hide();
            $(".busMap").hide();
            $(".address").hide();
            $(".myorder").hide();
            $("#searchcity").hide();
            $(".price").hide();
        }
    }
// 返回的的代码
    function register(val){
        var nowhref = window.location.href;
        localCache("page",nowhref);     // 存储在本地的地址
        window.location.href = "Register_content.html";		// 发送给他的地址 	
    }  
// 价格页的操作
    var price = {
        newPage:function(){
            $("#price-exceedtime").text(releaseData.clickbus.hourPrice+"元/小时");
            $("#price-exceedkile").text(releaseData.clickbus.disPrice+"元/公里");
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
            // 状态（-2:待退款；-1:取消；0：下单；1：完成；2：待付款）
            $("#myorder-odbutton").empty();
            // 结果，还要添加什么按钮
            var odstatus = "";
            if(val.status===-2){
                odstatus = "待退款";
                $("#myorder-odbutton").append('<span class="tjorder-myorderts">如有疑问请拨打客服电话</span>');
            }else if (val.status===-1){
                odstatus = "已取消";
                $("#myorder-odbutton").append('<span class="tjorder-myorderts">如需包车,请重新下单!</span>');
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
            // 起点
            $("#myorder-oddpcity").text(val.departure);
            var myorder_oddpcity = "myorder-oddpcity"+val.id;
            $("#myorder-oddpcity").attr("id",myorder_oddpcity);
            // 终点
            $("#myorder-odarcity").text(val.arrival);
            var myorder_odarcity = "myorder-odarcity"+val.id;
            $("#myorder-odarcity").attr("id",myorder_odarcity);
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
            if(val.price == null || val.price == ""){
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
            console.log("取消",uid,id);
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/cancelChaOrder.asp",
                data:{
                    uid:uid,
                    id:id
                },
                success:function(data){
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
                    console.log("取消失败",data);
                    showMessage1btn("网络出错，请重试!","",0);
                }
            })
        }
    }
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
        console.log(moneyVal,valuid,valid)
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
                    caoId:valid
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
                    "instant_channel" : paymentbttsj.instant_channel,
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
                                showMessage1btn("支付成功","",0);
                                // 支付成功后，要刷新下页面
                                myorder.myorderPage("","","");
                                // 我的订单页绑定无限滚动效果
                                //hdrunvowner();
                                if ( pddval =="详情页") {
                                    details.newPage();
                                }
                                break;
                            case "get_brand_wcpay_request:fail":
                                showMessage1btn("系统出错，请联系我们！","Back()",0);
                                break;
                            case "get_brand_wcpay_request:cancel":
                                showMessage1btn("已取消支付！","Back()",0);
                                // 取消支付
                                break;
                            }
                        }
                        });
                        BC.err = function(err) {
                            //err 为object, 例 ｛”ERROR“ : "xxxx"｝;
                            showMessage1btn(err.ERROR,"",0);
                        }
                    }else{
                        showMessage1btn("后台参数错误！","",0);
                    }                                           
                        // 删除dialog
                        clearDialog();
                    },"json")
        }
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
                if(val.status===-2){
                    odstatus = "(待退款)";
                    $("#details-buttonan").append('<span class="details-myorderts">如有疑问请拨打客服电话</span>');
                }else if (val.status===-1){
                    odstatus = "(已取消)";
                    $("#details-buttonan").append('<span class="details-myorderts">如需包车,请重新下单!</span>');
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
                  $("#details-biaotitshi").text(odstatus);   
            // 支付
            if(val.payPrice===null|| val.payPrice===""){
                $("#details-price").hide();
            }else {
                // 进行渲染
                $("#details-priceje").text(val.payPrice+"(已支付金额)");
                $("#details-pricetime").text(val.payDate);
                $("#details-pricedh").text(val.price);

                $("#details-oddsz").text(val.outTradeNo);
                $("#details-oddNumber").show();
                // 存在数据则渲染
                $("#details-price").show();
            }
            // 退款
            if (val.refundPrice==null || val.refundPrice=="" ) {
                $("#details-refund").hide();
            }else {
                $("#details-refundje").text(val.refundPrice+"(退款金额)");
                $("#details-refundtime").text(val.refundDate);
                $("#details-refunddh").text(val.refundNo+"(退款号)");

                $("#details-oddsz").text(val.outTradeNo);
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

             if (releaseData.dwlocationg===""){
                if(releaseData.fabudpData===""){
                    tellTips ="请选择出发地";
                }
            }else if (releaseData.fabudpData==="") {
                if (releaseData.dwlocationg===""){
                    tellTips ="请选择出发地";
                }
            }else if (releaseData.fabuarData===""){
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
    var  selectcar  = {
        // 要阻止重复提交
        olddpcityname:'',
        oldarcityname:'',
        carTypeData:"",     // 存储的数据
        choseTypeData:"",  // 存储被选中的数据
        cartype:function(){
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/buyTicket/readChaCarTypes.asp",
                data:{
                    top:0,
                    id:""
                },
                success:function(data){
                    console.log("车辆类型数据",data);
                    selectcar.carTypeData = data.obj.lilist;
                    if(data.result>0){
                        $("#selectcar-addcar").empty();
                        for(var i = 0;i<data.obj.lilist.length;i++){
                            $("#selectcar-addcar").append(obtainData.template.selectcar);
                            selectcar.selectcarRender(i,data.obj.lilist[i]);
                        }
                        selectcar.selectcarBind();
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
                $("#selectcar-ardiv").hide();
            }else if ( releaseData.useType === "往返" ) {
                $("#selectcar-ardiv").show();
            }
            $("#selectcar-departure").text($("#bus-dpcity").text()+"上车");
            $("#selectcar-departureTime").text($("#dt-a-0").attr("data-val")+"上车");
            $("#selectcar-arrival").text($("#bus-arcity").text()+"返程");
            $("#selectcar-arrivalTime").text($("#dt-c-1").attr("data-val")+"返程");
            // 给第一个上个颜色
            $("#selectcar-car0").css("border-color","rgb(0, 141, 255)");
             // 价格
             var dLng = 0;           // 出发经度
             var dLat = 0;           // 出发纬度
             if( releaseData.dwsjUsed === true ){
                 // 使用定位数据
                 dLng = releaseData.dwlocationg.position.R;
                 dLat = releaseData.dwlocationg.position.P;
             }else if ( releaseData.dwsjUsed === false ){
                 // 使用搜索数据
                 dLng =  releaseData.fabudpData.location.R;
                 dLat =  releaseData.fabudpData.location.P;
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
                 day_time = getTwoDayTime($("#dt-a-0").attr("data-val"),$("#dt-c-1").attr("data-val")) +1 ;
                 mileage = mileage * day_time;
             }
             var dpcity  = [dLng.toFixed(6),dLat.toFixed(6)];
             var arcity =  [releaseData.fabuarData.location.lng.toFixed(6),releaseData.fabuarData.location.lat.toFixed(6)];
             var dis = parseFloat((AMap.GeometryUtil.distanceOfLine([dpcity,arcity])*returnfs/1000).toFixed(1));
             console.log("初始化来回一共多少公里",dis, mileage);
             $("#selectcar-kilometre").text(dis+"(公里)");
             var dismoney = 0;
             // 超公里费
             var car_cmintiueMoney = 1;
             car_cmintiueMoney = selectcar.carTypeData[0].disPrice;
        
             var jcmoney = parseFloat(selectcar.carTypeData[0].price);
             releaseData.clickbus = selectcar.carTypeData[0];
             if (dis>mileage) {
                 dismoney = jcmoney+ ( dis - mileage )*car_cmintiueMoney;
             }else {
                 dismoney =jcmoney;
             }
             dismoney =  dismoney*day_time;
             $("#selectcar-submitmoney").text(dismoney.toFixed(2));
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
            $("#selectcar-car0").css("border-color","#7e7d7d");
            $("#selectcar-car1").css("border-color","#7e7d7d");
            $("#selectcar-car2").css("border-color","#7e7d7d");
            $("#selectcar-car3").css("border-color","#7e7d7d");
            $("#selectcar-car4").css("border-color","#7e7d7d");
            $("#selectcar-car5").css("border-color","#7e7d7d");
            $("#selectcar-car6").css("border-color","#7e7d7d");
            $("#selectcar-car7").css("border-color","#7e7d7d");

            $("#selectcar-carspan0").css("color","#555");
            $("#selectcar-carspan1").css("color","#555");
            $("#selectcar-carspan2").css("color","#555");
            $("#selectcar-carspan3").css("color","#555");
            $("#selectcar-carspan4").css("color","#555");
            $("#selectcar-carspan5").css("color","#555");
            $("#selectcar-carspan6").css("color","#555");
            $("#selectcar-carspan7").css("color","#555");
            $(divname).css("border-color","rgb(0, 141, 255)");
            $(spanname).css("color","rgb(0, 141, 255)");

            // 价格
            var dLng = 0;           // 出发经度
            var dLat = 0;           // 出发纬度
            
            if( releaseData.dwsjUsed === true ){
                // 使用定位数据
                dLng = releaseData.dwlocationg.position.R;
                dLat = releaseData.dwlocationg.position.P;
            }else if ( releaseData.dwsjUsed === false ){
                // 使用搜索数据
                dLng =  releaseData.fabudpData.location.R;
                dLat =  releaseData.fabudpData.location.P;
            }
            var returnfs = 1;
            var day_time = 1; // 天数，默认为1，不包天。
            var mileage = 100 ; // 送他多少里，默认一天的里数
            if(releaseData.useType==="单程"){
                returnfs = 1;
                day_time = 1;
                mileage = 100 ;
            }else if (releaseData.useType==="往返"){
                returnfs = 2;
                day_time = getTwoDayTime($("#dt-a-0").attr("data-val"),$("#dt-c-1").attr("data-val")) +1 ;
                mileage =   mileage  *  day_time;
            }
            var dpcity  = [dLng.toFixed(6),dLat.toFixed(6)];
            var arcity =  [releaseData.fabuarData.location.lng.toFixed(6),releaseData.fabuarData.location.lat.toFixed(6)];
            var dis =parseFloat((AMap.GeometryUtil.distanceOfLine([dpcity,arcity])*returnfs/1000).toFixed(1));
            console.log("来回一共多少公里",dis,day_time,mileage);
            var dismoney = 0;
            // 超公里费
          
            var car_cmintiueMoney = 1;
            car_cmintiueMoney = releaseData.clickbus.disPrice;

            var jcmoney = parseFloat(releaseData.clickbus.price);
            if (dis>mileage) {
                dismoney = jcmoney+ (dis - mileage)*car_cmintiueMoney;
            }else {
                dismoney = jcmoney;
            }

            dismoney = dismoney *day_time;
            $("#selectcar-submitmoney").text(dismoney.toFixed(2));
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
            // 用定位数据还是搜索数据
            var dpCity="";          //出发城市
            var departure = "";     //出发地名
            var dLng = 0;           // 出发经度
            var dLat = 0;           // 出发纬度
            if( releaseData.dwsjUsed === true ){
                // 使用定位数据
                departure = releaseData.dwlocationg.addressComponent.street+releaseData.dwlocationg.addressComponent.streetNumber;
                dpCity = releaseData.dpCity;
                dLng = releaseData.dwlocationg.position.R;
                dLat = releaseData.dwlocationg.position.P;
            }else if ( releaseData.dwsjUsed === false ){
                // 使用搜索数据
                departure = releaseData.fabudpData.name;
                dpCity = releaseData.dpCity;
                dLng =  releaseData.fabudpData.location.R;
                dLat =  releaseData.fabudpData.location.P;
            }

            if(releaseData.useType==="单程"){
                releaseData.returnTime = "";
            }
            if(releaseData.useType==="单程"){
                releaseData.useType ="Single";
            }else if (releaseData.useType==="往返"){
                releaseData.useType ="Return";
            }
            
            selectcar.olddpcityname = "";
            selectcar.oldarcityname = "";

            if (departure==selectcar.olddpcityname && selectcar.oldarcityname == releaseData.fabuarData.name){
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
                selectcar.oldarcityname = releaseData.fabuarData.name;
            }
            // 读取车辆类型
            $.ajax({
                type:"post",
                url:"//qckj.czgdly.com/bus/MobileWeb/madeChaOrders/saveMadeChaOrders.asp",
                data:{
                    uid:newPageData.uid,				 //用户id
                    dpCity:dpCity.trim(),			    //出发城市
                    departure:departure.trim(),		    //出发地
                    dLng:dLng.toFixed(6),				//出发地经度
                    dLat:dLat.toFixed(6),				//出发地纬度
                    arCity:releaseData.arCity.trim(),			    //到达城市
                    arrival:releaseData.fabuarData.name.trim(),		//目的地
                    aLng:releaseData.fabuarData.location.lng.toFixed(6),				//目的地经度
                    aLat:releaseData.fabuarData.location.lat.toFixed(6),				//目的地纬度
                    departureTime:$("#dt-a-0").attr("data-val"),	    //出发时间
                    returnTime:$("#dt-c-1").attr("data-val"),       //返回时间
                    useType:releaseData.useType,			//包车方式
                    carType:releaseData.carType,		//车辆类型
                    contact:releaseData.contact.trim(),			//联系人
                    contactNumber:releaseData.contactNumber,	    //联系人电话
                    price:parseFloat($("#selectcar-submitmoney").text()), // 价格
                    remark:$("#textarea").val().trim(),			    //备注
                },
                success:function(result){
                    console.log("添加成功的数据",result);
                    // 要阻止他提交多次
                    
                    if(result.result>0){
                        showMessage1btn("提交成功!","myorderPageTo()",0);
                        // 提交成功要把数据初始化下
                        releaseData.contact ="";
                        releaseData.contactNumber =0;
                        $("#textarea").val("");
                        releaseData.fabudpData = "";
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
                       
                        
                    }
                },
                error:function(result){
                    console.log("添加失败",result);
                    showMessage1btn("网络出错,请重试!","",0);
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
        fabudpData:"",          // 确认的起点的数据
        fabuarData:"",          // 确认的到达地的数据
        dwsjUsed:true,              // 出发地用定位数据还是搜索数据,默认使用定位数据
        sfaddress:false,        // 是否点击了搜索数据
        clickbus:"",            // 选择的车的信息数据
    }
// 获取到数据(包含ajax，和地图数据)
    var obtainData = {
        busMap:"",   // 存储busmap的值
        template:{
            address:'<div id="address-addselect" class="addselect clearfix"><span class="addselect-left iconfont iconzhifeiji1"></span><div class="addselect-right clearfix"><span class="addselect-rtone" id="address-rtone"></span><span class="addselect-rttwo" id="address-rttwo"></span></div></div>',
            myorder:'<div id="myorder-od" class="tjorder clearfix"><a id="myorder-odahref" style="display:block;width:100%;"><div class="tjorder-hd clearfix"> <div class="tjorder-hdleft clearfix"><span class="tjorder-hdlefticon iconfont iconkeche"></span><span id="myorder-oddistance"  class="tjorder-hdleftnr">市内</span></div><p id="myorder-odstatus" class="tjorder-hdright">出票成功</p></div><div  class="tjorder-ct clearfix"><span  id="myorder-oddpcity" class="tjorder-ctleft">常州总站(常州市)</span><span class="tjorder-ctcenter">-</span><span  id="myorder-odarcity"  class="tjorder-ctright">南京南站(南京市)</span></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">出发时间:</span><span id="myorder-oddptime" class="tjorder-datelefttime">2月2日 12:00</span></div><div class="tjorder-dateright clearfix"><span class="tjorder-daterighticon iconfont iconrenminbi1688"></span><span id="myorder-odprice" class="tjorder-daterightmoney">113</span></div></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">返程时间:</span><span id="myorder-odartime" class="tjorder-datelefttime">无返程</span></div></div></a><div id="myorder-odbutton" class="tjorder-button clearfix"></div></div>',
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
                    releaseData.fabudpData = sjval;
                    
                }else if ( hash === "#address?arcity") {
                    sjval = releaseData.arsearch[i];
                    releaseData.fabuarData = sjval;
                }
                console.log("点击的数据",sjval);
                // 赋值
                var dzname = sjval.name;   // 名字
                var cityname = $("#address-city").text();  //城市名
                var dzwz  = sjval.address;      //位置
                $("#busMap-dzname").text(dzname);
                $("#busMap-dzcityname").text(dzwz);
                // 赋城市名
                $("#busMap-city").text(cityname);
                $("#busMap-dzcity").text(cityname);
                console.log(hash);
                if(hash==="#address?dpcity"){
                    releaseData.sfaddress = true;
                    $("#bus-dpcity").text(dzname);
                    window.location.hash = "#busMap?dpcity";
                }else if ( hash === "#address?arcity") {
                    $("#bus-arcity").text(dzname);
                    window.location.hash = "#busMap?arcity";
                }
                var result =  {P:parseFloat(sjval.location.lat),R:parseFloat(sjval.location.lng),lat:parseFloat(sjval.location.P),lng:parseFloat(sjval.location.R)};
                container.onclick(result);
            }
        }
    }
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
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    container.onsuccess(result);
                }else{
                    console.log("定位失败",result);
                    showMessage1btn("定位失败,请刷新在试","",0);
                }
            });
        });
    }
        
    var container = {
        onsuccess:function(result){   // 定位成功得到的数据
            console.log("定位成功",result);
            releaseData.dwlocationg = result;
            var val = releaseData.dwlocationg;
            if( val !=="" ){
                $("#busMap-dzname").text(val.formattedAddress);
                $("#busMap-dzcity").text(val.addressComponent.city);
                var textval = val.addressComponent.street+val.addressComponent.streetNumber;
                $("#busMap-dzcityname").text(textval);
                // 定位后，还得把几个城市更新
                $("#busMap-city").text(val.addressComponent.city);
                $("#address-city").text(val.addressComponent.city);
                
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
    function regeoCode(result) {
        if(!geocoder){
            geocoder = new AMap.Geocoder({
                city: "常州", //城市设为北京，默认：“全国”
                radius: 1000 //范围，默认：500
            });
        }
        var lnglat  = document.getElementById('lnglat').value.split(',');
        marker = new AMap.Marker({
            position: result
        });
        map.add(marker);
       
        marker.setPosition(lnglat);
        
        geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete'&&result.regeocode) {
            }else{alert(JSON.stringify(result))}
        });
    }
/* 绑定 */
    document.getElementById('lnglat').onkeydown = function(e) {
        if (e.keyCode === 13) {
            regeoCode();
            return false;
        }
        return true;
    }; 
    
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

