/*************************************
项目名称：微信自动回复AI生成的消息
更新日期：2024-12-28
脚本作者：@Sheepfj
使用声明：⚠️仅供参考，🈲转载与售卖！
配合BoxJs修改AI设定，猫娘风，幽默风，由你设置：
boxjs订阅链接：https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/sheepTask/sheepTaskBoxJs.json
**********************************
使用教程：
功能：微信自动回复AI生成的消息
工具：圈x+微信且安装pkc插件(本人使用pkc0.6-6版本，有自动回复与自定义文本Api即可)

配置教程：
1.圈x配置：Backend监听地址与端口：
	--地址--：127.0.0.1   --端口--:   9.9.9.9	
2.圈x配置：填入backend处理请求的路径及脚本路径：
	处理请求的路径    ^/sheep/pkc/gpt/   
	脚本路径      https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/sheepTask/pkcWeChatGpt.js     

3.设置微信pkc插件--关键词自动回复：
	pkc插件中打开关键词自动回复，进入关键词回复设置右上点添加，自动回复文本(必填)中填写      /pkc text 1 [原文]

4.设置微信pkc插件--自定义接口Api：
	打开自定义文本api，然后进入配置，在API1中填写            	 http://127.0.0.1:9999/sheep/pkc/gpt/[参数1]/
				     在自定义内容API1中填写	 [content]
				     （如果打开了文字转语言，在自定义前缀API1中填写    yy  可自动将文字转语音）
*************************************/


const basePathDaan = "/sheep/pkc/gpt/";

if ($request && $request.path.startsWith(basePathDaan)) {
    // 提取路径参数
    let parameter = decodeURIComponent(
    $request.path.slice(basePathDaan.length).replace(/\/$/, "")
).replace(/%0A/g, ""); // 将 %0a 换行符替换为空字符串

    let customContent = $prefs.valueForKey('sheep_pkc_chatgpt4o_data');

if (!customContent) {
        // 如果本地没有值，使用默认设定内容
        customContent = "下面是你的一些设定，你叫小羊,是一位温和、有耐心且幽默的微信聊天助手，它的使命是陪伴用户的日常生活，无论是答疑解惑还是闲聊打发时间，小羊都能胜任。小羊的语气亲切轻松，给人一种可靠又贴心的感觉。在解答正式问题时，小羊语言条理清晰，富有逻辑；而在闲聊中，它则显得活泼有趣，善于用语言感染他人。小羊的专长包括提供生活服务、解决用户的疑问、以及提供高质量的陪伴。它能快速查询天气、生成待办事项提醒，还能回答用户提出的各种问题，从日常小事到复杂知识点，无所不知。当用户感到无聊时，小羊会主动参与话题，提出引导性问题，甚至模拟不同的情绪或角色，为聊天增添趣味。在微信环境中，小羊的表现灵活且多样。它能够以简洁的文字回复，或者根据需要发送表情和图片，满足用户多样化的沟通需求。无论用户输入中文还是其他语言，小羊都能快速理解并提供准确的回应。它的目标是成为一位贴心的朋友、可靠的助手，不论用户是需要建议、问题解答，还是只是寻找一位倾听者，小羊都能随时陪伴。";
    }

    if (parameter) {
        // 替换参数到请求体中
        const url = `https://chatme-backend-d5f358e587a4.herokuapp.com/chatme/api/v1/ask/text`;
        const method = `POST`;
        const headers = {
            'Accept': `*/*`,
            'Accept-Encoding': `gzip, deflate, br`,
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Host': `chatme-backend-d5f358e587a4.herokuapp.com`,
            'User-Agent': `BackgroundShortcutRunner/1417.1 CFNetwork/1406.0.4 Darwin/22.4.0`,
            'Accept-Language': `en;q=1.0`
        };
	    //字数不要超过70，否则容易超时
        const body = `{"fuid":"rWuHN9EPIHQwRVVGEUHd4qBX5Sj1","messages":[{"content":"你接下来的所有回答字数必须控制在70字内，你现在是一个微信回复聊天助手,我会对你进行一些个性化的设定","role":"user"},{"content":"好的，很高兴为你服务！你为我提供的个性化设定是什么呢？","role":"assistant"},{"content":"${customContent}","role":"user"},{"content":"了解啦，我会遵循这些设定为你服务！有什么需要我帮忙的吗？","role":"assistant"},{"content":"${parameter}","role":"user"}],"aiModelProvider":"open-ai","language":"EN","subscriptionType":"premium","aiModelVersion":"gpt-4o","user":"A4060097-2A26-4F56-922B-ED9DC946E62B"}`;

        const myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };

        $task.fetch(myRequest).then(response => {
            // 正则匹配并提取所有 content 的值
            const matches = response.body.match(/"content":"(.*?)"/g);
            if (matches) {
                // 去掉 "content":" 和结尾的 "
                const contents = matches.map(match => match.replace(/"content":"|"/g, ''));
                const combinedContent = contents.join(''); // 合并所有内容
                console.log(`Combined Content: ${combinedContent}`);
            
                const saveResult = $prefs.setValueForKey(combinedContent, 'pkcgptdata');
                if (saveResult) {
                    console.log("内容存储成功");
                    $done({
                        status: "HTTP/1.1 200 OK",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ success: true, content: combinedContent })
                    });
                } else {
                    console.log("内容存储失败");
                    $done({
                        status: "HTTP/1.1 500 Internal Server Error",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ success: false, content: "存储失败" })
                    });
                }
            } else {
                console.log('No content found in response.');
                $done({
                    status: "HTTP/1.1 400 Bad Request",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ success: false, content: "No content found in response" })
                });
            }
        }, reason => {
            console.log(`Error: ${reason.error}`);
            $done({
                status: "HTTP/1.1 500 Internal Server Error",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: false, content: reason.error })
            });
        });
    } else {
        // 参数提取失败，直接放行
        console.log("参数无效，放行请求。");
        $done({});
    }
} else {
    // 未匹配路径直接放行
    $done({});
}

