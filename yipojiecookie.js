/*************************************
项目名称：亿破姐签到
更新日期：2024-11-24
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/www\.ypojie\.com\/wp-admin\/admin-ajax\.php url script-request-header https://raw.githubusercontent.com/SheepFJ/Sheep/main/yipojiecookie.js
[mitm]
hostname = www.ypojie.com

*************************************/

const key = "yipojie_quanx_qiandao"; // 存储键名

// 获取请求头中的 Cookie
const cookie = $request.headers["Cookie"];
if (cookie) {
  const saved = $prefs.setValueForKey(cookie, key); // 存储到圈X本地
  if (saved) {
    $notify("圈X通知", "Cookie存储成功", `Cookie已存储到键名：${cookie}`);
  } else {
    $notify("圈X通知", "Cookie存储失败", "请检查脚本配置或圈X存储权限");
  }
} else {
  $notify("圈X通知", "未找到 Cookie", "当前请求头中无 Cookie 数据");
}

// 继续请求
$done();
