// 获取存储的 bzb_jsxsd_value
let bzb_jsxsdValue = $prefs.getValueForKey("bzb_jsxsd_value");

// 打印值到控制台
if (bzb_jsxsdValue) {
  console.log(bzb_jsxsdValue);
} else {
  console.log("No bzb_jsxsd_value found in storage.");
}

// 完成任务
$done();