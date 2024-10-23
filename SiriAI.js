/*************************************
项目名称：SiriAI
更新日期：2024-10-02
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明；利用Siri与圈x的httpbackend功能去调用gpt接口实现问答

**************************************

[rewrite_local]
 ^https:\/\/chatme-backend-d5f358e587a4\.herokuapp\.com\/chatme\/api\/v1\/ask\/text url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAI.js  

 ^https:\/\/chatme-backend-d5f358e587a4\.herokuapp\.com\/chatme\/api\/v1\/ask\/text url script-request-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAI.js  
 ^https:\/\/securetoken\.googleapis\.com\/v1\/token url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js  

  ^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions url script-request-header https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js  
^https:\/\/genie-production-yfvxbm4e6q-uc\.a\.run\.app\/chats\/local\/completions url script-response-body https://raw.githubusercontent.com/SheepFJ/Sheep/main/SiriAIT.js

[mitm]
hostname = chatme-backend-d5f358e587a4.herokuapp.com,securetoken.googleapis.com,genie-production-yfvxbm4e6q-uc.a.run.app

*************************************/




const tokenPath = "/v1/token";
const chatPathCompletions = "/chats/local/completions";
const backendPathUrl = "/sheep/url/";
const basePathWenti = "/sheep/wenti/"; 
const basePathDaan = "/sheep/daan/"; 
const chatPath = "/chatme/api/v1/ask/text"; 

// 1. 第一个响应体重写功能 - 匹配路径: "/v1/token"
if ($request && $request.path.startsWith(tokenPath)) {
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

// 2. 第二个请求头部重写功能 - 匹配路径: "/chats/local/completions"
else if ($request && $request.path.startsWith(chatPathCompletions)) {
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

// 3. 第三个响应体重写功能 - 匹配路径: "/chats/local/completions"
else if ($response && $response.url.includes(chatPathCompletions)) {
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

// 4. 第四个 HTTP backend 功能 - 匹配路径: "/sheep/url/"
else if ($request && $request.path.startsWith(backendPathUrl)) {
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
} else if ($request && $request.path.startsWith(basePathDaan)) {
    let baseKey = "combined_content_response"; 
    let index = 0;
    let latestResponseContent = ""; // 用于存储最新读取到的内容

    while (true) {
        let storageKey = baseKey + (index === 0 ? "" : index); 
        let storedValue = $prefs.valueForKey(storageKey); 

        if (!storedValue) {
            break; 
        }

        latestResponseContent = storedValue; // 每次找到值时更新最新的内容
        index++; 
    }
if (latestResponseContent) {
        $done({
            status: "HTTP/1.1 200 OK",
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Connection": "Close"
            },
            body: latestResponseContent
        });
    } else {
        $done({
            status: "HTTP/1.1 404 Not Found",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Connection": "Close"
            },
            body: "<html><body><h1>没有获取到结果，可能的原因：0.第一个问题请选择“新问题”选项1. 没有添加重写 2. 没有添加主机名 3. 分流规则设置不当 </h1></body></html>"
        });
    }

// 处理请求路径 "/sheep/wenti/"
} else if ($request && $request.path.startsWith(basePathWenti)) {
    let requestBaseKey = "combined_content_request";
    let responseBaseKey = "combined_content_response";
    let index = 0;
    let allCombinedWords = ""; // 用于存储所有读取到的内容

    while (true) {
        let requestStorageKey = requestBaseKey + (index === 0 ? "" : index);
        let requestStoredValue = $prefs.valueForKey(requestStorageKey); // 读取请求体存储值

        let responseStorageKey = responseBaseKey + (index === 0 ? "" : index);
        let responseStoredValue = $prefs.valueForKey(responseStorageKey); // 读取响应体存储值

        if (!requestStoredValue && !responseStoredValue) {
            break;
        }

        let requestAlreadyExists = requestStoredValue && allCombinedWords.indexOf(`"content": "${requestStoredValue}"`) !== -1;
        let responseAlreadyExists = responseStoredValue && allCombinedWords.indexOf(`"content": "${responseStoredValue}"`) !== -1;

        if (requestStoredValue && !requestAlreadyExists) {
            allCombinedWords += `{"content": "${requestStoredValue}", "role": "user"}, `;
        }

        if (responseStoredValue && !responseAlreadyExists) {
            allCombinedWords += `{"content": "${responseStoredValue}", "role": "assistant"}, `;
        }

        index++;
    }

    if (allCombinedWords.endsWith(", ")) {
        allCombinedWords = allCombinedWords.slice(0, -2);
    }

    if (allCombinedWords) {
        $done({
            status: "HTTP/1.1 200 OK",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Connection": "Close"
            },
            body: allCombinedWords
        });
    }
        else {
        $done({
            status: "HTTP/1.1 404 Not Found",
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Connection": "Close"
            },
            body: "<html><body><h1>没有获取到结果，可能的原因：0.第一个问题请选择“新问题”选项1. 没有添加重写 2. 没有添加主机名 3. 分流规则设置不当</h1></body></html>"
        });
    }


// 处理请求和响应路径 "/chatme/api/v1/ask/text"
} else if ($request && $request.path.startsWith(chatPath)) {
    if ($response) {
        let body = $response.body;
        let regex = /"content":"(.*?)"/g;
        let match;
        let baseKey = "combined_content_response";
        let index = 0;

        while ($prefs.valueForKey(baseKey + (index === 0 ? "" : index))) {
            let storedContent = $prefs.valueForKey(baseKey + (index === 0 ? "" : index));
            if (storedContent) {
                body = body.replace(`"content":"${storedContent}"`, '');
            }
            index++;
        }

        index = 0;
        while ($prefs.valueForKey(baseKey + (index === 0 ? "" : index))) {
            index++;
        }

        while ((match = regex.exec(body)) !== null) {
            let content = match[1];
            let safeContent = JSON.stringify(content).slice(1, -1);
            let storageKey = baseKey + (index === 0 ? "" : index);

            let alreadyStored = false;
            for (let i = 0; i <= index; i++) {
                let storedValue = $prefs.valueForKey(baseKey + (i === 0 ? "" : i));
                if (storedValue === safeContent) {
                    alreadyStored = true;
                    break;
                }
            }

            if (!alreadyStored) {
                $prefs.setValueForKey(safeContent, storageKey);
                
                index++;
            }
        }

        $done();

    }    else if ($request) {
        let body = $request.body;
        let regex = /"content"\s*:\s*"([^"]*)"\s*,\s*"role"\s*:\s*"user"/g;
        let match;
        let lastContent = null;

        while ((match = regex.exec(body)) !== null) {
            lastContent = match[1];
        }

        if (lastContent) {
            let baseKey = "combined_content_request";
            let index = 0;

            while ($prefs.valueForKey(baseKey + (index === 0 ? "" : index))) {
                let storedContent = $prefs.valueForKey(baseKey + (index === 0 ? "" : index));

                if (storedContent === lastContent) {
                    console.log(`已存在相同的 content: ${lastContent}`);
                    $done();
                    return;
                }
                index++;
            }

            let storageKey = baseKey + (index === 0 ? "" : index);
            $prefs.setValueForKey(lastContent, storageKey);
    
        } else {
            console.log("未匹配到任何请求体中的内容");
        }

        $done();
    }

} 
else {
    $done({
        status: "HTTP/1.1 404 Not Found",
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Connection": "Close"
        },
        body: "<html><body><h1>没有获取到结果，可能的原因：0.第一个问题请选择“新问题”选项1. 没有添加重写 2. 没有添加主机名 3. 分流规则设置不当</h1></body></html>"
    });
}
