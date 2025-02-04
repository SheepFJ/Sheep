/**
 * 获取存储的影视键值
 * @returns {string[]} 影视键值列表
 */
function getVodKeys() {
    let keys = [];
    for (let i = 1; ; i++) {
        let key = `vod_info_${i.toString().padStart(2, "0")}`;
        if (!$prefs.valueForKey(key)) break; // 无数据时终止循环
        keys.push(key);
    }
    return keys;
}

/**
 * 生成完整的 HTML 页面
 * @param {string} title 页面标题
 * @param {string} content 主要内容
 * @returns {string} 生成的 HTML 页面
 */
function generatePage(title, content) {
    return `
    <html>
    <head>
        <title>${title}</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; font-size: 24px; margin: 0; padding: 0; }
            .container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 30px; max-width: 1200px; margin: auto; }
            .vod-card { width: 90%; border: 2px solid #ddd; padding: 15px; border-radius: 10px; background: #f9f9f9; text-align: center; }
            .vod-card img { width: 100%; height: auto; border-radius: 5px; }
            .vod-card a { text-decoration: none; color: #333; display: block; margin-top: 15px; font-weight: bold; font-size: 22px; }
            .episode-list { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 30px; max-width: 800px; margin: auto; }
            .episode-item { width: 100%; height: 60px; background: #d3d3d3; color: #fff; border-radius: 5px; text-align: center; line-height: 60px; font-weight: bold; font-size: 22px; cursor: pointer; transition: background 0.3s; }
            .episode-item:hover { background: #a9a9a9; }
            .footer { position: relative; margin-top: 30px; padding: 20px 0; background: #f1f1f1; text-align: center; }
            .back { display: inline-block; padding: 12px 24px; font-size: 18px; font-weight: bold; text-decoration: none; 
                    color: white; background-color: #007bff; border-radius: 8px; transition: background-color 0.3s ease; }
            .back:hover { background-color: #0056b3; }
        </style>
    </head>
    <body>
        ${content}
        <div class="footer">
            <a class="back" href="/sheep/video/play/">返回首页</a>
        </div>
    </body>
    </html>`;
}

/**
 * 生成影视列表页面
 * @param {string[]} vodKeys 影视数据键值列表
 * @returns {string} 影视列表 HTML
 */
function generateVodListPage(vodKeys) {
    let content = `<h1>影视列表</h1><div class="container">`;

    content += vodKeys.map(key => {
        let vodInfo = $prefs.valueForKey(key);
        if (!vodInfo) return "";

        let [name, img] = vodInfo.split(",");
        return `
        <div class="vod-card">
            <a href="/sheep/video/play/${encodeURIComponent(name)}">
                <img src="${img}" alt="${name}">
                <span>${name}</span>
            </a>
        </div>`;
    }).join("");

    content += `</div>`;
    return generatePage("影视列表", content);
}

/**
 * 生成影视详情页面
 * @param {string} vodName 影视名称
 * @param {string} vodKey 影视存储键
 * @returns {string} 影视详情 HTML
 */
function generateVodDetailPage(vodName, vodKey) {
    let vodInfo = $prefs.valueForKey(vodKey);
    if (!vodInfo) return generatePage("错误", `<h1>未找到剧集</h1>`);

    let [name, img, ...episodes] = vodInfo.split(",");

    let content = `<h1>${name}</h1><img src="${img}" width="400"><br>`;
    content += `<div class="episode-list">`;

    content += episodes.map(ep => {
        let [epNum, epUrl] = ep.split(": ");
        return `<div class="episode-item">
                    <a href="${epUrl}" target="_blank">${epNum}</a>
                </div>`;
    }).join("");

    content += `</div>`;
    return generatePage(name, content);
}

// 解析请求路径
const vodKeys = getVodKeys();
let path = $request.path;
let html = "";

// 处理主页影视列表
if (path === "/sheep/video/play/") {
    html = generateVodListPage(vodKeys);
}
// 处理影视详情页
else if (path.startsWith("/sheep/video/play/")) {
    let vodName = decodeURIComponent(path.replace("/sheep/video/play/", ""));
    let vodKey = vodKeys.find(key => {
        let vodInfo = $prefs.valueForKey(key);
        return vodInfo && vodInfo.startsWith(vodName);
    });

    html = generateVodDetailPage(vodName, vodKey);
}

// 响应 HTML 页面
$done({
    status: "HTTP/1.1 200 OK",
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: html
});