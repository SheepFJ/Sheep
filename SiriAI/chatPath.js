if ($response) { 
    let body = $response.body;
    let regex = /"content":"(.*?)"/g;
    let match;
    let combinedContent = '';  // 用于拼接 content 的字符串
    let baseKey = "combined_content_response";
    let index = 0;

    // 从响应体中提取并拼接所有的 content
    while ((match = regex.exec(body)) !== null) {
        let content = match[1];
        combinedContent += content;  // 累加每个 content
    }

    if (combinedContent) {
        let storageKey = baseKey + (index === 0 ? "" : index);
        // 将拼接后的内容存储到本地
        $prefs.setValueForKey(combinedContent, storageKey);
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
