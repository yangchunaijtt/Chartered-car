var basepath = "../../MobileWeb/";
var pagepath = "http://qckj.czgdly.com/bus/";
//var basepath = "http://www.busge.com/busgebus/";
//var pagepath = "http://www.busge.com/";

            Date.prototype.dateAdd = function(interval,number) 
            { 
                var d = this; 
                var k={'y':'FullYear', 'q':'Month', 'm':'Month', 'w':'Date', 'd':'Date', 'h':'Hours', 'n':'Minutes', 's':'Seconds', 'ms':'MilliSeconds'}; 
                var n={'q':3, 'w':7}; 
                eval('d.set'+k[interval]+'(d.get'+k[interval]+'()+'+((n[interval]||1)*number)+')'); 
                return d; 
            } 
            /* 计算两日期相差的日期年月日等 */ 
            Date.prototype.dateDiff = function(interval,objDate2) 
            { 
                var d=this, i={}, t=d.getTime(), t2=objDate2.getTime(); 
                i['y']=objDate2.getFullYear()-d.getFullYear(); 
                i['q']=i['y']*4+Math.floor(objDate2.getMonth()/4)-Math.floor(d.getMonth()/4); 
                i['m']=i['y']*12+objDate2.getMonth()-d.getMonth(); 
                i['ms']=objDate2.getTime()-d.getTime(); 
                i['w']=Math.floor((t2+345600000)/(604800000))-Math.floor((t+345600000)/(604800000)); 
                i['d']=Math.floor(t2/86400000)-Math.floor(t/86400000); 
                i['h']=Math.floor(t2/3600000)-Math.floor(t/3600000); 
                i['n']=Math.floor(t2/60000)-Math.floor(t/60000); 
                i['s']=Math.floor(t2/1000)-Math.floor(t/1000); 
                return i[interval]; 
            }
            
function timerCode(vMsg,obj,input) {
    // 获取验证码
    var isSend = true;
    vMsg.countdown = 60;
    vMsg.valShowValue = "获取验证码";
    vMsg.getValCode = function(){
        if (vMsg.countdown == 0) {
            // 重新获取设置为true
            isSend = true;
            //vMsg.$apply(function () {
                vMsg.valShowValue = "获取验证码";
                obj.find("span").html(vMsg.valShowValue);
                vMsg.countdown = 60;
            //});
        } else { 
            // 验证手机号码是否通过，如果通过则访问后端
            if(validateUserPhone(vMsg.phone)) {
                // 设定定时器
                setTimeout(vMsg.getValCode,1000);
                // 如果为true则访问后台
                if(isSend) {
                    // 参数
                    //var changeParam = {"loginName":vMsg.phone};
                    // 地址
                    //var changeUrl = basepath + "login/getWeixinVerification";
                    // 访问后端
                    //$.post(changeUrl,changeParam,function(data, status){
                    //  if (!((typeof (data) == 'vMsgect') && data.constructor == vMsgect)) {
                    //  }
                    //});
                    // 设定获取为false
                    isSend = false;
                }
                //vMsg.$apply(function () {
                    vMsg.valShowValue="重新发送(" + vMsg.countdown + ")"; 
                    obj.find("span").html(vMsg.valShowValue);
                    vMsg.countdown--; 
                //});
            }
        }
    };
    
    obj.find("span").html(vMsg.valShowValue);
    obj.unbind("click").bind("click",function(){
        vMsg.phone = input.val();
        if (vMsg.valShowValue == "获取验证码"){
            vMsg.getValCode($(this).find("span"));
        }
    })
}

/**
 * json排序
 */
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

/**
 * 验证天数
 */
function validateDayNumber(days) {
    var reg = /^\d+(\.\d{1,5})?$/;
    // 验证手机号不为空
    if(null== days || "" == days) {
        showMessage1btn("天数不能为空！","",0);
        return false;
    }
    // 验证手机号码输入是否正确
    if(!reg.test(days)) {
        showMessage1btn("天数格式不正确！","",0);
        return false;
    }
    return true;
}

/**
 * 验证航班号
 */
function validFNUmber(objFN){
    //var reg = /(^[A-Za-z]{2}[0-9]{4}$)|(^[A-Za-z]{2}[0-9]{3}$)/;
    if (!objFN.is(":hidden")){        
        strFN = objFN.val();
        if ($.trim(strFN) != ""){            
            //if(!reg.test(strFN)) {
            //    showMessage1btn("航班号格式不正确！","",0);
            //    return false;
            //}else{
            //    return true;
            //}
            return true;
        }else{
            showMessage1btn("航班号不能为空！","",0);
            return false;
        }
    }else{
        return true;
    }
}

