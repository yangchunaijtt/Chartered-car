
$(function(){
    // 设置高度
    // 提交订单页设置高度
    $(".selectcar").height($(document.body).height());

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
    

