const urldata="https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/sheepWeChatPKC/sheepwechatpkc.js";

const tagname="sheepPkcWeChat";

// 需要编码的 JSON 对象
const jsonObject = {
  "rewrite_remote": [
    urldata+", tag="+tagname+", update-interval=172800, opt-parser=true, enabled=true"
  ]
};

// 将 JSON 对象转为字符串
const jsonString = JSON.stringify(jsonObject);

// 对整个 JSON 字符串进行 URL 编码
const encodedJson = encodeURIComponent(jsonString);

// 拼接最终的 URL
const finalUrl = "https://quantumult.app/x/open-app/add-resource?remote-resource=" + encodedJson;

// 输出最终的 URL
console.log(finalUrl);

$notify("编码后的快速导入链接","", finalUrl);
$done();
