/*************************************

项目名称：视氪导航
更新日期：2025-02-13
脚本作者：sheep
使用声明：⚠️仅供参考，🈲转载与售卖！

**********************************

[rewrite_local]
^http:\/\/39\.101\.171\.199:8080\/liteKrnavi url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/skdh.js

[mitm]
hostname = 39.101.171.199

*************************************/

let body = JSON.parse($response.body);




  

function modifyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                modifyObject(obj[key]);
            } else {
                if (key === 'service_life') {
                    obj[key] ="2099-09-19 23:59:59";
                }
                if (key === 'is_vip') {
                    obj[key] = 1;
                }

if (key === 'card_count') {
                    obj[key] = 10;
                }



            }
        }
    }
    
}
modifyObject(body);

$done({ body: JSON.stringify(body) });









