/*************************************
项目名称：一合物联去广告
下载地址：
更新日期：2024-08-21
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明；热水去广告

**************************************

[rewrite_local]
^^https://www\.szyhznkj\.net/xcxInterface/xcxapi/v3GetAccByWxId url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/reshui.js  
[mitm]
hostname = www.szyhznkj.net

*************************************/

let body = JSON.parse($response.body);











  

function modifyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                modifyObject(obj[key]);
            } else {
                if (key === 'isad') {
                    obj[key] = 0;
                }




            }
        }
    }
    
}
modifyObject(body);

$done({ body: JSON.stringify(body) });









