/*************************************
项目名称：遥望
更新日期：2024-09-03
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明: 解锁会员

**************************************

[rewrite_local]
^https://ins-web\.whalean\.com/member/userMemberHomePageV2 url script-request-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/bizhi1.js  
[mitm]
hostname = ins-web.whalean.com

*************************************/
var body = $response.body;
const url = $request.url;
var obj = JSON.parse(body);
const vip = '/member/userMemberHomePageV2';


if (url.indexOf(vip) != -1) {  

obj.data.memberInfos[0].isMember=1;
obj.data.memberInfos[0].memberLevel=1;
obj.data.memberInfos[0].permanent=true;
obj.data.memberInfos[0].memberExpirationTime
="2099/09/09";

body = JSON.stringify(obj);
}
$done({body});
