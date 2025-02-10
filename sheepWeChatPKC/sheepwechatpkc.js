/*
项目名称：SiriAI
更新日期：2024-11-20
脚本作者：@Sheepfj
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：pkc+圈x/Loon实现上下文自动回复
使用方法：导入重写，然后安装boxjs订阅

================== Loon ==================
[Script]
http-response ^https:\/\/movies\.disney\.com\/sheep\/video\/gpt\/([^\/]+)\/([^\/]+)\/? script-path=https://raw.githubusercontent.com/SheepFJ/Sheep/main/sheepWeChatPKC/sheepwechatpkc.js, requires-body=true, timeout=10, tag=SheepWeChatPKC

[MitM]
hostname = movies.disney.com

================= Quantumult X =================
[rewrite_local]
^https:\/\/movies\.disney\.com\/sheep\/video\/gpt\/([^\/]+)\/([^\/]+)\/? url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/sheepWeChatPKC/sheepwechatpkc.js

[mitm]
hostname = movies.disney.com
*/


const url = $request.url;
const pattern = /^https:\/\/movies\.disney\.com\/sheep\/video\/gpt\/([^\/]+)\/([^\/]+)\/?/;

// **无效请求，返回 404**
if (!pattern.test(url)) {
    return $done({
        status: isLoon ? 404 : "HTTP/1.1 404 Not Found",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "Not Found"
    });
}

const matches = url.match(pattern);
const username = decodeURIComponent(matches[1]);
const question = decodeURIComponent(matches[2]).slice(1);

const isLoon = typeof $loon !== "undefined";
const isQX = typeof $task !== "undefined";

// **存储封装（兼容 Quantumult X & Loon）**
const Storage = {
    get: key => {
        return isQX ? $prefs.valueForKey(key) || "" : $persistentStore.read(key) || "";
    },
    set: (key, value) => {
        return isQX ? $prefs.setValueForKey(value, key) : $persistentStore.write(value, key);
    }
};

// **读取本地存储**
let storedData = Storage.get("sheep_wechat_data");
storedData = storedData ? JSON.parse(storedData) : {};

// **如果是 "重启"，删除用户所有数据**
if (question === "重启") {
    delete storedData[username];
    Storage.set("sheep_wechat_data", JSON.stringify(storedData));
    console.log(`✅ 已重置 ${username} 的所有数据`);

    return $done({
        status: isLoon ? 200 : "HTTP/1.1 200 OK",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "用户数据已重置"
    });
}

// **初始化用户存储**
if (!storedData[username]) {
    storedData[username] = [];
}

// **检查是否已经添加过预设**
const firstEntry = storedData[username][0] || {};
const hasPreset = firstEntry.content && firstEntry.content.startsWith("€£");

if (!hasPreset) {
    console.log(`⚠️ ${username} 还未添加预设，正在执行添加`);

    let userSettingsRaw = Storage.get("sheep_wechat_user");
    if (!userSettingsRaw) {
        console.log("⚠️ 未找到用户设定数据");
    } else {
        let userSettings = {};
        userSettingsRaw.split("$").forEach(entry => {
            let parts = entry.split("@");
            if (parts.length === 3) {
                let name = parts[0].trim();
                userSettings[name] = {
                    userSetting: parts[1].trim(),
                    assistantSetting: parts[2].trim()
                };
            }
        });

        if (userSettings[username]) {
            const { userSetting, assistantSetting } = userSettings[username];
            const settingData = [
                { "content": `€£${userSetting}`, "role": "user" },
                { "content": assistantSetting, "role": "assistant" }
            ];
            storedData[username] = settingData.concat(storedData[username]);

            let updatedSettingsRaw = userSettingsRaw.replace(`${username}@${userSetting}@${assistantSetting}`, `${username}@€£${userSetting}@${assistantSetting}`);
            Storage.set("sheep_wechat_user", updatedSettingsRaw);
            console.log(`✅ 已为 ${username} 添加预设`);
        }
    }
}

// **存储用户提问**
storedData[username].push({ "content": question, "role": "user" });
storedData[username].push({ "content": "待回答", "role": "assistant" });
Storage.set("sheep_wechat_data", JSON.stringify(storedData));

let globalSettings = Storage.get("sheep_wechat_all") || "（稍后为你提供设定）";

let messages = [
    { "content": `你现在是一个微信回复助手，你的回答需要在70个字以内，下面是你的一些设定：${globalSettings}`, "role": "user" },
    { "content": "好的，我会遵循设定，还有什么补充呢", "role": "assistant" }
];

storedData[username].forEach(entry => {
    if (!(entry.role === "assistant" && entry.content === "待回答")) {
        messages.push(entry);
    }
});

const requestBody = JSON.stringify({
    "fuid": "rWuHN9EPIHQwRVVGEUHd4qBX5Sj1",
    "messages": messages,
    "aiModelProvider": "open-ai",
    "language": "EN",
    "subscriptionType": "premium",
    "aiModelVersion": "gpt-4o",
    "user": "A4060097-2A26-4F56-922B-ED9DC946E62B"
});

// **请求设置**
const myRequest = {
    url: "https://chatme-backend-d5f358e587a4.herokuapp.com/chatme/api/v1/ask/text",
    method: "POST",
    headers: {
        'Accept': `*/*`,
        'Accept-Encoding': `gzip, deflate, br`,
        'Connection': `keep-alive`,
        'Content-Type': `application/json`,
        'Host': `chatme-backend-d5f358e587a4.herokuapp.com`,
        'User-Agent': `BackgroundShortcutRunner/1417.1 CFNetwork/1406.0.4 Darwin/22.4.0`,
        'Accept-Language': `en;q=1.0`
    },
    body: requestBody
};

// **请求方法（兼容 Loon & Quantumult X）**
function fetchRequest(options, callback) {
    if (isQX) {
        $task.fetch(options).then(response => callback(null, response, response.body)).catch(error => callback(error, null, null));
    } else if (isLoon) {
        $httpClient.post(options, callback);
    } else {
        console.log("❌ 不支持的环境");
        callback("Unsupported", null, null);
    }
}

// **发送请求**
fetchRequest(myRequest, function(error, response, data) {
    if (error) {
        console.log("❌ 请求失败：" + JSON.stringify(error));
        return $done({ body: "请求失败" });
    }

    console.log("请求成功：" + data.substring(0, 100) + "...");

    const matches = data.match(/"content":"(.*?)"/g);
    if (!matches) return $done({ body: "请求成功，但未找到回答" });

    const contents = matches.map(match => match.replace(/"content":"|"/g, ''));
    const combinedContent = contents.join('');

    console.log(`✅ 生成回答: ${combinedContent.substring(0, 100)}...`);

    storedData[username] = storedData[username].map(entry => {
        if (entry.role === "assistant" && entry.content === "待回答") {
            return { "content": combinedContent, "role": "assistant" };
        }
        return entry;
    });

    Storage.set("sheep_wechat_data", JSON.stringify(storedData));
    console.log("✅ 数据已存储");

    $done({
        status: isLoon ? 200 : "HTTP/1.1 200 OK",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: combinedContent
    });
});