// 定义两个基础键
let baseKeys = ["combined_content_response", "combined_content_request"];
let result;

baseKeys.forEach(baseKey => {
  let index = 0;
  let keyToRemove;

  // 循环删除每组匹配的键
  while ($prefs.valueForKey(baseKey + (index === 0 ? "" : index))) {
    keyToRemove = baseKey + (index === 0 ? "" : index);
    result = $prefs.removeValueForKey(keyToRemove);
    if (result) {
      console.log(`成功清除了键 ${keyToRemove}`);
    } else {
      console.log(`未找到键 ${keyToRemove} 或清除失败`);
    }
    index++;
  }
});

$done();