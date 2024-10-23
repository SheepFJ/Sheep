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



// 1. 第一个响应体重写功能 - 匹配路径: ^https:\/\/securetoken\.googleapis\.com\/v1\/token
if ($request.url.match(/^https:\/\/securetoken\.googleapis\.com\/v1\/token/)) {
    // 代码一
    let body = $response.body;
    let obj = JSON.parse(body);

    let accessToken = obj.access_token;

    if (accessToken) {
        $prefs.setValueForKey(accessToken, "local_access_token");
        console.log("Successfully saved access_token.");
    }

    $done({});
}

// 2. 第二个请求头部重写功能 - 匹配路径: ^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions
else if ($request.url.match(/^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions/)) {
    // 代码二
    let accessToken = $prefs.valueForKey("local_access_token");

    if (accessToken) {
        let headers = $request.headers;
        headers['Authorization'] = `Bearer ${accessToken}`;
        $done({headers});
    } else {
        console.log("Access token not found.");
        $done({});
    }
}

// 3. 第三个响应体重写功能 - 匹配路径: ^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions
else if ($response.url.match(/^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions/)) {
    // 代码三
    let body = $response.body;

    let contentArray = [];
    let contentRegex = /data: \{"content":"(.*?)"\}/g;
    let matchContent = contentRegex.exec(body);

    let urlRegex = /"url":"(https:\/\/[^"]+)"/g;
    let matchUrl = urlRegex.exec(body);

    if (matchContent) {
        while ((matchContent = contentRegex.exec(body)) !== null) {
            contentArray.push(matchContent[1]);
        }

        let combinedContent = contentArray.join("");
        $prefs.setValueForKey(combinedContent, "combinedContent");
        console.log("拼接后的内容: " + combinedContent);
    } else if (matchUrl) {
        let newUrl = matchUrl[1];
        let existingUrls = $prefs.valueForKey("local_image_urls");

        if (existingUrls) {
            existingUrls = JSON.parse(existingUrls);
            if (!existingUrls.includes(newUrl)) {
                existingUrls.push(newUrl);
            }
            if (existingUrls.length > 10) {
                existingUrls.shift();
            }
        } else {
            existingUrls = [newUrl];
        }

        $prefs.setValueForKey(JSON.stringify(existingUrls), "local_image_urls");
        console.log("Successfully saved image URL: " + newUrl);
    } else {
        console.log("Neither content nor URL found.");
    }

    $done({ body });
}

// 4. 第四个 HTTP backend 功能 - 匹配路径: http://127.0.0.1:9999/sheep/url/
else if ($request.url.match(/^\/sheep\/url\//)) {
    // 代码四
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