/*************************************
项目名称：芯位教育
更新日期：2024-09-22
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：进入后点恢复购买，解锁会员

**************************************

[rewrite_local]
^https:\/\/www\.51xinwei\.com\/api\/learning-service\/admin\/studentLearning\/videoLearnProcessReport url script-request-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/xinweijiaoyu.js
^https:\/\/www\.51xinwei\.com\/api\/learning-service\/admin\/studentLearning\/getChapterData url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/xinweijiaoyu.js  
^http://api\.528529^https:\/\/www\.51xinwei\.com\/api\/learning-service\/admin\/studentLearning\/getSingleChapterData url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/xinweijiaoyu.js  
[mitm]
hostname = www.51xinwei.com
*************************************/

var body = $response ? $response.body : $request.body; // 根据响应或请求体进行处理
var url = $request.url;
var obj = JSON.parse(body);

// 定义三个不同的路径
const vipPath = '/api/learning-service/admin/studentLearning/videoLearnProcessReport';
const userDetailPath = '/api/learning-service/admin/studentLearning/getChapterData';
const anotherPath = '/api/learning-service/admin/studentLearning/getSingleChapterData';

// 根据路径进行不同的处理
if (url.indexOf(vipPath) != -1) {
    // 代码一部分：处理 playbackRate
    function modifyRequestObject(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    modifyRequestObject(obj[key]);
                } else {
                    if (key === 'playbackRate') {
                        obj[key] = 1;
                    }
                }
            }
        }
    }
    modifyRequestObject(obj);
    body = JSON.stringify(obj);

} else if (url.indexOf(userDetailPath) != -1) {
    // 代码二部分：处理 status
    function modifyResponseObject(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    modifyResponseObject(obj[key]);
                } else {
                    if (key === 'status') {
                        obj[key] = 2;
                    }
                }
            }
        }
    }
    modifyResponseObject(obj);
    body = JSON.stringify(obj);

} else if (url.indexOf(anotherPath) != -1) {
    // 代码三部分：处理其他字段
    function modifyAnotherResponseObject(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    modifyAnotherResponseObject(obj[key]);
                } else {
                    if (key === 'showPlaybackRate') {
                        obj[key] = true;
                    }
                    if (key === 'showLearnTrack') {
                        obj[key] = true;
                    }
                    if (key === 'canDragger') {
                        obj[key] = true;
                    }
                    if (key === 'isShowHint') {
                        obj[key] = true;
                    }
                    if (key === 'completeStatus') {
                        obj[key] = "1";
                    }
                }
            }
        }
    }
    modifyAnotherResponseObject(obj);
    body = JSON.stringify(obj);
}

// 返回处理后的响应体
$done({ body });