// 定义一个接收参数的函数
function myFunction(args) {
    // 获取传递的可选参数
    const param1 = args.param1 || 'default1'; // 默认值为'default1'
    const param2 = args.param2 || 'default2'; // 默认值为'default2'

    // 输出参数值
    console.log('Param1:', param1);
    console.log('Param2:', param2);

    // 返回结果（根据需要进行处理）
    return {
        result: `Received Param1: ${param1}, Param2: ${param2}`
    };
}

// 调用函数并返回结果
$done(myFunction($arguments));