/*************************************
项目名称：考途大学搜题
更新日期：2024-10-28
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：去除广告，解锁部分VIP功能

**************************************

[rewrite_local]
^https://api-service\.tutusouti\.com/appServiceApi/vip/newUserPayVipData url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/tutusouti.js  
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
                if (key === 'vipStatus') {
                    obj[key] = 1;
                }
                if (key === 'svipIsLifelong') {
                    obj[key] = 1;
                }

if (key === 'expireTime') {
                    obj[key] =4007689500000;
                }



            }
        }
    }
    
}
modifyObject(body);

$done({ body: JSON.stringify(body) });

