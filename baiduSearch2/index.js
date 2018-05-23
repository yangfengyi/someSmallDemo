/**
 *	使用jsonp获取百度搜索框数据
 */

var oInput = document.getElementsByTagName('input')[0],
	oUl = document.getElementsByTagName('ul')[0];

oInput.oninput = function () {
	var value = this.value;
	getData(value);
}

function getData(value) {
	var oScript = document.createElement('script');
	oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + value + "&cb=doJson";
	document.body.appendChild(oScript);
	oScript.remove();
}

function doJson(data) {
	console.log(data);
	// 我们在这里获取了百度联想词的data值
	var s = data.s,
		str = "";
	if(s.length > 0) {
		s.slice(0,4).forEach(function (ele, index) {
			// str += "<li>" + ele + "</li>";
			// 假如a标签跳转
			str += '<li><a href=https://www.baidu.com/s?wd='+ ele +'>' + ele + '</a></li>'
		})
		oUl.innerHTML = str;
		oUl.style.display = "block";
	} else {
		oUl.style.display = "none";
	}
}





// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&json=1&p=3&sid=12896_1421_21101_26350&req=2&csor=1&cb=jQuery110208066278871964256_1527047876944&_=1527047876947
// 这里是百度获取联想词的连接,下面是我们要使用的部分
// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&cb=jQuery110208066278871964256_1527047876944&_=1527047876947
// wd是输入框的值, cb是表示jsonp的回调函数的字段,后面就是使用jsonp跨域的时候使用的回调函数名字(这里的名字是前端控制发送的,也就是说前端发啥就是啥)