/**
 * 验证手机号码
 */
function validateUserPhone(phone) {
    var reg = /^1\d{10}$/;
    // 验证手机号不为空
    if(null== phone || "" == phone) {
        showMessage1btn("手机号码不能为空！","",0);
        return false;
    }
    // 验证手机号码输入是否正确
    if(!reg.test(phone)) {
        showMessage1btn("手机号码格式不正确！","",0);
        return false;
    }
    return true;
}
/**
 * 验证验证码
 */
function validateUserCode(code) {
    // 验证码不为空
    if(null== code || "" == code) {
        showMessage1btn("验证码不能为空！","",0);
        return false;
    }
    return true;
}
/**
 * 获得uid
 */
function getuid(callback,url,isChange) {
    
    url = url.substring(1,url.length);
    var info = {
        uid:null,
        mobile:null,
        openid:null
    };
    var code = "";
    if(null != url && "" != url && url.indexOf("code=")>=0){
        code = request("code");
    }   
    // 获得uid
    info.openid = localCache("openid-kongbatong");//getck("openid");
    info.mobile = localCache("mobile-kongbatong");//getck("mobile");
    info.uid = localCache("uid-kongbatong");//getck("uid");
    var param = {"code":code};
    var url = basepath + "user/getInfo-kongbatong.asp";
    if(typeof(info.uid) == "undefined" || null == info.uid || "" == info.uid || "undefined" == info.uid || "null" == info.uid){
        // 如果没有取出uid
        $.post(url,param,function(data, status){
            if (!((typeof (data) == 'object') && data.constructor == Object)) {
                data = eval("(" + data + ")");
            }
            info.uid = data.obj.uid;
            info.mobile = data.obj.mobile;
            info.openid = data.obj.openid;
            //var exp = new Date();  
            //exp.setTime(exp.getTime() + 60 * 2000);//过期时间 2分钟  
            //document.cookie="uid=" + info.uid + ";expires=" + exp.toGMTString();
            //document.cookie="openid=" + info.openid + ";expires=" + exp.toGMTString();
            //document.cookie="mobile=" + info.mobile + ";expires=" + exp.toGMTString();
			localCache("uid-kongbatong",info.uid);
			localCache("openid-kongbatong",info.openid);
			localCache("mobile-kongbatong",info.mobile);
            // 调用回传
            callback(info);
        });
    } else {
        // 调用回传
        callback(info);
    }
}
/**
 * 获得openid
 */
function getOpenid(callback,url){
	url = url.substring(1,url.length);
    var openid = null;
    var code = "";
    if(null != url && "" != url && url.indexOf("code=")>=0){
        code = request("code");
    }
    // 获得openid
	openid = localCache("openid-kongbatong");
	var param = {"code":code};
    var url = basepath + "user/getInfo-kongbatong.asp";
    if(typeof(openid) == "undefined" || null == openid || "" == openid || "undefined" == openid || "null" == openid){
        // 如果没有取出openid
        $.post(url,param,function(data, status){
            if (!((typeof (data) == 'object') && data.constructor == Object)) {
                data = eval("(" + data + ")");
            }
            openid = data.openid;
			
			localCache("openid-kongbatong",openid);
            // 调用回传
            callback(openid);
        });
    } else {
        // 调用回传
        callback(openid);
    }
}
/**
 * 获得cookie值
 * @param cookiename
 * @returns
 */
function getck(cookiename) {    
    var allcookie = document.cookie.split(";");
    for (var i = 0; i < allcookie.length; i++) {
        var acookie = allcookie[i].replace(/(^\s*)|(\s*$)/g, "").split("="); //取消首位两端空格在分割
        if (cookiename == acookie[0]) {
            return unescape(acookie[1]);
        }
    }
}

/**
 * 设置cookie
 * @param name
 * @param value
 */
function setCookies(name, value) {
    document.cookie = name + "=" + escape(value);
}
var param = function(obj) {
  var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
  for(name in obj) {
    value = obj[name];
       
    if(value instanceof Array) {
      for(i=0; i<value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += param(innerObj) + '&';
      }
    }
    else if(value instanceof Object) {
      for(subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += param(innerObj) + '&';
      }
    }
    else if(value !== undefined && value !== null)
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  }
     
  return query.length ? query.substr(0, query.length - 1) : query;
};


