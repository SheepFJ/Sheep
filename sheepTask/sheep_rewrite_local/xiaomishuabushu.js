//小米运动刷微信步数

const url = $request.url;
const targetPath = "/xiaomishuabushu/"; 
if (url.includes(targetPath)) {
    const pathSegments = url.split(targetPath)[1].split("/");
    const account = pathSegments[0];
    const password = pathSegments[1];
    const minSteps = pathSegments[2];
    const maxSteps = pathSegments[3];
    const accountSaveSuccess = $prefs.setValueForKey(account, "sheep_account_xiaomishuabushu");
    const passwordSaveSuccess = $prefs.setValueForKey(password, "sheep_password_xiaomishuabushu");
    const minStepsSuccess = $prefs.setValueForKey(minSteps, "sheep_min_steps_xiaomishuabushu");
    const maxStepsSaveSuccess = $prefs.setValueForKey(maxSteps, "sheep_max_steps_xiaomishuabushu");
    if (accountSaveSuccess && passwordSaveSuccess && minStepsSuccess && maxStepsSaveSuccess ) {
        $notify("账号和密码本地存储成功",`账号: ${account},密码: ${password} ,步数范围: ${minSteps}--${maxSteps}`);
    } else {
        $notify("账号和密码保存失败",`1.是否引用重写 2.传参链接是否规范`);
    }
    $done({});
} else {
    $done({});
}
