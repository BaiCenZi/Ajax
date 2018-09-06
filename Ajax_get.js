/*
*	Ajax_get封装函数
*/
/*说明：
	path  	:请求文件路径
	obj   	:传入的参数  （非必需）
	timeout :设定超时时间（非必需）
	success :请求成功时的回调函数
	error	:请求失败时的回调函数
*/
function ajax(path,obj,timeout,success,error) {
	//处理参数obj
	var str = toStr(obj);
	var oAjax,timer;
	if(XMLHttpRequest){
		//高版本浏览器
		oAjax = new XMLHttpRequest();
	}else{
		//IE5 IE6
		oAjax = new ActiveXObject();
	}
	oAjax.open('GET',path+'?'+str,true);
	oAjax.send();
	oAjax.onreadystatechange = function() {
		if(oAjax.readyState===4){
			clearInterval(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status===304){
				success(oAjax);
			}
			else{
				error(oAjax);
			}
		}
	}
	//判断是否传入了超时时间
	if(timeout){
		timer = setInterval(function() {
			//请求中断
			oAjax.abort();
			console.log('请求超时');
			clearInterval(timer);
		},timeout);
	}
}
//对象处理函数，将传入的参数从对象形式转换为 A=X&B=Y 的形式
function toStr(obj){
	var oDate = (new Date().getTime());
	var str = [];
	for(var key in obj){
		str.push(encodeURIComponent(key)+"="+encodeURIComponent(obj[key]));
	}
	str.push('t='+oDate);
	str = str.join('&');
	return str;
}