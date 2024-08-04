


/*
^https://www\.fupanhezi\.com/usercenter/v1/user/detail

www.fupanhezi.com
*/




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