/**
 * 获取url传值
 * @param paras
 */ 
function request(paras) { 
    var url = location.href; 
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
    var paraObj = {} 
    for (i=0; j=paraString[i]; i++) { 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    } 
    var returnValue = paraObj[paras.toLowerCase()]; 
    if (typeof(returnValue)=="undefined") { 
        return ""; 
    } else { 
        return returnValue; 
    } 
}

 
//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt)   
{ //author: meizz   
 var o = {   
   "M+" : this.getMonth()+1,                 //月份   
   "d+" : this.getDate(),                    //日   
   "h+" : this.getHours(),                   //小时   
   "m+" : this.getMinutes(),                 //分   
   "s+" : this.getSeconds(),                 //秒   
   "q+" : Math.floor((this.getMonth()+3)/3), //季度   
   "S"  : this.getMilliseconds()             //毫秒   
 };   
 if(/(y+)/.test(fmt))   
   fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
 for(var k in o)   
   if(new RegExp("("+ k +")").test(fmt))   
 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
 return fmt;   
};
/**
 * 获得当前时间加上分钟数
 * 
 * @returns
 */
function getCurrentDateByAdd(changeFormat,inputMinute,minute) {
     var now = new Date(inputMinute);
     now.setMinutes (now.getMinutes () + minute);
     return now.format(changeFormat);
}
/**
 * 获得当前时间减去分钟数
 * 
 * @returns
 */
function getCurrentDateByMinute(changeFormat,inputMinute,minute) {
     var now = new Date(inputMinute);
     now.setMinutes (now.getMinutes () - minute);
     return now.format(changeFormat);
}
/**
 * 比较时间
 * 
 * @param startdate
 * @param enddate
 * @returns
 */
function dateCompare(startdate,enddate)  { 
    startdate = startdate.replace(/-/g,"/");
    enddate = enddate.replace(/-/g,"/")
    var starttime = new Date(startdate);  
    var starttimes = starttime.getTime(); 
       
    var lktime = new Date(enddate);    
    var lktimes = lktime.getTime();   
    
    if(starttimes > lktimes) {   
        return false;   
    }   else {
        return true;   
    
    }
}
/**
 * 展示大的二维码
 */
function showBarCode(img){
    var bg = document.createElement('div');
    bg.width = document.body.clientWidth;
    bg.height = document.body.clientHeight;
    bg.id = "codeBigImage";
    bg.className = "bg";
    bg.onclick = clearBarCode;
    document.body.appendChild(bg);
    
    var dialog = document.createElement('div');
    dialog.style.minHeight = "120px";
    dialog.style.width = document.body.clientWidth + "px";
    dialog.id = "codePopDiv";
    dialog.className = "barmydiv";
    dialog.appendChild(img);
    document.body.appendChild(dialog);
}
/**
 * 生成随机字符串
 */
function generateMixed(n) {
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 	var res = "";
 	for(var i = 0; i < n ; i ++) {
	 	var id = Math.ceil(Math.random()*35);
	 	res += chars[id];
 	}	
 	return res;
}
/**
 * 将对象按对象名字典排序
 */
function objKeySort(obj){
	//排序的函数
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}
/**
 * 将对象使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串
 */
function objToKeyValue(obj){
	var str = "";
	for (var item in obj){
		if (str != "") str += "&"
		str += item + "=" + obj[item]
	}
	return str
}
/**
 * 点击的时候关闭
 */
function clearBarCode() {
    var bg = document.getElementById("codeBigImage");
    if(null != bg){
        document.body.removeChild(bg);
    }
    var popDiv = document.getElementById("codePopDiv");
    if(null != popDiv){
        document.body.removeChild(popDiv);
    }
}
function showMessage(msg,url){
    var bg = document.createElement('div');
    bg.width = document.body.clientWidth;
    bg.height = document.body.clientHeight;
    bg.id = "bg";
    bg.className = "bg";
    document.body.appendChild(bg);
    
    var dialog = document.createElement('div');
    dialog.width = document.body.clientWidth*0.70;
    dialog.style.minHeight = "120px";
    dialog.id = "popDiv";
    dialog.className = "mydiv";
    dialog.innerHTML = "<div id='message'>"+msg+"</div><button onclick='clearDialog();' class='btn btn-default'>取消</button><button onclick=\"goFirstPage(\'"+url+"\')\" style='margin-left:15px' class='btn btn-danger'>确定</button>";
    document.body.appendChild(dialog);
}

