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

if ($request) {
    // 代码一部分 - 请求重写
    let body = JSON.parse($request.body);

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

    modifyRequestObject(body);
    $done({ body: JSON.stringify(body) });

} else if ($response) {
    // 根据不同的URL进行判断，选择不同的逻辑处理
    if ($request.url.includes('https://www.51xinwei.com/api/learning-service/admin/studentLearning/getChapterData')) {
        // 代码二部分 - 响应重写
        let body = JSON.parse($response.body);

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

        modifyResponseObject(body);
        $done({ body: JSON.stringify(body) });

    } else {
        // 代码三部分 - 响应重写
        let body = JSON.parse($response.body);

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

        modifyAnotherResponseObject(body);
        $done({ body: JSON.stringify(body) });
    }
}


