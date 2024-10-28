




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

