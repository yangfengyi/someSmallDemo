// ajax函数

function ajax(method, url, data, flag, callback) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    method = method.toUpperCase();
    if (method == "GET") {
        xhr.open(method, url + "?" + data, flag);
    } else if (method == "POST") {
        console.log(11);
        xhr.open(method, url, flag);
    }

    // 监听放在前面
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                console.log(err);
            }
        }
    }
    if(method === "GET") {
        console.log("aa");
        xhr.send();
    } else {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
}