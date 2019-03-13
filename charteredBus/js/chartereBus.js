// 页面初始化数据
var newPageData = {
    uid:0,   // 用户的uid
    phone:0,    //  电话
    openid:0,   //  openid
    
}
getOpenid(function(openid){
    newPageData.uid = localCache("uid-kongbatong");
    newPageData.openid = localCache("openid-kongbatong");
    newPageData.phone = localCache("mobile-kongbatong");
    newPageData.openid = openid;
    console.log("openid",openid,newPageData.uid,newPageData.openid);
    if(null == newPageData.uid || "" == newPageData.uid) {
        register("http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/Register_content.html");   //返回注册登录页面
    } else {
        // 得到订单数据
        myorder.myorderPage("","","");
        // 获取车辆类型
        selectcar.cartype();
    }
},location.search);
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
    })
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
            details.newPage();
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
// 我的订单页的操作
    var myorder = {
        coid:"",
        status:"",
        dateRange:"",
        myorderData:"",
        myorderPage:function(coid,status,dateRange){
            $.ajax({
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeChaOrders/queryPageMadeChaOrders.asp",
                type:"post",
                data:{
                    cur:1,       	//查看页码
                    uid:newPageData.uid,       	//用户id 
                    coid:coid,			//订单id
                    status:status,		    //状态
                    dateRange:dateRange   	//日期范围（"today","weekday","month"）
                },
                success:function(data){
                    console.log("请求订单成功",data);
                    $("#idmyorder").empty();
                    if( data.result>0){
                        myorder.myorderData =  data.obj.coList;
                        for(var i = 0;i<myorder.myorderData.length;i++){
                            $("#idmyorder").append(obtainData.template.myorder);
                            myorder.myorderRender(i,myorder.myorderData[i]);
                        }
                    }
                },
                error:function(data){
                    console.log("请求订单失败",data);
                }
            })
        },
        myorderRender:function(i,val){
            // 还要根据订单状态，添加按钮

            // 最大的div
            var myorder_od = "myorder-od"+i;
            $("#myorder-od").attr("id",myorder_od);
            // 状态（-2:待退款；-1:取消；0：下单；1：完成；2：待付款）
            // 结果，还要添加什么按钮
            var odstatus = "";
            if(val.status===-2){
                odstatus = "待退款";
            }else if (val.status===-1){
                odstatus = "已取消";
            }else if (val.status===0){
                odstatus = "已下单";
            }else if (val.status===1){
                odstatus = "已完成";
            }else if (val.status===2){
                odstatus = "待付款";
            }
            $("#myorder-odstatus").text(odstatus);
            var myorder_odstatus = "myorder-odstatus"+i;
            $("#myorder-odstatus").attr("id",myorder_odstatus);
            // 城际市内
            if(val.dpCity==="常州市" && val.arCity==="常州市"){
                $("#myorder-oddistance").text("市内");
            }else {
                $("#myorder-oddistance").text("城际");
            }
            // 起点
            $("#myorder-oddpcity").text(val.departure);
            var myorder_oddpcity = "myorder-oddpcity"+i;
            $("#myorder-oddpcity").attr("id",myorder_oddpcity);
            // 终点
            $("#myorder-odarcity").text(val.arrival);
            var myorder_odarcity = "myorder-odarcity"+i;
            $("#myorder-odarcity").attr("id",myorder_odarcity);
            // 出发时间
            $("#myorder-oddptime").text(val.departureTime);
            var myorder_oddptime = "myorder-oddptime"+i;
            $("#myorder-oddptime").attr("id",myorder_oddptime);
            // 返程时间
            if(val.useType==="Return"){
                $("#myorder-odartime").text(val.returnTime);
            }else {
                $("#myorder-odartime").text("无返程");
            }
            var myorder_odartime = "myorder-odartime"+i;
            $("#myorder-odartime").attr("id",myorder_odartime);
            // 价格
            if(val.price == null || val.price == ""){
                $("#myorder-odprice").text("无");
            }else {
                $("#myorder-odprice").text(val.price);
            }
            var myorder_odprice = "myorder-odprice"+i;
            $("#myorder-odprice").attr("id",myorder_odprice);    
            // a标签
            var ahref = "http://qckj.czgdly.com/bus/MobileWeb/WxWeb-kongbatong/charteredBus.html#details"+"?uid="+val.uid+"&id="+val.id;
            $("#myorder-odahref").attr("href",ahref);
            var myorder_odahref = "myorder-odahref"+i;
            $("#myorder-odahref").attr("id",myorder_odahref);
        },
        myorderScreen:function(){   //点击确认按钮
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
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeChaOrders/getChaOrderDetails.asp",
                data:{
                    uid:parseInt(uida[1]),
                    id:parseInt(ida[1]) 
                },
                success:function(data){
                    console.log("详情页获取成功的数据",data);
                    if(data.result>0){
                        details.detailsData = data.obj;
                        details.renderPage(data.obj);
                    }
                },
                error:function(data){
                    console.log("详情页获取失败的数据",data);
                }
            })
        },
        renderPage:function(val){
            // 单程？
                if(val.useType==="Return"){
                    $("#details-reType").text("往返");
                    $("#details-artime").text(val.returnTime);
                }else {
                    $("#details-reType").text("单程");
                    $("#details-artime").text("无返程");
                }
            // 支付
            if(val.payPrice===null|| val.payPrice===""){
                $("#details-price").hide();
            }else {
                // 进行渲染
                $("#details-priceje").text(val.payPrice+"(已支付金额)");
                $("#details-pricetime").text(val.payDate);
                $("#details-pricedh").text(val.price+"(价格")
                // 存在数据则渲染
                $("#details-price").show();
            }
            // 退款
            if (val.refundPrice==null || val.refundPrice=="" ) {
                $("#details-refund").hide();
            }else {
                $("#details-refundje").text(val.refundPrice+"(退款金额)");
                $("#details-refundtime").text(val.refundDate);
                $("#details-refunddh").text(val.refundNo+"(单号)");

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
            $("#details-carname").attr("src",details_img);
            // 留言信息
            $("#details-mackera").text(val.remark);
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
        carTypeData:"",     // 存储的数据
        cartype:function(){
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/buyTicket/readChaCarTypes.asp",
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
        },
        tijiao:function(){
            var tellTrips = "";
            //判断用户是否登录
            if( newPageData.uid===0){
                tellTrips = "请登录";
            }else if ( newPageData.openid === 0){
                tellTrips = "请登录";
            }else if ( releaseData.useType === "往返" ){
                
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

            if(releaseData.useType==="单程"){
                releaseData.returnTime = "";
            }
            if(releaseData.useType==="单程"){
                releaseData.useType ="Single";
            }else if (releaseData.useType==="往返"){
                releaseData.useType ="Return";
            }
            // 读取车辆类型
            $.ajax({
                type:"post",
                url:"http://qckj.czgdly.com/bus/MobileWeb/madeChaOrders/saveMadeChaOrders.asp",
                data:{
                    uid:newPageData.uid,				 //用户id
                    outTradeNo:sjc,		     //订单号（"CAO"开头）
                    dpCity:dpCity,			    //出发城市
                    departure:departure,		    //出发地
                    dLng:dLng.toFixed(6),				//出发地经度
                    dLat:dLat.toFixed(6),				//出发地纬度
                    arCity:releaseData.arCity,			    //到达城市
                    arrival:releaseData.fabuarData.name,		//目的地
                    aLng:releaseData.fabuarData.location.lng.toFixed(6),				//目的地经度
                    aLat:releaseData.fabuarData.location.lat.toFixed(6),				//目的地纬度
                    departureTime:$("#dt-a-0").attr("data-val"),	    //出发时间
                    returnTime:$("#dt-c-1").attr("data-val"),       //返回时间
                    useType:releaseData.useType,			//包车方式
                    carType:releaseData.carType,		//车辆类型
                    contact:releaseData.contact,			//联系人
                    contactNumber:releaseData.contactNumber,	    //联系人电话
                    remark:$("#textarea").val(),			    //备注
                },
                success:function(result){
                    console.log("添加成功的数据",result);
                    // 要阻止他提交多次

                    if(result.result>0){
                        showMessage1btn("提交成功!","",0);
                        setTimeout(function(){
                           window.location.hash = "#bus";
                        },500);
                    }
                },
                error:function(result){
                    console.log("添加失败",result);
                    showMessage1btn("网络出错,请重试!","",0);
                }
            })
        }
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
            myorder:'<div id="myorder-od" class="tjorder clearfix"><a id="myorder-odahref" style="display:block;width:100%;height:100%;"><div class="tjorder-hd clearfix"> <div class="tjorder-hdleft clearfix"><span class="tjorder-hdlefticon iconfont iconkeche"></span><span id="myorder-oddistance"  class="tjorder-hdleftnr">市内</span></div><p id="myorder-odstatus" class="tjorder-hdright">出票成功</p></div><div  class="tjorder-ct clearfix"><span  id="myorder-oddpcity" class="tjorder-ctleft">常州总站(常州市)</span><span class="tjorder-ctcenter">-</span><span  id="myorder-odarcity"  class="tjorder-ctright">南京南站(南京市)</span></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">出发时间:</span><span id="myorder-oddptime" class="tjorder-datelefttime">2月2日 12:00</span></div><div class="tjorder-dateright clearfix"><span class="tjorder-daterighticon iconfont iconrenminbi1688"></span><span id="myorder-odprice" class="tjorder-daterightmoney">113</span></div></div><div class="tjorder-date clearfix"><div class="tjorder-dateleft clearfix"><span class="tjorder-dateleftts">返程时间:</span><span id="myorder-odartime" class="tjorder-datelefttime">无返程</span></div></div><div id="myorder-odbutton" class="tjorder-button clearfix"><span class="tjorder-submitbutton">确认订单</span><span class="tjorder-submitbutton">取消订单</span></div></a></div>',
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
