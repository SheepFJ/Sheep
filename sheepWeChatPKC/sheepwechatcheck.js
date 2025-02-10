// **存储封装（兼容 Quantumult X & Loon）**
const Storage = {
    get: key => {
        return typeof $prefs !== "undefined" 
            ? $prefs.valueForKey(key) || "{}"
            : $persistentStore.read(key) || "{}";
    }
};

// **读取本地存储**
let storedData = Storage.get("sheep_wechat_data");

// **解析 JSON**
storedData = storedData ? JSON.parse(storedData) : {};

// **格式化输出**
if (Object.keys(storedData).length === 0) {
    console.log("⚠️ 没有任何用户数据");
    $done({
        status: "HTTP/1.1 200 OK",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "暂无用户数据"
    });
} else {
    let output = "【📖 用户聊天记录】\n\n";

    Object.entries(storedData).forEach(([username, messages]) => {
        output += `📌 **${username}**\n`;

        if (Array.isArray(messages)) {
            messages.forEach(entry => {
                let role = entry.role === "user" ? "👤 用户：" : "🤖 助手：";
                output += `${role} ${entry.content}\n`;
            });
        } else {
            output += "⚠️ 该用户暂无聊天记录\n";
        }

        output += "\n"; // 每个用户的聊天记录之间留空行
    });

    console.log(output); // ✅ 确保日志打印完整数据

    $done({
        status: "HTTP/1.1 200 OK",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: output
    });
}