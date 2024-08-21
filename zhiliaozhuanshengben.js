


let body = $response.body;
let obj = JSON.parse(body);




var url = $request.url;
const vip0 = '/app/iap/goods_detail_v2';

var url = $request.url;
const vip1 = '/wxpub/api/video_show';

var url = $request.url;
const vip2 = '/wxpub/api/video_play_detail';




//递归遍历 JSON 对象，查找 alivid 和 item_name并存储
if (url.indexOf(vip0) != -1) {  
let alividList = [];
let itemNameList = [];

function findKeys(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            findKeys(obj[key]);
        } else if (key === "alivid") {
            alividList.push(obj[key]);
        } else if (key === "item_name") {
            itemNameList.push(obj[key]);
        }
    }
}
findKeys(obj);
$prefs.setValueForKey(alividList.join(","), "alividList");
$prefs.setValueForKey(itemNameList.join(","), "itemNameList");

// 打印日志
//console.log("alivid: " + alividList.join(", "));
//console.log("item_name: " + itemNameList.join(", "));
}






// 从 Quantumult X 的持久化存储中获取之前保存的 item_name 和 alivid 列表
if (url.indexOf(vip1) != -1) {  
let storedItemNameList = $prefs.valueForKey("itemNameList").split(",");
let storedAlividList = $prefs.valueForKey("alividList").split(",");

// 创建一个映射，将 item_name 与对应的 alivid 关联
let itemAlividMap = {};
for (let i = 0; i < storedItemNameList.length; i++) {
    itemAlividMap[storedItemNameList[i]] = storedAlividList[i];
}

// 递归遍历 JSON 对象，修改 is_free 属性并添加 alivid 属性
function modifyAndAddProperties(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            modifyAndAddProperties(obj[key]);
        } else {
            // 修改 is_free 属性
            if (key === 'is_free') {
                obj[key] = 1;
            }
            // 添加 alivid 属性
            if (key === "name" && itemAlividMap[obj[key]]) {
                obj["alivid"] = itemAlividMap[obj[key]];
            }
        }
    }
}

// 调用函数递归处理 JSON 对象
modifyAndAddProperties(obj);

// 将修改后的 JSON 对象转换回字符串
body = JSON.stringify(obj);
}


if (url.indexOf(vip2) != -1) {  
obj={
  "errcode" : 0,
  "errmsg" : "操作成功",
  "data" : {
    "section_name" : "",
    "video_name" : "",
    "alivid" : "",
    "course_section_id" : "",
    "video_id" : "",
    "is_free" : "1",
    "hls" : "",
    "title" : "第一次进入黑屏重新点击一次",
    "hls_sign" : 1,
    "has_course_means" : true,
    "duration" : "0",
    "course_id" : "211",
    "has_share" : "0"
  }
};






body = JSON.stringify(obj);
}


$done({body});









