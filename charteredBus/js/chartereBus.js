
$(function(){
    getOpenid(function(openid){
        newPageData.uid = localCache("uid-kongbatong");
        newPageData.openid = localCache("openid-kongbatong");
        newPageData.phone = localCache("mobile-kongbatong");
        newPageData.openid = openid;
        console.log("openid",openid,newPageData.uid,newPageData.openid);
        if(null == nowusermsg.uid || "" == nowusermsg.uid) {
            register("http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
        } else {

        }
    },location.search);
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
    $("#busMap-input").bind("focus",function(){
        $("#address-city").text($("#busMap-city").text());
        window.location.hash = "#address?"+obtainData.busMap;
    })
    $("#busMap-qrclick").bind("touch click",function(){
        // 使用搜索数据
        if(location.hash==="#busMap?dpcity"){
            releaseData.dpCity = $("#busMap-city").text();
            // 如果搜索页被点击了，则不使用定位数据
            if( releaseData.sfaddress === true ){
                releaseData.dwsjUsed = false;
            }
        }else if ( location.hash=== "#busMap?arcity"){
            releaseData.arCity = $("#busMap-city").text();
        }

        window.location.hash = "#bus";
    })
// 城市具体地址选择
    $("#address-return").bind("touch click",function(){
        var val = window.location.hash;
        var hashone = val.split("?");
        window.location.hash = "#busMap?"+hashone[1];
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
// 定位
    container.dwlocationg();
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
            obtainData.busMap = hashzhi;
            if(hashzhi==="dpcity"){
                $(".busMap-hdright").text("选择起点");
            }else if (hashzhi==="arcity") {
                $(".busMap-hdright").text("选择目的地");
            }
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
            var tellTips = "";
            // if( newPageData.uid ===0 ){
            //     tellTips ="请登录";
            // }else if ( newPageData.openid ===0) {
            //     tellTips ="请登录";
            // }
            releaseData.contact = $("#bus-personinput").val();
    
            releaseData.contactNumber = $("#tell-phone").val();
            if( releaseData.fabudpData===""){
                if( releaseData.dwlocationg===""){
                    tellTips ="请选择出发地";
                }
            }else if (releaseData.fabuarData==="") {
                tellTips ="请选择到达地";
            }else if (releaseData.contact === ""){
                tellTips ="请填写联系人姓名";
            }else if (releaseData.contactNumber===0) {
                tellTips ="请填写联系人电话";
            }
            // 判断时间对不对
            else if ( releaseData.useType === "单程" ) {
                if ($("#dt-a-0").text()==="请选择上车时间"){
                    tellTips = "请选择上车时间!";
                }else{
                    var cfsj =  $("#dt-a-0").attr("data-val");
                    releaseData.departureTime = cfsj;
                }
            }else if ( releaseData.useType === "往返" ){
                if($("#dt-a-0").text()==="请选择上车时间"){
                    tellTips = "请选择出发时间!";
                }else if($("#dt-c-1").text()==="请选择返程时间"){
                    tellTips = "请选择返程时间!";
                }else {
                    var cfsj =  $("#dt-a-0").attr("data-val");
                    var mdsj =  $("#dt-c-1").attr("data-val");
                    if(Date.parse(mdsj)>Date.parse(cfsj)){
                        // 赋值
                        releaseData.departureTime = cfsj;
                        releaseData.returnTime = mdsj;
                    }else {
                        tellTips = "返程时间不能小于上车时间";
                    }
                }
            }
            if (tellTips!=="") {
                showMessage1btn(tellTips,"",0);
                console.log(tellTips);
                return false;
            }
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
        },
        tijiao:function(){
            var tellTrips = "";
            
            //判断用户是否登录
            if( newPageData.uid===0){
                tellTrips = "请登录";
            }else if ( newPageData.openid === 0){
                tellTrips = "请登录";
            }else if ( releaseData.useType === "往返" ){
                if( releaseData.returnTime===0){
                    tellTrips = "请选择返程时间";
                }
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
                var sjc = "CAO"+generateTimeReqestNumber();
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
            console.log(releaseData);
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeChaOrders/saveMadeChaOrders.asp",

                data:{
                    uid:newPageData.uid,				 //用户id
                    outTradeNo:sjc,		     //订单号（"CAO"开头）
                    dpCity:dpCity,			    //出发城市
                    departure:departure,		    //出发地
                    dLng:dLng,				//出发地经度
                    dLat:dLat,				//出发地纬度
                    arCity:releaseData.arCity,			    //到达城市
                    arrival:releaseData.fabuarData.name,		//目的地
                    aLng:releaseData.fabuarData.location.lng,				//目的地经度
                    aLat:releaseData.fabuarData.location.lat,				//目的地纬度
                    departureTime:releaseData.departureTime,	    //出发时间
                    returnTime:releaseData.returnTime,       //返回时间
                    useType:releaseData.useType,			//包车方式
                    carType:releaseData.carType,		//车辆类型
                    contact:releaseData.contact,			//联系人
                    contactNumber:releaseData.contact,	    //联系人电话
                    remark:$("#textarea").val(),			    //备注
                },
                success:function(result){
                    console.log("添加成功的数据",result);
                },
                error:function(result){
                    console.log("添加失败",result);
                }
            })
        }
    }
// 介绍页面初始化数据
    var newPageData = {
        uid:0,   // 用户的uid
        phone:0,    //  电话
        openid:0,   //  openid
        
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
        remark:"",			    //备注
        // 上面是发布需要的数据，下面是是其他数据
        dwlocationg:"",         // 定位的数据
        searchMap:"",           // 搜索得到的数据
        dpsearch:"",            // 起点确认的数据
        arsearch:"",            // 到达点确认的数据
        fabudpData:"",          // 确认的起点的数据
        fabuarData:"",          // 确认的到达地的数据
        dwsjUsed:true,              // 出发地用定位数据还是搜索数据,默认使用定位数据
        sfaddress:false,        // 是否点击了搜索数据
    }
// 获取到数据(包含ajax，和地图数据)
    var obtainData = {
        busMap:"",   // 存储busmap的值
        template:{
            address:'<div id="address-addselect" class="addselect clearfix"><span class="addselect-left iconfont iconzhifeiji1"></span><div class="addselect-right clearfix"><span class="addselect-rtone" id="address-rtone"></span><span class="addselect-rttwo" id="address-rttwo"></span></div></div>',
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
                container.onclick(result,sjval);
            }
        }
    }
// 地图操作的函数
    var container = {
        dwlocationg:function(){
            // 定位功能  
            AMap.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：5s
                    buttonPosition:'RB',     //定位按钮的停靠位置
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true  //定位成功后是否自动调整地图视野到定位点
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition(function(status,result){
                    if(status=='complete'){
                        container.onsuccess(result);
                    }else{
                        onError(result);
                        console.log("定位失败",result);
                    }
                });
            });
        },
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
        onclick:function(result,sjval){   //用于画maker，并聚焦用。
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
        center:[117.000923,36.675807],
        zoom:11
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

// 发布的操作
    var busSubmit = {
        buttonSubmit:function(){
            // 获取时间
            $("#dt-a-0").data("val");
            $("#dt-c-1").data("val");
        }
    }
