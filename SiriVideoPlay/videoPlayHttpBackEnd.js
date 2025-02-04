const path1 = "/sheep/video/play01/";
const path2 = "/sheep/video/play/";

if ($request.url.includes(path1)) {
    const html = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视频搜索</title>
    <style>
        body { 
            font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; 
            background: url("https://www.helloimg.com/i/2025/02/04/67a1f7b10b45e.jpeg") no-repeat center center fixed;
            background-size: cover;
            color: white;
            padding-top: 110px; /* 避免顶部导航遮挡内容 */
        }

        /* 顶部导航栏 */
        .header { 
            position: fixed; top: 0; width: 100%; padding: 10px 0;
            background: rgba(0, 0, 0, 0.7); text-align: center;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
        }

        /* 按钮容器 */
        .menu-buttons {
            display: flex; justify-content: center; gap: 15px;
        }
        .menu-buttons button { 
            padding: 12px 20px; font-size: 16px; font-weight: bold; 
            color: white; background: #007bff; border: none; border-radius: 8px; cursor: pointer; 
            transition: background 0.3s ease, transform 0.2s;
        }
        .menu-buttons button:hover { background: #0056b3; transform: scale(1.05); }

        /* 搜索区域 */
        .container { 
            padding: 20px; max-width: 800px; margin: auto; 
            background: rgba(0, 0, 0, 0.7); border-radius: 10px; 
            box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
            border-radius: 0px;
        }
        input, button { 
            margin: 10px; padding: 12px; font-size: 18px; border-radius: 8px; border: none; outline: none;
        }
        input { width: 60%; }
        button { 
            background: #28a745; color: white; cursor: pointer;
            transition: background 0.3s ease, transform 0.2s;
        }
        button:hover { background: #218838; transform: scale(1.05); }

        /* 资源选择 */
        label { font-size: 18px; margin-right: 15px; }
        input[type="checkbox"] { transform: scale(1.2); margin-right: 5px; }

        /* 搜索结果 */
        #results { 
            margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.2); 
            border-radius: 5px; font-size: 18px;
        }
    </style>
</head>
<body>

    <!-- 顶部导航 -->
    <div class="header">
        <div class="menu-buttons">
            <button onclick="goToHistory()">剧集列表</button>
            <button onclick="toggleSearch()">搜索</button>
        </div>
    </div>

    <!-- 搜索框 -->
    <div class="container" id="searchContainer">
        <h2>搜索视频</h2>
        <label><input type="checkbox" value="https://caiji.moduapi.cc/api.php/provide/vod?ac=detail&wd=" checked> 魔都资源</label>
        <label><input type="checkbox" value="https://p2100.net/api.php/provide/vod?ac=detail&wd=" checked> 飘零资源</label>
        <label><input type="checkbox" value="https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8/?ac=detail&wd=" checked> 量子资源</label>
        <label><input type="checkbox" value="https://collect.wolongzyw.com/api.php/provide/vod?ac=detail&wd="> 卧龙资源</label>

        <input type="text" id="searchInput" placeholder="输入搜索内容">
        <button onclick="search()">搜索</button>
        <div id="results"></div>
        <p>默认最多同时选择3个，配合BoxJS进行修改，同时重置剧集列表</p>
    </div>

    <script>
        function goToHistory() {
            window.location.href = "http://127.0.0.1:9999/sheep/video/play/";
        }

        function toggleSearch() {
            let searchContainer = document.getElementById("searchContainer");
            searchContainer.style.display = (searchContainer.style.display === "none" ? "block" : "none");
        }

        function search() {
            let query = document.getElementById("searchInput").value.trim();
            let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            let resultsDiv = document.getElementById("results");

            // 判断是否输入内容 & 选择资源
            if (!query) {
                resultsDiv.innerHTML = "<p style='color: red;'>请输入剧名后重试</p>";
                return;
            }
            if (checkboxes.length === 0) {
                resultsDiv.innerHTML = "<p style='color: red;'>请选择至少一个资源网站</p>";
                return;
            }

            resultsDiv.innerHTML = "<p>正在搜索...</p>";
            let requests = Array.from(checkboxes).map(cb => {
                let url = cb.value + encodeURIComponent(query);
                return fetch(url).catch(err => console.log("请求失败:", err));
            });

            Promise.all(requests).then(() => {
                resultsDiv.innerHTML = "<p>搜索结束，点击剧集列表按钮查看</p>";
            });
        }
    </script>

</body>
</html>
`;

$done({
    status: "HTTP/1.1 200 OK",
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: html
});

} else if ($request.url.includes(path2)) {
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
        body { 
            font-family: Arial, sans-serif; text-align: center; font-size: 24px; margin: 0; padding: 0;
            background: url("https://www.helloimg.com/i/2025/02/04/67a1f7b10b45e.jpeg") no-repeat center center fixed;
            background-size: cover;
            color: white;
            padding-top: 220px; /* 确保内容不会被导航栏遮挡 */
        }

        /* 美观的顶部导航栏 */
        .header { 
            position: fixed; 
            top: 0; 
            width: 100%; 
            padding: 55px 0;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(50, 50, 50, 0.6)); 
            text-align: center;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }
        .header .back { 
            display: inline-block; 
            margin: 8px 42px; 
            padding: 12px 34px; 
            font-size: 48px; 
            font-weight: bold; 
            text-decoration: none; 
            color: white; 
            background: linear-gradient(135deg, #007bff, #0056b3); 
            border-radius: 8px; 
            transition: background 0.3s ease, transform 0.2s, box-shadow 0.3s;
            box-shadow: 0px 3px 8px rgba(0, 123, 255, 0.4);
        }
        .header .back:hover { 
            background: linear-gradient(135deg, #0056b3, #003d80); 
            transform: scale(1.08);
            box-shadow: 0px 5px 12px rgba(0, 123, 255, 0.6);
        }

        .container { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
            padding: 30px; 
            max-width: 1200px; 
            margin: auto; 
            color: #90EE90; /* 影视名称淡绿色 */
        }

        /* 影视卡片样式 */
        .vod-card { 
            width: 90%; 
            border: 2px solid rgba(255, 255, 255, 0.15); 
            padding: 15px; 
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.2); /* 透明度更淡 */
            text-align: center; 
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .vod-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.3);
        }
        .vod-card img { width: 100%; height: auto; border-radius: 5px; 
margin-bottom: 15px; 
}
        .vod-card a { 
            text-decoration: none; 
            color: #f8f8f8; 
            display: block; 
            margin-top: 15px; 
            font-weight: bold; 
            font-size: 22px; 
        }
.vod-card span{

color: #245372;
font-size:32px;

}

        /* 影视详情标题颜色 */
        h1 {
            color: #4b9fd7; /* 影视名称淡绿色 */
        }

        /* 剧集列表 */
        .episode-list { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
            gap: 20px; 
            padding: 30px; 
            max-width: 800px; 
            margin: auto; 
        }
        .episode-item { 
            width: 110%; 
            height: 60px; 
            background: rgba(255, 255, 255, 0.3);
            color: #fff; 
            border-radius: 5px; 
            text-align: center; 
            line-height: 60px; 
            font-weight: bold; 
            font-size: 30px; 
            cursor: pointer; 
            transition: background 0.3s;
        }
        .episode-item:hover { 
            background: rgba(255, 255, 255, 0.6); 
            color: black; 
        }
    </style>
</head>
<body>
    <!-- 头部导航 -->
    <div class="header">
        <a class="back" href="/sheep/video/play/">影视列表</a>
        <a class="back" href="/sheep/video/play01/">返回搜索</a>
    </div>

    ${content}

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
} else {
    $done({ status: "HTTP/1.1 404 Not Found", body: "路径错误" });
}

