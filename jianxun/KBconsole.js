// 获取本地存储的 bzb_jsxsd_cookie 值
let bzb_jsxsd_cookie = $prefs.valueForKey("bzb_jsxsd_cookie");

if (bzb_jsxsd_cookie) {
    // 如果获取到 cookie，打印出来
    console.log(bzb_jsxsd_cookie)
} else {
    // 如果没有获取到 cookie，打印提示信息
    $notify("未找到 bzb_jsxsd_cookie", "", "没有存储 bzb_jsxsd_cookie");
}

$done(); // 结束脚本
