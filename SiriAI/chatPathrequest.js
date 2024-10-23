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