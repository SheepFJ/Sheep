let param = typeof $argument !== 'undefined' ? $argument : null;
console.log("Received argument: ", param);

const boundary = "----WebKitFormBoundary" + Math.random().toString(36).substr(2);
const fileName = "IMG_0704.jpeg";
const token = "367|bbme2uLA1xhYzXbebqRytYM5D1R38JQUOWOhEr2k"; // 替换为实际 Token

// 从 param 中提取 Base64 数据
const base64Data = param.base64Data;

// 将 Base64 数据转换为二进制
const binaryData = base64ToBinary(base64Data);

// 构建 multipart 表单
const body = `
--${boundary}
Content-Disposition: form-data; name="permission"

0
--${boundary}
Content-Disposition: form-data; name="strategy_id"

0
--${boundary}
Content-Disposition: form-data; name="album_id"

0
--${boundary}
Content-Disposition: form-data; name="file"; filename="${fileName}"
Content-Type: image/jpeg

${binaryData}
--${boundary}--`;

// 请求头
const headers = {
    
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    
    'Host': 'www.helloimg.com',
    'Referer': 'https://www.helloimg.com/upload',
    'Authorization': 'Bearer 367|bbme2uLA1xhYzXbebqRytYM5D1R38JQUOWOhEr2k',
    'Accept': 'application/json'
};

// 发起 POST 请求
const url = "https://www.helloimg.com/upload";
const method = "POST";

$task.fetch({
    url: url,
    method: method,
    headers: headers,
    body: body
}).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});

// Base64 转二进制函数
function base64ToBinary(base64) {
    const raw = atob(base64);
    let binary = '';
    for (let i = 0; i < raw.length; i++) {
        binary += String.fromCharCode(raw.charCodeAt(i));
    }
    return binary;
}