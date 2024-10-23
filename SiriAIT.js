/*************************************
项目名称：SiriAI
更新日期：2024-10-02
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明；利用Siri与圈x的httpbackend功能去调用gpt接口实现问答

**************************************

[rewrite_local]
  ^https:\/\/securetoken\.googleapis\.com\/v1\/token url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js  

  ^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions url script-request-header https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js  
^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js

[mitm]
hostname = securetoken.googleapis.com,genie-production-yfvxbm4e6q-uc.a.run.app

*************************************/

const tokenPath = "/v1/token";
const chatPathCompletions = "/chats/local/completions";
const backendPathUrl = "/sheep/url/";

// 1. 处理 "/v1/token" 路径的响应
if ($request && $request.path.startsWith(tokenPath)) {
    // 代码一 - 修改响应体并存储 token
    let body = $response.body;
    let obj = JSON.parse(body);
    let accessToken = obj.access_token;

    if (accessToken) {
        $prefs.setValueForKey(accessToken, "local_access_token");
        console.log("Successfully saved access_token.");
    }

    $done({});
}

// 2. 处理 "/chats/local/completions" 路径的请求和响应
else if ($request && $request.path.startsWith(chatPathCompletions)) {
    // 代码二 - 先修改请求头
    let accessToken = $prefs.valueForKey("local_access_token");

    if (accessToken) {
        let headers = $request.headers;
        headers['Authorization'] = `Bearer ${accessToken}`;

        // 修改请求头后，等待响应的到来
        $done({ headers });
    } else {
        console.log("Access token not found.");
        $done({});
    }
} // 3. 处理 "/sheep/url/" 路径的 HTTP backend 请求
else if ($request && $request.path.startsWith(backendPathUrl)) {
    // 代码四 - 显示最近的 10 个图片 URL
    let storedUrls = $prefs.valueForKey("local_image_urls");

    if (storedUrls) {
        let urlList = JSON.parse(storedUrls);
        let latestUrls = urlList.slice(-10).reverse();

        let htmlContent = `
        <meta charset="UTF-8">
        <html>
        <body>
        <h1>显示最近的10张图片</h1>
        `;

        latestUrls.forEach((url, index) => {
            htmlContent += `
            <div>
                <h2>Image ${index + 1}</h2>
                <p><a href="${url}">${url}</a></p>
                <img src="${url}" alt="Image Preview" style="max-width:100%; height:auto;"/>
            </div>
            <hr/>
            `;
        });

        htmlContent += `
        </body>
        </html>
        `;

        $done({
            status: "HTTP/1.1 200 OK",
            headers: {
                "Content-Type": "text/html"
            },
            body: htmlContent
        });
    } else {
        let errorContent = `
        <html>
        <body>
        <h1>No URLs Found</h1>
        <p>No URLs have been stored yet.</p>
        </body>
        </html>
        `;

        $done({
            status: "HTTP/1.1 404 Not Found",
            headers: {
                "Content-Type": "text/html"
            },
            body: errorContent
        });
    }
}