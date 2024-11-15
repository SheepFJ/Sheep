// 从本地存储中获取账号、密码和步数范围
const account = encodeURIComponent($prefs.valueForKey("sheep_account_xiaomishuabushu") || "");
const password = encodeURIComponent($prefs.valueForKey("sheep_password_xiaomishuabushu") || "");
const minSteps = parseInt($prefs.valueForKey("sheep_min_steps_xiaomishuabushu") || "5000");
const maxSteps = parseInt($prefs.valueForKey("sheep_max_steps_xiaomishuabushu") || "15000");

// 生成随机步数，范围在 minSteps 和 maxSteps 之间
const steps = Math.floor(Math.random() * (maxSteps - minSteps + 1)) + minSteps;
const encodedSteps = encodeURIComponent(steps);

// 构建请求的 URL
const url = `https://steps.api.030101.xyz/api?account=${account}&password=${password}&steps=${encodedSteps}`;

const method = "GET";
const myRequest = {
    url: url,
    method: method,
};

// 发起请求
$task.fetch(myRequest).then(response => {
    // 解析返回状态码和响应内容
    const statusCode = response.statusCode;
    const responseBody = response.body;
    
    // 显示步数和响应结果的通知
    $notify("步数提交结果", `提交的步数: ${steps}`, `状态码: ${statusCode}\n响应内容: ${responseBody}`);
    $done();
}, reason => {
    // 请求出错时显示通知
    $notify("步数提交失败", "请求出错", `错误信息: ${reason.error}`);
    $done();
});