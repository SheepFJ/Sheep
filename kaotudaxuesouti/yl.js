var body = $response.body;

var obj = JSON.parse(body);



obj.data[1].title="🌟👇加入TG交流群获取更多内容🌟";



let newItem = {
    "linkUrl": "https://t.me/yqc_777",
    "name": "跳转加入TG",
    "image": "https://jgxm-question.oss-cn-beijing.aliyuncs.com/cxzz/jgxm/soutiapp/110d879b27be4a54b3f1be5139af6f86.png",
    "action": "H5"
};

// 将新对象插入到 list 的最前面
obj.data[1].list.unshift(newItem);



body = JSON.stringify(obj);

$done({body});