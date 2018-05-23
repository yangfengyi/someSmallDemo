var manageCookie = {
    // 增加和修改都是这个方法 
    setCookie: function (name, value, time) {
        document.cookie = name + "=" + value + ";max-age=" + time;
        return this;	// 实现链式调用
    },
    // 删除cookie
    removeCookie: function (name){
        this.setCookie(name, "", -1);
        return this;
    },
    // 查找,接受一个cookie名和一个回调函数
    getCookie: function (name, callback) {
        var allCookieArr = document.cookie.split("; "); // 这里是根据；+空格来拆分的
        for(var i = 0; i < allCookieArr[i].length; i++){
            var itemCookieArr = allCookieArr[i].split('=');
            if(itemCookieArr[0] === name) {
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(undefined);	// 如果没有找到就传入一个undefined
        return this;
    }
}