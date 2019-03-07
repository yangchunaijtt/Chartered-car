
$(function(){
    // 设置高度
    // 提交订单页设置高度
    $(".selectcar").height($(document.body).height());
    // 地图页大小
    $(".busMap").height(window.screen.height);
    $("#container").height(window.screen.height-42);
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
