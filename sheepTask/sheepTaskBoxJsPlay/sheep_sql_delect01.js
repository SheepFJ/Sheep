const storedPrefixList = $prefs.valueForKey("sheep_sql_delect01");
// 定义前缀列表
let dataList = []; // 初始化为空数组

if (storedPrefixList) {
  try {
    // 按逗号分割并去除两端空格
    prefixList = storedPrefixList
      .split(",")
      .map(item => item.trim());

    if (!Array.isArray(dataList)) {
      throw new Error("解析结果不是数组");
    }

    console.log("成功获取前缀列表:", dataList);
  } catch (e) {
    // 如果解析失败，打印错误信息
    console.log("解析存储的前缀列表失败:", e.message);
    dataList = []; // 设置为空数组
  }
} else {
  // 本地存储中没有找到前缀列表
  console.log("未找到存储的前缀列表，请检查 sheep_sql_data01 是否存在");
}


// 获取当前存储的键名列表
let keys = $prefs.valueForKey("database_keys");
keys = keys ? JSON.parse(keys) : [];

// 初始化需要删除的键集合
let keysToDelete = [];

// 遍历前缀列表，筛选符合条件的键
prefixList.forEach(prefix => {
  keysToDelete = keysToDelete.concat(keys.filter(key => key.startsWith(prefix)));
});

// 删除符合条件的键
keysToDelete.forEach(key => {
  if ($prefs.removeValueForKey(key)) {
    console.log(`键名 ${key} 删除成功`);
  } else {
    console.log(`键名 ${key} 删除失败`);
  }
});

// 更新键名列表（移除已删除的键）
keys = keys.filter(key => !keysToDelete.includes(key));
$prefs.setValueForKey(JSON.stringify(keys), "database_keys");

// 输出结果
console.log(`删除操作完成，剩余键名列表：${JSON.stringify(keys)}`);

// 结束脚本
done();
