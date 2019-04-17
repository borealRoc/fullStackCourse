function ajax(options) {

    // step1: 处理参数
    options = options || {};
    options.type = options.type || 'get';
    options.data = options.data || {};
    options.dataType = options.dataType || 'text';
            //数据组装
    let arr = [];
    for (let name in options.data) {
        arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(options.data[name])}`);
    }
    let strData = arr.join('&');

    // step2: 创建xhr对象
    let xhr
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }

    // step3: 连接服务地址，根据请求方式传数据
    if (options.type == 'post') {
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(strData);
    } else {
        xhr.open('GET', options.url + '?' + strData, true);
        xhr.send();
    }

    // step4: 根据服务响应过程处理返回数据
    xhr.onreadystatechange = function() {
        //4——完事
        if (xhr.readyState == 4) {
            //成功——2xx、304
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                let data = xhr.responseText;

                switch (options.dataType) {
                    case 'json':
                        if (window.JSON && JSON.parse) {
                            data = JSON.parse(data);
                        } else {
                            data = eval('(' + str + ')');
                        }
                        break;
                    case 'xml':
                        data = xhr.responseXML;
                        break;
                }

                options.success && options.success(data);
            } else {
                options.error && options.error();
            }
        }
    };
}