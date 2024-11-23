if ($response) { 
    let body = $response.body;
    let regex = /"content":"(.*?)"/g;
    let match;
    let combinedContent = '';  // 用于拼接 content 的字符串
    let baseKey = "combined_content_response";
    let index = 0;

    // 拼接所有 content 内容
    while ((match = regex.exec(body)) !== null) {
        let content = match[1];
        combinedContent += content;  // 拼接 content
    }

    if (combinedContent) {
        let storageKey = baseKey + (index === 0 ? "" : index);
        // 将拼接后的内容存储到本地
        $prefs.setValueForKey(combinedContent, storageKey);
    }

    $done();

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
