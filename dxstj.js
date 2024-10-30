/*************************************
项目名称：大学搜题酱
更新日期：2024-10-25
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：去除广告

**************************************

[rewrite_local]
^https://www\.daxuesoutijiang\.com/capi/user/userinfo url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/dxstj.js  
[mitm]
hostname = www.daxuesoutijiang.com

*************************************/
let body = JSON.parse($response.body);
function modifyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                modifyObject(obj[key]);
            } else {
                if (key === 'isVip') {
                    obj[key] = 1;
                }
                if (key === 'endTime') {
                    obj[key] = 4077158400;
                }
            }
        }
    }
    
}
modifyObject(body);

$done({ body: JSON.stringify(body) });