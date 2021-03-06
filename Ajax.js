/*
*	Ajax封装函数
*/
/*说明：
	path  	:请求文件路径
	data   	:传入的参数  （非必需）
	timeout :设定超时时间（非必需）
	type	:指定post或get
	success :请求成功时的回调函数
	error	:请求失败时的回调函数
*/
function ajax(option) {
	//处理参数obj
	var str = toStr(option.data);
	var oAjax,timer;
	option.type = option.type.toUpperCase();
	var relPath = (option.type=='GET')?(option.path+'?'+str):option.path;
	
	if(XMLHttpRequest){
		//高版本浏览器
		oAjax = new XMLHttpRequest();
	}else{
		//IE5 IE6
		oAjax = new ActiveXObject();
	}
	oAjax.open(option.type,relPath,true);
	if(option.type=='POST'){
		oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		oAjax.send(str);
	}
	else{
		oAjax.send();
	}
	oAjax.onreadystatechange = function() {
		if(oAjax.readyState===4){
			clearInterval(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status===304){
				option.success(oAjax);
			}
			else{
				option.error(oAjax);
			}
		}
	}
	//判断是否传入了超时时间
	if(option.timeout){
		timer = setInterval(function() {
			//请求中断
			oAjax.abort();
			console.log('请求超时');
			clearInterval(timer);
		},option.timeout);
	}
}
//对象处理函数，将传入的参数从对象形式转换为 A=X&B=Y 的形式
function toStr(data){
	var oDate = (new Date().getTime());
	var str = [];
	for(var key in data){
		str.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
	}
	str.push('t='+oDate);
	str = str.join('&');
	return str;
}