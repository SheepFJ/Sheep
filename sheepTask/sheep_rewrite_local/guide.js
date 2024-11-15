/*************************************
项目名称：sheepTask
创建日期：2024-11-15
脚本作者：Sheep
使用声明：⚠️仅供参考，🈲转载与售卖！
脚本说明：用于需要自身参数的日常任务，通过本重写存储必要参数用于执行
**************************************

重写：https://api.sheepTask.com/任务名称/携带参数1/携带参数2   
主机：虚假的主机域名，仅用于配合重写获取参数，将参数存储在圈x本地



**************************************

[rewrite_local]
^https://api\.sheepTask\.com/xiaomishuabushu/ url script-request-header https://raw.githubusercontent.com/SheepFJ/Sheep/refs/heads/main/sheepTask/sheep_rewrite_local/xiaomishuabushu.js
[mitm]
hostname = api.sheepTask.com

*************************************/