function showNoticebtn(){
	var tmpDiff = 60 * 60 * 24 * 14; //两周时间
	if (!getLocalStorage("payNoticeHide-kongbatong",tmpDiff)) {
		var bg = document.createElement('div');
		bg.width = document.body.clientWidth;
		bg.height = document.body.clientHeight;
		bg.id = "bg";
		bg.className = "bg";
		document.body.appendChild(bg);

		var dialog = document.createElement('div');
		dialog.width = document.body.clientWidth*0.70;
		dialog.style.minHeight = "120px";
		dialog.id = "popDiv";
		dialog.className = "mydiv notice";

		dialog.innerHTML = "<div class=\"notice-head\">用车须知</div>"
						 + "<ul class=\"notice-ul\">"
						 + "<li class=\"children\">儿童（含婴儿）需购买<i class=\"tip\">全票，否则司机有权拒载</i></li>" 
			             + "<li class=\"trunk\">可免费携带一件26寸以下行李</li>"
						 + "<li class=\"pets\">禁止携带宠物上车</li>"
						 + "<li class=\"bomb\">禁止携带易燃易爆等违禁物品上车</li>"
						 + "</ul>"
					  	 + "<div class=\"el-checkbox\" style=\"float: right;\">"
						 + "<input type=\"checkbox\" name=\"noticeHide\" id=\"noticeHide\">"
						 + "<label class=\"el-checkbox-style\" for=\"noticeHide\" style=\"margin: 0 5px 3px 0;\"></label>"
						 + "<span>近两周不提示</span>"
						 + "</div>"
						 + "<button onclick=\"hideNoticebtn();\" class=\"btn btn-warning\" style=\"width: 85%;\">我知道了</button>";

		document.body.appendChild(dialog);
	}
}

function hideNoticebtn(){
	if ($("#noticeHide").prop("checked")){
		setLocalStorage("payNoticeHide-kongbatong", true)
	}
	clearDialog();
}

function showMessage1btn(msg,callback,type){
    var bg = document.createElement('div');
    bg.width = document.body.clientWidth;
    bg.height = document.body.clientHeight;
    bg.id = "bg";
    bg.className = "bg";
    document.body.appendChild(bg);
    
    var dialog = document.createElement('div');
    dialog.width = document.body.clientWidth*0.70;
    dialog.style.minHeight = "120px";
    dialog.id = "popDiv";
    dialog.className = "mydiv";
    
    var img = "";
    if (type == "1"){
        img = "yes.png";
    }else{
        img = "info.png"
    }
    
    if (callback != ""){
        dialog.innerHTML = "<img width='50px' height='50px' src='css/icons/" + img + "' /><br/><div id='message'>"+msg+"</div><button  onclick='clearDialog();" + callback + "'  class='btn btn-danger'>确定</button>";
    }else{
        dialog.innerHTML = "<img width='50px' height='50px' src='css/icons/" + img + "' /><br/><div id='message'>"+msg+"</div><button  onclick='clearDialog();' class='btn btn-danger'>确定</button>";
    }
    document.body.appendChild(dialog);
}

function showMessage2btn(msg,callback){
    var bg = document.createElement('div');
    bg.width = document.body.clientWidth;
    bg.height = document.body.clientHeight;
    bg.id = "bg";
    bg.className = "bg";
    document.body.appendChild(bg);
    
    var dialog = document.createElement('div');
    dialog.width = document.body.clientWidth*0.70;
    dialog.style.minHeight = "120px";
    dialog.id = "popDiv";
    dialog.className = "mydiv";
    if (callback != ""){
        dialog.innerHTML = "<img width='50px' height='50px' src='css/icons/info.png' /><br/><div id='message'>"+msg+"</div><button onclick='clearDialog()' class='btn btn-default'>取消</button><button style='margin-left:15px' onclick='clearDialog();" + callback + "' class='btn btn-danger'>确定</button>";
    }else{
        dialog.innerHTML = "<img width='50px' height='50px' src='css/icons/info.png' /><br/><div id='message'>"+msg+"</div><button onclick='clearDialog()' class='btn btn-default'>取消</button><button style='margin-left:15px' class='btn btn-danger'>确定</button>";
    }    
    document.body.appendChild(dialog);
}

