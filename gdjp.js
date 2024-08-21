/*************************************
项目名称：知了专升本
下载地址：http://985.so/k81ah
更新日期：2024-08-21
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明；点击试听课程进入可以解锁后续续费课程

**************************************

[rewrite_local]
^http://tailor\.tomax\.xyz/api/users/fetch/info url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/zhiliaozhuanshengben1.js  
[mitm]
hostname = tailor.tomax.xyz

*************************************/

var body = $response.body;
const url = $request.url;
var obj = JSON.parse(body);
const vip = '/api/users/fetch/info';
if (url.indexOf(vip) != -1) {
obj.data.isVip=true;
obj.data.vip.expire="2099-09-09T05:41:38.139Z";
body = JSON.stringify(obj);
}
$done({body});
