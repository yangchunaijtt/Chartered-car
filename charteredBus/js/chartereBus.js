
$(function(){
    // 设置高度
    // 提交订单页设置高度
    $(".selectcar").height($(document.body).height());
    // 地图页大小
    $(".busMap").height(window.screen.height);
    $("#container").height(window.screen.height-42);
// 初始化调用的函数
    setTimeWheel();
//首页绑定事件
    $(".bus-myOrder").bind("touch click",function(){
        window.location.hash  = "#myorder";
    })
    // 从哪儿出发
    $("#bus-dpcity").bind("touch click",function(){
        window.location.hash  = "#busMap";
        $(".busMap-hdright").text("选择起点");
    })
    // 点击去哪儿
    $("#bus-arcity").bind("touch click",function(){
        window.location.hash  = "#busMap";
        $(".busMap-hdright").text("选择目的地");
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
    // 时间点击事件

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
    // 点击选车
    $("#selectcar-carone").bind("touch click",function(e){
        e.preventDefault();
        selectcar.clickbus(1,"#selectcar-carone");
        e.stopPropagation()
    })
    $("#selectcar-cartwo").bind("touch click",function(e){
        e.preventDefault()
        selectcar.clickbus(2,"#selectcar-cartwo");
        e.stopPropagation()
    })
    $("#selectcar-carthree").bind("touch click",function(e){
        e.preventDefault();
        selectcar.clickbus(3,"#selectcar-carthree");
        e.stopPropagation()
    })
    $("#selectcar-carfour").bind("touch click",function(e){
        e.preventDefault();
        selectcar.clickbus(4,"#selectcar-carfour");
        e.stopPropagation()
    })
    $("#selectcar-carfive").bind("touch click",function(e){
        e.preventDefault();
        selectcar.clickbus(5,"#selectcar-carfive");
        e.stopPropagation()
    })
    
    $("#selectcar-carsix").bind("touch click",function(e){
        e.preventDefault();
        selectcar.clickbus(6,"#selectcar-carsix");
        e.stopPropagation()
    })
    $("#selectcar-carseven").bind("touch click",function(e){
        e.preventDefault();
        selectcar.clickbus(7,"#selectcar-carseven");
        e.stopPropagation()
    })
    $("#selectcar-careight").bind("touch click",function(e){
        e.preventDefault();
        selectcar.clickbus(8,"#selectcar-careight");
        e.stopPropagation()
    })
    $("#selectcar-tishi").bind("touch click",function(){
        window.location.hash = "#careful";
    })
// 定制包车页绑定事件
    $(".careful-hdicon").bind("touch click",function(){
        window.location.hash = "#selectcar";
    })
// 地图页操作
    $("#busMap-return").bind("touch click",function(){
        window.location.hash = "#bus";
    })
    $(".busMap-cityleft").bind("touch click",function(){
        window.location.hash = "#searchcity";
    })
    $("#busMap-input").bind("focus",function(){
        $("#address-city").text($("#busMap-city").text());
        window.location.hash = "#address";
    })
// 城市具体地址选择
    $("#address-return").bind("touch click",function(){
        window.location.hash = "#busMap";
    })
    $("#address-city").bind("touch click",function(){
        window.location.hash = "#searchcity";
    })
    // Input输入事件

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
        console.log("路由值",window.location.hash);
        var hashone =  hash.split("?");
        var hashval = hashone[0]; // 用来判断路由
        var hashzhi = hashone[1]; // 用来取数据
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
            $(".details").show();
        }else if ( hashval ==="#busMap" ){
            hashcsh();
            $(".busMap").show();
        }else if ( hashval ==="#address" ){
            hashcsh();
            $(".address").show();
        }else if ( hashval ==="#myorder" ){
            hashcsh();
            $(".myorder").show();
        }else if ( hashval ==="#searchcity" ){
            hashcsh();
            $("#searchcity-nowcity").text($("#busMap-city").text());
            $("#searchcity").show();
        }else if ( hashval ==="#careful" ){
            hashcsh();
            $(".careful").show();
        }
        function hashcsh(){
            $(".bus").hide();
            $(".selectcar").hide();
            $(".details").hide();
            $(".busMap").hide();
            $(".address").hide();
            $(".myorder").hide();
            $("#searchcity").hide();
            $(".careful").hide();
        }
    }
// 首页操作的函数
    var bus = {
        newselectcar:function () {
            // 还要判断
            // if ( releaseData.useType ) {

            // }else if () {

            // }else if () {
                
            // }else if () {
                
            // }else if () {
                
            // }

            window.location.hash = "#selectcar";
        }
    }
// 车型选择页的操作
    var  selectcar  = {
        newPage:function () {
            $("#selectcar-dpcity").text(releaseData.dpCity);
            $("#selectcar-arcity").text(releaseData.arCity);
            if( releaseData.useType === "单程" ){
                $("#selectcar-ardiv").hide();
            }else if ( releaseData.useType === "往返" ) {
                $("#selectcar-ardiv").show();
            }
            $("#selectcar-departure").text(releaseData.departure+"上车");
            $("#selectcar-departureTime").text(releaseData.departureTime);
            $("#selectcar-arrival").text(releaseData.arrival+"返程");
            $("#selectcar-arrivalTime").text(releaseData.returnTime);

        },
        clickbus:function(val,divname){
            // 车辆类型
            var carType = "";
            var people = 0;
            var matter = 0;
            var spanname = "";
            if ( val === 1 ) {
                carType = "舒适型"
                people = 4;
                matter = 2;
                spanname = "#selectcar-carspanone";
            }else if ( val === 2 ) {
                carType = "商务型"
                people = 6;
                matter = 4;
                spanname = "#selectcar-carspantwo";
            }else if ( val === 3 ) {
                carType = "11人小巴"
                people = 11;
                matter = 6;
                spanname = "#selectcar-carspanthree";
            }else if ( val === 4 ) {
                carType = "19人中巴"
                people = 19;
                matter = 10;
                spanname = "#selectcar-carspanfour";
            }else if ( val === 5 ) {
                carType = "33人大巴"
                people = 33;
                matter = 14;
                spanname = "#selectcar-carspanfive";
            }else if ( val === 6 ) {
                carType = "45人大巴"
                people = 45;
                matter = 16;
                spanname = "#selectcar-carspansix";
            }else if ( val === 7 ) {
                carType = "49人大巴"
                people = 49;
                matter = 20;
                spanname = "#selectcar-carspanseven";
            }else if ( val === 8 ) {
                carType = "53人大巴"
                people = 53;
                matter = 20;
                spanname = "#selectcar-carspaneight";
            }
            $("#selectcar-goodspeople").text(people);
            $("#selectcar-goodsmatter").text(matter);
            releaseData.carType =carType;

            $("#selectcar-carone").css("border-color","#7e7d7d");
            $("#selectcar-cartwo").css("border-color","#7e7d7d");
            $("#selectcar-carthree").css("border-color","#7e7d7d");
            $("#selectcar-carfour").css("border-color","#7e7d7d");
            $("#selectcar-carfive").css("border-color","#7e7d7d");
            $("#selectcar-carsix").css("border-color","#7e7d7d");
            $("#selectcar-carseven").css("border-color","#7e7d7d");
            $("#selectcar-careight").css("border-color","#7e7d7d");

            $("#selectcar-carspanone").css("color","#555");
            $("#selectcar-carspantwo").css("color","#555");
            $("#selectcar-carspanthree").css("color","#555");
            $("#selectcar-carspanfour").css("color","#555");
            $("#selectcar-carspanfive").css("color","#555");
            $("#selectcar-carspansix").css("color","#555");
            $("#selectcar-carspanseven").css("color","#555");
            $("#selectcar-carspaneight").css("color","#555");
            $(divname).css("border-color","rgb(0, 141, 255)");
            $(spanname).css("color","rgb(0, 141, 255)");
            
        }
    }
// 介绍页面初始化数据
    var newPageData = {
        uid:0,   // 用户的uid
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
        carType:"舒适型",		//车辆类型
        contact:"",			//联系人
        contactNumber:0,	    //联系人电话
        remark:""			    //备注
    }
// 获取到数据(包含ajax，和地图数据)
    var obtainData = {

    }
// 页面ajax的几个地方
    var carnewajax = {

    }
// 地图操作的函数
    var container = {
        
    }
// 地图的初始化
    var map = new AMap.Map('container', {
        center:[117.000923,36.675807],
        zoom:11
    });
// 城市选择页操作
    var searchcity = {
        returnPage:function(){
            console.log(1);
            setTimeout(function(){
                window.history.back(-1);
            },1000);
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

// 时间插件的函数
    // 时间选择所需要的数据 
    function setTimeWheel(){            
        var dd = new Date();
        var currYear = dd.getFullYear();  
        var opt={};
        //opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
        dd.setDate(dd.getDate()+1);//获取AddDayCount天后的日期
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
            stepMinute: 1,  // More info about stepMinute: http://docs.mobiscroll.com/2-16-1/datetime#!opt-stepMinute
            onSelect: function (valueText, inst) {  
                var sday = inst.getDate();  
                var today = new Array('周日','周一','周二','周三','周四','周五','周六'); 
                //获取当前日期
                var tmpNow = new Date();
                tmpNow.setDate(tmpNow.getDate()+1);//获取AddDayCount天后的日期
                                    
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
                $("#dt-a-0").mobiscroll().datetime(optSDateTime_tmp);
                $("#dt-c-1").mobiscroll().datetime(optSDateTime_tmp);
            }  
        };
        var optSDateTime_0 = $.extend(opt['sdatetime'], opt['sdtdefault_0']);
        $("#dt-a-0").mobiscroll().datetime(optSDateTime_0);  
        $("#dt-c-1").mobiscroll().datetime(optSDateTime_0); 
    }