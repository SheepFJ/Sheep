/*************************************

项目名称：复盘盒子
[rewrite_local]
^https://www\.fupanhezi\.com/usercenter/v1/user/detail url script-response-body https://github.com/SheepFJ/Sheep/blob/main/anhepor.js

[mitm]
hostname = www.fupanhezi.com
*************************************/






let body = JSON.parse($response.body);

function modifyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                modifyObject(obj[key]);
            } else {
                if (key === 'expireTime') {
                    obj[key] = "2099-09-09 12:31:29";
                }
                
            }
        }
    }
    
}


modifyObject(body);

$done({ body: JSON.stringify(body) });
