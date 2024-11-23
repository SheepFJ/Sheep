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