function showLodding(msg){
    if(null == msg || "" == msg) {
        msg = "加载中";
    }
    var bg = document.createElement('div');
    bg.width = document.body.clientWidth;
    bg.height = document.body.clientHeight;
    bg.id = "bg";
    bg.className = "bg";
    document.body.appendChild(bg);
    
    var dialog = document.createElement('div');
    dialog.width = document.body.clientWidth*0.70;
    dialog.style.minHeight = "20px";
    dialog.id = "popDiv";
    dialog.className = "mydiv";
    dialog.innerHTML = "<div id='message'>"+msg+"<i class='fa fa-spinner fa-pulse'></i></div>";//<img width='50px' height='50px' src='css/icons/logo.png' /><br/>
    document.body.appendChild(dialog);
}


function clearDialog(){
    var bg = document.getElementById("bg");
    if(null != bg){
        document.body.removeChild(bg);
    }
    var popDiv = document.getElementById("popDiv");
    if(null != popDiv){
        document.body.removeChild(popDiv);
    }
}

function goFirstPage(url){
    //window.location.href = url;
}
/**
 * 处理shiftId
 * @param shiftId
 */
function doShiftId(shiftIdNumber) {
    var shiftId = shiftIdNumber + "";
    // 如果shiftid大于等于3位，截取后两位
    if(shiftId.length >= 3) {
        // 截取后两位
        shiftId = shiftId.substring(shiftId.length-2,shiftId.length);
//      shiftId = (shiftIdNumber/10%10 + "") + (shiftIdNumber%10+ "");
    } else if(shiftId.length == 2) {
        // 如果2位，取最后一位加零
        shiftId = shiftId.substring(shiftId.length-1,shiftId.length);
//      shiftId = (shiftIdNumber%10) + "0";
    } else if(shiftId.length == 1) {
        // 如果2位，取最后一位加零
        shiftId = shiftId + "0";
    }
    return shiftId;
}

/**
 * 设置或读取localstorage
 * 
 * @param {}
 *            key 只有key的时候，取值
 * @param {}
 *            value 设置值
 * @return {}
 */
function localCache(key, value) {
        if (window.localStorage) {
                if (arguments.length == 1) {
                        var value = localStorage.getItem(arguments[0])
                        return value;
                } else {
                        if (arguments.length == 2) {
                                localStorage.removeItem(arguments[0]);
                                return localStorage.setItem(arguments[0], arguments[1]);
                        }
                }
        } else {
                alert('不支持localStorage');
        }
}

/**
 * 删除localStorage
 * 
 * @param {}
 *            key 为空则删除所有
 * @return {}
 */
function delLocalCache(key) {
        if (window.localStorage) {
                if (key) {
                        return localStorage.removeItem(key);
                } else {
                        localStorage.clear();
                }
        } else {
                alert('不支持localStorage');
        }
}

/**
 * 设置有时间限制的localstorage
 * 
 * @param {}
 *            key 只有key的时候，取值
 * @param {}
 *            value 设置值
 * @return {}
 */
function setLocalStorage(key, value) {
    var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列 
    var valueDate = JSON.stringify({
        val: value,
        timer: curtime
    });
    try {
        localStorage.setItem(key, valueDate);
    } catch(e) {
        // 兼容性写法
        if(isQuotaExceeded(e)) {
            console.log("Error: 本地存储超过限制");
            localStorage.clear();
        } else {
            console.log("Error: 保存到本地存储失败");
        }
    }
}

function isQuotaExceeded(e) {
    var quotaExceeded = false;
    if(e) {
        if(e.code) {
            switch(e.code) {
                case 22:
                    quotaExceeded = true;
                    break;
                case 1014: // Firefox 
                    if(e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if(e.number === -2147024882) { // IE8 
            quotaExceeded = true;
        }
    }
    return quotaExceeded;
}

/**
 * 读取有时间限制的localstorage
 * 
 * @param {}
 *            key 只有key的时候，取值
 * @param {}
 *            value 设置值
 * @return {}
 */
function getLocalStorage(key,seconds) {
    var exp = seconds; // 超时需要的秒数
    if(localStorage.getItem(key)) {
        var vals = localStorage.getItem(key); // 获取本地存储的值 
        var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
        // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间 
        var isTimed = (new Date().getTime() - dataObj.timer) > exp;
        if(isTimed) {
            console.log("存储已过期");
            localStorage.removeItem(key);
            return null;
        } else {
            var newValue = dataObj.val;
        }
        return newValue;
    } else {
        return null;
    }
}