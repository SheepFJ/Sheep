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
                


            }
        }
    }
    
}
modifyObject(body);

$done({ body: JSON.stringify(body) });