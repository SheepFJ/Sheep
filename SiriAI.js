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


[mitm]
hostname = chatme-backend-d5f358e587a4.herokuapp.com

*************************************/





const basePathWenti = "/sheep/wenti/"; 
const basePathDaan = "/sheep/daan/"; 
const chatPath = "/chatme/api/v1/ask/text"; 
const urlPath = "/sheep/url/";

if ($request && $request.path.startsWith(basePathDaan)) {
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

    } 
    else if ($request && $request.path.startsWith(urlPath)) {
    // 处理 /sheep/url/ 请求
    // 1. 读取存储的 URL 列表
    let storedUrls = $prefs.valueForKey("local_image_urls");

    // 2. 检查 URL 列表是否存在并解析为数组
    if (storedUrls) {
        let urlList = JSON.parse(storedUrls);

        // 3. 取最近的 10 个 URL（如果不足 10 个则取全部）
        let latestUrls = urlList.slice(-10).reverse();

        // 4. 构造 HTML 输出，将每个 URL 显示为图片预览
        let htmlContent = `
        <meta charset="UTF-8">
        <html>
            <body>
                <h1>显示最近的10张图片</h1>
        `;

        // 5. 使用循环将每个 URL 添加到 HTML 中
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

        // 6. 返回构造好的 HTML 内容作为响应体
        $done({
            status: "HTTP/1.1 200 OK",
            headers: {
                "Content-Type": "text/html"
            },
            body: htmlContent
        });
    } else {
        // 7. 如果没有存储的 URL，返回提示信息
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
} else {
    $done({
        status: "HTTP/1.1 404 Not Found",
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Connection": "Close"
        },
        body: "<html><body><h1>没有获取到结果，可能的原因：0.第一个问题请选择“新问题”选项1. 没有添加重写 2. 没有添加主机名 3. 分流规则设置不当</h1></body></html>"
    });
}
    
    
    
    else if ($request) {
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
