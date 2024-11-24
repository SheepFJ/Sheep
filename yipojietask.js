const url = `https://www.ypojie.com/wp-admin/admin-ajax.php`;
const method = `POST`;
const headers = {
  'X-Requested-With': `XMLHttpRequest`,
  'Sec-Fetch-Dest': `empty`,
  'Connection': `keep-alive`,
  'Accept-Encoding': `gzip, deflate, br`,
  'Content-Type': `application/x-www-form-urlencoded; charset=UTF-8`,
  'Sec-Fetch-Site': `same-origin`,
  'Origin': `https://www.ypojie.com`,
  'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1`,
  'Sec-Fetch-Mode': `cors`,
  'Cookie': ``, // 动态替换
  'Host': `www.ypojie.com`,
  'Referer': `https://www.ypojie.com/vip`,
  'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
  'Accept': `application/json, text/javascript, */*; q=0.01`
};
const body = `action=epd_checkin`;

// 从圈X本地存储中获取 Cookie
const storedCookie = $prefs.valueForKey("yipojie_quanx_qiandao");

if (storedCookie) {
  headers['Cookie'] = storedCookie; // 替换 Cookie

  const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
  };

  $task.fetch(myRequest).then(response => {
    const statusCode = response.statusCode;
    const responseBody = response.body;

    if (statusCode === 200) {
      // 签到成功
      $notify("签到成功", "状态码: 200", "签到已完成！");
    } else if (statusCode === 400) {
      // 需要重新登录
      $notify("签到失败", "状态码: 400", "需要重新登录获取Cookie！");
    } else {
      // 其他未知状态
      $notify("请求完成", `状态码: ${statusCode}`, `响应内容: ${responseBody}`);
    }
    $done();
  }, reason => {
    // 请求失败通知
    $notify("请求失败", "原因", reason.error);
    $done();
  });
} else {
  // 未找到 Cookie 的通知
  $notify("执行失败", "未找到存储的 Cookie", "请检查是否已成功存储 Cookie");
  $done();
}
