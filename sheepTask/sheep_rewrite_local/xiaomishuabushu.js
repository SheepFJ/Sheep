//小米运动刷微信步数

const url = $request.url;
const targetPath = "/xiaomishuabushu/"; 
if (url.includes(targetPath)) {
    const pathSegments = url.split(targetPath)[1].split("/");
    const account = pathSegments[0];
    const password = pathSegments[1];
    const accountSaveSuccess = $prefs.setValueForKey(account, "sheep_account_xiaomishuabushu");
    const passwordSaveSuccess = $prefs.setValueForKey(password, "sheep_password_xiaomishuabushu");
    if (accountSaveSuccess && passwordSaveSuccess) {
        $notify("账号和密码本地存储成功",`账号: ${account}`, `密码: ${password}`);
    } else {
        $notify("账号和密码保存失败", "请检查脚本配置或权限", "");
    }
    $done({});
} else {
    $done({});
}