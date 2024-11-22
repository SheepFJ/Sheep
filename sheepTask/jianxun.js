// 消息内容来自应用--简讯，每次执行该任务随机获取一天简讯


const storageKey = "jianxunStoredItems";
const fetchUrl = `https://api.tipsoon.com/api/v1/info/random`;
const postUrl = `https://api.tipsoon.com/api/v1/info/read`;
const fetchMethod = `GET`;
const postMethod = `POST`;
const fetchHeaders = {
    'channel': `iOS`,
    'Connection': `keep-alive`,
    'Accept': `Application/JSON`,
    'Accept-Encoding': `br;q=1.0, gzip;q=0.9, deflate;q=0.8`,
    'Host': `api.tipsoon.com`,
    'User-Agent': ``,
    'version': `5.0.33`,
    'Authorization': `Bearer a6ee44eff4659683ee0d66cd8b114541d1830f146b844ebbbb563c3438d136d3`,
    'Accept-Language': `zh-Hans-CN;q=1.0, en-CN;q=0.9`
};
const postHeaders = {    
    'Connection': `keep-alive`,
    'Accept-Encoding': `br;q=1.0, gzip;q=0.9, deflate;q=0.8`,
    'version': `5.0.33`,
    'channel': `iOS`,
    'Content-Type': `application/x-www-form-urlencoded; charset=utf-8`,
    'User-Agent': ``,
    'Authorization': `Bearer a6ee44eff4659683ee0d66cd8b114541d1830f146b844ebbbb563c3438d136d3`,
    'Host': `api.tipsoon.com`,
    'Accept-Language': `zh-Hans-CN;q=1.0, en-CN;q=0.9`,
    'Accept': `Application/JSON`
};
const body = ``;

const fetchRequest = {
    url: fetchUrl,
    method: fetchMethod,
    headers: fetchHeaders,
    body: body
};

// 从存储中获取数据
function getStoredItems() {
    const stored = $prefs.valueForKey(storageKey);
    return stored ? JSON.parse(stored) : [];
}

// 保存数据到存储
function saveStoredItems(items) {
    $prefs.setValueForKey(JSON.stringify(items), storageKey);
}

// 从存储中取出最后一条数据并删除
function getLastItemAndRemove() {
    const items = getStoredItems();
    if (items.length > 0) {
        const item = items.pop(); // 取出最后一条
        saveStoredItems(items);  // 更新存储
        return item;
    }
    return null;
}

// 发送请求并存储响应数据
function fetchAndStoreData() {
    $task.fetch(fetchRequest).then(response => {
        if (response.statusCode === 200) {
            const responseBody = JSON.parse(response.body);
            if (responseBody.data && Array.isArray(responseBody.data.items)) {
                const items = responseBody.data.items.map(item => ({
                    title: item.title || "无标题",
                    class_name: item.class_name || "无分类",
                    content: item.content || "无内容",
                    info_id: item.info_id || "未知ID" 
                }));
                const existingItems = getStoredItems();
                saveStoredItems(existingItems.concat(items));
                console.log("新数据已存储:", items);

                if (items.length > 0) {
                    const firstItem = items[0];
                    $notify(
                        `新数据存储成功`,
                        ``,
                        `类别: ${firstItem.class_name} \n${firstItem.title}\n${firstItem.content}`
                    );
                }
            } else {
                console.log("响应数据格式不正确:", response.body);
            }
        } else {
            console.log(`请求失败，状态码: ${response.statusCode}`);
        }
        $done();
    }, reason => {
        console.log(`请求失败: ${reason.error}`);
        $done();
    });
}
//构建POST请求用于刷新讯息
function sendPostRequest(info_id) {
    const postBody = `info_id=${info_id}`;
    const postRequest = {
        url: postUrl,
        method: postMethod,
        headers: postHeaders,
        body: postBody
    };

    $task.fetch(postRequest).then(response => {
        console.log(`POST 请求已发送, 状态码: ${response.statusCode}`);
        $done();
    }, reason => {
        console.log(`POST 请求失败: ${reason.error}`);
        $done();
    });
}
//主要逻辑部分
const storedItems = getStoredItems();

if (storedItems.length > 1) {
    // 如果本地存储有超过1条数据，随机取出并发送通知
    const storedItem = storedItems.splice(
        Math.floor(Math.random() * storedItems.length),
        1
    )[0];
    saveStoredItems(storedItems); // 更新存储
    $notify(
        `一条简短的讯息`,
        ``,
        `类别: ${storedItem.class_name} \n${storedItem.title}\n${storedItem.content}`
    );
    console.log("从本地存储中取出:", storedItem);
    sendPostRequest(storedItem.info_id); // 发送 POST 请求用于刷新讯息
    $done();
} else if (storedItems.length === 1) {
    // 如果本地存储仅剩一条，发送通知并删除该条，同时发送请求获取新数据
    const lastItem = getLastItemAndRemove();
    if (lastItem) {
        $notify(
            `最后一条通知`,
            ``,
            `类别: ${lastItem.class_name} \n${lastItem.title}\n${lastItem.content}`
        );
        console.log("本地存储中最后一条数据已取出并删除:", lastItem);
        sendPostRequest(lastItem.info_id); // 发送 POST 请求请求用于刷新讯息
    }
    console.log("存储为空，正在发送请求获取新数据...");
    fetchAndStoreData();
} else {
    console.log("本地存储为空，正在发送请求获取数据...");
    fetchAndStoreData();
}
